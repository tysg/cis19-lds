var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
    console.log(req.body);
    const result = solution(req.body);
    res.send(result);
});

function solution(body) {
    const init = body["initial"].indexOf(1);
    const goal = body["goal"].indexOf(1);

    const diff = goal - init;

    if (diff === 0) return resp([]);
    return resp(new Array(Math.abs(diff)).fill(diff < 0 ? "R" : "L"));
    // if (diff > 0) {
    //     return resp(new Array(diff).fill("L"));
    // } else if (diff === 0) {
    //     return resp([]);
    // } else {
    //     return resp(new Array(Math.abs(diff)).fill("R"));
    // }
}

function resp(arr) {
    return { moves: arr };
}
module.exports = router;
