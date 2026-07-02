import { promises as fs } from "node:fs";
import path from "node:path";

export type QuizSession = {
  topic: string;
  proficiencyLevel: number;
  proficiencyLabel: string;
  percentage: number;
  completedAt: string;
};

export type MentorInteraction = {
  mentorId: string;
  mentorName: string;
  note: string;
  at: string;
};

export type LearnerProfile = {
  userId: string;
  userName: string;
  email: string;
  personalStory: string;
  goals: string[];
  studyWindow: string;
  assignedMentorId: string | null;
  assignedMentorName: string | null;
  lastSeenAt: string;
  quizSessions: QuizSession[];
  mentorInteractions: MentorInteraction[];
  createdAt: string;
  updatedAt: string;
};

type ProfileStore = { profiles: LearnerProfile[] };

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "profiles.json");
let queue = Promise.resolve();

async function read(): Promise<ProfileStore> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as ProfileStore;
  } catch {
    return { profiles: [] };
  }
}

async function write(store: ProfileStore) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(store, null, 2) + "\n", "utf8");
}

function withMutation<T>(action: () => Promise<T>): Promise<T> {
  const next = queue.then(action, action);
  queue = next.then(() => undefined, () => undefined);
  return next;
}

export async function getProfile(userId: string): Promise<LearnerProfile | null> {
  const store = await read();
  return store.profiles.find((p) => p.userId === userId) ?? null;
}

export async function getAllProfiles(): Promise<LearnerProfile[]> {
  const store = await read();
  return store.profiles;
}

export async function upsertProfile(
  userId: string,
  patch: Partial<Omit<LearnerProfile, "userId" | "createdAt" | "updatedAt">>
): Promise<LearnerProfile> {
  return withMutation(async () => {
    const store = await read();
    const now = new Date().toISOString();
    const idx = store.profiles.findIndex((p) => p.userId === userId);
    if (idx === -1) {
      const profile: LearnerProfile = {
        userId,
        userName: patch.userName ?? "",
        email: patch.email ?? "",
        personalStory: patch.personalStory ?? "",
        goals: patch.goals ?? [],
        studyWindow: patch.studyWindow ?? "",
        assignedMentorId: patch.assignedMentorId ?? null,
        assignedMentorName: patch.assignedMentorName ?? null,
        lastSeenAt: patch.lastSeenAt ?? now,
        quizSessions: patch.quizSessions ?? [],
        mentorInteractions: patch.mentorInteractions ?? [],
        createdAt: now,
        updatedAt: now,
      };
      store.profiles.push(profile);
      await write(store);
      return profile;
    }
    store.profiles[idx] = { ...store.profiles[idx], ...patch, updatedAt: now };
    await write(store);
    return store.profiles[idx];
  });
}

export async function addQuizSession(
  userId: string,
  session: QuizSession
): Promise<void> {
  return withMutation(async () => {
    const store = await read();
    const now = new Date().toISOString();
    const idx = store.profiles.findIndex((p) => p.userId === userId);
    if (idx === -1) return;
    store.profiles[idx].quizSessions.push(session);
    store.profiles[idx].lastSeenAt = now;
    store.profiles[idx].updatedAt = now;
    await write(store);
  });
}

export async function assignMentor(
  learnerId: string,
  mentorId: string,
  mentorName: string
): Promise<LearnerProfile | null> {
  return withMutation(async () => {
    const store = await read();
    const now = new Date().toISOString();
    const idx = store.profiles.findIndex((p) => p.userId === learnerId);
    if (idx === -1) return null;
    store.profiles[idx].assignedMentorId = mentorId;
    store.profiles[idx].assignedMentorName = mentorName;
    store.profiles[idx].updatedAt = now;
    await write(store);
    return store.profiles[idx];
  });
}

export async function addMentorInteraction(
  learnerId: string,
  interaction: MentorInteraction
): Promise<void> {
  return withMutation(async () => {
    const store = await read();
    const now = new Date().toISOString();
    const idx = store.profiles.findIndex((p) => p.userId === learnerId);
    if (idx === -1) return;
    store.profiles[idx].mentorInteractions.push(interaction);
    store.profiles[idx].updatedAt = now;
    await write(store);
  });
}

export async function touchLastSeen(userId: string): Promise<void> {
  return withMutation(async () => {
    const store = await read();
    const now = new Date().toISOString();
    const idx = store.profiles.findIndex((p) => p.userId === userId);
    if (idx === -1) return;
    store.profiles[idx].lastSeenAt = now;
    store.profiles[idx].updatedAt = now;
    await write(store);
  });
}
