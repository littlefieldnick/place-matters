const {models} = require("../database.js")
async function assignPermissionToRoles(createdRole, permissions, transaction){
    for (let perm of permissions) {
        if (perm.id) {
            let p = await models.permission.findAll({
                where: {
                    id: perm.id
                }
            }, {transaction})

            await createdRole.addPermission(p, {transaction});
        } else {
            let pCreated = await models.permission.create(perm, {transaction});
            await createdRole.addPermission(pCreated, {transaction});
        }
    }
}

module.exports = {assignPermissionToRoles}