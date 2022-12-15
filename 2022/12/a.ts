import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const VERY_BIG_NUMBER = 1_000_000;
type Point = { y: number; x: number };

function solution(input: string): number {
  const rows = input.split("\n");
  const arr = new Array(rows.length);
  const endPosition: Point = { y: 0, x: 0 };
  const startPosition: Point = { y: 0, x: 0 };
  for (const i in rows) {
    const letter = rows[i].split("");
    letter.map((l: string, index: number) => {
      if (l === "S") {
        startPosition.y = parseInt(i);
        startPosition.x = index;
      }
    });
    arr[i] = letter.map((l) => l.charCodeAt(0) - 97);

    arr[i].map((l: number, index: number) => {
      if (l < 0) {
        endPosition.y = parseInt(i);
        endPosition.x = index;
        arr[i][index] = 26;
      }
    });
  }

  const distance = new Array(arr.length).fill(VERY_BIG_NUMBER).map(() =>
    new Array(arr[0].length).fill(VERY_BIG_NUMBER)
  );
  distance[endPosition.y][endPosition.x] = 0;

  let searchingPoints: Point[] = [endPosition];

  while (true) {
    const newPoints: Point[] = [];

    for (const searchingPoint of searchingPoints) {
      const { y, x } = searchingPoint;
      const cv: number = arr?.[y]?.[x];
      const moves: Point[] = [];
      if (arr?.[y - 1]?.[x] >= cv - 1) {
        moves.push({ y: y - 1, x });
      }
      if (arr?.[y + 1]?.[x] >= cv - 1) {
        moves.push({ y: y + 1, x });
      }
      if (arr?.[y]?.[x + 1] >= cv - 1) {
        moves.push({ y, x: x + 1 });
      }
      if (arr?.[y]?.[x - 1] >= cv - 1) {
        moves.push({ y, x: x - 1 });
      }

      for (const move of moves) {
        if ((move.y === startPosition.y) && (move.x === startPosition.x)) {
          return distance[y][x] + 1;
        }

        if (distance[move.y][move.x] === VERY_BIG_NUMBER) {
          newPoints.push(move);
          distance[move.y][move.x] = distance[y][x] + 1;
        }
      }
    }
    searchingPoints = newPoints;
  }
}

const sample = solution(await Deno.readTextFile("./sample.txt"));
console.log(`Result: ${sample}`);
assertEquals(sample, 31);

const result = solution(await Deno.readTextFile("./input.txt"));
console.log(`Result: ${result}`);
