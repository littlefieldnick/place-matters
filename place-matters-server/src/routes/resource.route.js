const resources = require("../controllers/resource.controller")
var router = require("express").Router();

//Define routes for resources
router.get("/", resources.getAll);
router.get("/:id", resources.getById);
router.post("/", resources.create);

module.exports = router;