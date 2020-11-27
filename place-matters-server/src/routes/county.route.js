const counties = require("../controllers/county.controller")
var router = require("express").Router();

router.get("/", counties.getAll);
router.get("/:id", counties.getById);

module.exports = router;