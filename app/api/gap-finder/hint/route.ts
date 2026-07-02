import { NextResponse } from "next/server";
import { z } from "zod";

import { isAiConfigured } from "@/lib/ai";
import { isHfConfigured, hfGenerate, extractJson } from "@/lib/hf";

const LANG_INSTRUCTION: Record<string, string> = {
  en: "Explain in English.",
  hi: "Explain in Hindi (हिंदी में समझाएं).",
  te: "Explain in Telugu (తెలుగులో వివరించు).",
};

const schema = z.object({
  topic: z.string().min(2).max(100),
  question: z.string().min(5).max(500),
  correctAnswer: z.string().min(1).max(300),
  explanation: z.string().max(500).optional(),
  lang: z.enum(["en", "hi", "te"]).default("en"),
});

export type HintResponse = {
  concept: string;
  explanation: string;
  example: string;
  tip: string;
  source?: string;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { topic, question, correctAnswer, explanation, lang } = parsed.data;
  const langLine = LANG_INSTRUCTION[lang] ?? LANG_INSTRUCTION.en;

  if (isAiConfigured()) {
    try {
      return NextResponse.json(
        await anthropicHint(topic, question, correctAnswer, explanation, langLine)
      );
    } catch { /* fall through */ }
  }

  if (isHfConfigured()) {
    try {
      return NextResponse.json(
        await hfHint(topic, question, correctAnswer, explanation, langLine)
      );
    } catch { /* fall through */ }
  }

  // Static fallback: return the built-in explanation
  return NextResponse.json({
    concept: topic,
    explanation: explanation ?? `The correct answer is: ${correctAnswer}`,
    example: `Try searching for "${correctAnswer}" on NPTEL or Khan Academy.`,
    tip: "Review this concept and attempt similar questions to strengthen your understanding.",
    source: "static",
  } satisfies HintResponse);
}

async function anthropicHint(
  topic: string,
  question: string,
  correctAnswer: string,
  explanation: string | undefined,
  langLine: string
): Promise<HintResponse> {
  const prompt = `${langLine}

A student got this ${topic} question wrong:
Question: ${question}
Correct answer: ${correctAnswer}
${explanation ? `Hint given: ${explanation}` : ""}

Explain the concept clearly so a student in India can understand it, with a practical example.
Return ONLY valid JSON (no markdown):
{"concept":"...","explanation":"2-3 sentence clear explanation","example":"concrete Indian-context example","tip":"one actionable study tip"}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL,
      max_tokens: 350,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error("Anthropic error");

  const data = (await res.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = data.content?.find((c) => c.type === "text")?.text ?? "";
  const clean = text.replace(/```json|```/g, "").trim();
  return { ...(JSON.parse(clean) as Omit<HintResponse, "source">), source: "anthropic" };
}

async function hfHint(
  topic: string,
  question: string,
  correctAnswer: string,
  explanation: string | undefined,
  langLine: string
): Promise<HintResponse> {
  const prompt = `<s>[INST] ${langLine} A student got this ${topic} question wrong.
Question: ${question}
Correct answer: ${correctAnswer}
${explanation ? `Explanation: ${explanation}` : ""}

Explain this concept clearly with an example. Return ONLY valid JSON:
{"concept":"short concept name","explanation":"2-3 sentences","example":"one concrete example","tip":"one study tip"} [/INST]`;

  const raw = await hfGenerate(prompt, 300);
  return { ...(JSON.parse(extractJson(raw)) as Omit<HintResponse, "source">), source: "hf" };
}
