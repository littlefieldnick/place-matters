from flask import Blueprint, render_template, jsonify, redirect, url_for, abort
from flask_googlemaps import Map
from ..models import Resource, ResourceCategory

resource_bp = Blueprint('resource', __name__)

MAP_INFO_BOX = """
<h4>{resourcename}</h4>
<p>{address}</p>
<a href='{{ url_for('resource.display_resource', id={id} }}' class='btn btn-primary'>More Information</a>
"""

@resource_bp.route("/display")
def display_all_resources():
    resources = Resource.get_resources_as_dict()

    map = Map(identifier='map',
              lat = resources[0]["latitude"],
              lng = resources[0]["longitude"],
              zoom=15,
              style="height:85vh;",
              scale_control=True,
              markers=[{"lat": re["latitude"],
                        "lng": re["longitude"],
                        "infobox": MAP_INFO_BOX.format(resourcename=re["name"], address=re["address"], id=re["id"])}
                       for re in resources])

    return render_template("resources/index.html", resources=resources, map=map)

@resource_bp.route("/display/<int:id>")
def display_resource(id):
    resource = Resource.get_single_resource_as_dict(id)

    if resource is None:
        abort(404)
        return redirect(url_for("resource.display_all_resources"))

    resource_category = ResourceCategory.query.get(resource["category_id"])
    resource["resource_cat"] = resource_category.name
    map = Map(identifier='map',
        lat=resource["latitude"],
        lng=resource["longitude"],
        zoom=15,
        style="height:50vh;",
        scale_control=True,
        markers=[{"lat": resource["latitude"],
                  "lng": resource["longitude"],
                  "maxWidth": 30}])
    return render_template("resources/resource.html", resource=resource, map=map)

@resource_bp.route("/resources")
def get_resources():
    resources = Resource.get_resources_as_dict()
    return jsonify(resources)

