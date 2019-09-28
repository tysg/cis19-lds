var express = require("express");
var router = express.Router();

var Sentiment = require("sentiment");
var sentiment = new Sentiment();

router.post("/", function(req, res, next) {
    // console.log("hi im here");

    const { reviews } = req.body;
    const sentimentValues = reviews.map(sentence =>
        sentiment.analyze(sentence)
    );
    const sentiments = sentimentValues.map(fl =>
        fl.comparative > 0 ? "positive" : "negative"
    );

    res.send(JSON.stringify({ response: sentiments }));
});

module.exports = router;
