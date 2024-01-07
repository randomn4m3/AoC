import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

function neighborsMatches(line: string, asterisk: RegExpMatchArray): number[] {
  const neighbors = [];
  let matches: RegExpMatchArray | null;
  const regex = /\d+/g;
  while ((matches = regex.exec(line)) !== null) {
    if (
      matches.index !== undefined &&
      asterisk.index !== undefined &&
      matches.index < asterisk.index + 2 &&
      matches.index + matches[0].length > asterisk.index - 1
    ) {
      neighbors.push(+matches[0]);
    }
  }
  return neighbors;
}

function solution(input: string): number {
  const lines = input.split("\n");
  let result = 0;

  // ignore first and last time line because no asterisk
  for (let i = 1; i < lines.length - 1; i++) {
    const previousLine = lines[i - 1];
    const currentLine = lines[i];
    const nextLine = lines[i + 1];

    let asterisk: RegExpMatchArray | null;
    const regex = /\*/g;
    while ((asterisk = regex.exec(currentLine)) != null) {
      const neighbors = [];
      neighbors.push(...neighborsMatches(previousLine, asterisk));
      neighbors.push(...neighborsMatches(currentLine, asterisk));
      neighbors.push(...neighborsMatches(nextLine, asterisk));
      if (neighbors.length !== 2) continue;

      result += neighbors[0] * neighbors[1];
    }
  }
  return result;
}

const sample = solution(await Deno.readTextFile("./sample.txt"));
assertEquals(sample, 467835);

const result = solution(await Deno.readTextFile("./input.txt"));
console.log(`Result: ${result}`);
