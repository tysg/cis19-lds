var express = require("express");
var router = express.Router();

var natural = require("natural");

function generateGraph(inputs) {
  let graph = { start: [] };

  inputs.forEach(str => {
    const adjs = inputs
      .filter(neighbour => neighbour !== str)
      .map(neighbour => {
        const hd = natural.HammingDistance(str, neighbour);
        const weight = hd + 1 < str.length ? hd : str.length;
        return {
          node: neighbour,
          weight: weight,
          hamming: hd === weight
        };
      });
    graph[str] = adjs;
  });

  graph.start = inputs.map(el => {
    return { node: el, weight: el.length, hamming: false };
  });

  return graph;
}

function minSpanTree(graph) {
  const { start } = graph;
  return graph;
}

function traceMst(graph) {
  return [];
}

router.post("/", function(req, res, next) {
  const inputs = req.body;

  const graph = generateGraph(inputs);

  const mst = minSpanTree(graph);

  const path = traceMst(mst);

  res.send(JSON.stringify(path));
});

module.exports = router;
