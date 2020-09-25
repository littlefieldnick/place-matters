import os
from flask import Flask, render_template
from flask_restful import Api
from .config import Config
from .extensions import db, cors, jwt


def create_app():
    app = Flask(__name__, instance_relative_config=True, static_url_path="/")
    app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this to be set in config file!

    # Configure basic server
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

    # Configure server to serve front-end
    @app.route("/")
    def index():
        return render_template('index.html')

    return app

def configure_extensions(app):
    # Register database, CORS, and JWT
    cors.init_app(app)
    jwt.init_app(app)

    from server import models
    db.init_app(app)

def configure_api(app):
    from server.api import resource_info, resource_category, resource_search, user
    api = Api(app)

    api.add_resource(resource_info.ResourceInfoApi, "/resources/", "/resources/<int:id>")
    api.add_resource(resource_category.ResourceCategoryApi, "/categories/", "/categories/<int:id>")
    api.add_resource(resource_search.ResourceInfoSearch, "/resources/search")
    api.add_resource(user.Users, "/users/")
    api.add_resource(user.UserLogin, "/users/login")


def configure_cli(app):
    from server.cli.database import db_cli
    from server.cli.setup import setup_cli
    app.cli.add_command(db_cli)
    app.cli.add_command(setup_cli)

