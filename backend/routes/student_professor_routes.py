from flask import Blueprint, request, jsonify
from models.professor import Professor
from models.professorRate import ProfessorRate
from predictRate import predict

from flask import Flask, Blueprint, request, jsonify
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from collections import Counter
import string
import re
from models.professorRate import ProfessorRate

# Create a Flask app
app = Flask(__name__)

student_professor_bp = Blueprint('student_professor', __name__)

@student_professor_bp.route('/student/professor/all', methods=['GET'])
def getAllProfs():
    professorsAll = Professor.query.all()
    professors = []

    for professor in professorsAll:
        prof = {
            'id': professor.id,
            'firstname': professor.firstname,
            'lastname': professor.lastname,
            'email': professor.email,
            'degree': professor.degree
        }
        professors.append(prof)
    response = jsonify(professors)
    response.status_code = 200  # Set the HTTP status code to 200 (OK)
    return response

@student_professor_bp.route('/student/professor/addRate', methods=['POST'])
def addRateProf():
    try:
        likeToTakeAgain = request.get_json()['likeToTakeAgain']
        credit = request.get_json()['credit']
        textBooks = request.get_json()['textBooks']
        attendence = request.get_json()['attendence']
        grade = request.get_json()['grade']
        comment = request.get_json()['comment']
        quility = request.get_json()['quility']
        difficulity = request.get_json()['difficulity']
        studentId = request.get_json()['studentId']
        professorId = request.get_json()['professorId']
        degreeName = request.get_json()['degreeName']

        commentPredict = predict(comment)

        print(commentPredict)
         # Create a new ProfessorRate object
        professor_rate = ProfessorRate(likeToTakeAgain=likeToTakeAgain, 
                            credit=credit, textBooks=textBooks,
                                 attendence=attendence, grade=grade, 
                                 comment=comment,commentPredict=commentPredict[1],
                                 quility=quility, difficulity=difficulity, 
                                 studentId=studentId, professorId=professorId, degreeName=degreeName)

        # Save the ProfessorRate object to the database
        professor_rate.save()

        return jsonify({'message': 'Student Added Professor Rate'})
    except Exception as e:
        respons =  jsonify({'message': e})
        response.status_code = 500
        return response


@student_professor_bp.route('/student/professor/getMyRate', methods=['GET'])
def getAllMyProfRate():
    student_id = request.args.get('studentId')

    # Query all records from ProfessorRate for the given studentId
    professor_rates = ProfessorRate.query.filter_by(studentId=student_id).all()

    # Prepare the response data
    rates = []
    for rate in professor_rates:
        prof = rate.get_professor_data()
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

    response = jsonify(rates)
    response.status_code = 200  # Set the HTTP status code to 200 (OK)
    return response


@student_professor_bp.route('/student/professor/getAllRate', methods=['GET'])
def getAllProfRate():
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
        "quality_counts":[quality_counts["5"],quality_counts["4"],quality_counts["3"],quality_counts["2"],quality_counts["1"]],
    }
    
    response = jsonify({"summary":summury,"rates":rates})
    response.status_code = 200  # Set the HTTP status code to 200 (OK)
    return response


@student_professor_bp.route('/student/professor/generateWordCloud', methods=['GET'])
def generateWordCloud():
    professor_id = request.args.get('professorId')

    # Query all comments for the given professorId
    professor_comments = ProfessorRate.query.filter_by(professorId=professor_id).with_entities(
        ProfessorRate.comment).all()

    # Collect and preprocess comments
    comments = [comment[0] for comment in professor_comments if comment[0] is not None]
    combined_comments = " ".join(comments).lower()
    cleaned_comments = re.sub(f"[{string.punctuation}]", "", combined_comments)
    tokenized_comments = cleaned_comments.split()

    # Calculate word frequencies
    word_frequencies = Counter(tokenized_comments)

    # Generate a word cloud
    wordcloud = WordCloud(width=800, height=800, background_color='white').generate_from_frequencies(word_frequencies)

    # Display the word cloud using matplotlib
    plt.figure(figsize=(8, 8), facecolor=None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad=0)

    # Save the word cloud image
    image_filename = f"wordcloud_professor_{professor_id}.png"
    plt.savefig(image_filename)

    # Return the image filename in the response
    response = jsonify({'message': 'Word Cloud generated', 'image_filename': image_filename})
    response.status_code = 200  # Set the HTTP status code to 200 (OK)
    return response


if __name__ == '__main__':
    app.run(debug=True)