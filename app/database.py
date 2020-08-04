import click
from flask.cli import AppGroup, with_appcontext
from .models import User, Resource, ResourceCategory
from . import db

db_cli = AppGroup('database')

def recreate_db():
    db.drop_all()
    init_db()

def init_db():
    db.create_all()
    db.session.commit()

# CLI Commands for Database
@db_cli.command('init')
def init_db_command():
    """
    Clear the existing data and create new tables
    :return: None
    """
    init_db()
    click.echo('Initialized the database.')

@db_cli.command('recreate')
def recreate_db_command():
    recreate_db()
    click.echo("Recreated the database.")

@db_cli.command('fake-data')
def add_fake_data(number_users=15):
    """
    Adds fake resources and users to the database

    :return: None
    """

    User.generate_fake(count=number_users)
    ResourceCategory.generate_fake()
    Resource.generate_fake()
