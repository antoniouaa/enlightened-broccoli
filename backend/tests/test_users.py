import json


def test_user_creation_success(test_client_unauthed, test_users):
    john, jane = test_users

    response = test_client_unauthed.post("/users/", data=json.dumps(john))
    assert response.status_code == 201
    assert response.json()["username"] == john["username"]
    assert response.json()["email"] == john["email"]

    response = test_client_unauthed.post("/users/", data=json.dumps(jane))
    assert response.status_code == 201
    assert response.json()["username"] == jane["username"]
    assert response.json()["email"] == jane["email"]

    response = test_client_unauthed.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) == 3


def test_user_creation_failure(test_client_unauthed):
    bad_username = {"email": "test@mail.com", "password": "sample"}

    response = test_client_unauthed.post("/users/", data=json.dumps(bad_username))
    assert response.status_code == 422

    bad_email = {"username": "name", "password": "sample"}

    response = test_client_unauthed.post("/users/", data=json.dumps(bad_email))
    assert response.status_code == 422

    bad_password = {"username": "sample", "email": "test@mail.com"}

    response = test_client_unauthed.post("/users/", data=json.dumps(bad_password))
    assert response.status_code == 422

    int_field = {"username": 0, "email": "test@mail.com", "password": "sample"}

    response = test_client_unauthed.post("/users/", data=json.dumps(int_field))
    assert response.status_code == 422

    response = test_client_unauthed.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_user_creation_duplicate(test_client_unauthed, test_users):
    john, _ = test_users

    response = test_client_unauthed.post("/users/", data=json.dumps(john))
    assert response.status_code == 201
    assert response.json()["username"] == john["username"]
    assert response.json()["email"] == john["email"]

    response = test_client_unauthed.post("/users/", data=json.dumps(john))
    assert response.status_code == 400
    assert response.json()["detail"] == "User already exists"
