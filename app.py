from flask import Flask, request, jsonify
from datetime import datetime, timezone



app = Flask(__name__)

books = {}
next_book_id = 1

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
    global next_book_id

    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.get_json()

    if REQUIRED_FIELDS - data.keys():
        return jsonify({"error": "Missing required fields"}), 400
    
    if data.keys() - REQUIRED_FIELDS:
        return jsonify({"error": "Extra fields are not allowed"}), 400
    
    book_id = next_book_id
    next_book_id += 1

    book = data.copy()
    book["id"] = book_id
    book["created_at"] = datetime.now(timezone.utc).isoformat()
    book["updated_at"] = None
    
    books[book_id] = book

    return jsonify({
        "message": "Book added successfully",
        "book": book
    }), 201


@app.route("/books/<int:book_id>", methods=['PUT'])
def update_book(book_id):
    if book_id not in books:
        return jsonify({"error": "Book not found"}), 404
    
    if not request.is_json:
        return jsonify({"error": "Book must be JSON"}), 400
    
    data = request.get_json()

    if "id" in data:
        return jsonify({"error": "Book ID cannot be changed"}), 400
    
    
    
    for field in REQUIRED_FIELDS:   
        if field in data:
            books[book_id][field] = data[field]

    books[book_id]["updated_at"] = datetime.now(timezone.utc).isoformat()

    return jsonify({
        "message": "Book updated successfully",
        "book": books[book_id]
    }), 200



@app.route('/books', methods=['GET'])
def get_all_books():
    return jsonify({"books":list(books.values())}), 200


@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    if book_id not in books:
        return jsonify({"error": "Book not found"}), 404
    
    return jsonify(books[book_id]), 200


@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    if book_id not in books:
        return jsonify({"error": "Book not found"}), 404
    
    del books[book_id]
    return jsonify({"message": "Book deleted successfully"}), 200




    



if __name__ == "__main__":
    app.run(debug=True)
