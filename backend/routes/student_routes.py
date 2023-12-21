from flask import Blueprint, request, jsonify
from models.professorRate import ProfessorRate
from models.degreeRate import DegreeRate
from predictRate import predict


student_bp = Blueprint('student', __name__)

@student_bp.route('/student/dashboard', methods=['GET'])
def getAllCourses():
    student_id = request.args.get('studentId')
    noOfDegreeRates = DegreeRate.query.filter_by(studentId=student_id).count()
    noOfProfRates = ProfessorRate.query.filter_by(studentId=student_id).count()
    
    response = jsonify({"noOfDegreeRates":noOfDegreeRates,"noOfProfRates":noOfProfRates})
    response.status_code = 200  # Set the HTTP status code to 200 (OK)
    return response