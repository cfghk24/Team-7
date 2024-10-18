from flask import Blueprint, request
from bson import ObjectId
from database import event_model, feedback_model

event_routes = Blueprint("event_routes", __name__)

@event_routes.route("/", methods=["POST"])
def create_event():
    if request.method == "POST":
        result = event_model.insert_one(request.json)
        return {"message": "Event added successfully", "_id": str(result.inserted_id)}, 201

@event_routes.route("/", methods=["GET"])
def get_events():
    if request.method == "GET":
        events = list(event_model.find())
        for event in events:
            event["_id"] = str(event["_id"])  # Convert ObjectId to string
        return events, 200

@event_routes.route("/<event_id>/feedback", methods=["GET"])
def get_event_feedback(event_id):
    try:
        # Convert event_id from string to ObjectId
        event_id = ObjectId(event_id)
    except Exception:
        return {"error": "Invalid event ID"}, 400

    # Retrieve the event data necessary for the feedback form
    event = event_model.find_one({"_id": event_id})
    if event:
        event["_id"] = str(event["_id"])
        return event, 200
    else:
        return {"error": "Event not found"}, 404

@event_routes.route("/<event_id>/feedback", methods=["POST"])
def submit_event_feedback(event_id):
    try:
        # Convert event_id from string to ObjectId
        event_id = ObjectId(event_id)
    except Exception:
        return {"error": "Invalid event ID"}, 400

    # Get feedback data from the request body
    feedback_data = request.json
    feedback_data["event_id"] = event_id
    # Insert the feedback into the feedback collection
    result = feedback_model.insert_one(feedback_data)
    return {"message": "Feedback submitted successfully", "_id": str(result.inserted_id)}, 201

@event_routes.route("/<event_id>", methods=["GET"])
def get_event(event_id):
    try:
        # Convert event_id from string to ObjectId
        event_id = ObjectId(event_id)
    except Exception:
        return {"error": "Invalid event ID"}, 400

    # Retrieve the event data necessary for the feedback form
    event = event_model.find_one({"_id": event_id})
    if event:
        event["_id"] = str(event["_id"])
        return event, 200
    else:
        return {"error": "Event not found"}, 404

@event_routes.route("/<event_id>/register", methods=["POST"])
def register_for_event(event_id):
    try:
        # Convert event_id from string to ObjectId
        event_id = ObjectId(event_id)
    except Exception:
        return {"error": "Invalid event ID"}, 400

    # Get user_id from the request body
    user_data = request.json
    user_id = user_data.get("user_id")

    if not user_id:
        return {"error": "User ID is required"}, 400

    # Fetch the event
    event = event_model.find_one({"_id": event_id})
    if not event:
        return {"error": "Event not found"}, 404

    # Check if the user is already registered
    if "participants" in event and user_id in event["participants"]:
        return {"message": "User already registered for this event"}, 400

    # Add the user_id to the participants array
    result = event_model.update_one(
        {"_id": event_id},
        {"$addToSet": {"participants": user_id}}
    )

    if result.modified_count == 1:
        return {"message": "User registered for event successfully"}, 200
    else:
        return {"error": "Failed to register user for event"}, 500


    