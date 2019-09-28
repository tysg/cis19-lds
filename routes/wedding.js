var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
	var input = req.body;

	for (var i = 0; i < input.length; i++) {
		var task = input[i];
		const testCase = task["test_case"];
		const numOfGuests = task["guests"];
		const numOfTables = task["tables"];
		var friends = task["friends"];
		var enemies = task["enemies"];
		var families = task["families"];
	}
});

module.exports = router;
