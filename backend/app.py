from flask import Flask

from routes import user_routes, event_routes, article_routes, forum_routes, admin_routes


app = Flask(__name__)



# Register Blueprints
app.register_blueprint(user_routes.user_routes, url_prefix="/users")
app.register_blueprint(event_routes.event_routes, url_prefix="/events")
app.register_blueprint(article_routes.article_routes, url_prefix="/articles")
app.register_blueprint(forum_routes.forum_routes, url_prefix="/forum")
app.register_blueprint(admin_routes.admin_routes, url_prefix="/admin")

@app.route("/")
def home():
    return {"message": "Welcome to Flask API server"}, 200
    
if __name__=="__main__":
    app.run(debug=True, port=8080)
