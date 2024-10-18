from flask import Blueprint
from flask import request
from database import event_model

event_routes = Blueprint("event_routes", __name__)

@event_routes.route("/", methods=["POST"])
def create_event():
    if request.method == "POST":
        result = users_model.insert_one(request.json)
        return {"message": "User added successfully", "_id": str(result.inserted_id)}, 201
    
@event_routes.route("/", methods=["GET"])
def get_events():
    if request.method == "GET":
        users = list(users_model.find())
        for user in users:
            user["_id"] = str(user["_id"])  # Convert ObjectId to string
        return users, 200