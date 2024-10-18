from flask import Flask

from routes import user_routes


app = Flask(__name__)


@app.route("/")
def home():
    return {"message": "Welcome to Flask API server"}, 200

app.register_blueprint(user_routes.user_routes, url_prefix="/api/users")
    
    
if __name__=="__main__":
    app.run(debug=True, port=8080)