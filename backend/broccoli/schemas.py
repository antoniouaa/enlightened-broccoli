import datetime
from typing import Optional

from pydantic import BaseModel, StrictStr


class ItemBase(BaseModel):
    title: StrictStr
    description: Optional[StrictStr] = "No description available."
    calories: int


class ItemCreate(ItemBase):
    ...


class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: StrictStr
    email: StrictStr


class UserCreate(UserBase):
    password: StrictStr


class User(UserBase):
    id: int
    created_at: datetime.datetime

    class Config:
        orm_mode = True
