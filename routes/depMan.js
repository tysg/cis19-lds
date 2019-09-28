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
var indeg = [];

const sample = {
  modules: ["m1", "m2"],
  dependencyPairs: [
    { dependee: "m2", dependentOn: "m1" },
    { dependee: "m1", dependentOn: "m2" }
  ]
};

function solution(modules, pairs) {
  if (modules.length === 0) {
    return [];
  }

  for (let i = 0; i < modules.length; i++) {
    // keep a item to index
    items[modules[i]] = i;
  }

  indeg = new Array(modules.length);
  indeg.fill(0);

  visited = new Array(modules.length);
  visited.fill(false);

  p = new Array(modules.length);
  p.fill(-1);

  graph = new Array(modules.length);
  for (let i = 0; i < modules.length; i++) {
    graph[i] = new Array();
  }

  // generating graph
  for (let i = 0; i < pairs.length; i++) {
    const on = pairs[i].dependentOn;
    if (graph[items[on]] === undefined) {
      return [];
    }
    graph[items[on]].push(items[pairs[i].dependee]);
  }

  // popluating indeg arr
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      indeg[graph[i][j]]++;
    }
  }

  // populating the queue
  let q = [];
  for (let i = 0; i < indeg.length; i++) {
    if (indeg[i] === 0) {
      q.push(i);
    }
  }

  while (q.length !== 0) {
    const element = q.shift();
    result.push(element);
    let arr = graph[element];
    for (let i = 0; i < arr.length; i++) {
      if (indeg[i] > 0) {
        indeg[i]--;
      } else {
        p[i] = element;
        q.push(i);
      }
    }
  }

  return result.length === 0 ? [] : result.map(i => modules[i]);
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

// console.log(solution(sample.modules, sample.dependencyPairs));

module.exports = router;
