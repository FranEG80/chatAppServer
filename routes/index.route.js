var express = require("express");
var router = express.Router();

/* GET index listing. */
router.get("/", function (req, res, next) {
    res.status(200).json({ status: "OK", message: "Please, check the documentation" });
});

module.exports = router;
