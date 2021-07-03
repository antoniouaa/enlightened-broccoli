from broccoli.security import get_current_user
from typing import List

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Response

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
        return operations.get_entries(db, user=user, skip=skip, limit=limit)
    raise HTTPException(status_code=401, detail="You are not logged in")


@router.post("/", response_model=schemas.Entry, status_code=201)
async def create_entry(
    db: Session = Depends(get_db), user: schemas.User = Depends(get_current_user)
):
    if user:
        return operations.create_entry(db, user=user)
    raise HTTPException(status_code=401, detail="You are not logged in")


@router.patch("/", response_class=Response, status_code=204)
async def update_entry(
    entry_updates: schemas.EntryPatch,
    db: Session = Depends(get_db),
    user: schemas.User = Depends(get_current_user),
):
    if not user:
        raise HTTPException(status_code=401, detail="You are not logged in")

    entry_id = entry_updates.entry_id
    items = entry_updates.items
    operations.update_entry(db, entry_id=entry_id, items=items)


@router.get("/{entry_id}/items", response_model=List[schemas.Item], status_code=200)
async def get_items_by_entry_id(
    entry_id: int,
    db: Session = Depends(get_db),
    user: schemas.User = Depends(get_current_user),
):
    if user:
        return operations.get_items_by_entry_id(db, entry_id=entry_id)
    raise HTTPException(status_code=401, detail="You are not logged in")
