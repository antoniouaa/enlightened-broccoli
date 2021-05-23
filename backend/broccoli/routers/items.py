from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_item():
    return {"item_name": "apple"}
