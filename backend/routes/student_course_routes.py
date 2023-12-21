from flask import Blueprint, request, jsonify
from models.professor import Professor
from models.degree import Degree
from models.degreeRate import DegreeRate
from predictRate import predict


student_course_bp = Blueprint('student_course', __name__)

@student_course_bp.route('/student/course/all', methods=['GET'])
def getAllCourses():
    degrees = Degree.query.all()
    courses = []

    for degree in degrees:
        course = {
            'id': degree.id,
            'degreeName': degree.degreeName,
            'field': degree.field
        }
        courses.append(course)
    response = jsonify(courses)
    response.status_code = 200  # Set the HTTP status code to 200 (OK)
    return response

@student_course_bp.route('/student/course/addRate', methods=['POST'])
def addRateCourse():
    try:
        reputation = request.get_json()['reputation']
        opportunities = request.get_json()['opportunities']
        accQuality = request.get_json()['accQuality']
        happiness = request.get_json()['happiness']
        facilities = request.get_json()['facilities']
        comment = request.get_json()['comment']
        overallRate = request.get_json()['overallRate']
        studentId = request.get_json()['studentId']
        courseId = request.get_json()['courseId']

        commentPredict = predict(comment)

        print(commentPredict)
         # Create a new DegreeRate object
        degree_rate = DegreeRate(reputation=reputation, opportunities=opportunities, accQuality=accQuality,
                                 happiness=happiness, facilities=facilities, comment=comment,commentPredict=commentPredict[1],
                                 overallRate=overallRate, studentId=studentId, courseId=courseId)

        # Save the DegreeRate object to the database
        degree_rate.save()

        return jsonify({'message': 'Student Added Degree Rate'})
    except Exception as e:
        respons =  jsonify({'message': e})
        response.status_code = 500
        return response


@student_course_bp.route('/student/course/getMyRate', methods=['GET'])
def getAllMyCourseRate():
    student_id = request.args.get('studentId')

    # Query all course rates for the given studentId
    course_rates = DegreeRate.query.filter_by(studentId=student_id).all()

    # Prepare the response data
    rates = []
    for rate in course_rates:
        course = rate.get_course_data()
        rate_data = {
            'id': rate.id,
            'reputation': rate.reputation,
            'opportunities': rate.opportunities,
            'accQuality': rate.accQuality,
            'happiness': rate.happiness,
            'facilities': rate.facilities,
            'comment': rate.comment,
            'commentPredict': rate.commentPredict,
            'overallRate': rate.overallRate,
            'studentId': rate.studentId,
            'courseId': rate.courseId,
            'timestamp': rate.timestamp,
            'degreeName': course.degreeName,
            'field': course.field
        }
        rates.append(rate_data)
    response = jsonify(rates)
    response.status_code = 200  # Set the HTTP status code to 200 (OK)
    return response


@student_course_bp.route('/student/course/getAllRate', methods=['GET'])
def getAllCourseRate():
    course_id = request.args.get('courseId')

    # Query all records from DegreeRate for the given courseId
    course_rates = DegreeRate.query.filter_by(courseId=course_id).all()

    # Prepare the response data
    rates = []
    for rate in course_rates:
        course = rate.get_course_data()
        rate_data = {
            'id': rate.id,
            'reputation': rate.reputation,
            'opportunities': rate.opportunities,
            'accQuality': rate.accQuality,
            'happiness': rate.happiness,
            'facilities': rate.facilities,
            'comment': rate.comment,
            'commentPredict': rate.commentPredict,
            'overallRate': rate.overallRate,
            'studentId': rate.studentId,
            'courseId': rate.courseId,
            'timestamp': rate.timestamp,
            'degreeName': course.degreeName,
            'field': course.field
        }
        rates.append(rate_data)
    response = jsonify(rates)
    response.status_code = 200  # Set the HTTP status code to 200 (OK)
    return response
