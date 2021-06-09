from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.sql.schema import ForeignKey, Table

from broccoli.db import Base


association_table = Table(
    "association",
    Base.metadata,
    Column("item_id", Integer, ForeignKey("items.id")),
    Column("entry_id", Integer, ForeignKey("entries.id")),
)


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    calories = Column(Integer, nullable=False)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime(timezone=True), default=func.now())
    entry_id = Column(Integer, ForeignKey("entries.id"))
    entry = relationship("Entry", backref="users")


class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    items = relationship("Item", secondary=association_table, backref="entries")
