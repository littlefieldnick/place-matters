const category = require("../controllers/category.controller")
var router = require("express").Router();

//Define routes for resources
router.get("/", category.getAll);
router.get("/:id", category.getById);
router.post("/", category.create);
router.put("/:id", category.update);
router.delete("/:id", category.deleteCategory)

module.exports = router;