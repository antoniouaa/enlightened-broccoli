from fastapi import FastAPI

# from starlette.middleware.cors import CORSMiddleware

from broccoli.routers import items, users


app = FastAPI()


def create_app() -> FastAPI:
    app = FastAPI()  # title=PROJECT_NAME, debug=DEBUG, version=VERSION)
    # app.add_middleware(CORSMiddleware, allow_origins=ALLOWED_HOSTS or ["*"])

    @app.get("/")
    async def index():
        return {"hello": "world"}

    app.include_router(items.router, tags=["items"], prefix="/items")
    app.include_router(users.router, tags=["users"], prefix="/users")

    return app


app = create_app()
