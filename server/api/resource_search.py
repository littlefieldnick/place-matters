from http import HTTPStatus
from flask_restful import Resource, reqparse
from sqlalchemy import join, and_, intersect

from ..models import ResourceInfo, ResourceCategory
from server.schemas import ResourceInfoSchema

resource_schema = ResourceInfoSchema()

parser = reqparse.RequestParser()
parser.add_argument('name', dest='name')
parser.add_argument('category', dest='category')

class ResourceInfoSearch(Resource):
    def get(self):
        args = parser.parse_args()

        name_res = None
        cat_res = None
        print(args.name, args.category)

        if args.name:
            name_res = ResourceInfo.query.filter(ResourceInfo.name.like('%' + args.name + '%'))
        if args.category:
            cat_res = ResourceInfo.query.select_from(join(ResourceInfo, ResourceCategory))\
                .filter(ResourceCategory.name.like('%' + args.category + '%'))

        if args.name is not None and args.category is not None:
            resources = name_res.intersect(cat_res)
            resources = resource_schema.dump(resources, many=True)
            return {'results': resources}, HTTPStatus.OK

        resources = name_res or cat_res
        resources = resource_schema.dump(resources, many=True)
        return {'results': resources}, HTTPStatus.OK


