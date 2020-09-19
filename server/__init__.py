import os
from flask import Flask, request, render_template, send_from_directory
from flask_restful import Api
from .config import Config
from .extensions import db, cors


def create_app():
    app = Flask(__name__, instance_relative_config=True, static_url_path="/")

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

    @app.route("/Maine_Boundaries_County_Polygon.kml")
    @app.route("/maine_androscoggin.kml")
    def serve_kml():
        return send_from_directory(app.static_folder, filename="kml/" + request.path[1:])

    # Configure server to serve front-end
    @app.route("/")
    def index():
        return render_template('index.html')

    return app

def configure_extensions(app):
    # Register database and setup CORS
    cors.init_app(app)

    from server import models
    db.init_app(app)

def configure_api(app):
    from server.api import resource_info, resource_category, resource_search
    api = Api(app)

    api.add_resource(resource_info.ResourceInfoApi, "/resources/", "/resources/<int:id>")
    api.add_resource(resource_category.ResourceCategoryApi, "/categories/", "/categories/<int:id>")
    api.add_resource(resource_search.ResourceInfoSearch, "/resources/search")

def configure_cli(app):
    from server.cli.database import db_cli
    from server.cli.setup import setup_cli
    app.cli.add_command(db_cli)
    app.cli.add_command(setup_cli)

