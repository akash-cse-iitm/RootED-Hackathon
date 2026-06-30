import { NextResponse } from "next/server";
import { z } from "zod";

import { buildGapFinderResult } from "@/lib/gapfinder/engine";

const responseSchema = z.object({
  conceptId: z.string(),
  questionId: z.string(),
  selectedIndex: z.number(),
  isCorrect: z.boolean()
});

const requestSchema = z.object({
  mode: z.enum(["current", "returnee"]),
  responses: z.array(responseSchema)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid gap-finder payload." }, { status: 400 });
  }

  // Rich pre-generated lesson content is embedded in engine via seed-lessons.ts.
  // No live AI call is made — the demo always works reliably.
  const result = buildGapFinderResult(
    parsed.data.mode,
    parsed.data.responses,
    false
  );

  return NextResponse.json(result);
}

