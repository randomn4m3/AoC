const input = await Deno.readTextFile("./input.txt");

const rows = input.split("\n");
let maxRFromStart = 0,
  maxLFromStart = 0,
  maxUFromStart = 0,
  maxDFromStart = 0,
  currentL = 0,
  currentR = 0,
  currentU = 0,
  currentD = 0;

for (const row of rows) {
  const direction = row[0];
  const moves = (/\d+/g).exec(row)!.map((n) => parseInt(n, 10))[0];
  switch (direction) {
    case ("R"):
      currentR += moves;
      currentL -= moves;
      if (currentR > maxRFromStart) maxRFromStart = currentR;
      break;
    case ("L"):
      currentL += moves;
      currentR -= moves;
      if (currentL > maxLFromStart) maxLFromStart = currentL;
      break;
    case ("U"):
      currentU += moves;
      currentD -= moves;
      if (currentU > maxUFromStart) maxUFromStart = currentU;
      break;
    case ("D"):
      currentD += moves;
      currentU -= moves;
      if (currentD > maxDFromStart) maxDFromStart = currentD;
      break;
  }
}

// Array size
const matrix = new Array(maxDFromStart + maxUFromStart + 1).fill(0).map(() =>
  new Array(maxLFromStart + maxRFromStart + 1).fill(0)
);
// Initial position
let hRow = maxUFromStart,
  tRow = maxUFromStart,
  hCol = maxLFromStart,
  tCol = maxLFromStart;

matrix[tRow][tCol] = 1;

for (const row of rows) {
  const direction = row[0];
  const moves = (/\d+/g).exec(row)!.map((n) => parseInt(n, 10))[0];
  switch (direction) {
    case ("R"): {
      const c = tCol;
      hCol += moves;
      if (Math.abs(hCol - tCol) > 1) {
        if (hRow === tRow) {
          tCol = hCol - 1;
          matrix[hRow].fill(1, c + 1, hCol);
        } else {
          tCol = hCol - 1;
          tRow = hRow;
          matrix[hRow].fill(1, c + 1, hCol);
        }
      }
      break;
    }
    case ("L"): {
      const c = tCol;
      hCol -= moves;
      if (Math.abs(hCol - tCol) > 1) {
        if (hRow === tRow) {
          tCol = hCol + 1;
          matrix[hRow].fill(1, tCol, c);
        } else {
          tCol = hCol + 1;
          tRow = hRow;
          matrix[hRow].fill(1, tCol, c);
        }
      }
      break;
    }
    case ("U"): {
      const c = tRow;
      hRow -= moves;
      if (Math.abs(hRow - tRow) > 1) {
        if (hCol === tCol) {
          tRow = hRow + 1;
          matrix.map((k, i) => {
            if (i > hRow && i < c) k[hCol] = 1;
          });
        } else {
          tRow = hRow + 1;
          tCol = hCol;
          matrix.map((k, i) => {
            if (i > hRow && i < c) k[hCol] = 1;
          });
        }
      }
      break;
    }
    case ("D"): {
      const c = tRow;
      hRow += moves;
      if (Math.abs(hRow - tRow) > 1) {
        if (hCol === tCol) {
          tRow = hRow - 1;
          matrix.map((k, i) => {
            if (i < hRow && i > c) k[hCol] = 1;
          });
        } else {
          tRow = hRow - 1;
          tCol = hCol;
          matrix.map((k, i) => {
            if (i < hRow && i > c) k[hCol] = 1;
          });
        }
      }
      break;
    }
  }
  // console.log(matrix);
}

console.log(
  matrix.map((i) => i.filter((j) => j > 0).length).reduce((a, b) => a + b, 0),
);
