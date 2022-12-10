import { writeAll } from "https://deno.land/std@0.167.0/streams/write_all.ts";

const input = await Deno.readTextFile("./input.txt");

const rows = input.split("\n");
const fifo = [];
let value = 1;
const sprite = new Array(40).fill(false);
sprite.fill(true, 0, 3);
const crt = new Array(6).fill(".").map(() => new Array(40).fill("."));
let row = -1;

for (let c = 0; c < 241; c++) {
  if (rows[c]?.startsWith("noop")) {
    fifo.push(0);
  } else if (rows[c]?.startsWith("addx")) {
    const val = (/-?\d+/g).exec(rows[c])!.map((n) => parseInt(n, 10))[0];
    fifo.push(0, val);
  }
  if (c % 40 === 0) {
    row++;
  }
  if (sprite[c % 40]) {
    crt[row][c % 40] = "#";
  }
  value += fifo.shift() ?? 0;
  sprite.fill(false);
  sprite.fill(true, value - 1, value + 2);
}

for (let i = 0; i < crt.length; i++) {
  for (let j = 0; j < crt[i].length; j++) {
    writeAll(Deno.stdout, new TextEncoder().encode(crt[i][j]));
  }
  writeAll(Deno.stdout, new TextEncoder().encode("\n"));
}
