from dotenv import load_dotenv
import os
import pymongo

load_dotenv()

CONNECTION_STRING = os.getenv("DB_URI")
mongo_client = pymongo.MongoClient(CONNECTION_STRING)
db = mongo_client["test"]
users_model = db["users"]