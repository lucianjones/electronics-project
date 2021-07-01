from flast_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ProjectForm(FlaskForm):
    name = StringField("email", validators=[DataRequired()])
