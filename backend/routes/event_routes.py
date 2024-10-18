from flask import Blueprint, request
from bson import ObjectId
from database import events_model, feedback_model

event_routes = Blueprint("event_routes", __name__)

@event_routes.route("/", methods=["POST"])
def create_event():
    if request.method == "POST":
        result = events_model.insert_one(request.json)
        return {"message": "Event added successfully", "_id": str(result.inserted_id)}, 201

@event_routes.route("/", methods=["GET"])
def get_events():
    if request.method == "GET":
        events = list(events_model.find())
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

    # Retrieve all feedback for the given event
    feedbacks = list(feedback_model.find({"object_id": event_id}))
    if feedbacks:
        for feedback in feedbacks:
            feedback["_id"] = str(feedback["_id"])
            feedback["object_id"] = str(feedback["object_id"])
        return {"feedbacks": feedbacks}, 200
    else:
        return {"message": "No feedback found for this event"}, 404

@event_routes.route("/<event_id>/feedback", methods=["POST"])
def submit_event_feedback(event_id):
    try:
        # Convert event_id from string to ObjectId
        event_id = ObjectId(event_id)
    except Exception:
        return {"error": "Invalid event ID"}, 400

    # Get feedback data from the request body
    feedback_data = request.json
    
    # Ensure required fields are present
    if "user_id" not in feedback_data or "feedback" not in feedback_data:
        return {"error": "Missing required fields"}, 400

    # Prepare feedback data for insertion
    feedback_to_insert = {
        "user_id": feedback_data["user_id"],
        "object_id": event_id,
        "feedback": feedback_data["feedback"]
    }

    # Insert the feedback into the feedback collection
    result = feedback_model.insert_one(feedback_to_insert)
    return {"message": "Feedback submitted successfully", "_id": str(result.inserted_id)}, 201

@event_routes.route("/<event_id>", methods=["GET"])
def get_event(event_id):
    try:
        # Convert event_id from string to ObjectId
        event_id = ObjectId(event_id)
    except Exception:
        return {"error": "Invalid event ID"}, 400

    # Retrieve the event data necessary for the feedback form
    event = events_model.find_one({"_id": event_id})
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
    event = events_model.find_one({"_id": event_id})
    if not event:
        return {"error": "Event not found"}, 404

    # Check if the user is already registered
    if "participants" in event and user_id in event["participants"]:
        return {"message": "User already registered for this event"}, 400

    # Add the user_id to the participants array
    result = events_model.update_one(
        {"_id": event_id},
        {"$addToSet": {"participants": user_id}}
    )

    if result.modified_count == 1:
        return {"message": "User registered for event successfully"}, 200
    else:
        return {"error": "Failed to register user for event"}, 500


    