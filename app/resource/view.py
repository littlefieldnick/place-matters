from flask import Blueprint, render_template, jsonify, redirect, url_for, abort, request
from flask_googlemaps import Map
from ..models import Resource, ResourceCategory
from ..forms import ResourceSearchForm
from sqlalchemy.orm import join
resource_bp = Blueprint('resource', __name__)

MAP_INFO_BOX = """
<h4>{resourcename}</h4>
<p>{address}</p>
<button class=btn btn-outline-primary>{cat}</button>
<br> <br>
<a href={url} class="btn btn-primary">More Information</a>
"""

def convert_resources_to_dict(resources):
    resources_as_dicts = []
    for resource in resources:
        resource = resource.__dict__
        resource["category"] = ResourceCategory.get_resource_category_name(resource["category_id"])

        if '_sa_instance_state' in resource:
            del resource['_sa_instance_state']

        resources_as_dicts.append(resource)
    return resources_as_dicts

def get_gmap(resources, lat=44.1912, lng=-70.1707):
    map = Map(identifier='map', lat=lat, lng=lng, zoom=15, style="height:85vh;", scale_control=True)

    if len(resources) == 0:
        return map

    map.build_markers([{"lat": re["latitude"],
                        "lng": re["longitude"],
                        "infobox": MAP_INFO_BOX.format(resourcename=re["name"],
                                                       address=re["address"],
                                                       cat= re["category"],
                                                       url=url_for("resource.display_resource", id = re["id"]))}
                       for re in resources])

    return map


@resource_bp.route("/search", methods=["POST"])
def search():
   category = request.form.get('category')
   name = request.form.get("name")
   resources = Resource.query

   if category:
       resources = resources.select_from(join(Resource, ResourceCategory))\
           .filter(ResourceCategory.name.like('%' + category + '%'))
   if name:
       resources = resources.filter(Resource.name.like('%' + name + '%'))

   # Ensure the search form contains the same input before searching
   search_form = ResourceSearchForm()
   cats = ResourceCategory.get_resource_categories_as_dict()
   search_form.category.choices = [cat["name"] for cat in cats]
   search_form.category.data = category
   search_form.name.data = name

   # Convert filtered resources to dict
   resources_as_dict = convert_resources_to_dict(resources.all())
   return render_template("resources/index.html", resources= resources_as_dict,
                                                  map = get_gmap(resources_as_dict),
                                                  form=search_form)

@resource_bp.route("/display")
def display_all_resources(resources=None):
    # No subset of resources to display, display all resources
    if resources is None:
        resources = convert_resources_to_dict(Resource.query.all())

    # Setup search form
    search_form = ResourceSearchForm()
    cats = ResourceCategory.get_resource_categories_as_dict()
    search_form.category.choices = [cat["name"] for cat in cats]
    print(resources)
    # Render page
    return render_template("resources/index.html",
                           resources=resources,
                           map=get_gmap(resources),
                           form=search_form)

@resource_bp.route("/display/<int:id>")
def display_resource(id):
    resource = Resource.get_single_resource_as_dict(id)

    if resource is None:
        abort(404)
        return redirect(url_for("resource.display_all_resources"))

    resource_category = ResourceCategory.query.get(resource["category_id"])
    resource["category"] = resource_category.name
    return render_template("resources/resource.html", resource=resource, map=get_gmap([resource]))

@resource_bp.route("/resources")
def get_resources():
    resources = Resource.get_resources_as_dict()
    return jsonify(resources)

