from flask import Blueprint, request
from database import forum_model

forum_routes = Blueprint("forum_routes", __name__)

@forum_routes.route("/", methods=["POST"])
def create_forum():
    if request.method == "POST":
        result = forum_model.insert_one(request.json)
        return {"message": "Forum created successfully", "_id": str(result.inserted_id)}, 201

@forum_routes.route("/", methods=["GET"])
def get_forums():
    if request.method == "GET":
        forums = list(forum_model.find())
        for forum in forums:
            forum["_id"] = str(forum["_id"])  # Convert ObjectId to string
        return forums, 200
