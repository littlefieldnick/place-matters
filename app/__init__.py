import os
from flask import Flask, render_template
from flask_nav import Nav
from flask_nav.elements import *
from flask_sqlalchemy import SQLAlchemy
from .utils import register_template_utils
from .assets import app_css, app_js, vendor_css, vendor_js
from flask_bootstrap import Bootstrap

db = SQLAlchemy()
nav = Nav()

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    # Configure Bootstrap
    Bootstrap(app)
    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI= 'sqlite:///' + os.path.join(app.instance_path, 'pm-dev.sqlite'),
        SQLALCHEMY_TRACK_MODIFICATIONS = False
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile(
            'config.py',
            silent=True
        )
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import models
    db.init_app(app)

    # Create App Blueprints
    from .resource.view import resource_bp as resource_blueprint
    app.register_blueprint(resource_blueprint)

    from .error import error_bp as error_blueprint
    app.register_blueprint(error_blueprint)
    # Setup navigation
    # registers the "top" menubar
    nav.register_element('top', Navbar("Place Matters Maine",
                                        View('Resources', 'resource.get_resources')))


    nav.init_app(app)

    # Configure CLI commands
    from .database import db_cli
    from setup import setup_cli
    app.cli.add_command(db_cli)
    app.cli.add_command(setup_cli)

    return app

