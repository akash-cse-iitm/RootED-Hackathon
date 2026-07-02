import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { upsertProfile, touchLastSeen } from "@/lib/profiles/store";

const schema = z.object({
  personalStory: z.string().max(2000).optional(),
  goals: z.array(z.string()).optional(),
  studyWindow: z.string().optional(),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const profile = await upsertProfile(user.id, {
    userName: user.name,
    email: user.email ?? "",
    lastSeenAt: new Date().toISOString(),
    ...parsed.data,
  });

  return NextResponse.json(profile);
}

export async function PATCH() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await touchLastSeen(user.id);
  return NextResponse.json({ ok: true });
}
