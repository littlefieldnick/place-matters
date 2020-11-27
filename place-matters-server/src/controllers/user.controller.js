let db = require("../database");
const {assignRolesToUser, removeRolesFromUser} = require("../utils/helper.utils.js")

function getAll(req, res) {
    db.models.user.findAll({include: [
            {
                model: db.models.role,
                include: [{
                    model: db.models.permission
                }]
            }
        ]
    }).then((data) => {
        res.status(200).json({data: data})
    }).catch((err) => {
        res.status(400).json({error: err.message || "An error occurred while retrieving the list of roles."})
    });
}

function getById(req, res) {
    const id = req.params.id;
    db.models.user.findByPk(id, {include: [
            {
                model: db.models.role,
                include: [{
                    model: db.models.permission
                }]
            }
        ]
    }).then((data) => {
        res.status(200).json({data: data});
    }).catch((err) => {
        res.status(400).json({error: "Could not find user with id: " + id})
    });
}

async function create(req, res) {
    let user = req.body
    if (user.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter was provided. An id is automatically created by the database."
            });
    } else {
        let transaction = await db.transaction();
        let createdUser = await db.models.user.create(user, {transaction}).catch(err => {
            res.status(500).json({
                message: err.message || "An error occurred while creating the user."
            })

            return;
        });

        if (user.rolesToAdd) {
            await assignRolesToUser(createdUser, user.rolesToAdd, transaction).catch((err) => {
                res.status(500).json({err: err.message || "An error occurred while setting roles for the user provided."});
            })

            return;
        }

        try{
            await transaction.commit().then(() => {
                res.status(200).json({data: createdUser});
            });
        } catch {

        }

    }
}

async function update(req, res) {
    let user = req.body;
    if (!user.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter needs to provided."
            });
    }

    await db.models.user.update(user, {
        where: {
            id: user.id
        }
    }).catch((err) => {
        res.status(500).json({error: err.message || "An unknown error occurred while updating role with id: " + role.id})
        return;
    })

    if (!user.rolesToAdd && !user.rolesToRemove) {
        res.status(200).json({success: true})
        return;
    }

    let updatedUser = await db.models.user.findOne({
        where: {
            id: user.id
        },
        include: [{
            model: db.models.role
        }]
    });

    //Update roles of user, if any
    let transaction = await db.transaction();
    await assignRolesToUser(updatedUser, user.rolesToAdd, transaction).catch((err) => {
        res.status(500).json({error: err.message || "An error occurred while adding roles to user with id: " + user.id})
        return;
    })

    await removeRolesFromUser(updatedUser, user.rolesToRemove, transaction).catch((err) => {
        res.status(500).json({error: err.message || "An error occurred while removing roles from user with id: " + user.id})
        return;
    })

    try{
        await transaction.commit().then(() => {
            res.status(200).json({success: true})
        }).catch((err) => {
            res.status(500).json({error: err.message || "An unknown error occurred while updating user with id: " + user.id})
            return;
        });
    } catch (e) {

    }

}

async function deleteUser(req, res) {
    let id = req.params.id;

    if (!id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter needs to provided."
            });

        return;
    }

    db.models.user.destroy({
        where: {
            id: id
        }
    }).then((deleted) => {
        res.status(200).json({success:true, deleted: deleted})
    }).catch((err) => {
        res.status(500).json({error: err.message || "An error occurred deleting a user with id: " + id})
    });
}

module.exports = {
    getAll, getById, create, update, deleteUser
}