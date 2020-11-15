const {models} = require("../database.js")

async function getAll(req, res) {
    models.county.findAll().then((data) => {
        res.status(200).json({data: data});
    }).catch((err) => {
        res.status(400).json({error: err.message || "An error occurred while retrieving the list of counties." })
    })
}

async function getById(req, res) {
    const id = req.params.id;
    models.county.findByPk(id).then((data) => {
        res.status(200).json({data: data})
    }).catch(err => {
        res.status(400).json({error: "Could not find county with id: " + id})
    })
}

module.exports = {getAll, getById};