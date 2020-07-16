import os
import urllib.parse
import logging, sys
from logging.handlers import SMTPHandler

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    APP_NAME = 'PlaceMattersMaine'
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'SjefBOa$1FgGco0SkfPO392qqH9%a492'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True

    MAIL_SERVER = ''
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")

    ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL")
    EMAIL_SUBJECT_PREFIX = '[{}]'.format(APP_NAME)
    EMAIL_SENDER = '{app_name} Admin <{email}'.format(app_name = APP_NAME, email=ADMIN_EMAIL)

    REDIS_URL = os.getenv('REDISTOGO_URL') or 'http://localhost:5000'

    # Parse the REDIS_URL to set RQ config variables
    urllib.parse.uses_netloc.append('redis')
    url = urllib.parse.urlparse(REDIS_URL)

    RQ_DEFAULT_HOST = url.hostname
    RQ_DEFAULT_PORT = url.port
    RQ_DEFAULT_PASSWORD = url.password
    RQ_DEFAULT_DB = 0

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    ASSETS_DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
                              'sqlite:///' + os.path.join(basedir, 'data-dev.sqlite')


config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}