from flask import Blueprint, request
from database import articles_model

article_routes = Blueprint("article_routes", __name__)

@article_routes.route("/", methods=["POST"])
def create_article():
    if request.method == "POST":
        result = articles_model.insert_one(request.json)
        return {"message": "Article added successfully", "_id": str(result.inserted_id)}, 201

@article_routes.route("/", methods=["GET"])
def get_articles():
    if request.method == "GET":
        articles = list(articles_model.find())
        for article in articles:
            article["_id"] = str(article["_id"])  # Convert ObjectId to string
        return articles, 200
