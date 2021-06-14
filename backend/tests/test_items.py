def test_item_creation_success(test_client_authed, test_items):
    chicken, milk = test_items

    response = test_client_authed.post("/items/", json=chicken)
    assert response.status_code == 201
    assert response.json()["title"] == "chicken"

    response = test_client_authed.post("/items/", json=milk)
    assert response.status_code == 201
    assert response.json()["title"] == "milk"


def test_item_creation_no_description(test_client_authed):
    no_description = {"title": "test title", "calories": 0}

    response = test_client_authed.post("/items/", json=no_description)
    assert response.status_code == 201
    assert response.json()["description"] == "No description available"


def test_item_creation_failure(test_client_authed):
    bad_title = {"title": None, "description": "test", "calories": 0}

    response = test_client_authed.post("/items/", json=bad_title)
    assert response.status_code == 422

    bad_description = {"title": "test title", "description": 10, "calories": 0}

    response = test_client_authed.post("/items/", json=bad_description)
    assert response.status_code == 422

    bad_calories = {
        "title": "test title",
        "description": "test description",
        "calories": None,
    }

    response = test_client_authed.post("/items/", json=bad_calories)
    assert response.status_code == 422

    response = test_client_authed.get("/items/")
    assert response.status_code == 200
    assert len(response.json()) == 0


def test_item_creation_unauthed(test_client_unauthed, test_items):
    chicken, milk = test_items

    response = test_client_unauthed.post("/items/", json=chicken)
    assert response.status_code == 401

    response = test_client_unauthed.post("/items/", json=milk)
    assert response.status_code == 401
