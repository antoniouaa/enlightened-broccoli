import datetime
from typing import Optional

from pydantic import BaseModel, StrictStr


class ItemBase(BaseModel):
    title: str
    description: Optional[StrictStr] = "No description available."
    calories: int


class ItemCreate(ItemBase):
    ...


class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: str


class UserCreate(UserBase):
    password: str
    created_at: datetime.datetime


class User(UserBase):
    id: int

    class Config:
        orm_mode = True
