var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
	var input = req.body;
	const n = input["n"];
	const p = input["p"];
	var output = {};

	var pLogN = p * getBaseLogTen(n);

	var a = Math.pow(10, pLogN);
	var first = firstDigit(a);

	var arrN = n
		.toString(10)
		.replace(/\D/g, "0")
		.split("")
		.map(Number);
	var arrP = p
		.toString(10)
		.replace(/\D/g, "0")
		.split("")
		.map(Number);

	var last = LastDigit(arrN, arrP);

	var l = Math.floor(pLogN) + 1;

	output = {
		result: [first, l, last]
	};

	res.send(JSON.stringify(output));
});

// Function to find b % a
function Modulo(a, b) {
	// Initialize result
	var mod = 0;

	// calculating mod of b with a to make
	// b like 0 <= b < a
	for (var i = 0; i < b.length; i++) mod = (mod * 10 + b[i] - "0") % a;

	return mod; // return modulo
}

function LastDigit(a, b) {
	var len_a = a.length,
		len_b = b.length;

	// if a and b both are 0
	if (len_a == 1 && len_b == 1 && b[0] == "0" && a[0] == "0") return 1;

	// if exponent is 0
	if (len_b == 1 && b[0] == "0") return 1;

	// if base is 0
	if (len_a == 1 && a[0] == "0") return 0;

	// if exponent is divisible by 4
	// that means last digit will be
	// pow(a, 4) % 10. if exponent is
	//not divisible by 4 that means last
	// digit will be pow(a, b%4) % 10
	var exp = Modulo(4, b) == 0 ? 4 : Modulo(4, b);

	// Find last digit in 'a' and
	// compute its exponent
	var res = Math.round(Math.pow(a[len_a - 1] - "0", exp));

	// Return last digit of result
	return res % 10;
}

// LOG10 (y)
function getBaseLogTen(y) {
	const ans = Math.log(y) / Math.log(10);
	console.log(ans);
	return ans;
}

function firstDigit(x) {
	while (x >= 10) {
		x /= 10;
	}

	return Math.floor(x);
}

module.exports = router;
