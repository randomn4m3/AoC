const input = await Deno.readTextFile("./input.txt");

const trees = input.split("\n").map((i) => i.split(""));

let score = 0;
let highestScore = 0;

function points(value: string, arr: string[]): number {
  let i = 0;
  let points = 0;
  while (i < arr.length) {
    if (arr[i] < value) {
      points++;
    } else {
      points++;
      break;
    }
    i++;
  }
  return points;
}

for (let i = 1; i < (trees.length - 1); i++) {
  for (let j = 1; j < (trees[i].length - 1); j++) {
    const left = trees[i].slice(0, j).reverse();
    score = points(trees[i][j], left);
    const right = trees[i].slice(j + 1);
    score *= points(trees[i][j], right);

    const column = trees.map((k) => k[j]);
    const top = column.slice(0, i).reverse();
    score *= points(trees[i][j], top);
    const bottom = column.slice(i + 1);
    score *= points(trees[i][j], bottom);
    if (score > highestScore) highestScore = score;
    score = 0;
  }
}

console.log(highestScore);
