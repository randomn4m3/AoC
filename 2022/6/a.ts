const input = await Deno.readTextFile("./input.txt");

const letters = input.split("");

console.log(letters);

for (let i = 0; i <= (letters.length - 4); i++) {
  if (new Set(letters.slice(i, i + 4)).size === 4) {
    console.log(new Set(letters.slice(i, i + 4)));
    console.log(i + 4);
    break;
  }
}
