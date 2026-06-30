import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { SESSION_COOKIE } from "@/lib/site";
import { createUser } from "@/lib/users/store";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["learner", "translator", "ngo"])
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Invalid signup data.";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const result = await createUser(parsed.data);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  cookies().set(SESSION_COOKIE, result.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return NextResponse.json({ ok: true, role: result.role, name: result.name });
}
