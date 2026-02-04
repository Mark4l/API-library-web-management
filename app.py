from flask import Flask, request, jsonify


app = Flask(__name__)

books = {}

REQUIRED_FIELDS = {"id", "title", "author", "isbn", "year", "genre", "description", }

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
    
    book_id = data["id"]

    if book_id in books:
        return jsonify(({"error": "Book already exists"})), 409
    
    books[book_id] = data
    return jsonify({"message": "Book added"}), 201

    
@app.route('/books', methods=['GET'])
def get_all_books():
    books_list = list(books.values())
    return jsonify({"books": books_list}), 200

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
