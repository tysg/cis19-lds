var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	var input = req.body;
	var output = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
	res.send(output);
});

module.exports = router;
