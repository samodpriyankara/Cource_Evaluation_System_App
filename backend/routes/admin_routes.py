from flask import Blueprint, request, jsonify
from models.admin import Admin
from models.degree import Degree
from models.professor import Professor
from models.student import Student


admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']

    print("email",email)
    print("password",password)
    admin = Admin.query.filter_by(email=email).first()

    if admin and admin.check_password(password):
        # Login successful
        response = jsonify({'message': 'Login successful'})
        response.status_code = 200  # Set the HTTP status code to 200 (OK)
        return response
    else:
        # Login failed
        response = jsonify({'message': 'Invalid email or password'})
        response.status_code = 401  # Set the HTTP status code to 401 (Unauthorized)
        return response

@admin_bp.route('/admin/addCourse', methods=['POST'])
def addCourse():
    try:
        degreeName = request.get_json()['degreeName']
        field = request.get_json()['field']
        new_course = Degree(degreeName=degreeName, field=field)
        new_course.save()

        return jsonify({'message': 'Course added successfully'})
    except Exception as e:
        respons =  jsonify({'message': e})
        response.status_code = 500
        return response

@admin_bp.route('/admin/addProfessor', methods=['POST'])
def addProfessor():
    try:
        firstname = request.get_json()['firstname']
        lastname = request.get_json()['lastname']
        email = request.get_json()['email']
        password = request.get_json()['password']
        degree = request.get_json()['degree']
        new_professor = Professor(firstname=firstname, lastname=lastname,email=email,password=password,degree=degree)
        new_professor.save()

        return jsonify({'message': 'Professor added successfully'})
    except Exception as e:
        respons =  jsonify({'message': e})
        response.status_code = 500
        return response
        

# TODO
@admin_bp.route('/admin/dashoard', methods=['GET'])
def dashoard():
    # Get the number of degrees
    num_degrees = Degree.query.count()

    # Get the number of professors
    num_professors = Professor.query.count()

    # Get the number of students
    num_students = Student.query.count()
    return jsonify({'noOfdegree': num_degrees,'noOfProf':num_professors,'noOfRateUser':num_students})
        