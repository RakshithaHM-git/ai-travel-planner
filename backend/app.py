from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Load dataset
with open('dataset/places.json') as f:
    data = json.load(f)

@app.route('/recommend', methods=['POST'])
def recommend():
    user_input = request.json

    user_type = user_input.get('type', '').lower()
    user_budget = user_input.get('budget', '').lower()

    results = []

    for place in data:
        if user_type in place['type'].lower() and user_budget in place['budget'].lower():
            results.append(place)

    # If no exact match, give partial matches
    if len(results) == 0:
        for place in data:
            if user_type in place['type'].lower():
                results.append(place)

    # Return top 3
    return jsonify(results[:3])

if __name__ == '__main__':
    app.run(debug=True)