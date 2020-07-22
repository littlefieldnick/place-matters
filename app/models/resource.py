from app import db

class Resource(db.Model):
    """
    Basic schema for a resource

    TODO: Add descriptors and associations
    """

    __tablename__ = 'resources'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), index=True)
    address = db.Column(db.String(500))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    def __repr__(self):
        return '<Resource: {resource}>'.format(resource=self.name)

    @staticmethod
    def get_resources_as_dict():
        resources = Resource.query.fetchall()
        return resources.__dict__

    @staticmethod
    def generate_fake(count=15, center_lat=43.6591, center_long=-70.2568):
        """
        Generate a number of fake resources for testing

        :param count: number of fake resources to make
        :param center_lat: center latitude for state
        :param center_long: center longitude for state
        :return: None
        """

        from sqlalchemy.exc import IntegrityError
        from random import randint
        from faker import Faker
        from geopy.geocoders import Nominatim

        fake = Faker()
        geolocater = Nominatim(user_agent="place-matters")

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

            print(location)
            resource = Resource(name = name,
                                address = location.address,
                                latitude = latitude,
                                longitude = longitude)

            db.session.add(resource)

            try:
                db.session.commit()
            except IntegrityError:
                db.session.rollback()

    @staticmethod
    def print_resources():
        """
        Print list of all resources

        :return: None
        """
        resources = Resource.query.all()
        for resource in resources:
            print(resource)
            print((resource.address))
            print(('(%s , %s)' % (resource.latitude, resource.longitude)))
