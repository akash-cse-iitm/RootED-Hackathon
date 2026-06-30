const fs = require("node:fs");
const path = require("node:path");

const kbDir = path.join(process.cwd(), "content", "kb");
const files = fs
  .readdirSync(kbDir)
  .filter((file) => file.endsWith(".md"))
  .sort();

console.log(`RootED KB ready: ${files.length} markdown docs found in content/kb.`);
files.forEach((file) => console.log(`- ${file}`));
