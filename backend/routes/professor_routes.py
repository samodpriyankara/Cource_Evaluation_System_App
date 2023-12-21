from flask import Blueprint, request, jsonify
from models.professorRate import ProfessorRate
from models.degreeRate import DegreeRate
from predictRate import predict


professor_bp = Blueprint('professor', __name__)

@professor_bp.route('/professor/getMyAll', methods=['GET'])
def getAllCourses():
    professor_id = request.args.get('professorId')
    # Query all records from ProfessorRate for the given professorId
    professor_rates = ProfessorRate.query.filter_by(professorId=professor_id).all()

    # Prepare the response data
    rates = []
    total_quality = 0
    total_difficulty = 0
    quality_counts = {
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0
            }
    num_ratings = len(professor_rates)
    no_of_like_to_take_again = 0
    for rate in professor_rates:
        prof = rate.get_professor_data()
        total_quality += int(rate.quility)
        total_difficulty += int(rate.difficulity)
        print("+++",rate.quility)
        if(rate.likeToTakeAgain ==1):
            no_of_like_to_take_again +=1
        if(rate.quility == 0):
            quality_counts["1"] += 1
        else:
            quality_counts[str(rate.quility)] += 1
        rate_data = {
            'id': rate.id,
            'likeToTakeAgain': rate.likeToTakeAgain,
            'credit': rate.credit,
            'textBooks': rate.textBooks,
            'attendence': rate.attendence,
            'grade': rate.grade,
            'comment': rate.comment,
            'commentPredict': rate.commentPredict,
            'quility': rate.quility,
            'difficulity': rate.difficulity,
            'studentId': rate.studentId,
            'professorId': rate.professorId,
            'timestamp': rate.timestamp,
            'professor':{
                'id': prof.id,
                'firstname': prof.firstname,
                'lastname': prof.lastname,
                'email': prof.email,
                'degree': prof.degree
            }
        }
        rates.append(rate_data)

    if(num_ratings > 0):
        average_quality = round((total_quality / num_ratings),2)
        average_difficulty = round((total_difficulty / num_ratings),2)
    else:
        average_quality = 0
        average_difficulty = 0

    # Prepare the response data
    summury = {
        "no_of_like_to_take_again":no_of_like_to_take_again,
        "average_quality":average_quality,
        "average_difficulty":average_difficulty,
        "quality_counts":[quality_counts["5"],quality_counts["4"],quality_counts["3"],quality_counts["2"],quality_counts["1"]]
    }
    
    response = jsonify({"summary":summury,"rates":rates})
    response.status_code = 200  # Set the HTTP status code to 200 (OK)
    return response
