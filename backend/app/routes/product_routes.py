from flask import Blueprint, request, jsonify
import pandas as pd
import os

product_bp = Blueprint("product", __name__)

@product_bp.route("/api/products", methods=["POST"])
def get_products():
    user_input = request.json.get("message", "").lower()

    # Load CSV from absolute path
    file_path = os.path.join(os.path.dirname(__file__), "../../data/mock_products.csv")
    df = pd.read_csv(file_path)

    matched = df[df["name"].str.lower().str.contains(user_input)]

    if matched.empty:
        return jsonify({"response": "No matching products found."})

    results = matched[["name", "description", "price"]]
    if "image" in df.columns:
        results["image"] = matched["image"]

    return jsonify({"response": results.to_dict(orient="records")})
