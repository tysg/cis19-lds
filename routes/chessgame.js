var express = require("express");
var router = express.Router();

function findQueen(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] == "K") {
        return [i, j];
      }
    }
  }
}

function traverseOrthogonal(x, y, map) {
  let ctr = 0;
  for (let i = x + 1; i < map.length; i++) {
    if (map[i][y] !== "X") {
      ctr++;
    } else {
      break;
    }
  }

  // console.log(ctr);

  for (let i = x - 1; i >= 0; i--) {
    if (map[i][y] !== "X") {
      ctr++;
    } else {
      break;
    }
  }

  // console.log(ctr);

  for (let i = y + 1; i < map.length; i++) {
    if (map[x][i] !== "X") {
      ctr++;
    } else {
      break;
    }
  }

  // console.log(ctr);

  for (let i = y - 1; i >= 0; i--) {
    if (map[x][i] !== "X") {
      ctr++;
    } else {
      break;
    }
  }

  // console.log(ctr);

  for (let i = x + 1, j = y + 1; i < map.length && j < map.length; i++, j++) {
    if (map[i][j] === "X") {
      break;
    }
    ctr++;
  }
  // console.log(ctr);

  for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
    if (map[i][j] === "X") {
      break;
    }
    ctr++;
  }

  // console.log(ctr);

  for (let i = x - 1, j = y + 1; i >= 0 && j < map.length; i--, j++) {
    if (map[i][j] === "X") {
      break;
    }
    ctr++;
  }

  // console.log(ctr);

  for (let i = x + 1, j = y - 1; i < map.length && j >= 0; i++, j--) {
    if (map[i][j] === "X") {
      break;
    }
    ctr++;
  }

  return ctr;
}

router.post("/", (req, res, next) => {
  const map = req.body;
  const n = map.length;
  const temp = findQueen(map);
  const x = temp[0];
  const y = temp[1];
  let ans = 0;

  ans += traverseOrthogonal(x, y, map);

  res.send(JSON.stringify(ans));
});

module.exports = router;
