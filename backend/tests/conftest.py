import pytest
from fastapi.testclient import TestClient

from broccoli import app

test_items = [
    {"title": "chicken thighs", "description": "delicious chicken thighs, high in fat"},
    {"title": "milk", "description": "cold full fat milk"},
]


@pytest.fixture(scope="function")
def client():
    client = TestClient(app)
    return client
