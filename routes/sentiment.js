var express = require("express");
var router = express.Router();

var Analyzer = require("natural").SentimentAnalyzer;
var stemmer = require("natural").PorterStemmer;
// var tokenizer = require("natural").WordTokenizer;
var analyzer = new Analyzer("English", stemmer, "afinn");

var natural = require("natural");
var tokenizer = new natural.WordTokenizer();

router.post("/", function(req, res, next) {
  // console.log("hi im here");

  const { reviews } = req.body;
  const sentimentValues = reviews.map(sentence => {
    return analyzer.getSentiment(tokenizer.tokenize(sentence));
  });
  const sentiments = sentimentValues.map(fl =>
    fl > 0 ? "positive" : "negative"
  );

  res.send(JSON.stringify({ response: sentiments }));
});

module.exports = router;
