import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

function solution(input: string): number {
  const lines = input.split("\n");
  let result = 0;

  for (const line of lines) {
    // grep numbers of string each digit separately
    const numbers = line.match(/\d/g);
    if (numbers !== null) {
      const first = numbers[0];
      const last = numbers[numbers.length - 1];
      result += Number(first + last);
    }
  }
  return result;
}

const sample = solution(await Deno.readTextFile("./sample.txt"));
console.log(`Result: ${sample}`);
assertEquals(sample, 142);

const result = solution(await Deno.readTextFile("./input.txt"));
console.log(`Result: ${result}`);
