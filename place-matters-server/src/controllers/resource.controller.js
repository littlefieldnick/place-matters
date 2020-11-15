const {models} = require("../database.js")
const {geocodeResource} = require("../utils/geocoding.util");

function getAll(req, res) {
    models.resource.findAll().then((data) => {
        res.status(200).json({data: data});
    }).catch((err) => {
        res.status(400).json({error: err.message || "An error occurred while retrieving the list of resources."})
    })
}

function getById(req, res) {
    const id = req.params.id;
    models.resource.findByPk(id).then((data) => {
        res.status(200).json({data: data});
    }).catch((err) => {
        res.status(400).json({error: "Could not find resource with id: " + id})
    });
}

async function create(req, res){
    let resource = req.body
    if(resource.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter was provided. An id is automatically created by the database."
            });

    } else {
        let geoError = false;
        let coords = await geocodeResource(resource).catch((error) => {
            res.status(400).json({success: false, error: "Could not geocode resource location!"});
            geoError = true;
        });

        if(geoError)
            return;

        resource.latitude = coords.location.lat;
        resource.longitude = coords.location.lng;

        models.resource.create(resource).then((data) => {
            res.status(201).json({data: data});
        }).catch(err => {
            res.status(500).json({
                message: err.message || "An error occurred while creating the resource"
            })
        });
    }
}
module.exports = {
    getAll, getById, create
}