from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Integer()
    first_name = fields.String()
    last_name = fields.String()
    email = fields.String()

class LoginSchema(Schema):
    email = fields.String(required=True, validate=[validate.Length(min=1, max=500)])
    password = fields.String(required=True, validate=[validate.Length(min=1, max=500)])

class RegistrationSchema(Schema):
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    password_hash = fields.String(required=True)