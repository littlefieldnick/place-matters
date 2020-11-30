const user = require("../controllers/user.controller")
var router = require("express").Router();

//Define routes for resources
router.get("/", user.getAll);
router.get("/:id", user.getById);
router.post("/", user.create);
router.put("/:id", user.update);
router.delete("/:id", user.deleteUser)

module.exports = router;