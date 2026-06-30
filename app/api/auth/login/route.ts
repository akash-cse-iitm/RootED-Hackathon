import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, seededUsers } from "@/lib/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const userId = body?.userId;
  const user = seededUsers.find((entry) => entry.id === userId);

  if (!user) {
    return NextResponse.json({ error: "Unknown user" }, { status: 400 });
  }

  cookies().set(SESSION_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return NextResponse.json({ ok: true });
}

