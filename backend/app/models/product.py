from app.db import db

class Product(db.Model):
    __tablename__ = "products"  # ✅ Add this line

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    description = db.Column(db.String(255))
    category = db.Column(db.String(50))
    price = db.Column(db.Float)
    stock = db.Column(db.Integer)
    image_url = db.Column(db.String(255))
