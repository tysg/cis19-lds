var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  var input = req.body;
  var output = [35, 71, 48, 40, 19, 72, 80, 32, 32, 0];
  res.send(output);
});

module.exports = router;
