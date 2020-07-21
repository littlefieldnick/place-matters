from .role import Role, Permission
from flask import current_app
from flask_login import UserMixin, AnonymousUserMixin
from werkzeug.security import check_password_hash, generate_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import BadSignature, SignatureExpired

from .. import login_manager
from ..db import db


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    confirmed = db.Column(db.Boolean, default=False)
    first_name = db.Column(db.String(500), index=True)
    last_name = db.Column(db.String(500), index=True)
    email = db.Column(db.String(500), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))

    # TODO: Add CSV storage/containers for users

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.role is None:
            if self.email == current_app.config['ADMIN_EMAIL']:
                self.role = Role.query.filter_by(permissions=Permission.ADMINISTER).first()

            if self.role is None:
                self.role = Role.query.filter_by(default=True).first()

    def full_name(self):
        return '{firstname} {lastname}'.format(firstname=self.first_name,
                                               lastname=self.last_name)

    def can(self, permissions):
        return self.role is not None and (self.role.permissions & permissions) == permissions

    def is_admin(self):
        return self.can(Permission.ADMINISTER)

    @property
    def password(self):
        raise AttributeError('`password` is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def create_serializer(self, expiration):
        return Serializer(current_app.config["SECRET_KEY"], expiration)

    def generate_confirmation_token(self, expiration=604800):
        s = self.create_serializer(expiration)
        return s.dumps({'confirm': self.id})

    def generate_password_reset_token(self, expiration=3600):
        s = self.create_serializer(expiration)
        return s.dumps({"reset": self.id})

    def generate_email_change_token(self, new_email, expiration):
        s = self.create_serializer(expiration)
        return s.dumps({'change_email': self.id, 'new_email': new_email})

    def load_token(self, token, expiration=None):
        try:
            s = self.create_serializer(expiration=expiration)
            return s.loads(token)
        except(BadSignature, SignatureExpired):
            return None

    def confirm_account(self, token):
        data = self.load_token(token)

        if data is None or data.get('confirm') != self.id:
            return False

        self.confirmed = True
        db.session.add(self)
        db.session.commit()

        return True

    def change_email(self, token):
        data = self.load_token(token)

        if data is None or data.get('change_email') != self.id \
                or data.get('change_email') is None \
                or self.query.filter_by(email=data.get('change_email')).first() is not None:
            return False

        self.email = data.get('change_email')
        db.session.add(self)
        db.session.commit()

        return True

    def reset_password(self, token, new_password):
       data = self.load_token(token)

       if data is None or data.get('reset') != self.id:
           return False

       self.password = generate_password_hash(new_password)
       db.session.add(self)
       db.session.commit()

       return True

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

class AnonymousUser(AnonymousUserMixin):
    def can(self, _):
        return False

    def is_admin(self):
        return False

login_manager.anonymous_user = AnonymousUser

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))