"""adding primary key to association table

Revision ID: db39229f922f
Revises: c2bf2dba90ac
Create Date: 2021-07-07 23:15:06.952982

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "db39229f922f"
down_revision = "c2bf2dba90ac"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("entry_items")
    op.add_column(
        "entry_to_item", sa.Column("id", sa.Integer(), primary_key=True, nullable=False)
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("entry_to_item", "id")
    op.create_table(
        "entry_items",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column("entry_id", sa.INTEGER(), autoincrement=False, nullable=True),
        sa.Column("item_id", sa.INTEGER(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(
            ["entry_id"], ["entries.id"], name="entry_items_entry_id_fkey"
        ),
        sa.ForeignKeyConstraint(
            ["item_id"], ["items.id"], name="entry_items_item_id_fkey"
        ),
        sa.PrimaryKeyConstraint("id", name="entry_items_pkey"),
    )
    # ### end Alembic commands ###
