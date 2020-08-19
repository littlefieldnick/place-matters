from http import HTTPStatus
from flask_restful import Resource
from ..models import ResourceInfo
from app.schemas import ResourceInfoSchema

resource_schema = ResourceInfoSchema()

class ResourceInfoApi(Resource):
    def get(self, id=None):
        if id is None:
            resources = resource_schema.dump(ResourceInfo.query.all(), many=True)
            return {'resources': resources}, HTTPStatus.OK

        resource = resource_schema.dump(ResourceInfo.query.get(id))
        return {'resource': resource}, HTTPStatus.OK
