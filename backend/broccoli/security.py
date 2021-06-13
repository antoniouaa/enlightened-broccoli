import os
from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from broccoli.db import get_db
from broccoli.schemas import User


ACCESS_TOKEN_EXPIRY = 20
SECRET_KEY = os.getenv("SECRET_KEY", "secret key")
ALGORITHM = os.getenv("ALGORITHMS", "hs256")


class Token(BaseModel):
    access_token: str
    token_type: str
    user: User


class TokenData(BaseModel):
    username: Optional[str] = None


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plaintext, hashed):
    return pwd_context.verify(plaintext, hashed)


def get_password_hash(password):
    return pwd_context.hash(password)


from broccoli.operations import get_user_by_username


def authenticate_user(db: Session, username: str, password: str):
    db_user = get_user_by_username(db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User does not exist")
    if not verify_password(password, db_user.hashed_password):
        raise HTTPException(status_code=404, detail="Incorrect password")
    return db_user


def create_access_token(data: dict, expires_delta: int = ACCESS_TOKEN_EXPIRY):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_error = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_error
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_error
    user = get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_error
    return user
