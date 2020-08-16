INSTANCE_PATH = 'instance/pm-dev.sqlite'

class Config:
    DEBUG = True
    SECRET_KEY = 'dev'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + INSTANCE_PATH
    SQLALCHEMY_TRACK_MODIFICATIONS = False
