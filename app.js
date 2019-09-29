var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var weddingRouter = require("./routes/wedding");
var chessgameRouter = require("./routes/chessgame.js");
var lotteryRouter = require("./routes/lottery");
var readyplayeroneRouter = require("./routes/readyplayerone");
// var sentimentRouter = require("./routes/sentiment");
var sentimentRouter = require("./routes/sentimentAlt");
var depManRouter = require("./routes/depMan");
var typingRouter = require("./routes/typing");
var compositionRouter = require("./routes/composition");
var exponentRouter = require("./routes/exponent");
var portfolioRouter = require("./routes/portfolio");
var bankRouter = require("./routes/bankbranch");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// codeit suisse endpoints here
app.use("/wedding-nightmare", weddingRouter);
app.use("/chessgame", chessgameRouter);
app.use("/lottery", lotteryRouter);
app.use("/readyplayerone", readyplayeroneRouter);
app.use("/sentiment-analysis", sentimentRouter);
app.use("/generateSequence", depManRouter);
app.use("/typing-contest", typingRouter);
app.use("/composition", compositionRouter);
app.use("/exponent", exponentRouter);
app.use("/", portfolioRouter);
app.use("/bankbranch", bankRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
