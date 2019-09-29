var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
	var input = req.body;
	var N = input["maxChoosableInteger"];
	var T = input["desiredTotal"];

	var ballArr = new Array(N);
	var totalSum = 0;
	for (var i = 0; i < N; i++) {
		ballArr[i] = i + 1;
		totalSum += i + 1;
	}

	var minMoves = -1;
	if (N >= T) {
		minMoves = 1;
	} else if (totalSum < T) {
		minMoves = -1;
	} else {
		let turn = 0,
			total = 0,
			lowest = T - N - 1;
		while (total < T) {
			let min = Math.min(...ballArr);
			let lowestMT = lowest - total;
			let tMT = T - total;
			if (ballArr.includes(lowestMT)) {
				let index = ballArr.indexOf(lowestMT);
				ballArr.splice(index, 1);
				total += lowestMT;
			} else if (ballArr.includes(tMT)) {
				total += tMT;
			} else {
				let index = ballArr.indexOf(min);
				ballArr.splice(index, 1);
				total += min;
			}

			turn++;
		}
		if (turn % 2 === 1) {
			minMoves = turn;
		}
	}

	res.send(JSON.stringify({ res: minMoves }));
});

module.exports = router;
