import os
import click
from flask import Flask
from flask_login import LoginManager

from config import config
from .db import db, init_db_command, recreate_db_command
from .utils import register_template_utils
from .assets import app_css, app_js, vendor_css, vendor_js

# Setup Flask-Login
login_manager = LoginManager()

login_manager.session_protection = 'basic'
login_manager.login_view = 'account.login'

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI= 'sqlite:///' + os.path.join(app.instance_path, 'flaskr.sqlite'),
        SQLALCHEMY_TRACK_MODIFICATIONS = False
    )

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    db.init_app(app)

    login_manager.init_app(app)

    # Register Jinja template functions
    register_template_utils(app)

    # Configure SSL if platform supports it
    if not app.debug and not app.testing and not app.config['SSL_DISABLE']:
        SSLify(app)

    # TODO: Create App Blueprints
    from . import main
    app.register_blueprint(main.bp)

    # Configure CLI commands
    app.cli.add_command(init_db_command)
    app.cli.add_command(recreate_db_command)

    return app
