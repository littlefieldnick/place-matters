import os
from flask import Flask
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_assets import Environment
from flask_wtf import CSRFProtect
from flask_compress import Compress
from flask_rq import RQ
from flask_sslify import SSLify

from config import config
from .utils import register_template_utils
from .assets import app_css, app_js, vendor_css, vendor_js

mail = Mail()
db = SQLAlchemy()
csrf = CSRFProtect()
compress = Compress()

# Setup Flask-Login
login_manager = LoginManager()

login_manager.session_protection = 'basic'
login_manager.login_view = 'account.login'

basedir = os.path.abspath(os.path.dirname(__file__))

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)

    # Set up extensions
    mail.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)
    compress.init_app(app)
    RQ(app)

    # Register Jinja template functions
    register_template_utils(app)

    # Set up asset pipeline
    assets_env = Environment(app)
    dirs = ['assets/styles', 'assets/scripts']
    for path in dirs:
        assets_env.append_path(os.path.join(basedir, path))
    assets_env.url_expire = True

    assets_env.register('app_css', app_css)
    assets_env.register('app_js', app_js)
    assets_env.register('vendor_css', vendor_css)
    assets_env.register('vendor_js', vendor_js)

    # Configure SSL if platform supports it
    if not app.debug and not app.testing and not app.config['SSL_DISABLE']:
        SSLify(app)

    # TODO: Create App Blueprints

    return app
