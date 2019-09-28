var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
  console.log(req.body);
  const result = solution(req.body["modules"], req.body["dependencyPairs"]);
  res.send(result);
});

var graph = [];
var items = {};
var visited = [];
var p = [];
var result = [];

function solution(modules, pairs) {
  if (modules.length === 0) {
    return [];
  }

  for (let i = 0; i < modules.length; i++) {
    // keep a item to index
    items[modules[i]] = i;
  }

  graph = new Array(modules.length);
  visited = new Array(modules.length);
  p = new Array(modules.length);

  graph = new Array(modules.length);
  for (let i = 0; i < modules.length; i++) {
    graph[i] = new Array();
  }

  for (let i = 0; i < pairs.length; i++) {
    const on = pairs[i].dependentOn;
    if (graph[items[on]] === undefined) {
      return [];
    }
    graph[items[on]].push(items[pairs[i].dependee]);
  }

  visited.fill(false);
  p.fill(-1);

  for (let i = 0; i < modules.length; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  return result.map(i => modules[i]).reverse();
}

function dfs(ind) {
  visited[ind] = true;
  for (let neighbor of graph[ind]) {
    if (!visited[neighbor]) {
      p[neighbor] = ind;
      dfs(neighbor);
    }
  }

  result.push(ind);
}

module.exports = router;
