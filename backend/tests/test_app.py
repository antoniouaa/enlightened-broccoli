import json

from tests.conftest import test_items


def test_index(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"hello": "world"}


def test_item_creation_success(client):
    first, second = test_items

    response = client.post("/items/", data=json.dumps(first))
    assert response.status_code == 201

    response = client.post("/items/", data=json.dumps(second))
    assert response.status_code == 201

    no_description = {"title": "test title", "calories": 0}

    response = client.post("/items/", data=json.dumps(no_description))
    assert response.status_code == 201


def test_item_creation_failure(client):
    bad_title = {"title": None, "description": "test", "calories": 0}

    response = client.post("/items/", data=json.dumps(bad_title))
    assert response.status_code == 422

    bad_description = {"title": "test title", "description": 10, "calories": 0}

    response = client.post("/items/", data=json.dumps(bad_description))
    assert response.status_code == 422

    bad_calories = {
        "title": "test title",
        "description": "test description",
        "calories": None,
    }

    response = client.post("/items/", data=json.dumps(bad_calories))
    assert response.status_code == 422
