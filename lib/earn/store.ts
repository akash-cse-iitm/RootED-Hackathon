import { promises as fs } from "node:fs";
import path from "node:path";

import { getTranscriptionProvider } from "@/lib/transcription/provider";
import type { VocationalSkill } from "@/lib/earn/constants";
export { VOCATIONAL_CATEGORIES } from "@/lib/earn/constants";
export type { VocationalSkill, VocationalCategory } from "@/lib/earn/constants";

export type StoredTranscript = {
  lectureId: string;
  language: string;
  segments: Array<{ start: number; end: number; text: string }>;
  status: "draft" | "in_review" | "published";
  authorId?: string;
  vetterId?: string;
};

export type UploadedLecture = {
  id: string;
  title: string;
  type: "academic" | "vocational";
  sourceLang: string;
  reviewLanguage: string;
  sourceUrl: string;
  englishSegments: Array<{ start: number; end: number; text: string }>;
  draftSegments: Array<{ start: number; end: number; text: string }>;
  uploadedAt: string;
};

export type SkillRecord = {
  id: string;
  userId: string;
  label: string;
  verifiedAt: string;
};

export type PayoutLedger = {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  createdAt: string;
};


type EarnState = {
  transcripts: StoredTranscript[];
  uploadedLectures: UploadedLecture[];
  skillRecords: SkillRecord[];
  payouts: PayoutLedger[];
  vocationalSkills: VocationalSkill[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const EARN_FILE = path.join(DATA_DIR, "earn.json");
let mutationQueue = Promise.resolve();

async function ensureState() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(EARN_FILE);
  } catch {
    const provider = getTranscriptionProvider();
    const lectures = await provider.listLectures();
    const state: EarnState = {
      transcripts: lectures.map((lecture) => ({
        lectureId: lecture.id,
        language: lecture.reviewLanguage,
        segments: lecture.draftSegments,
        status: "draft"
      })),
      uploadedLectures: [],
      skillRecords: [],
      payouts: [],
      vocationalSkills: [],
    };

    await fs.writeFile(EARN_FILE, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  }
}

async function readState() {
  await ensureState();
  const raw = await fs.readFile(EARN_FILE, "utf8");
  return JSON.parse(raw) as EarnState;
}

async function writeState(state: EarnState) {
  await ensureState();
  await fs.writeFile(EARN_FILE, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

async function withMutation<T>(action: () => Promise<T>) {
  const next = mutationQueue.then(action, action);
  mutationQueue = next.then(
    () => undefined,
    () => undefined
  );
  return next;
}

export async function listLectureCards() {
  const provider = getTranscriptionProvider();
  const lectures = await provider.listLectures();
  const state = await readState();

  return lectures.map((lecture) => ({
    ...lecture,
    transcript:
      state.transcripts.find((transcript) => transcript.lectureId === lecture.id) ?? null
  }));
}

export async function getLectureBundle(lectureId: string) {
  const provider = getTranscriptionProvider();
  const lecture = await provider.getLecture(lectureId);
  const state = await readState();
  const transcript = state.transcripts.find((item) => item.lectureId === lectureId) ?? null;

  if (!lecture || !transcript) {
    return null;
  }

  return {
    lecture,
    transcript
  };
}

export async function submitTranscriptReview(input: {
  lectureId: string;
  authorId: string;
  segments: Array<{ start: number; end: number; text: string }>;
}) {
  return withMutation(async () => {
    const state = await readState();
    state.transcripts = state.transcripts.map((transcript) =>
      transcript.lectureId === input.lectureId
        ? {
            ...transcript,
            segments: input.segments,
            status: "in_review",
            authorId: input.authorId
          }
        : transcript
    );

    await writeState(state);
    return state.transcripts.find((transcript) => transcript.lectureId === input.lectureId) ?? null;
  });
}

export async function approveTranscript(input: {
  lectureId: string;
  vetterId: string;
}) {
  return withMutation(async () => {
    const state = await readState();
    const transcript = state.transcripts.find((item) => item.lectureId === input.lectureId);
    const provider = getTranscriptionProvider();
    const lecture = await provider.getLecture(input.lectureId);

    if (!transcript || !lecture) {
      return null;
    }

    if (transcript.status !== "published") {
      transcript.status = "published";
      transcript.vetterId = input.vetterId;

      if (transcript.authorId) {
        const reason = `Verified ${transcript.language.toUpperCase()} transcription - ${lecture.title}`;
        const alreadyAwarded = state.payouts.some(
          (payout) => payout.userId === transcript.authorId && payout.reason === reason
        );

        if (!alreadyAwarded) {
          state.payouts.push({
            id: `pay-${Date.now()}`,
            userId: transcript.authorId,
            amount: 1500,
            reason,
            createdAt: new Date().toISOString()
          });
        }

        const label = `Verified ${transcript.language.toUpperCase()} transcription - ${lecture.title}`;
        const hasSkill = state.skillRecords.some(
          (record) => record.userId === transcript.authorId && record.label === label
        );

        if (!hasSkill) {
          state.skillRecords.push({
            id: `skill-${Date.now()}`,
            userId: transcript.authorId,
            label,
            verifiedAt: new Date().toISOString()
          });
        }
      }
    }

    await writeState(state);
    return transcript;
  });
}

export async function getPassport(userId: string) {
  const state = await readState();

  return {
    skills: state.skillRecords.filter((record) => record.userId === userId),
    payouts: state.payouts.filter((payout) => payout.userId === userId)
  };
}

export async function addUploadedLecture(
  input: Omit<UploadedLecture, "uploadedAt">
): Promise<UploadedLecture> {
  return withMutation(async () => {
    const state = await readState();
    if (!state.uploadedLectures) state.uploadedLectures = [];

    const lecture: UploadedLecture = {
      ...input,
      uploadedAt: new Date().toISOString()
    };
    state.uploadedLectures.push(lecture);

    // Also add a draft transcript so the review queue picks it up
    state.transcripts.push({
      lectureId: lecture.id,
      language: lecture.reviewLanguage,
      segments: lecture.draftSegments,
      status: "draft"
    });

    await writeState(state);
    return lecture;
  });
}

export async function listUploadedLectures(): Promise<UploadedLecture[]> {
  const state = await readState();
  return state.uploadedLectures ?? [];
}

export async function addVocationalSkill(
  input: Omit<VocationalSkill, "id" | "status" | "createdAt">
): Promise<VocationalSkill> {
  return withMutation(async () => {
    const state = await readState();
    if (!state.vocationalSkills) state.vocationalSkills = [];
    const entry: VocationalSkill = {
      ...input,
      id: `vskill-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      status: "self-reported",
      createdAt: new Date().toISOString(),
    };
    state.vocationalSkills.push(entry);
    await writeState(state);
    return entry;
  });
}

export async function listVocationalSkills(userId?: string): Promise<VocationalSkill[]> {
  const state = await readState();
  const all = state.vocationalSkills ?? [];
  return userId ? all.filter((s) => s.userId === userId) : all;
}

export async function verifyVocationalSkill(
  skillId: string,
  mentorId: string
): Promise<VocationalSkill | null> {
  return withMutation(async () => {
    const state = await readState();
    if (!state.vocationalSkills) state.vocationalSkills = [];
    const skill = state.vocationalSkills.find((s) => s.id === skillId);
    if (!skill) return null;
    skill.status = "mentor-verified";
    skill.verifiedBy = mentorId;
    skill.verifiedAt = new Date().toISOString();
    await writeState(state);
    return skill;
  });
}

