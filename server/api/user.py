from http import HTTPStatus

from flask_restful import Resource
from webargs import fields
from flask_jwt_extended import (
    jwt_required, create_access_token, get_jwt_identity
)

from webargs.flaskparser import use_args

from ..models import User
from server.schemas import UserSchema

user_schema = UserSchema()
class UserLogin(Resource):
    @use_args({"username": fields.Str(required=True),
               "password": fields.Str(required=True)},
              location="json")
    def post(self, args):
        return {"username": args["username"], "password": args["password"]}





