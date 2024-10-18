from dotenv import load_dotenv
import os
import pymongo

load_dotenv()

CONNECTION_STRING = os.getenv("DB_URI")
mongo_client = pymongo.MongoClient(CONNECTION_STRING)
db = mongo_client["test"]
users_model = db["users"]
events_model = db["events"]
articles_model = db["articles"]
forum_model = db["forum"]
comments_model = db["comments"]
feedback_model = db["feedback"]