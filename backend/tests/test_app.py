import json

from tests.conftest import test_items


def test_index(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"hello": "world"}


def test_item_creation(client):
    first, second = test_items

    response = client.post("/items/", data=json.dumps(first))
    assert response.status_code == 201

    response = client.post("/items/", data=json.dumps(second))
    assert response.status_code == 201
