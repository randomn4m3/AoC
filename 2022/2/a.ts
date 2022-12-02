const inputs = await Deno.readTextFile("./input.txt");

const points = new Map();

points.set("X", 1);
points.set("Y", 2);
points.set("Z", 3);
points.set("A X", 3);
points.set("A Y", 6);
points.set("A Z", 0);
points.set("B X", 0);
points.set("B Y", 3);
points.set("B Z", 6);
points.set("C X", 6);
points.set("C Y", 0);
points.set("C Z", 3);

const rounds = inputs.split("\n");
console.log(rounds);

let totalPoints = 0;
for (const round of rounds) {
  totalPoints += points.get(round);
  totalPoints += points.get(round.slice(-1));
}

console.log(totalPoints);
