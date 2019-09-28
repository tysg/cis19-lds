var express = require("express");
var { PythonShell } = require("python-shell");
var router = express.Router();

router.post("/maximise_1a", function(req, res, next) {
    console.log(req.body);
    let py = new PythonShell("./routes/portfolio/op1a.py");
    py.send(JSON.stringify(req.body));

    py.on("message", message => res.send(JSON.parse(message)));
});

router.post("/maximise_1b", function(req, res, next) {
    console.log(req.body);
    let py = new PythonShell("./routes/portfolio/op1b.py");
    py.send(JSON.stringify(req.body));

    py.on("message", message => res.send(JSON.parse(message)));
});
router.post("/maximise_1c", function(req, res, next) {
    console.log(req.body);
    let py = new PythonShell("./routes/portfolio/op1c.py");
    py.send(JSON.stringify(req.body));

    py.on("message", message => res.send(JSON.parse(message)));
});
router.post("/maximise_2", function(req, res, next) {
    console.log(req.body);
    let py = new PythonShell("./routes/portfolio/op2.py");
    py.send(JSON.stringify(req.body));

    py.on("message", message => res.send(JSON.parse(message)));
});
module.exports = router;
