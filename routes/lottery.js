var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	var input = req.body;
	var output = [80, 80, 80, 80, 80, 80, 80, 80, 80, 80];
	res.send(output);
});

module.exports = router;
