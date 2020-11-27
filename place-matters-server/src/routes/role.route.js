const role = require("../controllers/role.controller")
var router = require("express").Router();

//Define routes for resources
router.get("/", role.getAll);
router.get("/:id", role.getById);
router.post("/", role.create);
router.put("/:id", role.update);
// router.delete("/:id", role.deleteCategory)

module.exports = router;