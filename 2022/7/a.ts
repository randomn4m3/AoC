const input = await Deno.readTextFile("./input.txt");

const rows = input.split("\n");

const folderSize = new Map<string, number>();

const folders: string[] = [];
let pwd = "";

for (const row of rows) {
  if (row.startsWith("$ cd")) {
    const folder = row.split(" ").slice(-1)[0];
    if (folder === "..") {
      if (folders.length > 1) {
        folders.pop();
      }
    } else {
      folders.push(folder);
      pwd = folders.join();
      if (!folderSize.has(pwd)) {
        folderSize.set(pwd, 0);
      }
    }
  } else if (row.startsWith("$ ls")) {
    continue;
  } else {
    if (row.startsWith("dir")) continue;
    const fileSize = Number(row.split(" ")[0]);
    for (let i = (folders.length - 1); i >= 0; i--) {
      pwd = folders.slice(0, i + 1).join();
      if (folderSize.has(pwd)) {
        const existingSize = folderSize.get(pwd);
        folderSize.set(pwd, existingSize + fileSize);
      } else {
        folderSize.set(pwd, fileSize);
      }
    }
  }
}

console.log(
  [...folderSize.values()].filter((i) => i <= 100_000).reduce(
    (a, b) => a + b,
    0,
  ),
);
