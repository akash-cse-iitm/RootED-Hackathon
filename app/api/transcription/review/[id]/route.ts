import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { submitTranscriptReview } from "@/lib/earn/store";

const requestSchema = z.object({
  segments: z.array(
    z.object({
      start: z.number(),
      end: z.number(),
      text: z.string().min(1)
    })
  )
});

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();

  if (!user || user.role !== "translator") {
    return NextResponse.json({ error: "Translator role required." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid transcript payload." }, { status: 400 });
  }

  const transcript = await submitTranscriptReview({
    lectureId: params.id,
    authorId: user.id,
    segments: parsed.data.segments
  });

  return NextResponse.json({ transcript });
}

