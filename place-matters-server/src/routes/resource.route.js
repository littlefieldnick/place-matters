const resources = require("../controllers/resource.controller")
var router = require("express").Router();

//Define routes for resources
router.get("/", resources.getAll);
router.get("/:id", resources.getById);
router.post("/", resources.create);
router.post("/upload", resources.bulkCreate);
router.put("/:id", resources.update)
router.delete("/:id", resources.deleteResource)

module.exports = router;