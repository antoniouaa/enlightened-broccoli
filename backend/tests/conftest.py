import pytest
from fastapi.testclient import TestClient

from broccoli import create_app


@pytest.fixture(scope="function")
def client():
    client = TestClient(create_app())
    return client
