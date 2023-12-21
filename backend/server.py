from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.admin_routes import admin_bp
from routes.auth_routes import auth_bp
from routes.student_course_routes import student_course_bp
from routes.student_professor_routes import student_professor_bp
from routes.student_routes import student_bp
from routes.professor_routes import professor_bp
from models.db import db
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.register_blueprint(admin_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(student_bp)
app.register_blueprint(student_course_bp)
app.register_blueprint(student_professor_bp)
app.register_blueprint(professor_bp)


if __name__ == "__main__":
    app.run(port=8000, debug=True)

