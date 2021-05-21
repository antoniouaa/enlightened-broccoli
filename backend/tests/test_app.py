from fastapi.testclient import TestClient

from broccoli import app

client = TestClient(app)


def test_index():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"hello": "world"}