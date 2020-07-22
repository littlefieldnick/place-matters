#! /usr/bin/env python

import os
from flask.cli import AppGroup
from app.models import User, Role

setup_cli = AppGroup('setup')

def import_env_settings():
    # Import settings from .env file
    if os.path.exists('.env'):
        print("Importing environment from .env file")

        with open('env') as f:
            for line in f.readlines():
                var = line.strip().split('=')
                if len(var) == 2:
                    os.environ[var[0]] = var[1]

@setup_cli.command('test')
def test():
    """
    Run unit tests

    :return: None
    """
    import unittest

    tests = unittest.TestLoader().discover("tests")
    unittest.TextTestRunner(verbosity=2).run(tests)


def setup_general():
    """
    Runs the setup needed for both local development and production

    :return: None
    """
    import_env_settings()
    Role.insert_roles()

@setup_cli.command('dev')
def setup_dev():
    """
    Runs the setup needed for local developement

    :return: None
    """

    setup_general()

    admin_email = os.environ.get("ADMIN_EMAIL")
    if User.query.filter_by(email=admin_email).first() is None:
        User.create_confirmed_admin("Default", "Admin", admin_email, "password123")

@setup_cli.command('prod')
def setup_prod():
    """
    Runs the setup needed for production

    :return: None
    """

    setup_general()



