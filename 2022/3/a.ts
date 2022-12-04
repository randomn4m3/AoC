const inputs = await Deno.readTextFile("./input.txt");

const sacks = inputs.split("\n");

let totalPoints = 0;
for (const sack of sacks) {
  const firstCompartment = sack.slice(0, sack.length / 2);
  const secondCompartment = sack.slice(sack.length / 2);

  for (const i in firstCompartment) {
    if (secondCompartment.includes(firstCompartment[i])) {
      totalPoints += firstCompartment[i] === firstCompartment[i].toLowerCase()
        ? firstCompartment[i].charCodeAt(0) - 96
        : firstCompartment[i].charCodeAt(0) - 38;
      break;
    }
  }
}

console.log(totalPoints);
