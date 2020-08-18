from flask_restful import Resource
from ..models import ResourceInfo

class ResourceInfoApi(Resource):
    def get(self, id=None):
        if id is None:
            resources = ResourceInfo.query.all()
            all_resources = []
            for re in resources:
                re = re.__dict__
                if '_sa_instance_state' in re:
                    del re['_sa_instance_state']
                all_resources.append(re)
            return all_resources

        resource = ResourceInfo.query.get(id)
        resource = resource.__dict__
        if '_sa_instance_state' in resource:
            del resource['_sa_instance_state']

        return resource
