import dotenv
import os

dotenv.load_dotenv()

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from broccoli import create_app
from broccoli.db import get_db
from broccoli.models import Base, User, Entry
from broccoli.security import get_current_user


@pytest.fixture(scope="function")
def test_items():
    return [
        {
            "title": "chicken",
            "description": "delicious chicken thighs, high in fat",
            "calories": 150,
        },
        {"title": "milk", "description": "cold full fat milk", "calories": 60},
    ]


@pytest.fixture(scope="function")
def test_users():
    return [
        {"username": "john", "email": "john@mail.com", "password": "sample1"},
        {"username": "jane", "email": "jane@mail.com", "password": "sample2"},
    ]


@pytest.fixture(scope="function")
def db_user():
    return {
        "username": "antoniouaa",
        "email": "antoniouaa@hotmail.com",
        "hashed_password": "some_hashed_string",
    }


SQLALCHEMY_DATABASE_URL = os.getenv("TEST_DB_CONNECTION")
test_engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_current_user():
    authed_user = {
        "username": "antoniouaa",
        "email": "antoniouaa@hotmail.com",
        "hashed_password": "some_hashed_string",
    }
    return User(**authed_user)


def override_get_db():
    test_db = TestSessionLocal()
    try:
        user = override_get_current_user()
        test_db.add(user)
        test_db.commit()
        test_db.refresh(user)

        test_db.add(Entry(user_id=user.id))
        test_db.commit()
        yield test_db
    except:
        test_db = TestSessionLocal()
        yield test_db
    finally:
        test_db.close()


app = create_app()
Base.metadata.create_all(bind=test_engine)


@pytest.fixture(scope="function")
def test_client_authed(db_user):
    app.dependency_overrides = {
        get_current_user: override_get_current_user,
        get_db: override_get_db,
    }
    Base.metadata.create_all(bind=test_engine)
    with TestClient(app) as test_client:
        response = test_client.post("/users/", data=db_user)
        response.status_code == 201
        yield test_client
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture(scope="function")
def test_client_unauthed(db_user):
    app.dependency_overrides = {get_db: override_get_db}
    Base.metadata.create_all(bind=test_engine)
    with TestClient(app) as test_client:
        response = test_client.post("/users/", data=db_user)
        response.status_code == 201
        yield test_client
    Base.metadata.drop_all(bind=test_engine)
