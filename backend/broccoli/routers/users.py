from typing import List

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from broccoli import operations, schemas
from broccoli.db import get_db

router = APIRouter()


@router.get("/", response_model=List[schemas.User], status_code=200)
async def read_user_me(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = operations.get_users(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=schemas.User, status_code=201)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return operations.create_user(db, user=user)


@router.get("/{user_id}", response_model=schemas.User, status_code=200)
async def read_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = operations.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
