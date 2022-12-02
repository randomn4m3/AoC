const inputs = await Deno.readTextFile("./input.txt");

const points = new Map();

points.set("X", 0);
points.set("Y", 3);
points.set("Z", 6);
points.set("A X", 3);
points.set("A Y", 1);
points.set("A Z", 2);
points.set("B X", 1);
points.set("B Y", 2);
points.set("B Z", 3);
points.set("C X", 2);
points.set("C Y", 3);
points.set("C Z", 1);

const rounds = inputs.split("\n");
console.log(rounds);

let totalPoints = 0;
for (const round of rounds) {
  totalPoints += points.get(round);
  totalPoints += points.get(round.slice(-1));
}

console.log(totalPoints);
