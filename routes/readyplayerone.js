var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
  // var input = req.body;
  // var N = input["maxChoosableInteger"];
  // var T = input["desiredTotal"];

  // var ballArr = new Array(N);
  // var totalSum = 0;
  // for (var i = 0; i < N; i++) {
  // 	ballArr[i] = true;
  // 	totalSum += i + 1;
  // }

  // var output = {};

  // var player1 = true;
  // if (N >= T) {
  // 	output = {
  // 		res: 1
  // 	};
  // } else if (totalSum < T) {
  // 	output = {
  // 		res: -1
  // 	};
  // } else if (totalSum === T) {
  // 	if (N % 2 === 0) {
  // 		output = {
  // 			res: -1
  // 		};
  // 	} else {
  // 		output = {
  // 			res: N
  // 		};
  // 	}
  // } else if (N * 2 >= T) {
  // 	output = {
  // 		res: 3
  // 	};
  // } else {
  // }
  const N = req.body.maxChoosableInteger;
  const T = req.body.desiredTotal;

  const target = T % N;
  const ans = target === 0 ? -1 : 1 + 2 * Math.floor(T / N);

  res.send(JSON.stringify({ res: ans }));
});

function sol(max, arr, isPlayer1) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      arr[i] = false;
      1 + sol(max - (i + 1), arr);
    }
  }
}

module.exports = router;
