import json

from tests.conftest import test_items


def test_item_deletion_success(test_client):
    chicken, milk = test_items

    response = test_client.post("/items/", data=json.dumps(chicken))
    assert response.status_code == 201
    assert response.json()["title"] == "chicken"

    response = test_client.post("/items/", data=json.dumps(milk))
    assert response.status_code == 201
    assert response.json()["title"] == "milk"

    response = test_client.delete("/items/1")
    assert response.status_code == 204

    response = test_client.get("/items/")
    assert len(response.json()) == 1
    assert response.json()[0]["title"] == "milk"
