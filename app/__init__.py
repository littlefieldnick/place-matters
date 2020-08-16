import os
from flask import Flask
from flask_restful import Api
from .config import Config
from .extensions import db, cors

def create_app():
    app = Flask(__name__, instance_relative_config=True, static_folder='static')

    # Configure basic app
    app.config.from_object(Config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Configure Extensions
    configure_extensions(app)

    # Configure CLI commands
    configure_cli(app)

    # Configure API
    return app

def configure_extensions(app):
    # Register CORS
    cors.init_app(app)

    # Register database
    from . import models
    db.init_app(app)

def configure_api(app):
    api = Api(app)

def configure_cli(app):

    from app.cli.database import db_cli
    from app.cli.setup import setup_cli
    app.cli.add_command(db_cli)
    app.cli.add_command(setup_cli)

if __name__ == '__main__':
    app = create_app()
    app.run()