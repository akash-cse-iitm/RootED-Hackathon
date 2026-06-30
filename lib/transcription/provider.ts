import { promises as fs } from "node:fs";
import path from "node:path";

export type LectureSeed = {
  id: string;
  title: string;
  sourceUrl: string;
  type: "academic" | "vocational";
  sourceLang: string;
  reviewLanguage: string;
  englishSegments: Array<{ start: number; end: number; text: string }>;
  draftSegments: Array<{ start: number; end: number; text: string }>;
};

export interface TranscriptionProvider {
  listLectures(): Promise<LectureSeed[]>;
  getLecture(id: string): Promise<LectureSeed | null>;
}

const LECTURE_DIR = path.join(process.cwd(), "content", "lectures");

async function loadSeedLectures() {
  const files = (await fs.readdir(LECTURE_DIR))
    .filter((file) => file.endsWith(".json"))
    .sort();

  return Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(LECTURE_DIR, file), "utf8");
      return JSON.parse(raw) as LectureSeed;
    })
  );
}

export class MockTranscriptionProvider implements TranscriptionProvider {
  async listLectures() {
    return loadSeedLectures();
  }

  async getLecture(id: string) {
    const lectures = await loadSeedLectures();
    return lectures.find((lecture) => lecture.id === id) ?? null;
  }
}

export class LiveTranscriptionProvider implements TranscriptionProvider {
  async listLectures() {
    return loadSeedLectures();
  }

  async getLecture(id: string) {
    const lectures = await loadSeedLectures();
    return lectures.find((lecture) => lecture.id === id) ?? null;
  }
}

export function getTranscriptionProvider(): TranscriptionProvider {
  if (process.env.USE_LIVE_TRANSCRIPTION === "true") {
    return new LiveTranscriptionProvider();
  }

  return new MockTranscriptionProvider();
}

