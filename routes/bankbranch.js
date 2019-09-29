var express = require("express");
var router = express.Router();

var Heap = require("collections/heap");

function gcd(a, b) {
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(arr) {
  if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return (arr[0] * arr[1]) / gcd(arr[0], arr[1]);
  }
  const m = Math.floor(arr.length / 2);
  const firstHalf = arr.slice(0, m);
  const secondHalf = arr.slice(m);
  const a = lcm(firstHalf);
  const b = lcm(secondHalf);

  return (a * b) / gcd(a, b);
}

const comparator = (a, b) => {
  const dt = b.time - a.time;
  return dt === 0 ? b.bid - a.bid : dt;
};

function findIndex(n, timings, sorted) {
  let minHeap = new Heap([], Object.equals, comparator);

  if (n < timings.length) {
    return timings.indexOf(n);
  }

  // console.log(n);

  timings.forEach((time, i) => {
    minHeap.push({ bid: i, time });
    n--;
  });

  // console.log(n);
  if (n === 0) {
    return minHeap.pop().bid;
  }

  // console.log(n);
  while (n > 0) {
    n--;
    const banker = minHeap.pop();

    // console.log(banker, n);
    if (n === 0) {
      return banker.bid;
    }
    const next = { bid: banker.bid, time: banker.time + timings[banker.bid] };
    minHeap.push(next);
  }
}

router.post("/", function(req, res, next) {
  // console.log(req.body);

  const N = req.body.N - 1; // 0 - index
  const timings = req.body.branch_officers_timings;
  const factor = lcm(timings);
  const sorted = [...timings].sort((a, b) => a - b);

  const count = timings.map(time => factor / time);
  const sum = count.reduce((a, acc) => a + acc, 0);
  const overflow = N % sum;

  const ret = findIndex(overflow, timings, sorted) + 1;
  console.log({ answer: ret });
  res.send({ answer: ret });
});

module.exports = router;
