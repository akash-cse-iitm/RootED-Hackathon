import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { assignMentor } from "@/lib/profiles/store";
import { listUsers } from "@/lib/users/store";

const schema = z.object({
  learnerId: z.string().min(1),
  mentorId: z.string().min(1),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "ngo") {
    return NextResponse.json({ error: "Only NGOs can assign mentors" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const users = await listUsers();
  const mentor = users.find((u) => u.id === parsed.data.mentorId && u.role === "mentor");
  if (!mentor) return NextResponse.json({ error: "Mentor not found" }, { status: 404 });

  const profile = await assignMentor(parsed.data.learnerId, mentor.id, mentor.name);
  if (!profile) return NextResponse.json({ error: "Learner profile not found" }, { status: 404 });

  return NextResponse.json(profile);
}
