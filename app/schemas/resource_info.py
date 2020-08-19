from marshmallow import Schema, fields, validate
from app.schemas import ResourceCategorySchema

class ResourceInfoSchema(Schema):
    name = fields.String(required=True, validate=[validate.Length(max=500)])
    category = fields.Nested(ResourceCategorySchema, required=True)
    address = fields.String(required=True, validate=[validate.Length(max=500)])
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    description = fields.String(required=True, validate=[validate.Length(max=500)])
    website = fields.String(required=True, validate=[validate.Length(max=500)])
