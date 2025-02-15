from flask import Blueprint
from flask import request
from database import users_model

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/register", methods=["POST"])
def create_user():
    if request.method == "POST":
        result = users_model.insert_one(request.json)
        return {"message": "User added successfully", "_id": str(result.inserted_id)}, 201
    
@user_routes.route("/", methods=["GET"])
def get_users():
    if request.method == "GET":
        users = list(users_model.find())
        for user in users:
            user["_id"] = str(user["_id"])  # Convert ObjectId to string
        return users, 200

@user_routes.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return {"error": "Username and password are required."}, 400

    user = users_model.find_one({"username": username})
    if user and user.get("password") == password:
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        return user, 200
    else:
        return {"error": "Invalid username or password."}, 401
