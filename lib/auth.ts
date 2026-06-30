import { cookies } from "next/headers";

import { SESSION_COOKIE, seededUsers } from "@/lib/site";

export async function getCurrentUser() {
  const sessionValue = cookies().get(SESSION_COOKIE)?.value;
  return seededUsers.find((user) => user.id === sessionValue) ?? null;
}

