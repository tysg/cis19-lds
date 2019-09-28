var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	var input = req.body;
	var output = [60, 80, 30, 50, 50, 50, 50, 50, 50, 50];
	res.send(output);
});

module.exports = router;
