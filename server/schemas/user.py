from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Integer()
    first_name = fields.String(required=True, validate=[validate.Length(max=500)])
    last_name = fields.String(required=True, validate=[validate.Length(max=500)])
    email = fields.String(required=True, validate=[validate.Length(max=500)])

