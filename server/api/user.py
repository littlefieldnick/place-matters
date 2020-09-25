from flask import jsonify
from flask_restful import Resource
from flask_jwt_extended import (create_access_token, jwt_required, create_refresh_token, jwt_refresh_token_required,
    get_jwt_identity)
from sqlalchemy.exc import IntegrityError
from webargs.flaskparser import use_args, parser, abort

from ..models import User
from .. import db

from server.schemas import UserSchema, LoginSchema, RegistrationSchema

user_schema = UserSchema()

class Users(Resource):
    @jwt_required
    def get(self):
        users = user_schema.dump(User.query.all(), many=True)
        return {"users": users}, 200

class UserLogin(Resource):
    @use_args(LoginSchema())
    def post(self, args):
        # Produce JWT token, Validation is handled by webargs
        email = args["email"]
        password = args["password"]

        user_match = User.query.filter(User.email.like(email)).first()

        if not user_match:
            abort(403, errors="A user with the provided email does not exist.")

        if not User.verify_password(password, user_match.password_hash):
            abort(403, errors="Incorrect password provided.")

        # Identity can be any data that is json serializable
        access_token = create_access_token(identity=user_match.email)
        refresh_token = create_refresh_token(identiy=user_match.email)
        return jsonify({"jwt_token": access_token, "refresh_token": refresh_token})

class UserRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user)
        return jsonify({"jwt_token": new_token})

class UserRegistration(Resource):
    @use_args(RegistrationSchema())
    def post(self, args):
        if User.query.filter(User.email.like(args["email"])).first():
            abort(403, err_messages=["A user with this email address already exists!"])

        usr = User(**args)
        print(usr)
        db.session.add(usr)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

@parser.error_handler
def handle_request_parsing_error(err, req, schema, *, error_status_code, error_headers):
    """
    webargs error handler that uses Flask-RESTful's abort function to return
    a JSON error response to the client.
    """
    abort(error_status_code, errors=err.messages)








