from models.db import db

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    degreeName = db.Column(db.String(50))

    def __init__(self, firstname, lastname, email, password,degreeName):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.degreeName = degreeName

    def save(self):
        db.session.add(self)
        db.session.commit()

    def getId(self):
        return self.id
    
    def check_password(self, password):
        return self.password ==  password
