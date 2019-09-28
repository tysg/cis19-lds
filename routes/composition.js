var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
    var input = req.body;
    const setId = input["setId"];
    const compLen = input["compositionLength"];
    var comp = input["composition"];
    const numOfCase = input["noOfCase"];
    var patterns = input["patterns"];
    result = solution(compLen, comp, patterns);

    res.send({ testId: setId, result: result });
});

function isGood(str, patterns) {
    for (pattern of patterns) {
        if (str.search(pattern) !== -1) {
            return false;
        }
    }

    return true;
}

function solution(compLen, str, patterns) {
    result = new Array();
    function helper(str, accum, i) {
        if (i >= str.length) {
            if (isGood(accum, patterns)) {
                result.push(accum);
            }
            return;
        }

        helper(str, accum, i + 1);
        helper(str, accum + str[i], i + 1);
    }
    helper(str, "", 0);

    min = compLen;
    for (candid of result) {
        deleteLength = compLen - candid.length;
        if (deleteLength < min) {
            min = deleteLength;
        }
    }
    return min;
}
module.exports = router;
