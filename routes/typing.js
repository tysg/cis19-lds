var express = require("express");
var router = express.Router();

var natural = require("natural");

var Heap = require("collections/heap");

function generateGraph(inputs) {
  let graph = {};

  inputs.forEach(str => {
    const adjs = inputs
      .filter(neighbour => neighbour !== str)
      .map(neighbour => {
        const hd = natural.HammingDistance(str, neighbour);
        const weight = hd + 1;
        return {
          u: str,
          v: neighbour,
          weight: weight
        };
      });
    graph[str] = adjs;
  });

  return graph;
}

function minSpanTree(graph, start) {
  const visited = new Set();
  let edges = new Heap([], Object.equals, (a, b) => b.weight - a.weight);
  let mst = {};
  Object.keys(graph).forEach(key => (mst[key] = []));
  let cost = 0;

  visited.add(start);
  graph[start].forEach(neighbour => {
    edges.push(neighbour);
  });

  while (edges.length > 0) {
    const e = edges.pop();
    const u = e.u;
    const v = e.v;
    const weight = e.weight;

    if (!visited.has(v)) {
      mst[u].push({ u, v, weight });
      mst[v].push({ v, u, weight });
      cost += weight;
      visited.add(v);

      graph[v].forEach(edge => {
        if (!visited.has(edge.v)) {
          edges.push(edge);
        }
      });
    }
  }

  return { mst, cost };
}

function traceMst(graph, start) {
  let path = [];
  let visited = new Set();
  let stack = [];

  path.push({ type: "INPUT", value: start });
  visited.add(start);
  stack.push(...graph[start]);

  while (stack.length > 0) {
    const edge = stack.pop();
    const v = edge.v;

    if (!visited.has(v)) {
      stack.push(...graph[v]);
      visited.add(v);
      path.push(
        { type: "COPY", value: edge.u },
        { type: "TRANSFORM", value: v }
      );
    }
  }
  return path;
}

router.post("/", function(req, res, next) {
  const inputs = req.body;
  const start = inputs[0];

  const graph = generateGraph(inputs);

  const mst = minSpanTree(graph, start);

  const path = traceMst(mst.mst, start);

  const result = { steps: path, cost: mst.cost + start.length };
  console.log(result);

  res.send(JSON.stringify(result));
});

module.exports = router;
