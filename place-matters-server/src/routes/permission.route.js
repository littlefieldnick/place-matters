const permission = require("../controllers/permission.controller")
var router = require("express").Router();

//Define routes for resources
router.get("/", permission.getAll);
router.get("/:id", permission.getById);

module.exports = router;