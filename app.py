from flask import Flask, request, jsonify, session, render_template
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_session import Session

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/emotionPoll'
app.config['SECRET_KEY'] = 'Amrita@1'
app.config['SESSION_TYPE'] = 'filesystem'
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
Session(app)

@app.route('/')
def home():
    return render_template('1.html')

@app.route('/check-auth', methods=['GET'])
def check_auth():
    if 'user' in session:
        return jsonify({"loggedIn": True}), 200
    return jsonify({"loggedIn": False}), 200

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data['email']
    password = data['password']

    # Check if the user already exists
    if mongo.db.users.find_one({'email': email}):
        return jsonify({"message": "User already exists"}), 400

    # Hash the password and store in MongoDB
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    mongo.db.users.insert_one({'email': email, 'password': hashed_password})

    return jsonify({"message": "User registered successfully"}), 201

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    user = mongo.db.users.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        session['user'] = email
        return jsonify({"message": "Logged in successfully"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# Logout Route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({"message": "Logged out successfully"}), 200

# Vote Submission Route
@app.route('/vote', methods=['POST'])
def submit_vote():
    if 'user' not in session:
        return jsonify({"message": "Please log in to vote"}), 403

    data = request.json
    user_email = session['user']
    selected_emotions = data['emotions']

    mongo.db.votes.insert_one({'user_email': user_email, 'emotions': selected_emotions})
    return jsonify({"message": "Vote submitted successfully"}), 200

# Fetch Stats Route
@app.route('/stats', methods=['GET'])
def fetch_stats():
    pipeline = [
        {"$unwind": "$emotions"},
        {"$group": {"_id": "$emotions", "count": {"$sum": 1}}}
    ]

    emotion_counts = list(mongo.db.votes.aggregate(pipeline))
    stats = {item['_id']: item['count'] for item in emotion_counts}
    print('Stats:', stats)  # Debug print
    return jsonify(stats), 200

if __name__ == '__main__':
    app.run(debug=True)
