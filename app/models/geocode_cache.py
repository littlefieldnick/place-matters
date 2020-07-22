from ..database import db
from sqlalchemy import Column, Integer, Float, String

class GeocoderCache(db.Model):
    """
    Cache results from address geocoding
    """
    __tablename__ = 'geocoder_cache'
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(500), index=True)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

