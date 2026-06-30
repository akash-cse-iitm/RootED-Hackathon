const fs = require("node:fs");
const path = require("node:path");

const lectureDir = path.join(process.cwd(), "content", "lectures");
const files = fs
  .readdirSync(lectureDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

console.log(`RootED lecture seeds ready: ${files.length} lecture files found.`);
files.forEach((file) => console.log(`- ${file}`));
