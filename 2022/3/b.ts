const inputs = await Deno.readTextFile("./input.txt");

const sacks = inputs.split("\n");

let totalPoints = 0;
for (let i = 0; i < (sacks.length - 2); i += 3) {
  for (const j in sacks[i]) {
    if (
      sacks[i + 1].includes(sacks[i][j]) && sacks[i + 2].includes(sacks[i][j])
    ) {
      totalPoints += sacks[i][j] === sacks[i][j].toLowerCase()
        ? sacks[i][j].charCodeAt(0) - 96
        : sacks[i][j].charCodeAt(0) - 38;
      break;
    }
  }
}

console.log(totalPoints);
