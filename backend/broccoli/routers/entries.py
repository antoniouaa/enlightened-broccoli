from broccoli.security import get_current_user
from typing import List

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from broccoli import operations, schemas
from broccoli.db import get_db
from broccoli.security import get_current_user

router = APIRouter()


@router.get("/", response_model=List[schemas.Entry], status_code=200)
async def get_entries(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    user: schemas.User = Depends(get_current_user),
):
    if user:
        return operations.get_entries(db, skip=skip, limit=limit)
    raise HTTPException(status_code=401, detail="You are not logged in")


@router.post("/", response_model=schemas.Entry, status_code=201)
async def create_entry(
    entry: schemas.EntryCreate,
    db: Session = Depends(get_db),
    user: schemas.User = Depends(get_current_user),
):
    if user:
        operations.create_entry(db, entry=entry)
    raise HTTPException(status_code=401, detail="You are not logged in")
