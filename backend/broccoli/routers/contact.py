from fastapi import APIRouter, Response

from broccoli import schemas

router = APIRouter()


@router.post("/", response_class=Response, status_code=204)
async def contact(contact_message: schemas.Contact):
    print(contact_message.dict())
