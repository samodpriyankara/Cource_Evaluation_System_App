from models.db import db

class Degree(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    degreeName = db.Column(db.String(50), nullable=False)
    field = db.Column(db.String(50), nullable=False)

    def __init__(self, degreeName, field):
        self.degreeName = degreeName
        self.field = field

    def save(self):
        db.session.add(self)
        db.session.commit()