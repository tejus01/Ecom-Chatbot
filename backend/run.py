from app import create_app  
app = create_app()
if __name__ == "__main__":
    app.run(debug=True)
# This file is used to run the Flask application.
# It imports the create_app function from the app module and runs the application.
    