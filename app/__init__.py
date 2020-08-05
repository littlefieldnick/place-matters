import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .utils import register_template_utils
from flask_bootstrap import Bootstrap
from flask_googlemaps import GoogleMaps
from flask_cors import CORS

db = SQLAlchemy()

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True, static_folder='static')

    # Configure Bootstrap
    Bootstrap(app)

    # Enable CORS
    CORS(app)

    # Configure Google Maps
    GoogleMaps(app, key=os.getenv('FLASK_GOOGLEMAPS_KEY'))

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

    # Register map for all resources as index page
    app.add_url_rule('/', "resource.display_all_resources")

    # Error handling
    from .error import resource_not_found
    app.register_error_handler(404, resource_not_found)

    # Configure CLI commands
    from app.cli.database import db_cli
    from app.cli.setup import setup_cli
    app.cli.add_command(db_cli)
    app.cli.add_command(setup_cli)

    return app

