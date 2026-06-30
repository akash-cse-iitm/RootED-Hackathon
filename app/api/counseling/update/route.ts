import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { updateSession } from "@/lib/counseling/store";

const schema = z.object({
  id: z.string().min(1),
  status: z.enum(["pending", "scheduled", "completed", "closed"]),
  scheduledAt: z.string().optional(),
  counselorNotes: z.string().optional()
});

export async function PATCH(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ngo") {
    return NextResponse.json({ error: "NGO role required." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update." }, { status: 400 });
  }

  const { id, ...patch } = parsed.data;
  const updated = await updateSession(id, { ...patch, counselorId: user.id });

  if (!updated) {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, session: updated });
}
