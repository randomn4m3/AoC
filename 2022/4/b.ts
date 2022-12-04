const inputs = await Deno.readTextFile("./input.txt");

const pairs = inputs.split("\n");

let contains = 0;

for (const pair of pairs) {
  const pairArr = pair.split(",").flatMap((i) =>
    i.split("-").map((n) => parseInt(n, 10))
  );
  console.log(pairArr);
  if ((pairArr[2] <= pairArr[1]) && (pairArr[2] >= pairArr[0])) {
    contains += 1;
  } else if ((pairArr[0] <= pairArr[3]) && (pairArr[0] >= pairArr[2])) {
    contains += 1;
  }
}

console.log(contains);
