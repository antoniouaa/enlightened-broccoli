from typing import List

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from broccoli import operations, schemas
from broccoli.db import get_db
from broccoli.security import (
    authenticate_user,
    create_access_token,
    Token,
    get_current_user,
)


router = APIRouter()


@router.post("/login", response_model=Token, status_code=201)
async def request_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = authenticate_user(
        db, username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username}, expires_delta=20)
    user = operations.get_user_by_username(db, username=user.username)
    return {"access_token": access_token, "token_type": "bearer", "user": user}


@router.get("/me", response_model=schemas.User, status_code=200)
async def read_me(
    db: Session = Depends(get_db), user: schemas.User = Depends(get_current_user)
):
    if user:
        return operations.get_user_by_username(db, username=user.username)
    raise HTTPException(status_code=401, detail="You are not logged in")


@router.get("/{user_name}", response_model=schemas.User, status_code=200)
async def read_user_by_email(user_name: str, db: Session = Depends(get_db)):
    db_user = operations.get_user_by_username(db, username=user_name)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/", response_model=List[schemas.User], status_code=200)
async def read_user_me(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = operations.get_users(db, skip=skip, limit=limit)
    return users


@router.post("/signup", response_model=schemas.User, status_code=201)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if operations.get_user_by_username(db, username=user.username) is None:
        return operations.create_user(db, user=user)
    raise HTTPException(status_code=400, detail="User already exists")


@router.delete("/{user_id}", status_code=204)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    operations.delete_user(db, user_id=user_id)
