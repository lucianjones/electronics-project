from flask import Blueprint
from flask_login import login_required
from app.models import Project

projects_routes = Blueprint("projects", __name__)


@projects_routes.route("/")
def projects():
    projects = Project.query.all()
    return [project.to_dict() for project in projects]


@projects_routes.route("/<int:id>")
def project(id):
    project = Project.query.get(id)
    return project.to_dict()


@login_required
@projects_routes.route("/projects/new", methods=["POST"])
def new_project():
    pass
