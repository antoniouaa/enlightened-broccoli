"""empty message

Revision ID: d6a6a542ab84
Revises: 3b3c7e99d5d3
Create Date: 2021-06-13 22:01:28.907133

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "d6a6a542ab84"
down_revision = "3b3c7e99d5d3"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("association")
    op.add_column(
        "entries", sa.Column("created_at", sa.DateTime(timezone=True), nullable=True)
    )
    op.add_column("entries", sa.Column("user_id", sa.Integer(), nullable=True))
    op.create_foreign_key(None, "entries", "users", ["user_id"], ["id"])
    op.drop_constraint("users_entry_id_fkey", "users", type_="foreignkey")
    op.drop_column("users", "entry_id")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "users", sa.Column("entry_id", sa.INTEGER(), autoincrement=False, nullable=True)
    )
    op.create_foreign_key(
        "users_entry_id_fkey", "users", "entries", ["entry_id"], ["id"]
    )
    op.drop_constraint(None, "entries", type_="foreignkey")
    op.drop_column("entries", "user_id")
    op.drop_column("entries", "created_at")
    op.create_table(
        "association",
        sa.Column("item_id", sa.INTEGER(), autoincrement=False, nullable=True),
        sa.Column("entry_id", sa.INTEGER(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(
            ["entry_id"], ["entries.id"], name="association_entry_id_fkey"
        ),
        sa.ForeignKeyConstraint(
            ["item_id"], ["items.id"], name="association_item_id_fkey"
        ),
    )
    # ### end Alembic commands ###