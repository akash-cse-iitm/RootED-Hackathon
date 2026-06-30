import { promises as fs } from "node:fs";
import path from "node:path";

export type StoredGrievance = {
  id: string;
  userId?: string;
  text: string;
  language: string;
  status: "open" | "claimed" | "resolved";
  createdAt: string;
  claimedBy?: string;
  resolvedBy?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const GRIEVANCE_FILE = path.join(DATA_DIR, "grievances.json");
let mutationQueue = Promise.resolve();

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(GRIEVANCE_FILE);
  } catch {
    await fs.writeFile(GRIEVANCE_FILE, "[]\n", "utf8");
  }
}

async function readAll() {
  await ensureStore();
  const raw = await fs.readFile(GRIEVANCE_FILE, "utf8");
  return JSON.parse(raw) as StoredGrievance[];
}

async function writeAll(grievances: StoredGrievance[]) {
  await ensureStore();
  await fs.writeFile(GRIEVANCE_FILE, `${JSON.stringify(grievances, null, 2)}\n`, "utf8");
}

async function withMutation<T>(action: () => Promise<T>) {
  const next = mutationQueue.then(action, action);
  mutationQueue = next.then(
    () => undefined,
    () => undefined
  );
  return next;
}

export async function listGrievances() {
  const grievances = await readAll();
  return grievances.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function createGrievance(input: {
  text: string;
  language: string;
  userId?: string;
}) {
  return withMutation(async () => {
    const grievances = await readAll();
    const grievance: StoredGrievance = {
      id: `grv-${Date.now()}`,
      text: input.text,
      language: input.language,
      userId: input.userId,
      status: "open",
      createdAt: new Date().toISOString()
    };

    grievances.push(grievance);
    await writeAll(grievances);
    return grievance;
  });
}

export async function updateGrievanceStatus(
  id: string,
  status: StoredGrievance["status"],
  actorId?: string
) {
  return withMutation(async () => {
    const grievances = await readAll();
    const next = grievances.map((grievance) => {
      if (grievance.id !== id) {
        return grievance;
      }

      return {
        ...grievance,
        status,
        claimedBy:
          status === "claimed" ? actorId : grievance.claimedBy ?? actorId,
        resolvedBy: status === "resolved" ? actorId : grievance.resolvedBy
      };
    });

    await writeAll(next);
    return next.find((grievance) => grievance.id === id) ?? null;
  });
}
