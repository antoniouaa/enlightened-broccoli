def test_index(test_client_unauthed):
    response = test_client_unauthed.get("/")
    assert response.status_code == 200
    assert response.json() == {"hello": "world"}


def test_prepopulated_user(test_client_unauthed):
    response = test_client_unauthed.get("/users/")
    assert response.status_code == 200
    assert response.json()[0]["username"] == "antoniouaa"
    assert response.json()[0]["email"] == "antoniouaa@hotmail.com"
