import { NextResponse } from "next/server";
import { z } from "zod";

import { generateRoadmapStep, isAiConfigured } from "@/lib/ai";
import { buildGapFinderResult } from "@/lib/gapfinder/engine";
import { conceptMap } from "@/lib/gapfinder/graph";

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

  const aiConfigured = isAiConfigured();
  const result = buildGapFinderResult(
    parsed.data.mode,
    parsed.data.responses,
    aiConfigured
  );

  const roadmaps = await Promise.all(
    result.roadmaps.map(async (roadmap) => ({
      ...roadmap,
      steps: await Promise.all(
        roadmap.steps.map(async (step) => ({
          ...step,
          ...(await generateRoadmapStep({
            conceptName: conceptMap[roadmap.rootGapId].name,
            learnerMode: parsed.data.mode,
            fallback: {
              title: step.title,
              explanation: step.explanation,
              workedExample: step.workedExample,
              practiceQuestions: step.practiceQuestions
            }
          }))
        }))
      )
    }))
  );

  return NextResponse.json({
    ...result,
    roadmaps
  });
}

