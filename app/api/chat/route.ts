import { NextResponse } from "next/server";
import { z } from "zod";

import { answerGrounded, detectLangAndIntent } from "@/lib/ai";
import { getCurrentUser } from "@/lib/auth";
import { createGrievance } from "@/lib/grievances/store";
import { loadKnowledgeBase } from "@/lib/rag/ingest";
import { retrieveKnowledge } from "@/lib/rag/retrieve";

const requestSchema = z.object({
  message: z.string().min(2)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const user = await getCurrentUser();
  const { message } = parsed.data;
  const { language, intent } = await detectLangAndIntent(message);
  const kb = await loadKnowledgeBase();
  const retrieved = await retrieveKnowledge(message, intent, 5);
  const topScore = retrieved[0]?.score ?? 0;
  const shouldEscalate =
    intent === "human" || intent === "grievance" || topScore < 0.35;
  const contexts =
    intent === "human" || intent === "grievance"
      ? []
      : retrieved.filter(
          (context, index, list) =>
            list.findIndex((entry) => entry.docId === context.docId) === index
        );

  const grievance = shouldEscalate
    ? await createGrievance({
        text: message,
        language,
        userId: user?.id
      })
    : null;

  const answer = await answerGrounded({
    query: message,
    contexts,
    lang: language,
    escalated: Boolean(grievance)
  });

  return NextResponse.json({
    answer,
    language,
    intent,
    escalated: Boolean(grievance),
    grievance,
    citations: contexts.slice(0, 3).map((context) => ({
      title: context.docTitle,
      sourceUrl: context.sourceUrl,
      category: context.docCategory,
      score: context.score
    })),
    provider: kb.provider
  });
}
