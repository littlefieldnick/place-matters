from random import choice

from server import db
from .resource_category import ResourceCategory


class ResourceInfo(db.Model):
    """
    Basic schema for a resource
    """

    __tablename__ = 'resource'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), index=True)
    category_id = db.Column(db.Integer, db.ForeignKey('resource_categories.id'))
    category = db.relationship('ResourceCategory', backref=db.backref("resource"))
    address = db.Column(db.String(500))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    description = db.Column(db.String(500))
    website = db.Column(db.String(500))

    def __repr__(self):
        return '<Resource: {resource}>'.format(resource=self.name)

    @staticmethod
    def get_resources_as_dict():
        resources = ResourceInfo.query.all()
        resources_as_dicts = []
        for resource in resources:
            resource = resource.__dict__

            if '_sa_instance_state' in resource:
                del resource['_sa_instance_state']

            resources_as_dicts.append(resource)
        return resources_as_dicts

    @staticmethod
    def get_single_resource_as_dict(id):
        resource = ResourceInfo.query.get(id)
        if resource is not None:
            resource = resource.__dict__

            if '_sa_instance_state' in resource:
                del resource['_sa_instance_state']

        return resource

    @staticmethod
    def generate_fake(count=15, center_lat=43.6591, center_long=-70.2568):
        """
        Generate a number of fake api for testing

        :param count: number of fake api to make
        :param center_lat: center latitude for state
        :param center_long: center longitude for state
        :return: None
        """

        from sqlalchemy.exc import IntegrityError
        from faker import Faker
        from geopy.geocoders import Nominatim

        fake = Faker()
        geolocater = Nominatim(user_agent="place-matters")
        categories = ResourceCategory.query.all()
        for i in range(count):
            name = fake.name()

            # Generate places around Cumberland County, Maine
            latitude = str(fake.coordinate(
                center=center_lat,
                radius=0.20
            ))
            longitude = str(fake.coordinate(
                center=center_long,
                radius=0.20
            ))

            location = geolocater.reverse(latitude + ', ' + longitude)
            # Check to make sure a valid location is found
            if location.address is None:
                continue

            resource = ResourceInfo(name = name,
                                address = location.address,
                                category_id=choice(categories).id,
                                latitude = latitude,
                                longitude = longitude,
                                website=fake.url(),
                                description=fake.text())

            db.session.add(resource)

            try:
                db.session.commit()
            except IntegrityError:
                db.session.rollback()

    @staticmethod
    def print_resources():
        """
        Print list of all api

        :return: None
        """
        resources = ResourceInfo.query.all()
        for resource in resources:
            print(resource)
            print(resource.address)
            print(('(%s , %s)' % (resource.latitude, resource.longitude)))
