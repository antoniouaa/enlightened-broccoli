from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.sql.schema import ForeignKey, Table

from broccoli.db import Base


# TODO: Allow duplicates in database
# So far duplicates are not allowed in the database
# even though their model has a primary key to
# uniquely identify them.
# This is a test to see if it updates


association_table = Table(
    "entry_to_item",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("entry_id", Integer, ForeignKey("entries.id")),
    Column("item_id", Integer, ForeignKey("items.id")),
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime(timezone=True), default=func.now())
    height = Column(Float)
    weight = Column(Float)
    age = Column(Integer)
    sex = Column(String)
    goal = Column(String)
    entries = relationship("Entry", backref="user")


class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime(timezone=True), default=func.now())
    user_id = Column(Integer, ForeignKey("users.id"))
    items = relationship("Item", secondary=association_table, backref="entry")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    calories = Column(Integer, nullable=False)
