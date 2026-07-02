import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { addVocationalSkill, listVocationalSkills } from "@/lib/earn/store";
import { VOCATIONAL_CATEGORIES } from "@/lib/earn/constants";

const schema = z.object({
  category: z.enum(VOCATIONAL_CATEGORIES),
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(600),
  yearsOfExperience: z.number().int().min(0).max(60),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", issues: parsed.error.issues }, { status: 400 });
  }

  const skill = await addVocationalSkill({
    ...parsed.data,
    userId: user.id,
    userName: user.name,
  });

  return NextResponse.json(skill, { status: 201 });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const skills = await listVocationalSkills(
    user.role === "mentor" || user.role === "ngo" ? undefined : user.id
  );

  return NextResponse.json(skills);
}
