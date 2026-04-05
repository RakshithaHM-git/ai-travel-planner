from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import os

app = Flask(__name__)

# ✅ Correct dataset path (FIXED)
dataset_path = os.path.join(os.path.dirname(__file__), 'dataset', 'places.json')

# Load dataset
with open(dataset_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Convert to DataFrame
df = pd.DataFrame(data)

# Ensure required columns exist
for col in ['name', 'type', 'budget', 'description']:
    if col not in df.columns:
        df[col] = ""

# Combine features for ML
df['features'] = df['type'].astype(str) + " " + df['budget'].astype(str) + " " + df['description'].astype(str)

# Create TF-IDF vectors
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df['features'])

# API route
@app.route('/recommend', methods=['POST'])
def recommend():
    user_input = request.json

    type_ = user_input.get('type', '').lower()
    budget = user_input.get('budget', '').lower()

    if not type_ or not budget:
        return jsonify([])

    # Create input text
    input_text = type_ + " " + budget

    # Transform input
    input_vector = vectorizer.transform([input_text])

    # Compute similarity
    similarity = cosine_similarity(input_vector, tfidf_matrix)

    # Get top 3 results
    indices = similarity[0].argsort()[-3:][::-1]

    results = df.iloc[indices][['name', 'description']].to_dict(orient='records')

    return jsonify(results)

# Run server
if __name__ == '__main__':
    app.run(debug=True)