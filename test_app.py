from app import app
import pytest, json


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client    

BASE_URL = "http://127.0.0.1:5000"


def test_create_book_success(client):
    payload = {
        "title": "Clean Code",
        "author": "Robert Martin",
        "isbn": "9780132350884",
        "year": 2008,
        "genre": "Programming",
        "description": "A book about clean code"
    }

    response = client.post("/books", json=payload)

    assert response.status_code == 201
    data = response.get_json()
    assert "book" in data
    assert data["book"]["id"] == 1

def test_create_book_missing_fields(client):
    payload = {
        "title": "Incomplete Book"
    }

    response = client.post("/books", json=payload)

    assert response.status_code == 400
    assert "Missing required fields" in response.get_json()["error"]


    