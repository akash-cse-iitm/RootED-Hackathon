import { promises as fs } from "node:fs";
import path from "node:path";

export type CounselingTopic =
  | "dropout-pressure"
  | "child-marriage"
  | "financial"
  | "mental-health"
  | "peer-conflict"
  | "domestic-violence"
  | "attendance"
  | "other";

export type CounselingSession = {
  id: string;
  userId?: string;
  contactName: string;
  contactPhone: string;
  language: string;
  topic: CounselingTopic;
  description: string;
  status: "pending" | "scheduled" | "completed" | "closed";
  scheduledAt?: string;
  counselorId?: string;
  counselorNotes?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "counseling.json");
let mutationQueue = Promise.resolve();

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(FILE);
  } catch {
    await fs.writeFile(FILE, "[]\n", "utf8");
  }
}

async function readAll(): Promise<CounselingSession[]> {
  await ensureStore();
  const raw = await fs.readFile(FILE, "utf8");
  return JSON.parse(raw);
}

async function writeAll(sessions: CounselingSession[]) {
  await ensureStore();
  await fs.writeFile(FILE, `${JSON.stringify(sessions, null, 2)}\n`, "utf8");
}

async function withMutation<T>(fn: () => Promise<T>): Promise<T> {
  const next = mutationQueue.then(fn, fn);
  mutationQueue = next.then(() => undefined, () => undefined);
  return next;
}

export async function listSessions(): Promise<CounselingSession[]> {
  const sessions = await readAll();
  return sessions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getSession(id: string): Promise<CounselingSession | null> {
  const sessions = await readAll();
  return sessions.find((s) => s.id === id) ?? null;
}

export async function createSession(input: {
  userId?: string;
  contactName: string;
  contactPhone: string;
  language: string;
  topic: CounselingTopic;
  description: string;
}): Promise<CounselingSession> {
  return withMutation(async () => {
    const sessions = await readAll();
    const session: CounselingSession = {
      id: `csl-${Date.now()}`,
      ...input,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    sessions.push(session);
    await writeAll(sessions);
    return session;
  });
}

export async function updateSession(
  id: string,
  patch: Partial<Pick<CounselingSession, "status" | "scheduledAt" | "counselorId" | "counselorNotes">>
): Promise<CounselingSession | null> {
  return withMutation(async () => {
    const sessions = await readAll();
    const idx = sessions.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    sessions[idx] = { ...sessions[idx], ...patch };
    await writeAll(sessions);
    return sessions[idx];
  });
}
