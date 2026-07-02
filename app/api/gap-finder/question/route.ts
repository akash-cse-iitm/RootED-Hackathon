import { NextResponse } from "next/server";
import { z } from "zod";

import { isAiConfigured } from "@/lib/ai";
import { isHfConfigured, hfGenerate, extractJson } from "@/lib/hf";
import { getSeedQuestion } from "@/lib/gapfinder/seed-questions";
import type { DifficultyLevel } from "@/lib/gapfinder/adaptive";

const LANG_INSTRUCTION: Record<string, string> = {
  en: "Write the question, all options, and explanation in English.",
  hi: "Write the question, all options, and explanation in Hindi (Devanagari script — हिंदी में लिखें).",
  te: "Write the question, all options, and explanation in Telugu (Telugu script — తెలుగులో రాయండి).",
};

const schema = z.object({
  topic: z.string().min(2).max(100),
  level: z.number().int().min(1).max(5),
  askedIds: z.array(z.string()).default([]),
  lang: z.enum(["en", "hi", "te"]).default("en"),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { topic, level, askedIds, lang } = parsed.data;

  if (isAiConfigured()) {
    try {
      return NextResponse.json(await generateAiQuestion(topic, level, askedIds, lang));
    } catch { /* fall through */ }
  }

  if (isHfConfigured()) {
    try {
      return NextResponse.json(await generateHfQuestion(topic, level, askedIds, lang));
    } catch { /* fall through */ }
  }

  // Seed bank is English only — fall back to English regardless of lang
  const question = getSeedQuestion(topic, level as DifficultyLevel, askedIds);
  if (!question) {
    for (const fb of [level - 1, level + 1, 3, 2, 4, 1, 5] as DifficultyLevel[]) {
      if (fb < 1 || fb > 5) continue;
      const q = getSeedQuestion(topic, fb, askedIds);
      if (q) return NextResponse.json({ ...q, level: fb });
    }
    return NextResponse.json({ error: "No more questions available" }, { status: 404 });
  }

  return NextResponse.json(question);
}

async function generateAiQuestion(
  topic: string,
  level: number,
  askedIds: string[],
  lang: string
) {
  const levelDesc: Record<number, string> = {
    1: "very basic definitions and recall, suitable for a complete beginner",
    2: "simple application of concepts, someone with a little experience",
    3: "moderate problem-solving for an intermediate learner",
    4: "advanced analysis and edge cases for an experienced learner",
    5: "expert / competitive exam level for a professional or top student",
  };

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL,
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: `Generate ONE multiple-choice question about "${topic}" at difficulty level ${level}/5 (${levelDesc[level]}) for Indian students.

${LANG_INSTRUCTION[lang] ?? LANG_INSTRUCTION.en}

Rules:
- Exactly 4 options (no "All of the above" / "None of the above")
- One correct answer
- Brief, clear explanation
- Different from these already-asked IDs: ${askedIds.join(", ") || "none"}

Return ONLY valid JSON (no markdown):
{"question":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"..."}`,
        },
      ],
    }),
  });

  if (!response.ok) throw new Error("Anthropic API error");

  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = data.content?.find((c) => c.type === "text")?.text ?? "";
  const parsed = JSON.parse(text.replace(/```json|```/g, "").trim()) as {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };

  return {
    id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    topic,
    level,
    lang,
    question: parsed.question,
    options: parsed.options,
    correctIndex: parsed.correctIndex,
    explanation: parsed.explanation,
  };
}

async function generateHfQuestion(
  topic: string,
  level: number,
  askedIds: string[],
  lang: string
) {
  const levelDesc: Record<number, string> = {
    1: "very basic — definitions only",
    2: "simple applications",
    3: "intermediate problem-solving",
    4: "advanced analysis",
    5: "expert / competitive level",
  };

  const langLine = LANG_INSTRUCTION[lang] ?? LANG_INSTRUCTION.en;

  const prompt = `<s>[INST] Generate one multiple-choice question about "${topic}" at difficulty level ${level}/5 (${levelDesc[level]}) for Indian students.

${langLine}
- Exactly 4 answer options
- One correct answer
- Short explanation
- Return ONLY valid JSON:
{"question":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"..."}

Do NOT reuse these IDs: ${askedIds.join(", ") || "none"} [/INST]`;

  const raw = await hfGenerate(prompt, 450);
  const parsed = JSON.parse(extractJson(raw)) as {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };

  return {
    id: `hf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    topic,
    level,
    lang,
    question: parsed.question,
    options: parsed.options,
    correctIndex: parsed.correctIndex,
    explanation: parsed.explanation,
    source: "hf",
  };
}
