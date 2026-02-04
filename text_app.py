#Test Script
import requests

BASE_URL = "http://127.0.0.1:5000"


def test_health_check():
    response = requests.get(f"{BASE_URL}/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_add_book_success():
    payload = {
        "id": 100,
        "title": "API Design",
        "author": "Roy Fielding",
        "year": 2000,
        "genre": "Technology"
    }

    response = requests.post(f"{BASE_URL}/books", json=payload)
    assert response.status_code == 201


def test_add_book_missing_field():
    payload = {
        "id": 101,
        "title": "Broken Request"
    }

    response = requests.post(f"{BASE_URL}/books", json=payload)
    assert response.status_code == 400
    assert "error" in response.json()


def test_add_book_extra_field():
    payload = {
        "id": 102,
        "title": "Bad Data",
        "author": "Hacker",
        "year": 2020,
        "genre": "Fiction",
        "hack": "true"
    }

    response = requests.post(f"{BASE_URL}/books", json=payload)
    assert response.status_code == 400


def test_get_all_books():
    response = requests.get(f"{BASE_URL}/books")
    assert response.status_code == 200
    assert isinstance(response.json()["books"], list)


def test_get_single_book_success():
    response = requests.get(f"{BASE_URL}/books/100")
    assert response.status_code == 200
    assert response.json()["id"] == 100


def test_get_single_book_not_found():
    response = requests.get(f"{BASE_URL}/books/9999")
    assert response.status_code == 404


def test_delete_book_success():
    response = requests.delete(f"{BASE_URL}/books/100")
    assert response.status_code == 200


def test_delete_book_not_found():
    response = requests.delete(f"{BASE_URL}/books/9999")
    assert response.status_code == 404