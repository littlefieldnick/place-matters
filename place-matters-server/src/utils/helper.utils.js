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

async function assignRolesToUser(user, rolesToAdd, transaction){
    for (let role of rolesToAdd) {
        if(role.id){
            await user.addRole(role.id, {transaction});
        } else {
            let rCreated = await models.roles.create(role, {transaction});
            await user.addRole(rCreated, {transaction});
        }
    }
}

async function removeRolesFromUser(user, rolesToRemove, transaction){
    for (let role of rolesToRemove) {
        await user.removeRole(role.id, {transaction});
    }
}
module.exports = {assignPermissionToRoles, removePermissionFromRoles, assignRolesToUser, removeRolesFromUser}