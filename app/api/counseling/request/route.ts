import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { createSession } from "@/lib/counseling/store";

const schema = z.object({
  contactName: z.string().min(2, "Name is required."),
  contactPhone: z.string().min(6, "Phone number is required."),
  language: z.enum(["en", "hi", "te"]),
  topic: z.enum([
    "dropout-pressure",
    "child-marriage",
    "financial",
    "mental-health",
    "peer-conflict",
    "domestic-violence",
    "attendance",
    "other"
  ]),
  description: z.string().min(10, "Please describe the situation in a few words.")
});

export async function POST(request: Request) {
  const user = await getCurrentUser();

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Invalid request.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const session = await createSession({
    ...parsed.data,
    userId: user?.id
  });

  return NextResponse.json({ ok: true, session });
}
