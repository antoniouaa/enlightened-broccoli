import os

import dotenv

dotenv.load_dotenv()

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from broccoli.app import create_app
from broccoli.db import Base, get_db


test_items = [
    {
        "title": "chicken thighs",
        "description": "delicious chicken thighs, high in fat",
        "calories": 150,
    },
    {"title": "milk", "description": "cold full fat milk", "calories": 60},
]

test_users = [
    {"username": "testuser1", "email": "testuser1@mail.com", "password": "sample1"},
    {"username": "testuser2", "email": "testuser2@mail.com", "password": "sample2"},
]


SQLALCHEMY_DATABASE_URL = os.getenv("TEST_DB_CONNECTION")
test_engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_db():
    try:
        test_db = TestSessionLocal()
        yield test_db
    finally:
        test_db.close()


app = create_app()
app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="function")
def test_client():
    Base.metadata.create_all(bind=test_engine)
    yield TestClient(app)
    Base.metadata.drop_all(bind=test_engine)
