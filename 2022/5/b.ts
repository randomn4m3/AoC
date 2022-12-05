const inputs = await Deno.readTextFile("./input.txt");

const lines = inputs.split("\n");

const regexCrates = /\s{4}|[A-Z]/g;
const regexMoves = /\d+/g;

let initialization = true;
const crates: string[][] = [];
const moves = [];

for (const line of lines) {
  if (initialization) {
    if (line.startsWith(" 1   2")) {
      initialization = false;
      continue;
    }
    const row = line.match(regexCrates);
    for (const i in row) {
      const index = parseInt(i, 10);
      // If doesn't exist init
      if (!crates[index]) {
        crates[index] = [];
      }
      // empty has 4 spaces, length 4
      if (row[index].length === 1) {
        crates[index].push(row[index]);
      }
    }
  } else {
    const row = line.match(regexMoves);
    if (row) {
      moves.push(row.map((n) => parseInt(n, 10)));
    }
  }
}
console.log("init");
console.log(crates);
console.log("moves");
console.log(moves);

for (const e of moves) {
  const arr = crates[e[1] - 1].splice(0, e[0]);
  crates[e[2] - 1] = arr.concat(crates[e[2] - 1]);
}

const result = crates.map((e) => e[0]).join("");
console.log(result);
