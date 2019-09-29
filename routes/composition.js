var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
    var input = req.body;
    console.log(input);
    const setId = input["setId"];
    const compLen = input["compositionLength"];
    var comp = input["composition"];
    const numOfCase = input["noOfCase"];
    var patterns = input["patterns"];
    result = solution(compLen, comp, patterns);

    res.send({ testId: setId, result: result });
});

// sample = {
//     setId: "1",
//     compositionLength: 5,
//     composition: "abcde",
//     noOfCase: 3,
//     patterns: ["ac", "ab", "de"]
// };

function processPattern(patterns) {
    // return a dictionary
    result = {};
    for (pattern of patterns) {
        if (result[pattern[0]] == undefined) {
            result[pattern[0]] = [pattern[1]];
        } else {
            result[pattern[0]].push(pattern[1]);
        }

        if (result[pattern[1]] == undefined) {
            result[pattern[1]] = [pattern[0]];
        } else {
            result[pattern[1]].push(pattern[0]);
        }
    }
    return result;
}

function isAddThisChar(accum, str, i, dict) {
    if (i <= 0) {
        return true;
    }

    let lastChar = accum[accum.length - 1];
    if (dict[lastChar] !== undefined && dict[lastChar].includes(str[i])) {
        return false;
    }
    return true;
}

function solution(compLen, str, patterns) {
    // if (isGood(str, patterns)) {
    //     return 0;
    // }

    var dict = processPattern(patterns);

    var result = new Set();
    function helper(str, accum, i) {
        if (i >= str.length) {
            result.add(accum);
            return;
        }

        helper(str, accum, i + 1);
        if (isAddThisChar(accum, str, i, dict)) {
            helper(str, accum + str[i], i + 1);
        }
        //  else {
        //     helper(str, accum, i + 2);
        // }
    }
    helper(str, "", 0);

    let min = compLen;
    for (candid of result.values()) {
        deleteLength = compLen - candid.length;
        if (deleteLength < min) {
            min = deleteLength;
        }
    }
    return min;
}

module.exports = router;
// solution(sample.compositionLength, sample.composition, sample.patterns);
