var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	res.send("Wedding Nightmare");
	console.log(req.body);
});

module.exports = router;
