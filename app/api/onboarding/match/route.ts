import { NextResponse } from "next/server";
import { z } from "zod";

import { isAiConfigured } from "@/lib/ai";
import { isHfConfigured, hfGenerate, extractJson } from "@/lib/hf";

const schema = z.object({
  story: z.string().min(5).max(1000),
  goals: z.array(z.string()).min(1),
  studyWindow: z.string(),
});

export type MatchedModule = {
  id: string;
  title: string;
  href: string;
  why: string;
  priority: number;
};

export type OnboardingMatch = {
  challenges: string[];
  strengths: string[];
  modules: MatchedModule[];
  actionPlan: Array<{ step: number; action: string; timeframe: string }>;
  personalMessage: string;
  aiGenerated: boolean;
};

const ALL_MODULES: Omit<MatchedModule, "why" | "priority">[] = [
  { id: "gap-finder", title: "Gap Finder", href: "/gap-finder" },
  { id: "chat", title: "Scholarship Chatbot", href: "/chat" },
  { id: "reels", title: "Daily Reels", href: "/reels" },
  { id: "counseling", title: "Family Counseling", href: "/counseling" },
];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { story, goals, studyWindow } = parsed.data;

  if (isAiConfigured()) {
    try {
      return NextResponse.json(await anthropicMatch(story, goals, studyWindow));
    } catch { /* fall through */ }
  }

  if (isHfConfigured()) {
    try {
      return NextResponse.json(await hfMatch(story, goals, studyWindow));
    } catch { /* fall through */ }
  }

  return NextResponse.json(staticMatch(story, goals, studyWindow));
}

const PROMPT = (story: string, goals: string[], studyWindow: string) =>
  `You are a compassionate learning counselor for first-generation learners in India who have returned to education after a gap.

A learner shared their situation:
"${story}"

Their goals: ${goals.join(", ")}
Their best study time: ${studyWindow}

Available modules in RootED platform:
- gap-finder: Adaptive quiz to find exactly where their knowledge gaps are
- chat: Chatbot for scholarships, schemes, career advice in Hindi/Telugu/English
- reels: 2-minute daily learning videos and quiz reels (ideal for very limited time)
- counseling: Confidential counseling for family pressure, financial stress, life difficulties

Respond with ONLY valid JSON (no markdown):
{
  "challenges": ["specific challenge 1", "specific challenge 2", "specific challenge 3"],
  "strengths": ["strength/positive trait 1", "strength 2"],
  "modules": [
    {"id": "gap-finder", "title": "Gap Finder", "href": "/gap-finder", "why": "specific reason for this learner", "priority": 1},
    {"id": "chat", "title": "Scholarship Chatbot", "href": "/chat", "why": "specific reason", "priority": 2}
  ],
  "actionPlan": [
    {"step": 1, "action": "concrete first action", "timeframe": "Today"},
    {"step": 2, "action": "second action", "timeframe": "This week"},
    {"step": 3, "action": "third action", "timeframe": "This month"}
  ],
  "personalMessage": "A warm 2-3 sentence message directly to this learner, acknowledging their specific situation and encouraging them. Use 'you' and be personal."
}

Rules:
- challenges: their real obstacles (financial, time, confidence, family, health, etc.)
- strengths: what their story reveals about their character
- modules: include 2-4 most relevant, ranked by priority
- personalMessage: warm, specific, NOT generic. Reference their actual words.`;

async function anthropicMatch(
  story: string,
  goals: string[],
  studyWindow: string
): Promise<OnboardingMatch> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL,
      max_tokens: 700,
      messages: [{ role: "user", content: PROMPT(story, goals, studyWindow) }],
    }),
  });

  if (!res.ok) throw new Error("Anthropic error");

  const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
  const text = data.content?.find((c) => c.type === "text")?.text ?? "";
  const parsed = JSON.parse(text.replace(/```json|```/g, "").trim()) as Omit<OnboardingMatch, "aiGenerated">;
  return { ...parsed, aiGenerated: true };
}

async function hfMatch(
  story: string,
  goals: string[],
  studyWindow: string
): Promise<OnboardingMatch> {
  const prompt = `<s>[INST] ${PROMPT(story, goals, studyWindow)} [/INST]`;
  const raw = await hfGenerate(prompt, 700);
  const parsed = JSON.parse(extractJson(raw)) as Omit<OnboardingMatch, "aiGenerated">;
  return { ...parsed, aiGenerated: true };
}

function staticMatch(story: string, goals: string[], studyWindow: string): OnboardingMatch {
  const lc = story.toLowerCase();

  const challenges: string[] = [];
  if (/money|financial|fee|poor|afford|income|earn/i.test(lc))
    challenges.push("Financial constraints");
  if (/family|parents|marriage|pressure|home|responsibility/i.test(lc))
    challenges.push("Family responsibilities and pressure");
  if (/time|work|job|busy|no time/i.test(lc))
    challenges.push("Limited time due to work or responsibilities");
  if (/confidence|slow|stupid|behind|fail|scared/i.test(lc))
    challenges.push("Self-confidence and fear of being behind");
  if (/health|sick|hospital|illness/i.test(lc))
    challenges.push("Health challenges");
  if (challenges.length === 0) challenges.push("Life circumstances that made continuing difficult");

  const modules: MatchedModule[] = [];

  if (/money|financial|fee|scholarship/i.test(lc) || goals.includes("financial-freedom")) {
    modules.push({
      id: "chat", title: "Scholarship Chatbot", href: "/chat",
      why: "Find scholarships and government schemes that can support your education financially.",
      priority: 1,
    });
  }

  modules.push({
    id: "gap-finder", title: "Gap Finder", href: "/gap-finder",
    why: "Start exactly where you left off — not from zero. The quiz finds your precise starting point.",
    priority: modules.length + 1,
  });

  if (studyWindow === "short" || /no time|busy|work|job/i.test(lc)) {
    modules.push({
      id: "reels", title: "Daily Reels", href: "/reels",
      why: "2-minute daily videos that fit into any schedule — even commute time.",
      priority: modules.length + 1,
    });
  }

  if (/family|pressure|stress|alone/i.test(lc)) {
    modules.push({
      id: "counseling", title: "Family Counseling", href: "/counseling",
      why: "A confidential space to address family pressure and find support.",
      priority: modules.length + 1,
    });
  }

  if (modules.length < 2) {
    modules.push({
      id: "reels", title: "Daily Reels", href: "/reels",
      why: "Short daily content keeps learning consistent without overwhelming you.",
      priority: modules.length + 1,
    });
  }

  const goalLabel = goals[0] === "family"
    ? "your family's future"
    : goals[0] === "career" ? "your career" : goals[0] === "financial-freedom"
      ? "financial independence" : "your own growth";

  return {
    challenges,
    strengths: [
      "Courage to return despite obstacles",
      "Self-awareness about your own situation",
      goals.includes("family") ? "Deep commitment to family" : "Personal drive for growth",
    ],
    modules: modules.slice(0, 4),
    actionPlan: [
      {
        step: 1,
        action: `Open Gap Finder and take a 10-question quiz on the subject you last studied`,
        timeframe: "Today — 15 minutes",
      },
      {
        step: 2,
        action: `Set a ${studyWindow} study block in your daily routine and stick to it for 7 days`,
        timeframe: "This week",
      },
      {
        step: 3,
        action: `Explore scholarships in the chatbot that can support ${goalLabel}`,
        timeframe: "This month",
      },
    ],
    personalMessage: `You've already done the hardest part — deciding to come back. The obstacles you faced were real, not excuses. Every step forward now, no matter how small, is proof that you haven't given up. We're here to make sure this time is different.`,
    aiGenerated: false,
  };
}
