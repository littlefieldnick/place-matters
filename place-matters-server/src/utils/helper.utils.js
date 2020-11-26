const {models} = require("../database.js")
async function assignPermissionToRoles(role, permissions, transaction){
    for (let perm of permissions) {
        if(perm.id){
            await role.addPermission(perm.id, {transaction});
        } else {
            let pCreated = await models.permission.create(perm, {transaction});
            await role.addPermission(pCreated, {transaction});
        }
    }
}

async function removePermissionFromRoles(role, permsToRemove, transaction){
    for (let perm of permsToRemove) {
        await role.removePermission(perm.id, {transaction});
    }
}
module.exports = {assignPermissionToRoles, removePermissionFromRoles}