#Importing necessary libraries
from flask import Flask, request, jsonify, session, render_template
# Imports the Flask class and functions from the flask module:
# - Flask: The core Flask class for creating an app.
# - request: To handle incoming HTTP requests.
# - jsonify: To convert Python objects to JSON responses.
# - session: To handle session data.
# - render_template: To render HTML templates.

from flask_pymongo import PyMongo
# Imports PyMongo from flask_pymongo to interact with MongoDB.

from flask_bcrypt import Bcrypt
# Imports Bcrypt from flask_bcrypt for password hashing and verification.

from flask_session import Session
# Imports Session from flask_session for managing sessions.

app = Flask(__name__)
# Creates an instance of the Flask class to initialize the web application.

app.config['MONGO_URI'] = 'mongodb://localhost:27017/emotionPoll'
# Sets the MongoDB URI to connect to the local MongoDB instance and database named 'emotionPoll'.

app.config['SECRET_KEY'] = 'test01'
# Sets a secret key for the application to secure sessions and cookies.

app.config['SESSION_TYPE'] = 'filesystem'
# Configures the session type to use the filesystem for storing session data.

mongo = PyMongo(app)
# Initializes PyMongo with the Flask app to enable MongoDB operations.

bcrypt = Bcrypt(app)
# Initializes Bcrypt with the Flask app for password hashing and checking.

Session(app)
# Initializes the session management system with the Flask app.

@app.route('/')
def home():
    return render_template('1.html')
    # Defines the route for the home page. When accessed, it renders the '1.html' template.

@app.route('/check-auth', methods=['GET'])
def check_auth():
    if 'user' in session:
        return jsonify({"loggedIn": True}), 200
        # Checks if 'user' is in session. If so, returns JSON indicating the user is logged in.
    return jsonify({"loggedIn": False}), 200
    # If 'user' is not in session, returns JSON indicating the user is not logged in.

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data['email']
    password = data['password']
    # Gets JSON data from the request and extracts 'email' and 'password'.

    if mongo.db.users.find_one({'email': email}):
        return jsonify({"message": "User already exists"}), 400
        # Checks if a user with the same email already exists in the 'users' collection.
        # If yes, returns JSON indicating the user already exists with a 400 status code.
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    mongo.db.users.insert_one({'email': email, 'password': hashed_password})
    # Hashes the password using Bcrypt, then stores the email and hashed password in the 'users' collection.
    
    return jsonify({"message": "User registered successfully"}), 201
    # Returns JSON indicating successful registration with a 201 status code.

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']
    # Gets JSON data from the request and extracts 'email' and 'password'.

    user = mongo.db.users.find_one({'email': email})
    # Retrieves the user document from the 'users' collection based on the email.

    if user and bcrypt.check_password_hash(user['password'], password):
        session['user'] = email
        return jsonify({"message": "Logged in successfully"}), 200
        # Checks if the user exists and if the provided password matches the hashed password.
        # If yes, stores the email in the session and returns JSON indicating successful login.
    else:
        return jsonify({"message": "Invalid credentials"}), 401
        # If the user does not exist or the password is incorrect, returns JSON indicating invalid credentials with a 401 status code.

# Logout Route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    # Removes 'user' from the session to log out the user.
    return jsonify({"message": "Logged out successfully"}), 200
    # Returns JSON indicating successful logout with a 200 status code.

# Vote Submission Route
@app.route('/vote', methods=['POST'])
def submit_vote():
    if 'user' not in session:
        return jsonify({"message": "Please log in to vote"}), 403
        # Checks if 'user' is in the session. If not, returns JSON indicating the user must be logged in to vote with a 403 status code.

    data = request.json
    user_email = session['user']
    selected_emotions = data['emotions']
    # Gets JSON data from the request and extracts 'emotions'. Gets the email from the session.

    mongo.db.votes.insert_one({'user_email': user_email, 'emotions': selected_emotions})
    # Stores the user's email and selected emotions in the 'votes' collection.
    
    return jsonify({"message": "Vote submitted successfully"}), 200
    # Returns JSON indicating successful vote submission with a 200 status code.

# Fetch Stats Route
@app.route('/stats', methods=['GET'])
def fetch_stats():
    pipeline = [
        {"$unwind": "$emotions"},
        {"$group": {"_id": "$emotions", "count": {"$sum": 1}}}
    ]
    # Defines an aggregation pipeline to process the 'votes' collection:
    # - $unwind: Deconstructs the 'emotions' array field from the votes.
    # - $group: Groups by the 'emotions' field and counts the number of occurrences.

    emotion_counts = list(mongo.db.votes.aggregate(pipeline))
    stats = {item['_id']: item['count'] for item in emotion_counts}
    # Executes the aggregation pipeline and converts the result into a dictionary where the key is the emotion and the value is the count.
    print('Stats:', stats)  # Debug print
    # Prints the statistics to the console for debugging purposes.

    return jsonify(stats), 200
    # Returns the statistics as JSON with a 200 status code.

if __name__ == '__main__':
    app.run(debug=True)
    # Runs the Flask application with debug mode enabled if the script is executed directly.
