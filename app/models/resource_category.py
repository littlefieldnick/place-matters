from app import db


class ResourceCategory(db.Model):
    """
    Schema for categories associated with a resource
    """

    __tablename__ = 'resource_categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True)

    @staticmethod
    def get_resource_categories_as_dict():
        cats = ResourceCategory.query.all()
        cats_as_dicts = []
        for cat in cats:
            cat = cat.__dict__

            if '_sa_instance_state' in cat:
                del cat['_sa_instance_state']

            cats_as_dicts.append(cat)
        return cats_as_dicts

    @staticmethod
    def get_resource_category_name(id):
        return ResourceCategory.query.get(id).name

