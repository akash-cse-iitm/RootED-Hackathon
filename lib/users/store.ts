import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export type AppRole = "learner" | "mentor" | "ngo";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: AppRole;
  locale: string;
};

type UserState = {
  users: StoredUser[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  const colonIndex = storedHash.indexOf(":");
  if (colonIndex === -1) return false;
  const salt = storedHash.slice(0, colonIndex);
  const hash = storedHash.slice(colonIndex + 1);
  const attempt = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(attempt, "hex"));
}

const DEMO_SEED: Omit<StoredUser, "passwordHash">[] = [
  {
    id: "learner-demo",
    name: "Ananya Reddy",
    email: "ananya@demo.com",
    role: "learner",
    locale: "en"
  },
  {
    id: "mentor-demo",
    name: "Sravani Telugu",
    email: "sravani@demo.com",
    role: "mentor",
    locale: "te"
  },
  {
    id: "ngo-demo",
    name: "Rahul Foundation",
    email: "rahul@demo.com",
    role: "ngo",
    locale: "hi"
  }
];

let stateCache: UserState | null = null;

async function ensureState(): Promise<UserState> {
  if (stateCache) return stateCache;
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    stateCache = JSON.parse(raw) as UserState;
    return stateCache;
  } catch {
    const state: UserState = {
      users: DEMO_SEED.map((u) => ({
        ...u,
        passwordHash: hashPassword("demo123")
      }))
    };
    await fs.writeFile(USERS_FILE, `${JSON.stringify(state, null, 2)}\n`, "utf8");
    stateCache = state;
    return state;
  }
}

async function writeState(state: UserState): Promise<void> {
  await fs.writeFile(USERS_FILE, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  stateCache = state;
}

export async function listUsers(): Promise<StoredUser[]> {
  const state = await ensureState();
  return state.users;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  const state = await ensureState();
  return state.users.find((u) => u.id === id) ?? null;
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const state = await ensureState();
  return (
    state.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ??
    null
  );
}

export async function validateCredentials(
  email: string,
  password: string
): Promise<StoredUser | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  try {
    if (!verifyPassword(password, user.passwordHash)) return null;
  } catch {
    return null;
  }
  return user;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: AppRole;
  locale?: string;
}): Promise<StoredUser | { error: string }> {
  const state = await ensureState();
  const exists = state.users.some(
    (u) => u.email.toLowerCase() === input.email.toLowerCase()
  );
  if (exists) return { error: "Email already registered. Please log in." };

  const user: StoredUser = {
    id: `user-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
    name: input.name.trim(),
    email: input.email.toLowerCase().trim(),
    passwordHash: hashPassword(input.password),
    role: input.role,
    locale: input.locale ?? "en"
  };

  state.users.push(user);
  await writeState(state);
  return user;
}
