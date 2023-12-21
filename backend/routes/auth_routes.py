from flask import Blueprint, request, jsonify
from models.professor import Professor
from models.student import Student


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']

    print("email",email)
    print("password",password)
    prof = Professor.query.filter_by(email=email).first()

    if prof and prof.check_password(password):
        # Login successful
        response = jsonify({'role':'professor','details':{"id":prof.id,"firstname":prof.firstname,"lastname":prof.lastname,"email":prof.email},'message': 'Login successful'})
        response.status_code = 200  # Set the HTTP status code to 200 (OK)
        return response
    else:
        student = Student.query.filter_by(email=email).first()

        if student and student.check_password(password):
            # Login successful
            response = jsonify({'role':'student','details':{"id":student.id,"firstname":student.firstname,"lastname":student.lastname,"email":student.email},'message': 'Login successful'})
            response.status_code = 200  # Set the HTTP status code to 200 (OK)
            return response
        else:
            # Login failed
            response = jsonify({'message': 'Invalid email or password'})
            response.status_code = 401  # Set the HTTP status code to 401 (Unauthorized)
            return response

@auth_bp.route('/auth/register', methods=['POST'])
def register():
    try:
        firstname = request.get_json()['firstname']
        lastname = request.get_json()['lastname']
        email = request.get_json()['email']
        password = request.get_json()['password']
        degreeName = request.get_json()['degreeName']
        new_student = Student(firstname=firstname, lastname=lastname,email=email,password=password,degreeName=degreeName)
        new_student.save()

        return jsonify({'id':new_student.getId(),'firstname':firstname,'lastname':lastname,'message': 'Student Registered successfully'})
    except Exception as e:
        respons =  jsonify({'message': e})
        response.status_code = 500
        return response
  