from ..db import db


class ResourceCategory(db.Model):
    """
    Schema for categories associated with a resource
    """

    __tablename__ = 'resource_categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True)