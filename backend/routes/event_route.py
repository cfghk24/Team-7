from flask import Blueprint
from flask import request
from database import event_model

event = Blueprint("event", __name__)

@event.route("/", methods=["POST"])
def create_user():
    if request.method == "POST":
        result = event_model.insert_one(request.json)
        return {"message": "User added successfully", "_id": str(result.inserted_id)}, 201
    
@event.route("/", methods=["GET"])
def get_events():
    if request.method == "GET":
        events = list(event_model.find())
        for user in events:
            user["_id"] = str(user["_id"])  # Convert ObjectId to string
        return events, 200