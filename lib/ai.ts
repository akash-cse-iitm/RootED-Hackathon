import { roadmapPrompt } from "@/lib/prompts/gapfinder";
import { groundedAnswerPrompt } from "@/lib/prompts/chat";
import type { ChatIntent, RetrievedContext, SupportedLocale } from "@/lib/rag/retrieve";

type RoadmapLesson = {
  title: string;
  explanation: string;
  workedExample: string;
  practiceQuestions: string[];
};

export function isAiConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_MODEL);
}

async function anthropicText(prompt: string, maxTokens = 350) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL,
      max_tokens: maxTokens,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error("Anthropic request failed");
  }

  const payload = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };

  return payload.content?.find((item) => item.type === "text")?.text ?? "";
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
    const text = await anthropicText(
      roadmapPrompt({ conceptName, learnerMode }),
      350
    );

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

export async function detectLangAndIntent(query: string): Promise<{
  language: SupportedLocale;
  intent: ChatIntent;
}> {
  const { detectIntent, detectLocale } = await import("@/lib/rag/retrieve");
  const fallback = {
    language: detectLocale(query),
    intent: detectIntent(query)
  };

  if (!isAiConfigured()) {
    return fallback;
  }

  try {
    const text = await anthropicText(
      `Return valid JSON with keys language and intent for this user message: ${query}`,
      120
    );
    const parsed = JSON.parse(text) as {
      language?: SupportedLocale;
      intent?: ChatIntent;
    };

    return {
      language: parsed.language || fallback.language,
      intent: parsed.intent || fallback.intent
    };
  } catch {
    return fallback;
  }
}

function summarizeContext(context: RetrievedContext, language: SupportedLocale) {
  if (language === "hi") {
    return context.summary_hi;
  }

  if (language === "te") {
    return context.summary_te;
  }

  return context.summary;
}

function localGroundedAnswer({
  contexts,
  lang,
  escalated
}: {
  contexts: RetrievedContext[];
  lang: SupportedLocale;
  escalated?: boolean;
}) {
  if (contexts.length === 0) {
    if (escalated) {
      if (lang === "hi") {
        return "यह सवाल मेरी मौजूदा नॉलेज बेस से हल नहीं हो सका, इसलिए मैंने इसे इंसानी सहायता के लिए grievance queue में भेज दिया है।";
      }

      if (lang === "te") {
        return "ఈ ప్రశ్నను ప్రస్తుత జ్ఞాన ఆధారంతో పరిష్కరించలేకపోయాను, అందుకే మానవ సహాయం కోసం grievance queue కి పంపించాను.";
      }

      return "I could not resolve this from the current knowledge base, so I have sent it to the human grievance queue.";
    }

    if (lang === "hi") {
      return "मुझे अभी अपने नॉलेज बेस में इसका भरोसेमंद जवाब नहीं मिला। मैं इसे इंसानी सहायता के लिए आगे भेज सकता हूँ।";
    }

    if (lang === "te") {
      return "నా పరిజ్ఞాన ఆధారంలో దీనికి నమ్మకమైన సమాధానం దొరకలేదు. నేను దీన్ని మానవ సహాయం కోసం ఎస్కలేట్ చేయగలను.";
    }

    return "I could not find a reliable answer for that in the current knowledge base. I can escalate it to a human queue.";
  }

  const selected = contexts
    .filter(
      (context, index, list) =>
        list.findIndex((entry) => entry.docId === context.docId) === index
    )
    .slice(0, 2);
  const lines = selected.map((context) => `- ${summarizeContext(context, lang)}`);

  if (lang === "hi") {
    return [
      "मुझे इन आधिकारिक स्रोतों से यह मदद मिली:",
      ...lines,
      escalated
        ? "यह मुद्दा इंसानी सहायता के लिए भी भेज दिया गया है।"
        : "नीचे दिए गए आधिकारिक लिंक से आवेदन या अगला कदम जरूर जाँचें।"
    ].join("\n");
  }

  if (lang === "te") {
    return [
      "ఈ అధికారిక వనరుల నుంచి నాకు ఇది దొరికింది:",
      ...lines,
      escalated
        ? "ఈ అంశాన్ని మానవ సహాయానికి కూడా పంపించాం."
        : "క్రింద ఉన్న అధికారిక లింక్‌లలో తదుపరి దశలను పరిశీలించండి."
    ].join("\n");
  }

  return [
    "Here is what I found from the official sources in RootED's knowledge base:",
    ...lines,
    escalated
      ? "I have also sent this issue to the human support queue."
      : "Please use the official links below to confirm the next step."
  ].join("\n");
}

export async function answerGrounded({
  query,
  contexts,
  lang,
  escalated
}: {
  query: string;
  contexts: RetrievedContext[];
  lang: SupportedLocale;
  escalated?: boolean;
}) {
  if (!isAiConfigured()) {
    return localGroundedAnswer({ contexts, lang, escalated });
  }

  try {
    const contextText = contexts
      .map(
        (context) =>
          `${context.docTitle} (${context.sourceUrl})\n${context.text}\nSummary: ${summarizeContext(
            context,
            lang
          )}`
      )
      .join("\n\n");

    const text = await anthropicText(
      groundedAnswerPrompt({
        query,
        language: lang,
        contexts: contextText
      }),
      500
    );

    return text || localGroundedAnswer({ contexts, lang, escalated });
  } catch {
    return localGroundedAnswer({ contexts, lang, escalated });
  }
}
