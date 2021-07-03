import datetime
from typing import Optional, List
from enum import Enum

from pydantic import BaseModel, StrictStr


class ItemBase(BaseModel):
    title: StrictStr
    description: Optional[StrictStr] = "No description available"
    calories: int


class ItemCreate(ItemBase):
    ...


class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True


class EntryBase(BaseModel):
    ...


class EntryCreate(EntryBase):
    ...


class EntryPatch(BaseModel):
    entry_id: int
    items: List[int]


class Entry(EntryBase):
    id: int
    created_at: datetime.datetime
    user_id: int
    items: List[Item]

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: StrictStr
    email: StrictStr


class Sex(str, Enum):
    male = "male"
    female = "female"


class Goal(str, Enum):
    lose = "lose"
    maintain = "maintain"
    gain = "gain"


class UserCreate(UserBase):
    password: StrictStr
    height: float
    weight: float
    age: int
    sex: Sex
    goal: Goal


class User(UserBase):
    id: int
    created_at: datetime.datetime
    height: float
    weight: float
    age: int
    sex: Sex
    goal: Goal

    class Config:
        orm_mode = True
        use_enum_values = True
