from sklearn.feature_extraction.text import CountVectorizer
import pickle
from textblob import TextBlob
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
nltk.download('vader_lexicon')
import emoji

def predict(review):

    # # load counter vectorizer model
    # with open('counterVectorizer_pkl' , 'rb') as f:
    #     vectorizer = pickle.load(f)
    #
    # # load saved xgb ml model to predict review positity or negativity
    # with open('model_pkl' , 'rb') as f:
    #     model = pickle.load(f)
    # # predict score and the lable
    # y_pred=model.predict(vectorizer.transform([review]))
    # print("y_pred",y_pred[0])
    # return review,y_pred[0]





    # # Example input text
    # input_text = review
    #
    # # Perform sentiment analysis using TextBlob
    # analysis = TextBlob(input_text)
    # sentiment = analysis.sentiment.polarity  # Sentiment polarity in the range [-1, 1]
    #
    # # Map sentiment to categories
    # if sentiment > 0.2:
    #     y_pred = "good"
    # elif sentiment < -0.2:
    #     y_pred = "bad"
    # else:
    #     y_pred = "average"
    #
    # print("Predicted sentiment:", y_pred)
    # return review, y_pred




    # # Load saved xgb ml model to predict review positivity or negativity
    # with open('model_pkl', 'rb') as f:
    #     model = pickle.load(f)
    #
    # # Load VADER sentiment intensity analyzer
    # sia = SentimentIntensityAnalyzer()
    #
    # # Get sentiment scores using VADER
    # sentiment_scores = sia.polarity_scores(review)
    # compound_score = sentiment_scores['compound']
    #
    # # Map sentiment score to categories
    # if compound_score > 0.05:
    #     y_pred = "good"
    # elif compound_score < -0.05:
    #     y_pred = "bad"
    # else:
    #     y_pred = "average"
    #
    # print("Predicted sentiment:", y_pred)
    # return review, y_pred

# predict("This is good place")



    # Perform sentiment analysis using TextBlob
    analysis = TextBlob(review)
    sentiment_polarity = analysis.sentiment.polarity

    # Determine sentiment category based on polarity
    if sentiment_polarity > 0.2:
        sentiment_category = "good"
    elif sentiment_polarity < -0.2:
        sentiment_category = "bad"
    else:
        sentiment_category = "average"

    # Map sentiment category to emoji
    emoji_mapping = {
        "good": emoji.emojize(":smiling_face_with_smiling_eyes:"),
        "bad": emoji.emojize(":neutral_face:"),
        "average": emoji.emojize(":slightly_smiling_face:")
    }
    predicted_emoji = emoji_mapping.get(sentiment_category, emoji.emojize(":question_mark:"))

    print("Review:", review)
    print("Predicted Sentiment:", sentiment_category)
    print("Predicted Emoji:", predicted_emoji)

    return review, predicted_emoji


if __name__ == "__main__":
    pass