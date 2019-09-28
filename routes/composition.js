var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
	var input = req.body;
	const setId = input["setId"];
	const compLen = input["compositionLength"];
	var comp = input["composition"];
	const numOfCase = input["noOfCase"];
	var patterns = input["patterns"];

	var graph = [];
});

module.exports = router;
