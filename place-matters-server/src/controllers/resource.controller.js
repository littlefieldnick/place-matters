const {models} = require("../database.js")
const {geocodeResource} = require("../utils/geocoding.util");

function getAll(req, res) {
    models.resource.findAll({include: [{model: models.category}, {model: models.county} ]}).then((data) => {
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

async function bulkCreate(req, res) {
    let resources = req.body.resource;

    if (resources.length == 0) {
        res.status(400).json({error: "There are no records provided."})
        return;
    }

    let failedGeocode = []
    for (let r = 0; r < resources.length; r++) {
        let geoError = false;
        let coords = await geocodeResource(resources[r]).catch((error) => {
            console.log(error.message);
            //res.status(400).json({success: false, error: "Could not geocode resource location!"});
            geoError = true;
        });

        if(geoError) {
            failedGeocode.push(r);
            continue;
        }

        resources[r].latitude = coords.location.lat;
        resources[r].longitude = coords.location.lng;
    }

    await models.resource.bulkCreate(resources).then((data) => {
        console.log(data);
        res.status(201).json({data: data, failedGeocode: failedGeocode});
    }).catch(err => {
        res.status(500).json({
            message: err || "An error occurred while creating the resource"
        })
    });
}

async function create(req, res) {
    let resource = req.body
    console.log("Resource");

    if (resource.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter was provided. An id is automatically created by the database."
            });
    }

    let geoError = false;
    let coords = await geocodeResource(resource).catch((error) => {
        res.status(400).json({success: false, error: "Could not geocode resource location!"});
    });

    if(geoError) return;

    resource.latitude = coords.location.lat;
    resource.longitude = coords.location.lng;

    models.resource.create(resource).then((data) => {
        res.status(201).json({success: true, data: data});
    }).catch(err => {
        res.status(500).json({
            message: err.message || "An error occurred while creating the resource"
        })
    });

}

function update(req, res) {
    let resource = req.body;
    if (!resource.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter needs to provided."
            });
    } else {
        models.resource.update(resource).then((data) => {
            res.status(200).json({data: data});
        }).catch((err) => {
            res.status(500).json({error: err.message || "An unknown error occurred while updating resource with id: " + resource.id})
        })
    }
}

function deleteResource(req, res) {
    if (!req.params.id) {
        res.status(400)
            .json({
                error: "Bad request. An id parameter needs to provided."
            });
    } else {
        models.resource.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.status(200).json({success: true, status: "Successful deletion of resource with id: " + id})
        }).catch((err) => {
            res.status(500).json({error: err.message || "An unknown error occurred while deleting resource with id: " + id})
        })
    }
}

module.exports = {
    getAll, getById, create, bulkCreate, update, deleteResource
}