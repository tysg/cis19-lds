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
	if (totalSum < T) {
		minMoves = -1;
	} else {
		let turn = 0,
			total = 0,
			lowest = T - N - 1;
		while (total < T) {
			console.log("ARRAY: " + ballArr);
			let num = Math.min(...ballArr);
			console.log(num);
			if (ballArr.includes(lowest - total)) {
				console.log("LOWEST - TOTAL: " + (lowest - total));
				let index = ballArr.indexOf(lowest - total);
				ballArr.splice(index, 1);
				total += lowest - total;
				console.log("FIRST");
			} else if (ballArr.includes(T - total)) {
				total += T - total;
				console.log("SECOND");
			} else {
				let index = ballArr.indexOf(num);
				ballArr.splice(index, 1);
				total += num;
				console.log("THIRD");
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
