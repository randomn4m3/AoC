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
console.log(
  maxDFromStart + maxUFromStart + 1,
  maxLFromStart + maxRFromStart + 1,
);
// Initial position
const knots = [...Array(10)].map(() => [maxUFromStart, maxLFromStart]);

matrix[maxUFromStart][maxLFromStart] = 1;

for (const row of rows) {
  const direction = row[0];
  const moves = (/\d+/g).exec(row)!.map((n) => parseInt(n, 10))[0];
  for (let move = 0; move < moves; move++) {
    for (let knot = 0; knot < (knots.length - 1); knot++) {
      switch (direction) {
        case ("R"): {
          if (knot === 0) knots[knot][1] += 1;
          break;
        }
        case ("L"): {
          if (knot === 0) knots[knot][1] -= 1;
          break;
        }
        case ("U"): {
          if (knot === 0) knots[knot][0] -= 1;
          break;
        }
        case ("D"): {
          if (knot === 0) knots[knot][0] += 1;
          break;
        }
      }
      if (
        (Math.abs(knots[knot][1] - knots[knot + 1][1]) > 1) &&
        (Math.abs(knots[knot][0] - knots[knot + 1][0]) > 1)
      ) {
        knots[knot + 1][1] = ((knots[knot][1] - knots[knot + 1][1]) > 0)
          ? knots[knot + 1][1] + 1
          : knots[knot + 1][1] - 1;
        knots[knot + 1][0] = ((knots[knot][0] - knots[knot + 1][0]) > 0)
          ? knots[knot + 1][0] + 1
          : knots[knot + 1][0] - 1;
      } else if (Math.abs(knots[knot][1] - knots[knot + 1][1]) > 1) {
        knots[knot + 1][1] = ((knots[knot][1] - knots[knot + 1][1]) > 0)
          ? knots[knot + 1][1] + 1
          : knots[knot + 1][1] - 1;
        knots[knot + 1][0] = knots[knot][0];
      } else if (Math.abs(knots[knot][0] - knots[knot + 1][0]) > 1) {
        knots[knot + 1][0] = ((knots[knot][0] - knots[knot + 1][0]) > 0)
          ? knots[knot + 1][0] + 1
          : knots[knot + 1][0] - 1;
        knots[knot + 1][1] = knots[knot][1];
      }
      if (knot === (knots.length - 2)) {
        matrix[knots[knot + 1][0]][knots[knot + 1][1]] = 1;
      }
    }
  }
  // console.table(matrix);
}

console.log(
  matrix.map((i) => i.filter((j) => j > 0).length).reduce((a, b) => a + b, 0),
);
