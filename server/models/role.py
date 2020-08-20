from server import db

class Permission:
    ADMINISTER = 0x01

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    index = db.Column(db.String(64))
    default = db.Column(db.Boolean, default=False, index=True)
    permissions = db.Column(db.Integer)
    users = db.relationship('User', backref='role', lazy='dynamic')

    @staticmethod
    def insert_roles():
        roles = {'Administer': {"permissions": Permission.ADMINISTER,
                                  "index": 'admin',
                                  "default": False}}

        for r in roles:
            role = Role.query.filter_by(name=r).first()

            if role is None:
                role = Role(name=r)

            role.permissions = roles[r]["permissions"]
            role.index = roles[r]["index"]
            role.default = roles[r]["default"]
            db.session.add(role)

        db.session.commit()

    def __repr__(self):
        return '<Role: {rolename}'.format(rolename=self.name)