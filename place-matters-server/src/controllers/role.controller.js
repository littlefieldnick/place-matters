const db = require("../database.js")
const {assignPermissionToRoles, removePermissionFromRoles} = require("../utils/helper.utils.js")

function getAll(req, res) {
    db.models.role.findAll({include: [{model: db.models.permission}]}).then((data) => {
        res.status(200).json({data: data})
    }).catch((err) => {
        res.status(400).json({error: err.message || "An error occurred while retrieving the list of roles."})
    });
}

function getById(req, res) {
    const id = req.params.id;
    db.models.role.findByPk(id, {include: [{model: db.models.permission}]}).then((data) => {
        res.status(200).json({data: data});
    }).catch((err) => {
        res.status(400).json({error: "Could not find role with id: " + id})
    });
}

async function create(req, res) {
    let role = req.body
    if (role.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter was provided. An id is automatically created by the database."
            });

    } else {
        let transaction = await db.transaction();
        let createdRole = await db.models.role.create(role, {transaction}).catch(err => {
            res.status(500).json({
                message: err.message || "An error occurred while creating the role."
            })
        });

        if (req.body.permissions != undefined) {
            await assignPermissionToRoles(createdRole, req.body.permissions, transaction).catch((err) => {
                res.status(500).json({err: err.message || "An error occurred while setting permissions for the role provided."})
            })
        }

        await transaction.commit().then(() => {
            res.status(200).json({data: createdRole})
        }).catch(err => {
            res.status(500).json({err: err.message || "An unknown error occurred while trying to commit the role to the database."})
        })

    }
}

async function update(req, res) {
    let role = req.body;
    if (!role.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter needs to provided."
            });
    }

    await db.models.role.update(role, {
        where: {
            id: role.id
        },
        include: [{
            model: db.models.permission
        }]
    }).catch((err) => {
        res.status(500).json({error: err.message || "An unknown error occurred while updating role with id: " + role.id})
    })

    if (!role.permsToAdd && !role.permsToRemove) {
        res.status(200).json({success: true})
        return;
    }

    let updatedRole = await db.models.role.findOne({
        where: {
            id: role.id
        },
        include: [{
            model: db.models.permission
        }]
    });

    //Update permissions of role, if any
    let transaction = await db.transaction();
    await assignPermissionToRoles(updatedRole, role.permsToAdd, transaction).catch((err) => {
        res.status(500).json({error: err.message || "An error occurred while adding permission to role with id: " + role.id})
    })

    await removePermissionFromRoles(updatedRole, role.permsToRemove, transaction).catch((err) => {
        res.status(500).json({error: err.message || "An error occurred while removing permission to role with id: " + role.id})
    })

    await transaction.commit().then(() => {
        res.status(200).json({success: true})
    }).catch((err) => {
        res.status(500).json({error: err.message || "An unknown error occurred while removing permissions."})
    })
}

async function deleteRole(req, res) {
    let id = req.params.id;

    if (!id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter needs to provided."
            });

        return;
    }

    db.models.role.destroy({
        where: {
            id: id
        }
    }).then((deleted) => {
        res.status(200).json({success:true, deleted: deleted})
    }).catch((err) => {
        res.status(500).json({error: err.message || "An error occurred deleting a role with id: " + id})
    });
}

module.exports = {
    getAll, getById, create, update, deleteRole
}