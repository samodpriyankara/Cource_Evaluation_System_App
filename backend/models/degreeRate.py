from models.db import db
from datetime import datetime
from models.degree import Degree

class DegreeRate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reputation = db.Column(db.Integer, nullable=False)
    opportunities = db.Column(db.Integer, nullable=False)
    accQuality = db.Column(db.Integer, nullable=False)
    happiness = db.Column(db.Integer, nullable=False)
    facilities = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500))
    commentPredict = db.Column(db.String(50))
    overallRate = db.Column(db.Float, nullable=False)
    studentId = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    courseId = db.Column(db.Integer, db.ForeignKey('degree.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, reputation, opportunities, accQuality, happiness, facilities, comment, commentPredict, overallRate, studentId, courseId):
        self.reputation = reputation
        self.opportunities = opportunities
        self.accQuality = accQuality
        self.happiness = happiness
        self.facilities = facilities
        self.comment = comment
        self.commentPredict = commentPredict
        self.overallRate = overallRate
        self.studentId = studentId
        self.courseId = courseId

    def save(self):
        db.session.add(self)
        db.session.commit()

    def get_course_data(self):
        course = Degree.query.filter_by(id=self.courseId).first()
        return course