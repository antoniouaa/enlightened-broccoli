def test_entry_creation_unauthed(test_client_unauthed):
    response = test_client_unauthed.post("/entries/")
    assert response.status_code == 401

    data = response.json()
    assert data["detail"] == "Not authenticated"


def test_get_user_entries(test_client_authed):
    response = test_client_authed.get("/entries/")
    assert response.status_code == 200

    data = response.json()
    assert data[0]["id"] == 1
    assert data[0]["user_id"] == 1
    assert "created_at" in data[0]
    assert "items" in data[0]


def test_entry_creation_success(test_client_authed):
    response = test_client_authed.post("/entries/")
    assert response.status_code == 201

    data = response.json()
    assert data["id"] == 2
    assert data["user_id"] == 1
    assert "created_at" in data
