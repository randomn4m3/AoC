import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";

function solution(input: string): number {
  const lines = input.split("\n");
  let result = 0;

  let toLook = [];
  let twoLinesAbove = [""];
  for (const line of lines) {
    const tLA = twoLinesAbove.shift()!;
    let startIndx;
    while ((startIndx = toLook.shift()) != null) {
      const endIndx = toLook.shift();
      const number = toLook.shift();

      const lineSubstring = line.substring(startIndx, endIndx);
      if (lineSubstring.match(/[!@#$%^&*()_+{}|:;<>,?/~`\[\]=-]/g) !== null) {
        result += number!;
        continue;
      }
    }
    toLook = [];

    let number: RegExpMatchArray | null;
    const regex = /\d+/g;
    while ((number = regex.exec(line)) != null) {
      const startIndex = number.index ?? 0;
      const endIndex = (startIndex ?? 0) + number[0].length - 1;
      const toSum = parseInt(number[0], 10);
      let toPushStart = 0;
      let toPushEnd = line.length;

      // Symbol in the same line
      if (startIndex > 0) {
        if (number.input?.charAt(startIndex - 1) !== ".") {
          result += toSum;
          continue;
        } else {
          toPushStart = startIndex - 1;
          toLook.push(toPushStart);
        }
      } else {
        toLook.push(toPushStart);
      }

      if (endIndex < line.length - 1) {
        if (number.input?.charAt(endIndex + 1) !== ".") {
          toLook.pop();
          result += toSum;
          continue;
        } else {
          toPushEnd = endIndex + 2;
          // +2 for substring
          toLook.push(toPushEnd);
        }
      } else {
        toLook.push(toPushEnd);
      }

      if (tLA.length > 0) {
        const tlaSubstring = tLA.substring(toPushStart, toPushEnd);
        if (
          tlaSubstring.match(/[!@#$%^&*()_+{}|:;<>,?/\\~`\[\]=-]/g) !== null
        ) {
          toLook.pop();
          toLook.pop();
          result += toSum;
          continue;
        }
      }

      toLook.push(toSum);
    }

    twoLinesAbove.push(line);
  }
  return result;
}

const sample = solution(await Deno.readTextFile("./sample.txt"));
assertEquals(sample, 4361);

const result = solution(await Deno.readTextFile("./input.txt"));
console.log(`Result: ${result}`);
