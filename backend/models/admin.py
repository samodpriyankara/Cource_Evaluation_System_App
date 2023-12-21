from models.db import db
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def check_password(self, password):
        return self.password ==  password
