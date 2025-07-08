from flask import Blueprint, request, jsonify
from ..models.product import Product
from ..db import db
from fuzzywuzzy import process
import re

chat_bp = Blueprint('chat', __name__)

def get_all_categories():
    return [c[0] for c in db.session.query(Product.category).distinct().all()]

def extract_keywords(message):
    # Lowercase, remove punctuation, split into words
    message = re.sub(r'[^\w\s]', '', message.lower())
    return message.split()

@chat_bp.route('/products', methods=['POST'])
def chat():
    data = request.json
    user_msg = data.get("message", "")
    min_price = data.get("min_price", 0)
    max_price = data.get("max_price", float('inf'))
    require_in_stock = data.get("in_stock_only", False)

    products = []
    categories = get_all_categories()
    categories_lower = [c.lower() for c in categories]

    keywords = extract_keywords(user_msg)

    best_match = None
    best_score = 0

    # Try fuzzy match with every keyword
    for word in keywords:
        match, score = process.extractOne(word, categories_lower)
        if score > best_score:
            best_score = score
            best_match = match

    if best_score > 70 and best_match:
        matched_category = categories[categories_lower.index(best_match)]
        query = Product.query.filter(Product.category == matched_category)
        query = query.filter(Product.price >= min_price, Product.price <= max_price)
        if require_in_stock:
            query = query.filter(Product.stock > 0)
        products = query.limit(5).all()

    if products:
        response = [
            {
                "name": p.name,
                "price": p.price,
                "description": p.description,
                "stock": p.stock,
                "category": p.category,
                "image_url": p.image_url
            } for p in products
        ]
        return jsonify({"response": response})
    else:
        return jsonify({"response": "No products found"})
