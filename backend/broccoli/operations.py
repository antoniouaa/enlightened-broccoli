from typing import List

from sqlalchemy.orm import Session

from broccoli import models, schemas
from broccoli.security import get_password_hash


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    user_data = {**user.dict(), "hashed_password": hashed_password}
    del user_data["password"]
    db_user = models.User(**user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    db.query(models.User).filter(models.User.id == user_id).delete()
    db.commit()


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int):
    db.query(models.Item).filter(models.Item.id == item_id).delete()
    db.commit()


def get_entries(db: Session, user: schemas.User, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Entry)
        .filter(models.Entry.user_id == user.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_entry(db: Session, user: schemas.User):
    db_user = (
        db.query(models.User).filter(models.User.username == user.username).first()
    )
    db_entry = models.Entry(user_id=db_user.id)
    db_user.entries.append(db_entry)
    db.add(db_user)
    db.commit()
    db.refresh(db_entry)
    return db_entry


def update_entry(db: Session, entry_id: int, item_id: int, action: schemas.PatchAction):
    db_entry = db.query(models.Entry).get(entry_id)
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if action == "add":
        db_entry.items.append(db_item)
    elif action == "remove" and db_item in db_entry.items:
        db_entry.items.remove(db_item)
    db.add(db_entry)
    db.commit()


def get_items_by_entry_id(db: Session, entry_id: int):
    return db.query(models.Entry).get(entry_id).items
