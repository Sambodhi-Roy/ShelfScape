import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the data
books = pd.read_csv('books.csv')
ratings = pd.read_csv('ratings.csv')

# Data processing (done once when starting the server)
# Merge ratings with books to get book titles
ratings_with_name = ratings.merge(books, on='ISBN')

# Convert Book-Rating to numeric safely
ratings_with_name['Book-Rating'] = pd.to_numeric(ratings_with_name['Book-Rating'], errors='coerce')

# Drop rows with NaN ratings
ratings_with_name = ratings_with_name.dropna(subset=['Book-Rating'])

# Filter active users (who rated > 200 books)
active_users = ratings_with_name.groupby('User-ID').count()['Book-Rating'] > 200
padhe_likhe_users = active_users[active_users].index
filtered_rating = ratings_with_name[ratings_with_name['User-ID'].isin(padhe_likhe_users)]

# Filter popular books (rated by at least 50 users)
popular_books = filtered_rating.groupby('Book-Title').count()['Book-Rating'] >= 50
famous_books = popular_books[popular_books].index
final_ratings = filtered_rating[filtered_rating['Book-Title'].isin(famous_books)]

# Create pivot table
pt = final_ratings.pivot_table(index='Book-Title', columns='User-ID', values='Book-Rating')
pt.fillna(0, inplace=True)

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Get input data
        data = request.get_json()
        if not data or not isinstance(data, dict):
            return jsonify({"error": "Invalid input data"}), 400
        
        print("Data from node:", data)

        # Create a new user vector aligned with the matrix
        new_user_vector = pd.Series(0, index=pt.index)
        for title, rating in data.items():
            if title in new_user_vector.index:
                new_user_vector[title] = rating

        # Add new user to the matrix temporarily
        pt_copy = pt.copy()
        pt_copy['new_user'] = new_user_vector

        # Transpose to get users as rows
        existing_users_matrix = pt_copy.T

        # Compute cosine similarity
        new_user_array = new_user_vector.values.reshape(1, -1)
        similarities = cosine_similarity(new_user_array, existing_users_matrix.drop('new_user'))[0]

        # Top 5 similar users
        similar_users = pd.Series(similarities, index=existing_users_matrix.index.drop('new_user'))
        top_users = similar_users.sort_values(ascending=False).head(5).index

        # Books rated by top users
        top_user_ratings = final_ratings[final_ratings['User-ID'].isin(top_users)]

        # Remove books already rated by the new user
        rated_titles = set(data.keys())
        top_user_ratings = top_user_ratings[~top_user_ratings['Book-Title'].isin(rated_titles)]

        # Compute recommendation scores
        if not top_user_ratings.empty:
            recommendation_scores = top_user_ratings.groupby('Book-Title')['Book-Rating'].mean().reset_index()
            recommendation_scores = recommendation_scores.sort_values(by='Book-Rating', ascending=False).head(10)
            
            # Get image URLs
            recommendation_scores['Image-URL-S'] = recommendation_scores['Book-Title'].map(
                books.drop_duplicates('Book-Title').set_index('Book-Title')['Image-URL-S']
            )
            
            # Convert to list of dictionaries without index
            result = recommendation_scores[['Book-Title', 'Image-URL-S']].to_dict('records')
            
            print("Recommended books:")
            for book in result:
                print(f"{book['Book-Title']}: {book['Image-URL-S']}")
            
            return jsonify(result)
        else:
            return jsonify({"error": "No recommendations found"}), 404
            
    except Exception as e:
        print("Error in recommendation:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)