const db = require("../database.js")
const {assignPermissionToRoles} = require("../utils/helper.utils.js")

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
        res.status(400).json({error: "Could not find resource with id: " + id})
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
            res.status(200).json({data:createdRole})
        }).catch(err => {
            res.status(500).json({err: err.message || "An unknown error occurred while trying to commit the role to the database."})
        })

    }
}

module.exports = {
    getAll, getById, create
}