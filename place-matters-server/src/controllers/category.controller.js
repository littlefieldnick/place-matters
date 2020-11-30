const {models} = require("../database.js")

function getAll(req, res) {
    models.category.findAll().then((data) => {
        res.status(200).json({data: data});
    }).catch((err) => {
        res.status(400).json({error: err.message || "An error occurred while retrieving the list of categories."})
    })
}

function getById(req, res) {
    const id = req.params.id;
    models.category.findByPk(id).then((data) => {
        res.status(200).json({data: data});
    }).catch((err) => {
        res.status(400).json({error: "Could not find category with id: " + id})
    });
}

async function create(req, res) {
    let category = req.body
    if (category.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter was provided. An id is automatically created by the database."
            });

    } else {
        models.category.create(category).then((data) => {
            res.status(201).json({data: data});
        }).catch(err => {
            res.status(500).json({
                message: err.message || "An error occurred while creating the category"
            })
        });
    }
}

async function update(req, res) {
    let category = req.body;
    if (!category.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter needs to provided."
            });
    } else {
        models.category.update(category).then((data) => {
            res.status(200).json({data: data});
        }).catch((err) => {
            res.status(500).json({error: err.message || "An unknown error occurred while updating category with id: " + category.id})
        })
    }
}

async function deleteCategory(req, res) {
    if (!req.params.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter needs to provided."
            });
    } else {
        models.category.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.status(200).json({success: true, status: "Successful deletion of category with id: " + id })
        }).catch((err) => {
            res.status(500).json({error: err.message || "An unknown error occurred while deleting category with id: " + id})
        })
    }
}

module.exports = {
    getAll, getById, create, update, deleteCategory
}