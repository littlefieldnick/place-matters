import os
from flask import Flask
from flask_restful import Api
from .config import Config
from .extensions import db, cors


def create_app():
    app = Flask(__name__, static_folder='static')

    # Configure basic app
    app.config.from_object(Config)
    app.config.from_mapping(
        SQLALCHEMY_DATABASE_URI='sqlite:///' + os.path.join(app.instance_path, Config.DB_NAME),
    )

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
    configure_api(app)
    return app

def configure_extensions(app):
    # Register database and setup CORS
    cors.init_app(app)
    from . import models
    db.init_app(app)

def configure_api(app):
    from app.api import resource_api, resource_category_api
    api = Api(app)

    api.add_resource(resource_api.ResourceInfoApi, "/resources", "/resources/<int:id>")
    api.add_resource(resource_category_api.ResourceCategoryApi, "/categories", "/categories/<int:id>")

def configure_cli(app):
    from app.cli.database import db_cli
    from app.cli.setup import setup_cli
    app.cli.add_command(db_cli)
    app.cli.add_command(setup_cli)

if __name__ == '__main__':
    app = create_app()
    app.run()
