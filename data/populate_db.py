import sys
import os
import csv

# Add backend/app to Python path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend'))
sys.path.insert(0, backend_path)

from app import create_app
from app.db import db
from app.models.product import Product

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    with open("data/mock_products.csv", encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            product = Product(
                name=row['name'],
                description=row['description'],
                category=row['category'],
                price=float(row['price']),
                stock=int(row['stock']),
                image_url=row['image_url']
            )
            db.session.add(product)
        db.session.commit()

print("✅ Database populated with mock product data.")
