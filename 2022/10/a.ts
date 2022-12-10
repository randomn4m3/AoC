const input = await Deno.readTextFile("./input.txt");

const rows = input.split("\n");
rows.unshift("");
const fifo = [];
const signalStrength = [];
let value = 1;
let count = true;

for (let c = 1; c < 221; c++) {
  if (rows[c]?.startsWith("noop")) {
    fifo.push(0);
  } else if (rows[c]?.startsWith("addx")) {
    const val = (/-?\d+/g).exec(rows[c])!.map((n) => parseInt(n, 10))[0];
    fifo.push(0, val);
  }
  if (c % 20 === 0) {
    if (count) {
      signalStrength.push(value * c);
    }
    count = !count;
  }
  value += fifo.shift() ?? 0;
}

console.log(signalStrength.reduce((a, b) => a + b, 0));
