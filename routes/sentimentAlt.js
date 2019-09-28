var express = require("express");
var router = express.Router();

var { PythonShell } = require("python-shell");

router.post("/", function(req, res, next) {
    // console.log(req.body);
    let py = new PythonShell("./routes/sentiment/main.py");
    py.send(JSON.stringify(req.body));

    py.on("message", message => res.send(JSON.parse(message)));
});

module.exports = router;
