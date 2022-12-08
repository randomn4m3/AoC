const input = await Deno.readTextFile("./input.txt");

const trees = input.split("\n").map((i) => i.split(""));

const edgeTrees = (2 * trees.length) + ((trees[0].length - 2) * 2);
let interiorTree = 0;

for (let i = 1; i < (trees.length - 1); i++) {
  for (let j = 1; j < (trees[i].length - 1); j++) {
    // Visible from left
    const left = trees[i].slice(0, j).every((k) => k < trees[i][j]);
    // Visible from right
    const right = trees[i].slice(j + 1).every((k) => k < trees[i][j]);

    const column = trees.map((k) => k[j]);
    // Visible from top
    const top = column.slice(0, i).every((k) => k < trees[i][j]);
    // Visible from bottom
    const bottom = column.slice(i + 1).every((k) => k < trees[i][j]);
    if (left || right || top || bottom) {
      interiorTree += 1;
    }
  }
}

const visibleFromOutside = edgeTrees + interiorTree;
console.log(visibleFromOutside);
