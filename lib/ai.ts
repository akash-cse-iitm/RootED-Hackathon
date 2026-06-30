import { roadmapPrompt } from "@/lib/prompts/gapfinder";

type RoadmapLesson = {
  title: string;
  explanation: string;
  workedExample: string;
  practiceQuestions: string[];
};

export function isAiConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_MODEL);
}

export async function generateRoadmapStep({
  conceptName,
  learnerMode,
  fallback
}: {
  conceptName: string;
  learnerMode: string;
  fallback: RoadmapLesson;
}): Promise<RoadmapLesson> {
  if (!isAiConfigured()) {
    return fallback;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL,
        max_tokens: 350,
        messages: [
          {
            role: "user",
            content: roadmapPrompt({ conceptName, learnerMode })
          }
        ]
      })
    });

    if (!response.ok) {
      return fallback;
    }

    const payload = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = payload.content?.find((item) => item.type === "text")?.text;

    if (!text) {
      return fallback;
    }

    const parsed = JSON.parse(text) as RoadmapLesson;
    if (
      !parsed.title ||
      !parsed.explanation ||
      !parsed.workedExample ||
      !Array.isArray(parsed.practiceQuestions)
    ) {
      return fallback;
    }

    return parsed;
  } catch {
    return fallback;
  }
}

