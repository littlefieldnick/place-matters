from flask_restful import Resource
from ..models import ResourceCategory
from ..schemas import ResourceCategorySchema
from http import HTTPStatus

category_schema = ResourceCategorySchema()

class ResourceCategoryApi(Resource):
    def get(self, id=None):
        if id is None:
            result = category_schema.dump(ResourceCategory.query.all(), many=True)
            return {'categories': result}, HTTPStatus.OK

        result = category_schema.dump(ResourceCategory.query.get(id))
        return {'category': result}, HTTPStatus.OK
