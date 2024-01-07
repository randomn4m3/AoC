import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

const MAX: { [key: string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};

function solution(input: string): number {
  const lines = input.split("\n");
  let result = 0;

  for (const line of lines) {
    const game = line.match(/\d+/);
    if (game !== null) {
      const red = line.match(/\d+\sred/g);
      const invalidRed = red
        ?.map((i) => parseInt(i, 10))
        .filter((r) => r > MAX.red);
      if (invalidRed?.length ?? 0 > 0) continue;

      const green = line.match(/\d+\sgreen/g);
      const invalidGreen = green
        ?.map((i) => parseInt(i, 10))
        .filter((r) => r > MAX.green);
      if (invalidGreen?.length ?? 0 > 0) continue;

      const blue = line.match(/\d+\sblue/g);
      const invalidBlue = blue
        ?.map((i) => parseInt(i, 10))
        .filter((r) => r > MAX.blue);
      if (invalidBlue?.length ?? 0 > 0) continue;

      result += +game;
    }
  }
  return result;
}

const sample = solution(await Deno.readTextFile("./sample.txt"));
assertEquals(sample, 8);

const result = solution(await Deno.readTextFile("./input.txt"));
console.log(`Result: ${result}`);
