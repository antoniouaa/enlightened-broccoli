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
    item_id = entry_updates.item_id
    action = entry_updates.action
    operations.update_entry(db, entry_id=entry_id, item_id=item_id, action=action)
