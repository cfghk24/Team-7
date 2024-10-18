from dotenv import load_dotenv
import os
import pymongo

load_dotenv()

CONNECTION_STIRNG = os.getenv("DB_URI")
mongo_client = pymongo.MongoClient(CONNECTION_STIRNG)
db = mongo_client["test"]
users_model = db["users"]