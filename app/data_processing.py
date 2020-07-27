import csv
import os
from sqlite3 import IntegrityError
from geopy.geocoders import GoogleV3
from app.models import Resource, ResourceCategory
from app import db, create_app
from app.database import init_db

app = create_app()
api_key = os.getenv("FLASK_GOOGLEMAPS_KEY")
geolocater = GoogleV3(api_key=api_key)

with app.app_context():

    init_db()

def read_csv(path):
    with open(path) as f:
        rows = []
        reader = csv.reader(f)
        for row in reader:
            rows.append(row)
    return rows

with app.app_context():
    rows = read_csv("../data/androscoggin_data.csv")
    unique_categories = set(x[1] for x in rows)
    for category in unique_categories:
        rc = ResourceCategory(name=category)
        db.session.add(rc)

        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

    for re in rows[1:]:
        address = "{street}, {city}, {state}, {zip}".format(street=re[2],
                                                            city=re[3],
                                                            state=re[4],
                                                            zip=re[5])
        loc = geolocater.geocode(address)

        # Cannot plot locations with no latitude or longitude coordinates
        if loc is None or loc.latitude is None or loc.longitude is None:
            continue

        re = Resource(name=re[0],
                      category_id=ResourceCategory.query.filter_by(name=re[1]).first().id,
                      address=address,
                      latitude=loc.latitude,
                      longitude=loc.longitude,
                      description=re[6],
                      website=re[7])

        db.session.add(re)

        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()