from flask import Flask, request, jsonify
from datetime import datetime, timezone
from flask_cors import CORS

import mysql.connector
import os



app = Flask(__name__)
CORS(app)



db = mysql.connector.connect(
    host=os.getenv("DB_HOST", "mysql"),
    user=os.getenv("DB_USER", "markuser"),
    password=os.getenv("DB_PASSWORD", "Adeyoola01"),
    database=os.getenv("DB_NAME", "library_db")
)

cursor =db.cursor(dictionary=True)

REQUIRED_FIELDS = {"title", "author", "isbn", "year", "genre", "description", }

@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to the Book API",
        "endpoints" : [
            "/health", 
            "/books"
        ]
    }), 200

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "we are good"}), 200


@app.route(("/books"), methods=['POST'])
def add_book():
    

    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.get_json()

    if REQUIRED_FIELDS - data.keys():
        return jsonify({"error": "Missing required fields"}), 400
    
    if data.keys() - REQUIRED_FIELDS:
        return jsonify({"error": "Extra fields are not allowed"}), 400
    
    now = datetime.now(timezone.utc)

    query = """
        INSERT INTO books (title, author, isbn, year, genre, description, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        data["title"],
        data["author"],
        data["isbn"],
        data["year"],
        data["genre"],
        data["description"],
        now

    )

    cursor.execute(query, values)
    db.commit()
    
    return jsonify({"message": "Book added successfully"}), 201


@app.route("/books/<int:book_id>", methods=['PUT'])
def update_book(book_id):
    if not request.json:
        return jsonify({"error": "Book must be JSON"}), 400
    
    data = request.get_json()
    now = datetime.now(timezone.utc)

    query = """
        UPDATE books
        SET title=%s, author=%s, isbn=%s, year=%s,
            genre=%s, description=%s, updated_at=%s
        WHERE id=%s
        """

    values = (
        data["title"],
        data["author"],
        data["isbn"],
        data["year"],
        data["genre"],
        data["description"],
        now,
        book_id
    )

    cursor.execute(query, values)
    db.commit()

    return jsonify({"message": "Book updated successfully"}), 200
    


@app.route('/books', methods=['GET'])
def get_all_books():
    cursor.execute("SELECT * FROM books")
    books = cursor.fetchall()
    return jsonify({"books": books}), 200


@app.route('/books/search', methods=['GET'])
def search_books():
    title = request.args.get("title")
    author = request.args.get("author")
    genre = request.args.get("genre")

    query = "SELECT * FROM books WHERE 1=1"
    values = []

    if title:
        query += " AND LOWER(title)LIKE LOWER(%s)"
        values.append(f"%{title}%")
    if author:
        query += " AND LOWER(author)LIKE LOWER(%s)"
        values.append(f"%{author}%")
    if genre:
        query += " AND LOWER(genre) LIKE LOWER(%s)"
        values.append(f"%{genre}%")

    cursor.execute(query, values)
    results = cursor.fetchall()

    if not results:
        return jsonify({"message": "No matching books found"}), 404

    return jsonify({"count": len(results), "results": results}), 200




@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    cursor.execute("SELECT * FROM books WHERE id = %s", (book_id,))
    book = cursor.fetchone()
    if not book:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book), 200


@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    cursor.execute("DELETE FROM books WHERE id = %s", (book_id,))
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "Book not found"}), 404
    
    return jsonify({"message": "Book deleted successfully"}), 200


    





    



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
