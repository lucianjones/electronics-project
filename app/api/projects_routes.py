from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Project, db
from app.forms import ProjectForm

projects_routes = Blueprint("projects", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@projects_routes.route("/")
def projects():
    projects = Project.query.all()
    return {"projects": [project.to_dict() for project in projects]}


@projects_routes.route("/<int:id>")
def project(id):
    project = Project.query.get(id)
    return project.to_dict()


@login_required
@projects_routes.route("/new", methods=["POST"])
def new_project():
    form = ProjectForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        project = Project(name=form.data["name"], user_id=form.data["user_id"])
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@login_required
@projects_routes.route("/<int:id>", methods=["PUT"])
def put_project(id):
    current_id = current_user.get_id()
    print(current_id)
    form = ProjectForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    project = Project.query.get(id)
    if form.validate_on_submit():
        if current_id != project.user_id:
            return {"errors": "Not Authorized"}, 401
        project.name = form.data["name"]
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@login_required
@projects_routes.route("/<int:id>", methods=["DELETE"])
def delete_project(id):
    current_id = current_user.get_id()
    current_id = 1
    project = Project.query.get(id)
    print(project)
    if current_id == project.user_id:
        db.session.delete(project)
        db.session.commit()
        return project.to_dict()
    return {"errors": "Not Authorized"}, 401
