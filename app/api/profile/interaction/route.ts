import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { addMentorInteraction } from "@/lib/profiles/store";

const schema = z.object({
  learnerId: z.string().min(1),
  note: z.string().min(1).max(500),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "mentor" && user.role !== "ngo") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  await addMentorInteraction(parsed.data.learnerId, {
    mentorId: user.id,
    mentorName: user.name,
    note: parsed.data.note,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
