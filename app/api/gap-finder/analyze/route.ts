import { NextResponse } from "next/server";
import { z } from "zod";

import { isAiConfigured } from "@/lib/ai";
import { isHfConfigured, hfGenerate, extractJson } from "@/lib/hf";
import { getTopicConcepts, LEVEL_LABELS } from "@/lib/gapfinder/adaptive";
import type { DifficultyLevel } from "@/lib/gapfinder/adaptive";

const answerSchema = z.object({
  questionId: z.string(),
  level: z.number().int().min(1).max(5),
  correct: z.boolean(),
});

const schema = z.object({
  topic: z.string().min(2).max(100),
  answers: z.array(answerSchema).min(1),
  lang: z.enum(["en", "hi", "te"]).default("en"),
});

export type GapAnalysis = {
  proficiencyLevel: DifficultyLevel;
  proficiencyLabel: string;
  percentage: number;
  correctAtLevel: Record<number, { correct: number; total: number }>;
  masteredConcepts: string[];
  gapConcepts: string[];
  roadmap: RoadmapItem[];
  recommendation: string;
  aiGenerated: boolean;
};

export type RoadmapItem = {
  step: number;
  title: string;
  description: string;
  resources: string[];
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { topic, answers, lang } = parsed.data;

  const LANG_INSTRUCTION: Record<string, string> = {
    en: "Write all text (concepts, descriptions, recommendation) in English.",
    hi: "Write all text (concepts, descriptions, recommendation) in Hindi (हिंदी में लिखें).",
    te: "Write all text (concepts, descriptions, recommendation) in Telugu (తెలుగులో రాయండి).",
  };
  const langLine = LANG_INSTRUCTION[lang] ?? LANG_INSTRUCTION.en;

  // Always compute stats client-independently
  const levelStats: Record<number, { correct: number; total: number }> = {};
  for (let l = 1; l <= 5; l++) levelStats[l] = { correct: 0, total: 0 };
  for (const a of answers) {
    levelStats[a.level].total++;
    if (a.correct) levelStats[a.level].correct++;
  }

  let proficiencyLevel: DifficultyLevel = 1;
  for (let l = 1; l <= 5; l++) {
    const s = levelStats[l];
    if (s.total > 0 && s.correct / s.total >= 0.5) {
      proficiencyLevel = l as DifficultyLevel;
    }
  }

  if (isAiConfigured()) {
    try {
      const analysis = await aiGapAnalysis(topic, answers, proficiencyLevel, levelStats, langLine);
      return NextResponse.json(analysis);
    } catch {
      // fall through
    }
  }

  if (isHfConfigured()) {
    try {
      const analysis = await hfGapAnalysis(topic, proficiencyLevel, levelStats, langLine);
      return NextResponse.json(analysis);
    } catch {
      // fall through to static
    }
  }

  return NextResponse.json(staticFallback(topic, proficiencyLevel, levelStats));
}

async function aiGapAnalysis(
  topic: string,
  answers: Array<{ level: number; correct: boolean }>,
  proficiencyLevel: DifficultyLevel,
  levelStats: Record<number, { correct: number; total: number }>,
  langLine: string
): Promise<GapAnalysis> {
  const statsText = Object.entries(levelStats)
    .filter(([, s]) => s.total > 0)
    .map(([l, s]) => `Level ${l} (${LEVEL_LABELS[Number(l) as DifficultyLevel]}): ${s.correct}/${s.total} correct`)
    .join("\n");

  const prompt = `${langLine}

A student just completed an adaptive quiz on "${topic}".

Quiz results by difficulty level:
${statsText}

Overall proficiency: Level ${proficiencyLevel}/5 (${LEVEL_LABELS[proficiencyLevel]})

Based on these results, generate a detailed gap analysis. Return ONLY valid JSON (no markdown):

{
  "masteredConcepts": ["concept 1", "concept 2", ...],
  "gapConcepts": ["gap 1", "gap 2", ...],
  "roadmap": [
    {
      "step": 1,
      "title": "Short step title",
      "description": "What to study and why",
      "resources": ["Free resource 1 (URL if known)", "Resource 2"]
    }
  ],
  "recommendation": "One paragraph personalized advice for this student"
}

Rules:
- masteredConcepts: 3-5 specific subtopics they have demonstrated knowledge of (based on levels they scored well)
- gapConcepts: 3-6 specific subtopics they should learn next (starting just above their current level)
- roadmap: 3-4 actionable steps to close their gaps, with real free Indian learning resources (NPTEL, SWAYAM, Khan Academy, etc.) where relevant
- recommendation: practical, motivating, specific to their level and the topic`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL,
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) throw new Error("Anthropic API error");

  const data = await response.json() as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = data.content?.find((c) => c.type === "text")?.text ?? "";
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean) as {
    masteredConcepts: string[];
    gapConcepts: string[];
    roadmap: RoadmapItem[];
    recommendation: string;
  };

  return {
    proficiencyLevel,
    proficiencyLabel: LEVEL_LABELS[proficiencyLevel],
    percentage: proficiencyLevel * 20,
    correctAtLevel: levelStats,
    masteredConcepts: parsed.masteredConcepts,
    gapConcepts: parsed.gapConcepts,
    roadmap: parsed.roadmap,
    recommendation: parsed.recommendation,
    aiGenerated: true,
  };
}

async function hfGapAnalysis(
  topic: string,
  proficiencyLevel: DifficultyLevel,
  levelStats: Record<number, { correct: number; total: number }>,
  langLine: string
): Promise<GapAnalysis> {
  const statsText = Object.entries(levelStats)
    .filter(([, s]) => s.total > 0)
    .map(([l, s]) => `Level ${l}: ${s.correct}/${s.total} correct`)
    .join(", ");

  const prompt = `<s>[INST] ${langLine} A student completed an adaptive quiz on "${topic}". Results: ${statsText}. Proficiency: Level ${proficiencyLevel}/5.

Generate a concise gap analysis. Return ONLY valid JSON:
{
  "masteredConcepts": ["concept1", "concept2", "concept3"],
  "gapConcepts": ["gap1", "gap2", "gap3"],
  "roadmap": [
    {"step":1,"title":"First step","description":"What to do","resources":["NPTEL: nptel.ac.in","Khan Academy: khanacademy.org"]},
    {"step":2,"title":"Second step","description":"What to do next","resources":["SWAYAM: swayam.gov.in"]}
  ],
  "recommendation": "One paragraph of personalized advice."
} [/INST]`;

  const raw = await hfGenerate(prompt, 600);
  const parsed = JSON.parse(extractJson(raw)) as {
    masteredConcepts: string[];
    gapConcepts: string[];
    roadmap: RoadmapItem[];
    recommendation: string;
  };

  return {
    proficiencyLevel,
    proficiencyLabel: LEVEL_LABELS[proficiencyLevel],
    percentage: proficiencyLevel * 20,
    correctAtLevel: levelStats,
    masteredConcepts: parsed.masteredConcepts ?? [],
    gapConcepts: parsed.gapConcepts ?? [],
    roadmap: parsed.roadmap ?? [],
    recommendation: parsed.recommendation ?? "",
    aiGenerated: true,
  };
}

function staticFallback(
  topic: string,
  proficiencyLevel: DifficultyLevel,
  levelStats: Record<number, { correct: number; total: number }>
): GapAnalysis {
  const concepts = getTopicConcepts(topic);
  const mastered: string[] = [];
  const gaps: string[] = [];
  for (let l = 1; l <= 5; l++) {
    const c = concepts[l as DifficultyLevel] ?? [];
    if (l <= proficiencyLevel) mastered.push(...c);
    else gaps.push(...c);
  }

  const roadmap: RoadmapItem[] = gaps.slice(0, 3).map((gap, i) => ({
    step: i + 1,
    title: gap,
    description: `Study "${gap}" — the next concept after your current level.`,
    resources: [
      "NPTEL free courses: nptel.ac.in",
      "SWAYAM MOOC platform: swayam.gov.in",
      "Khan Academy (free): khanacademy.org",
    ],
  }));

  const levelDesc: Record<DifficultyLevel, string> = {
    1: `You are just starting out with ${topic}. Focus on mastering the core fundamentals before moving on.`,
    2: `You have a basic understanding of ${topic}. Practice more applied problems to reach intermediate level.`,
    3: `Solid intermediate grasp of ${topic}. Push into advanced topics and real-world applications.`,
    4: `Strong advanced skills in ${topic}. Sharpen expert-level concepts and competitive problems.`,
    5: `Expert in ${topic}! Consider teaching, contributing to projects, or taking specialization certifications.`,
  };

  return {
    proficiencyLevel,
    proficiencyLabel: LEVEL_LABELS[proficiencyLevel],
    percentage: proficiencyLevel * 20,
    correctAtLevel: levelStats,
    masteredConcepts: mastered,
    gapConcepts: gaps,
    roadmap,
    recommendation: levelDesc[proficiencyLevel],
    aiGenerated: false,
  };
}
