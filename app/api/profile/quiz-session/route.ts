import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { addQuizSession, upsertProfile } from "@/lib/profiles/store";

const schema = z.object({
  topic: z.string().min(1).max(100),
  proficiencyLevel: z.number().int().min(1).max(5),
  proficiencyLabel: z.string(),
  percentage: z.number().min(0).max(100),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  // Ensure profile exists
  await upsertProfile(user.id, {
    userName: user.name,
    email: user.email ?? "",
    lastSeenAt: new Date().toISOString(),
  });

  await addQuizSession(user.id, {
    ...parsed.data,
    completedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
