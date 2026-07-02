import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { verifyVocationalSkill } from "@/lib/earn/store";

const schema = z.object({ skillId: z.string().min(1) });

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "mentor" && user.role !== "ngo") {
    return NextResponse.json({ error: "Only mentors can verify skills" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const skill = await verifyVocationalSkill(parsed.data.skillId, user.id);
  if (!skill) return NextResponse.json({ error: "Skill not found" }, { status: 404 });

  return NextResponse.json(skill);
}
