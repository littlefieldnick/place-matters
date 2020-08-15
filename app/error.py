from flask import Blueprint, render_template

error_bp = Blueprint('error', __name__)

@error_bp.app_errorhandler(404)
def resource_not_found(e):
    return render_template("errors/404.html"), 404

