const inputs = await Deno.readTextFile("./input.txt");

const pairs = inputs.split("\n");

let fullyContains = 0;

for (const pair of pairs) {
  const pairArr = pair.split(",").flatMap((i) =>
    i.split("-").map((n) => parseInt(n, 10))
  );
  console.log(pairArr);
  if ((pairArr[0] <= pairArr[2]) && (pairArr[1] >= pairArr[3])) {
    fullyContains += 1;
  } else if ((pairArr[2] <= pairArr[0]) && (pairArr[3] >= pairArr[1])) {
    fullyContains += 1;
  }
}

console.log(fullyContains);
