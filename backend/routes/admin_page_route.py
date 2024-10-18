from flask import Blueprint, jsonify
from bson.objectid import ObjectId
from datetime import datetime, timedelta
from database import (
    users_model,
    events_model,
    articles_model,
    forum_model,
    comments_model,
    feedback_model,
)

admin_page = Blueprint('admin_page', __name__)

@admin_page.route('/analytics', methods=['GET'])
def get_analytics():
    analytics_data = {}

    # 1. Active Users: Users who have logged in within the last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    active_users_count = users_model.count_documents({
        'last_login': {'$gte': thirty_days_ago}
    })
    analytics_data['active_users'] = active_users_count

    # Total Users
    total_users_count = users_model.count_documents({})
    analytics_data['total_users'] = total_users_count

    # 2. Returning Users Percentage
    # Explanation: This metric calculates the percentage of users who have logged in more than once.
    # It indicates user retention and engagement levels.
    returning_users_count = users_model.count_documents({
        'login_count': {'$gt': 1}
    })
    if total_users_count > 0:
        returning_users_percentage = (returning_users_count / total_users_count) * 100
    else:
        returning_users_percentage = 0.0
    analytics_data['returning_users_percentage'] = returning_users_percentage

    # 3. Favorite Events: Events with the highest number of registrations
    # Assuming each event document has a 'registrations' field which is a list of user IDs
    favorite_events_pipeline = [
        {
            '$project': {
                'title': 1,
                'registrations_count': {
                    '$size': {
                        '$ifNull': ['$registrations', []]
                    }
                }
            }
        },
        {'$sort': {'registrations_count': -1}},
        {'$limit': 5}
    ]
    favorite_events = list(events_model.aggregate(favorite_events_pipeline))
    for event in favorite_events:
        event['_id'] = str(event['_id'])  # Convert ObjectId to string
    analytics_data['favorite_events'] = favorite_events

    # 4. Forms Filled Percentage for Each Event
    # Explanation: Calculates the percentage of attendees who submitted feedback forms for each event.
    # This helps understand attendee engagement and satisfaction with each event.
    events = list(events_model.find())
    forms_filled_percentages = []
    for event in events:
        event_id = event['_id']
        # Total number of registrations for the event
        total_registrations = len(event.get('registrations', []))
        # Number of feedback forms submitted for the event
        forms_submitted = feedback_model.count_documents({'event_id': event_id})
        # Calculate percentage
        if total_registrations > 0:
            percentage = (forms_submitted / total_registrations) * 100
        else:
            percentage = 0.0
        forms_filled_percentages.append({
            'event_id': str(event_id),
            'event_title': event.get('title', 'Untitled Event'),
            'forms_filled_percentage': percentage
        })
    analytics_data['forms_filled_percentages'] = forms_filled_percentages

    # 5. Additional Insights
    # Total Comments
    total_comments = comments_model.count_documents({})
    analytics_data['total_comments'] = total_comments

    # Total Articles
    total_articles = articles_model.count_documents({})
    analytics_data['total_articles'] = total_articles

    # Total Forum Threads
    total_forum_threads = forum_model.count_documents({})
    analytics_data['total_forum_threads'] = total_forum_threads

    # Most Active Users (by number of comments)
    most_active_users_pipeline = [
        {'$group': {'_id': '$user_id', 'comments_count': {'$sum': 1}}},
        {'$sort': {'comments_count': -1}},
        {'$limit': 5}
    ]
    most_active_users = list(comments_model.aggregate(most_active_users_pipeline))
    for user in most_active_users:
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
    analytics_data['most_active_users'] = most_active_users

    # Popular Articles: Articles with the highest number of comments
    popular_articles_pipeline = [
        {
            '$lookup': {
                'from': 'comments',
                'localField': '_id',
                'foreignField': 'article_id',
                'as': 'article_comments'
            }
        },
        {
            '$project': {
                'title': 1,
                'comments_count': {'$size': '$article_comments'}
            }
        },
        {'$sort': {'comments_count': -1}},
        {'$limit': 5}
    ]
    popular_articles = list(articles_model.aggregate(popular_articles_pipeline))
    for article in popular_articles:
        article['_id'] = str(article['_id'])  # Convert ObjectId to string
    analytics_data['popular_articles'] = popular_articles

    # Return the analytics data as JSON
    return jsonify(analytics_data), 200
