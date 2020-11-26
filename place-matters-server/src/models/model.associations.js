async function applyAssociations(sequelize){
    const {category, county, resource, user, role, permission} = sequelize.models

    //Foreign key for category
    resource.belongsTo(category);
    category.hasMany(resource);

    //Foreign key for County
    resource.belongsTo(county);
    county.hasMany(resource);

    role.belongsToMany(permission, {through: "role_permission"});
    permission.belongsToMany(role, {through: "role_permission"});

    user.belongsToMany(role, {through: "user_roles"})
    role.belongsToMany(user, {through: "user_roles"})
}

module.exports = {applyAssociations};