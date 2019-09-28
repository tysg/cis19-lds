var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
	var input = req.body;
	var N = input["maxChoosableInteger"];
	var T = input["desiredTotal"];

	var ballArr = new Array(N);
	var totalSum = 0;
	for (var i = 0; i < N; i++) {
		ballArr[i] = true;
		totalSum += i + 1;
	}

	var output = {};

	var player1 = true;
	if (N >= T) {
		output = {
			res: 1
		};
	} else if (totalSum < T) {
		output = {
			res: -1
		};
	} else if (totalSum === T) {
		if (N % 2 === 0) {
			output = {
				res: -1
			};
		} else {
			output = {
				res: N
			};
		}
	} else if (N * 2 >= T) {
		output = {
			res: 3
		};
	} else {
		output = {
			res: 3
		};
	}

	res.send(JSON.stringify(output));
});

module.exports = router;
