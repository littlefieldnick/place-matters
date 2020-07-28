from flask_wtf import FlaskForm
from app.models import ResourceCategory

from sqlalchemy.orm import load_only
from wtforms.fields import (SelectField, SubmitField, StringField)
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from app import db


def resource_category_choices():
    query = db.session.query(ResourceCategory).options(load_only('name')).all()
    return query


class ResourceSearchForm(FlaskForm):
    select = QuerySelectField("Select a category", query_factory=resource_category_choices)
    search = StringField()
    submit = SubmitField()