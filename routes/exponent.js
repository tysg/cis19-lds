var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
	var input = req.body;
	const n = input["n"];
	const p = input["p"];
	var output = {};

	var pLogN = p * Math.log10(n);
	console.log("pLogN: " + pLogN);

	// FIX HERE
	var a = Math.pow(10, pLogN % 1);
	console.log("a: " + a);
	var first = firstDigit(a);
	console.log("first: " + first);

	var last = 0;

	var nLast = simpleLast(n);
	if (nLast === 0 || nLast === 1 || nLast === 5 || nLast === 6) {
		last = nLast;
	} else if (nLast === 2 || nLast === 3 || nLast === 7 || nLast === 8) {
		var cycle = p % 4;
		if (nLast === 2) {
			if (cycle === 0) {
				last = 6;
			} else if (cycle === 1) {
				last = 2;
			} else if (cycle === 2) {
				last = 4;
			} else {
				last = 8;
			}
		} else if (nLast === 3) {
			if (cycle === 0) {
				last = 1;
			} else if (cycle === 1) {
				last = 3;
			} else if (cycle === 2) {
				last = 9;
			} else {
				last = 7;
			}
		} else if (nLast === 7) {
			if (cycle === 0) {
				last = 1;
			} else if (cycle === 1) {
				last = 7;
			} else if (cycle === 2) {
				last = 9;
			} else {
				last = 3;
			}
		} else if (nLast === 8) {
			if (cycle === 0) {
				last = 6;
			} else if (cycle === 1) {
				last = 8;
			} else if (cycle === 2) {
				last = 4;
			} else {
				last = 2;
			}
		}
	} else if (nLast === 4 || nLast === 9) {
		var cycle = p % 2 === 0;
		if (nLast === 4) {
			if (cycle) {
				last = 6;
			} else {
				last = 4;
			}
		} else {
			if (cycle) {
				last = 1;
			} else {
				last = 9;
			}
		}
	}

	console.log("last: " + last);

	var l = Math.floor(pLogN) + 1;

	console.log("length: " + l);

	output = {
		result: [first, l, last]
	};

	if (n === 0 && p === 0) {
		output = {
			result: [null, null, null]
		};
	} else if (n === 0) {
		output = {
			result: [0, 1, 0]
		};
	} else if (p === 0) {
		output = {
			result: [1, 1, 1]
		};
	}

	res.send(output);
});

function simpleLast(x) {
	return x % 10;
}

// LOG10 (y)
function getBaseLogTen(y) {
	const ans = Math.log(y) / Math.log(10);
	console.log("base: " + ans);
	return ans;
}

function firstDigit(x) {
	while (x >= 10) {
		x /= 10;
	}

	return Math.floor(x);
}

module.exports = router;
