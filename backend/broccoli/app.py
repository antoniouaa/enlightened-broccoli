import dotenv

dotenv.load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from broccoli.db import engine
from broccoli.models import Base
from broccoli.routers import items, users

Base.metadata.create_all(bind=engine)


def create_app():

    app = FastAPI()

    origins = ["http://localhost", "http://localhost:3000"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    async def index():
        return {"hello": "world"}

    app.include_router(items.router, tags=["items"], prefix="/items")
    app.include_router(users.router, tags=["users"], prefix="/users")

    return app
