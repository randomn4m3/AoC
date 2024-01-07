import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

function solution(input: string): number {
  const lines = input.split("\n");
  let result = 0;

  for (const line of lines) {
    const red = line.match(/\d+\sred/g);
    const maxRed =
      red?.map((i) => parseInt(i, 10)).reduce((a, b) => Math.max(a, b), 0) ?? 1;

    const green = line.match(/\d+\sgreen/g);
    const maxGreen =
      green?.map((i) => parseInt(i, 10)).reduce((a, b) => Math.max(a, b), 0) ??
      1;

    const blue = line.match(/\d+\sblue/g);
    const maxBlue =
      blue?.map((i) => parseInt(i, 10)).reduce((a, b) => Math.max(a, b), 0) ??
      1;

    result += maxRed * maxGreen * maxBlue;
  }
  return result;
}

const sample = solution(await Deno.readTextFile("./sample.txt"));
assertEquals(sample, 2286);

const result = solution(await Deno.readTextFile("./input.txt"));
console.log(`Result: ${result}`);
