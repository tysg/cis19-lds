var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
	var input = req.body;
	var N = input["maxChooseableInteger"];
	var T = input["desiredTotal"];

	var ballArr = new Array(N);
	for (var i = 0; i < N; i++) {
		ballArr[i] = i + 1;
	}
});

module.exports = router;
