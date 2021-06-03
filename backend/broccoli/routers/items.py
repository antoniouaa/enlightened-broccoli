from broccoli.security import get_current_user
from typing import List

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from broccoli import operations, schemas
from broccoli.db import get_db
from broccoli.security import get_current_user

router = APIRouter()


@router.get("/", response_model=List[schemas.Item], status_code=200)
async def get_item(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return operations.get_items(db, skip=skip, limit=limit)


@router.post("/", response_model=schemas.Item, status_code=201)
async def create_item(
    item: schemas.ItemCreate,
    db: Session = Depends(get_db),
    user: schemas.User = Depends(get_current_user),
):
    if user:
        return operations.create_item(db, item=item)
    return HTTPException(status_code=401, detail="Not logged in")


@router.delete("/{item_id}", status_code=204)
async def delete_item(item_id: int, db: Session = Depends(get_db)):
    operations.delete_item(db, item_id=item_id)
