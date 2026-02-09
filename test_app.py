from app import app
import pytest, requests


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client    

BASE_URL = "http://127.0.0.1:5000"


def test_home(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json["message"] == "Welcome to the Book API"
    assert "/health" in response.json["endpoints"]
    assert "/books" in response.json["endpoints"]

def test_health_check():
    response = requests.get(f"{BASE_URL}/health")