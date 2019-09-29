var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
	var input = req.body;
	let output = [];
	for (let j = 0; j < input.length; j++) {
		let n = input[j]["n"];
		let text = input[j]["text"];
		let code = [...text.replace(/[^0-9a-z]/gi, "").toUpperCase()];

		if (n === 0) {
			break;
		}
		let ss = new Array(code.length);
		let i = 0;
		let startChar = 0;
		for (let c = 0; c < code.length; c++) {
			console.log("code[c]: " + code[c]);
			ss[i] = code[c];
			i = i + n;
			if (i >= code.length) {
				startChar++;
				i = startChar % code.length;
			}
		}
		output.push(ss.join(""));
	}

	res.send(JSON.stringify(output));
});

module.exports = router;
