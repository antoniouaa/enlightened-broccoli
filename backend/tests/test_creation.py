import json

from tests.conftest import test_items, test_users


def test_item_creation_success(test_client):
    chicken, milk = test_items

    response = test_client.post("/items/", data=json.dumps(chicken))
    assert response.status_code == 201
    assert response.json()["title"] == "chicken"

    response = test_client.post("/items/", data=json.dumps(milk))
    assert response.status_code == 201
    assert response.json()["title"] == "milk"

    no_description = {"title": "test title", "calories": 0}

    response = test_client.post("/items/", data=json.dumps(no_description))
    assert response.status_code == 201

    response = test_client.get("/items/")
    assert len(response.json()) == 3


def test_item_creation_failure(test_client):
    bad_title = {"title": None, "description": "test", "calories": 0}

    response = test_client.post("/items/", data=json.dumps(bad_title))
    assert response.status_code == 422

    bad_description = {"title": "test title", "description": 10, "calories": 0}

    response = test_client.post("/items/", data=json.dumps(bad_description))
    assert response.status_code == 422

    bad_calories = {
        "title": "test title",
        "description": "test description",
        "calories": None,
    }

    response = test_client.post("/items/", data=json.dumps(bad_calories))
    assert response.status_code == 422

    response = test_client.get("/items/")
    assert response.status_code == 200
    assert len(response.json()) == 0


def test_user_creation_success(test_client):
    john, jane = test_users

    response = test_client.post("/users/", data=json.dumps(john))
    assert response.status_code == 201
    assert response.json()["username"] == john["username"]
    assert response.json()["email"] == john["email"]

    response = test_client.post("/users/", data=json.dumps(jane))
    assert response.status_code == 201
    assert response.json()["username"] == jane["username"]
    assert response.json()["email"] == jane["email"]

    response = test_client.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) == 2


def test_user_creation_failure(test_client):
    bad_username = {"email": "test@mail.com", "password": "sample"}

    response = test_client.post("/users/", data=json.dumps(bad_username))
    assert response.status_code == 422

    bad_email = {"username": "name", "password": "sample"}

    response = test_client.post("/users/", data=json.dumps(bad_email))
    assert response.status_code == 422

    bad_password = {"username": "sample", "email": "test@mail.com"}

    response = test_client.post("/users/", data=json.dumps(bad_password))
    assert response.status_code == 422

    int_field = {"username": 0, "email": "test@mail.com", "password": "sample"}

    response = test_client.post("/users/", data=json.dumps(int_field))
    assert response.status_code == 422

    response = test_client.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) == 0
