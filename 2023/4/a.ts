import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

function solution(input: string, winningNumbers = 5): number {
  const lines = input.split("\n");
  let result = 0;

  for (const line of lines) {
    const numbers = line.match(/\d+/g);
    const winners = numbers?.slice(1, winningNumbers + 1).map(Number);
    const ticket = numbers?.slice(winningNumbers + 1).map(Number);

    const intersection = winners?.filter((x) => ticket?.includes(x));

    if (intersection === undefined || intersection.length < 1) continue;

    result += Math.pow(2, intersection.length - 1);
  }
  return result;
}

const sample = solution(await Deno.readTextFile("./sample.txt"));
assertEquals(sample, 13);

const result = solution(await Deno.readTextFile("./input.txt"), 10);
console.log(`Result: ${result}`);
