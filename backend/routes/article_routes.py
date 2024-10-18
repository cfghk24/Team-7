from flask import Blueprint, request
from database import articles_model
import Comment

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

@article_routes.route("/<article_id>/comments", methods=["POST"])
def add_comment_to_article(article_id):
    if request.method == "POST":
        # Get the comment data from the request body
        comment_data = request.json
        comment_data["article_id"] = article_id

        # Create a Comment object
        comment = Comment(comment_data["user_id"], comment_data["comment"])

        # Add the comment to the article's comments list
        result = articles_model.update_one(
            {"_id": article_id},
            {"$push": {"comments": comment.to_dict()}}
        )

        if result.modified_count == 1:
            return {"message": "Comment added successfully"}, 200
        else:
            return {"error": "Failed to add comment"}, 500

@article_routes.route("/<article_id>/comments", methods=["GET"])
def get_comments_for_article(article_id):
    if request.method == "GET":
        # Fetch the article and its comments
        article = articles_model.find_one({"_id": article_id})
        if article:
            return article["comments"], 200
        else:
            return {"error": "Article not found"}, 404