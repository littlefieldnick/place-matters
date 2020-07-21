import click
import os
from flask_sqlalchemy import SQLAlchemy
from flask.cli import with_appcontext

db = SQLAlchemy()

def recreate_db():
    db.drop_all()
    init_db()

def init_db():
    db.create_all()
    db.session.commit()

# CLI Commands for Database
@click.command('init-db')
@with_appcontext
def init_db_command():
    """
    Clear the existing data and create new tables
    :return: None
    """
    init_db()
    click.echo('Initialized the database.')

@click.command('recreate-db')
@with_appcontext
def recreate_db_command():
    recreate_db()
    click.echo("Recreated the database.")
