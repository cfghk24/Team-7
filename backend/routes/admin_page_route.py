from flask import Blueprint
from flask import request
from database import users_model, events_model, articles_model, forum_model

admin_routes = Blueprint("admin_routes", __name__)

