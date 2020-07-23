from flask import Blueprint, render_template, jsonify, redirect, url_for, abort
from ..models import Resource

resource_bp = Blueprint('resource', __name__)

@resource_bp.route("/display")
def display_all_resources():
    resources = Resource.get_resources_as_dict()
    return render_template("resources/index.html", resources=resources)

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

