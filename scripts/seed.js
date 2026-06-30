const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const lectureDir = path.join(root, "content", "lectures");
const kbDir = path.join(root, "content", "kb");
const dataDir = path.join(root, "data");
const earnFile = path.join(dataDir, "earn.json");
const grievanceFile = path.join(dataDir, "grievances.json");

function readLectureSeeds() {
  return fs
    .readdirSync(lectureDir)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) =>
      JSON.parse(fs.readFileSync(path.join(lectureDir, file), "utf8"))
    );
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

fs.mkdirSync(dataDir, { recursive: true });

const lectures = readLectureSeeds();
const kbDocs = fs.readdirSync(kbDir).filter((file) => file.endsWith(".md")).length;

writeJson(earnFile, {
  transcripts: lectures.map((lecture) => ({
    lectureId: lecture.id,
    language: lecture.reviewLanguage,
    segments: lecture.draftSegments,
    status: "draft"
  })),
  skillRecords: [],
  payouts: []
});

writeJson(grievanceFile, []);

console.log("RootED demo state reset.");
console.log(`- lectures: ${lectures.length}`);
console.log(`- kb docs: ${kbDocs}`);
console.log("- grievances: 0");
console.log("- payouts reset: yes");
