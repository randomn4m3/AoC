import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

function solution(input: string): number {
  const lines = input.split("\n");
  let result = 0;

  for (const line of lines) {
    const textNumbers: { [key: string]: string } = {
      one: "1",
      two: "2",
      three: "3",
      four: "4",
      five: "5",
      six: "6",
      seven: "7",
      eight: "8",
      nine: "9",
    };

    const asNumbers = line.replace(
      /one|two|three|four|five|six|seven|eight|nine/g,
      // trick for eightwo to get 82, otherwise need to change the first one and then the last one
      (m) => textNumbers[m] + m.charAt(m.length - 1)
    );
    const onceMore = asNumbers.replace(
      /one|two|three|four|five|six|seven|eight|nine/g,
      (m) => textNumbers[m]
    );
    const numbers = onceMore.match(/\d/g);
    if (numbers !== null) {
      const first = numbers[0];
      const last = numbers[numbers.length - 1];
      result += Number(first + last);
    }
  }
  return result;
}

const sample = solution(await Deno.readTextFile("./sample2.txt"));
console.log(`Result: ${sample}`);
assertEquals(sample, 281);

const result = solution(await Deno.readTextFile("./input.txt"));
console.log(`Result: ${result}`);
assertEquals(result, 53539);
