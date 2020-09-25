from .role import Role, Permission
from flask import current_app
from passlib.hash import pbkdf2_sha256 as sha256


from . import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    confirmed = db.Column(db.Boolean, default=False)
    first_name = db.Column(db.String(500), index=True)
    last_name = db.Column(db.String(500), index=True)
    email = db.Column(db.String(500), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)

    def full_name(self):
        return '{firstname} {lastname}'.format(firstname=self.first_name,
                                               lastname=self.last_name)
    @staticmethod
    def generate_hash(pwd):
        return sha256.hash(pwd)

    @staticmethod
    def verify_password(pwd, hash):
        return sha256.verify(pwd, hash)

    @staticmethod
    def generate_fake(count=15, **kwargs):
        from sqlalchemy.exc import IntegrityError
        from random import seed, choice
        from faker import Faker

        fake = Faker()
        roles = Role.query.all()
        seed()

        for i in range(count):
            u = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                password=fake.password(),
                confirmed=True,
                role=choice(roles),
                **kwargs
            )
            db.session.add(u)
            try:
                db.session.commit()
            except IntegrityError:
                db.session.rollback()

    @staticmethod
    def create_confirmed_admin(first_name, last_name, email, password):
        """Create a confirmed admin with the given input properties."""
        from sqlalchemy.exc import IntegrityError
        print(password)
        u = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            confirmed=True,
            role=Role.query.filter_by(
                permissions=Permission.ADMINISTER).first()
        )

        db.session.add(u)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

    def __repr__(self):
        return '<User {name}>'.format(name=self.full_name())