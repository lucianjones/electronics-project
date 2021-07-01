from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    id = field.data
    user = User.query.get(id)
    if not user:
        raise ValidationError("User does not exist")


class ProjectForm(FlaskForm):
    name = StringField("email", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired(), user_exists])
