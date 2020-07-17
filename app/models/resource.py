from .. import db

class Resource(db.Model):
    """
    Basic schema for a resource

    TODO: Add descriptors and associations
    """

    __tablename__ = 'resources'
    name = db.Column(db.String(500), index=True)
    address = db.Column(db.String(500))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    def __repr__(self):
        return '<Resource: {resource}>'.format(resource=self.name)