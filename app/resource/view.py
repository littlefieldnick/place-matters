from flask import Blueprint, url_for, render_template, jsonify
from ..models import Resource

resource_bp = Blueprint('resource', __name__)

@resource_bp.route("/display")
def display_resources():
    resources = Resource.get_resources_as_dict()
    return render_template("resources/display.html", resources=resources)


@resource_bp.route("/resources")
def get_resources():
    resources = Resource.get_resources_as_dict()
    return jsonify(resources)

