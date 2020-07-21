#! /usr/bin/env python

import os
from .app import create_app, db
from .app.models import Role, User, Resource, ResourceCategory

from redis import Redis
from rq import Worker, Queue, Connection
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand

# Import settings from .env file
if os.path.exists('.env'):
    print("Importing environment from .env file")

    with open('env') as f:
        for line in f.readlines():
            var = line.strip().split('=')
            if len(var) == 2:
                os.environ[var[0]] = var[1]

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)

def make_shell_context():
    return dict(app=app, db=db, User=User, Role=Role)

manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    """
    Run unit tests

    :return: None
    """
    import unittest

    tests = unittest.TestLoader().discover("tests")
    unittest.TextTestRunner(verbosity=2).run(tests)


@manager.option('-n', '--number-users',
                default=10, type=int,
                help='Number of each model type to create',
                dest='number_users')
def add_fake_data(number_users):
    """
    Adds fake resources and users to the database

    :return: None
    """

    User.generate_fake(count=number_users)
    Resource.generate_fake()

def setup_general():
    """
    Runs the setup needed for both local development and production

    :return: None
    """
    Role.insert_roles()

@manager.command
def setup_dev():
    """
    Runs the setup needed for local developement

    :return: None
    """

    setup_general()

    admin_email = os.environ.get("ADMIN_EMAIL")
    if User.query.filter_by(email=admin_email).first() is None:
        User.create_confirmed_admin("Default", "Admin", admin_email, "password123")

@manager.command
def setup_prod():
    """
    Runs the setup needed for production

    :return: None
    """

    setup_general()

@manager.command
def run_worker():
    """
    Initalizes a slim rq task queue

    :return: None
    """

    listen = ['default']
    conn = Redis(host=app.config["RQ_DEFAULT_HOST"],
                 port=app.config["RQ_DEFUALT_PORT"],
                 db=0,
                 password=app.config["RQ_DEFAULT_PASSWORD"])

    with Connection(conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()


if __name__ == '__main__':
    manager.run()

