from flask import Blueprint, render_template, jsonify
from ..models import Resource

resource_bp = Blueprint('resource', __name__)

@resource_bp.route("/display")
def display_all_resources():
    resources = Resource.get_resources_as_dict()
    return render_template("resources/index.html", resources=resources)

@resource_bp.route("/display/<int:id>")
def display_resource(id):
    resource = Resource.get_resources_as_dict()[id]
    return render_template("resources/resource.html", resource=resource)

@resource_bp.route("/resources")
def get_resources():
    resources = Resource.get_resources_as_dict()
    return jsonify(resources)

