const {models} = require("../database.js")

async function getAll(req, res){
    models.permission.findAll().then((data) =>{
        res.status(200).json({data: data});
    }).catch((err) => {
        res.status(404).json({error: err.message || "An error occurred. User permissions could not be accessed."});
    });
}

async function getById(req, res){
    if(!req.params.id)
        res.status(400).json({error: "Bad request. An id is required."});

    models.permission.findByPk(req.params.id).then((data) => {
        res.status(200).json({data: data});
    }).catch((err) => {
        res.status(404).json({error: err.message || "Could not find permission with id: " + id});
    })
}

module.exports = {getAll, getById}