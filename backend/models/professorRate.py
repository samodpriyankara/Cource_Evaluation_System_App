from models.db import db
from datetime import datetime
from models.professor import Professor

class ProfessorRate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    likeToTakeAgain = db.Column(db.Integer, nullable=False)
    credit = db.Column(db.Integer, nullable=False)
    textBooks = db.Column(db.Integer, nullable=False)
    attendence = db.Column(db.Integer, nullable=False)
    grade = db.Column(db.String(10), nullable=False)
    comment = db.Column(db.String(500))
    commentPredict = db.Column(db.String(50))
    quility = db.Column(db.Integer, nullable=False)
    difficulity = db.Column(db.String(50))
    degreeName = db.Column(db.String(50))
    studentId = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    professorId = db.Column(db.Integer, db.ForeignKey('professor.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, likeToTakeAgain, credit, textBooks, attendence, grade, comment, commentPredict, quility, difficulity, studentId, professorId,degreeName):
        self.likeToTakeAgain = likeToTakeAgain
        self.credit = credit
        self.textBooks = textBooks
        self.attendence = attendence
        self.grade = grade
        self.comment = comment
        self.commentPredict = commentPredict
        self.quility = quility
        self.difficulity = difficulity
        self.studentId = studentId
        self.professorId = professorId
        self.degreeName = degreeName

    def save(self):
        db.session.add(self)
        db.session.commit()

    def get_professor_data(self):
        professor = Professor.query.filter_by(id=self.professorId).first()
        return professor