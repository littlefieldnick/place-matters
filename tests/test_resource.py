import unittest

from app import create_app, db
from app.models import Resource

class ResourceTest(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_fake_generation(self):
        Resource.generate_fake(count=1)
        r = Resource.query.all()

        self.assertEquals(len(r), 1)
        self.assertNotEqual(r[0].name, None)
        self.assertNotEqual(r[0].address, None)
        self.assertNotEqual(r[0].latitude, None)
        self.assertNotEqual(r[0].longitude, None)


if __name__ == '__main__':
    unittest.main()
