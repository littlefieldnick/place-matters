from flask_restful import Resource
from ..models import ResourceCategory

class ResourceCategoryApi(Resource):
    def get(self, id=None):
        if id is None:
            cats = ResourceCategory.query.all()
            all_cats = []
            for c in cats:
                c = c.__dict__
                if '_sa_instance_state' in c:
                    del c['_sa_instance_state']
                all_cats.append(c)
            return all_cats

        cat = ResourceCategory.query.get(id)
        cat = cat.__dict__
        if '_sa_instance_state' in cat:
            del cat['_sa_instance_state']

        return cat
