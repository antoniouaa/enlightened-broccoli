from typing import List

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from broccoli import operations, schemas
from broccoli.db import get_db

router = APIRouter()


@router.get("/", response_model=List[schemas.Item], status_code=200)
async def get_item(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = operations.get_items(db, skip=skip, limit=limit)
    return items


@router.post("/", response_model=schemas.Item, status_code=201)
async def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return operations.create_item(db, item=item)
