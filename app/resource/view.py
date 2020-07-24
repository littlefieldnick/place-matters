from flask import Blueprint, render_template, jsonify, redirect, url_for, abort
from flask_googlemaps import Map
from ..models import Resource

resource_bp = Blueprint('resource', __name__)

@resource_bp.route("/display")
def display_all_resources():
    resources = Resource.get_resources_as_dict()

    map = Map(identifier='map',
              lat = resources[0]["latitude"],
              lng = resources[0]["longitude"],
              style="height:85vh;",
              scale_control= True,
              markers=[{"lat": re["latitude"],
                        "lng": re["longitude"]}
                       for re in resources])

    return render_template("resources/index.html", resources=resources, map=map)

@resource_bp.route("/display/<int:id>")
def display_resource(id):
    resource = Resource.get_single_resource_as_dict(id)

    if resource is None:
        abort(404)
        return redirect(url_for("resource.display_all_resources"))

    return render_template("resources/resource.html", resource=resource)


@resource_bp.route("/resources")
def get_resources():
    resources = Resource.get_resources_as_dict()
    return jsonify(resources)

