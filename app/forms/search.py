from flask_wtf import FlaskForm
from wtforms.fields import (SelectField, SubmitField, StringField)


class ResourceSearchForm(FlaskForm):
    choices = []
    category = SelectField("Category", choices=choices)
    name = StringField("Name", description="Search by name")
    submit = SubmitField()