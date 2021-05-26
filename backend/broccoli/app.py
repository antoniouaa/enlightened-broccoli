import dotenv

dotenv.load_dotenv()

from fastapi import FastAPI

from broccoli.db import engine
from broccoli.models import Base
from broccoli.routers import items, users

Base.metadata.create_all(bind=engine)


def create_app():

    app = FastAPI()

    @app.get("/")
    async def index():
        return {"hello": "world"}

    app.include_router(items.router, tags=["items"], prefix="/items")
    app.include_router(users.router, tags=["users"], prefix="/users")

    return app
