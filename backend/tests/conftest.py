import os

import pytest
import dotenv
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from broccoli import app
from broccoli.db import Base, get_db

dotenv.load_dotenv()

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


@pytest.fixture(scope="function")
def client():
    SQLALCHEMY_DATABASE_URL = os.getenv("TEST_DB_CONNECTION")
    test_engine = create_engine(SQLALCHEMY_DATABASE_URL)
    TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

    def override_get_db():
        try:
            Base.metadata.create_all(bind=test_engine)
            test_db = TestSessionLocal()
            yield test_db
        finally:
            test_db.close()
            Base.metadata.drop_all(bind=test_engine)

    app.dependency_overrides[get_db] = override_get_db

    client = TestClient(app)
    yield client
