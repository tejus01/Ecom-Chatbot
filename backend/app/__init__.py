from flask import Flask
from flask_cors import CORS
from .db import db

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
    db.init_app(app)

    # Register existing chat blueprint
    from .routes.chat import chat_bp
    app.register_blueprint(chat_bp, url_prefix='/api')

    # ✅ Register new product blueprint
    from .routes.product_routes import product_bp
    app.register_blueprint(product_bp, url_prefix='/api')

    return app
