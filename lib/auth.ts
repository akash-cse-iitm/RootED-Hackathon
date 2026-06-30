import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { ROLE_MODULES, SESSION_COOKIE } from "@/lib/site";
import type { AppRole } from "@/lib/site";
import { findUserById } from "@/lib/users/store";

export async function getCurrentUser() {
  const sessionValue = cookies().get(SESSION_COOKIE)?.value;
  if (!sessionValue) return null;
  return findUserById(sessionValue);
}

/** Require authentication + optional role access for a module id. Redirects on failure. */
export async function requireAuth(moduleId?: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  if (moduleId && !ROLE_MODULES[user.role].includes(moduleId)) {
    redirect("/dashboard");
  }
  return user;
}
