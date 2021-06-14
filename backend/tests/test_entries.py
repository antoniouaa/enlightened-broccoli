def test_entry_creation_unauthed(test_client_unauthed):
    response = test_client_unauthed.post("/entries/")
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"


def test_get_user_entries(test_client_authed):
    response = test_client_authed.get("/entries")
    assert response.status_code == 200
    assert response.json()[0]["id"] == 1
    assert response.json()[0]["user_id"] == 1
    assert "created_at" in response.json()[0]


def test_entry_creation_success(test_client_authed):
    response = test_client_authed.post("/entries/")
    assert response.status_code == 201
    assert "created_at" in response.json()
    assert response.json()["id"] == 2
    assert response.json()["user_id"] == 1
