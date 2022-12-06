const input = await Deno.readTextFile("./input.txt");

const letters = input.split("");

console.log(letters);

for (let i = 0; i <= (letters.length - 14); i++) {
  if (new Set(letters.slice(i, i + 14)).size === 14) {
    console.log(new Set(letters.slice(i, i + 14)));
    console.log(i + 14);
    break;
  }
}
