const input = await Deno.readTextFile("./input.txt");

const numbers = input.split("\n").map((n) => parseInt(n, 10));

const elfCalories: number[] = [0];
let index = 0;

numbers.forEach((i) => {
  if (isNaN(i)) {
    index += 1;
    elfCalories[index] = 0;
  } else {
    elfCalories[index] += i;
  }
});

const sortedArray: number[] = elfCalories.sort((a, b) => b - a);

// Top 3
console.log(sortedArray.slice(0, 3).reduce((a, b) => a + b, 0));
