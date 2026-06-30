import { NextResponse } from "next/server";
import { z } from "zod";

import { answerGrounded, detectLangAndIntent } from "@/lib/ai";
import { getCurrentUser } from "@/lib/auth";
import { createGrievance } from "@/lib/grievances/store";
import { loadKnowledgeBase } from "@/lib/rag/ingest";
import { retrieveKnowledge, detectHinglish } from "@/lib/rag/retrieve";
import { generalKnowledgeAnswer } from "@/lib/rag/general-knowledge";

const requestSchema = z.object({
  message: z.string().min(2)
});

const RELEVANCE_THRESHOLD = 0.45;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const user = await getCurrentUser();
  const { message } = parsed.data;
  const { language, intent } = await detectLangAndIntent(message);
  const isHinglish = detectHinglish(message);

  // Step 1: Check general knowledge FIRST for skill/career/tech topics not in KB.
  // This runs before KB retrieval so off-KB topics always get a relevant answer.
  const isHumanRequest = intent === "human" || intent === "grievance";
  if (!isHumanRequest) {
    const gkAnswer = generalKnowledgeAnswer(message, language, isHinglish);
    if (gkAnswer) {
      return NextResponse.json({
        answer: gkAnswer,
        language,
        intent,
        escalated: false,
        grievance: null,
        citations: [],
        source: "general-knowledge"
      });
    }
  }

  // Step 2: KB retrieval for scholarship / scheme / resource / helpline queries
  const kb = await loadKnowledgeBase();
  const retrieved = await retrieveKnowledge(message, intent, 5);
  const topScore = retrieved[0]?.score ?? 0;
  const isBelowThreshold = topScore < RELEVANCE_THRESHOLD;

  const shouldEscalate = isHumanRequest || isBelowThreshold;

  // Only surface KB docs when they're actually relevant AND the user didn't ask for a human
  const contexts = isHumanRequest || isBelowThreshold
    ? []
    : retrieved.filter(
        (ctx, index, list) =>
          list.findIndex((entry) => entry.docId === ctx.docId) === index
      );

  const grievance = shouldEscalate
    ? await createGrievance({ text: message, language, userId: user?.id })
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
    citations: contexts.slice(0, 3).map((ctx) => ({
      title: ctx.docTitle,
      sourceUrl: ctx.sourceUrl,
      category: ctx.docCategory,
      score: ctx.score
    })),
    provider: kb.provider
  });
}
