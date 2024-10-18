class Comment:
    def __init__(self, user_id, comment):
        self.user_id = user_id
        self.comment = comment

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'comment': self.comment
        }
