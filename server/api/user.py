from flask import jsonify
from flask_restful import Resource
from flask_jwt_extended import  create_access_token
from flask_bcrypt import check_password_hash
from webargs.flaskparser import use_args, parser, abort

from ..models import User
from server.schemas import LoginSchema

class UserLogin(Resource):
    @use_args(LoginSchema())
    def post(self, args):
        # Produce JWT token, Validation is handled by webargs
        email = args["email"]
        password = args["password"]

        user_match = User.query.filter(User.email.like(email)).first()

        if not user_match:
            abort(403, errors="A user with the provided email does not exist.")

        print(check_password_hash(user_match.password_hash, password))
        if not check_password_hash(user_match.password_hash, password):
            abort(403, errors="Incorrect password provided.")

        # Identity can be any data that is json serializable
        access_token = create_access_token(identity=user_match.email)
        return jsonify({"token": access_token})


@parser.error_handler
def handle_request_parsing_error(err, req, schema, *, error_status_code, error_headers):
    """
    webargs error handler that uses Flask-RESTful's abort function to return
    a JSON error response to the client.
    """
    abort(error_status_code, errors=err.messages)









