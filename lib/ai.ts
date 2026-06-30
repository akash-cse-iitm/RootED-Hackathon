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
        return [
          "🙏 आपकी शिकायत/सवाल हमारे NGO सहयोगी दल को भेज दी गई है।",
          "",
          "मेरे पास इस विषय पर अभी पर्याप्त जानकारी नहीं है, लेकिन एक वास्तविक व्यक्ति जल्द ही आपकी मदद करेगा।",
          "",
          "आप इस बीच निम्न कोशिश कर सकते हैं:",
          "• scholarships.gov.in – सरकारी छात्रवृत्ति पोर्टल",
          "• 1098 – बाल हेल्पलाइन (चाइल्डलाइन)",
          "• अपने स्कूल प्राचार्य या स्थानीय NGO से सम्पर्क करें।"
        ].join("\n");
      }

      if (lang === "te") {
        return [
          "🙏 మీ ఫిర్యాదు/ప్రశ్న మా NGO సహాయక బృందానికి పంపించబడింది.",
          "",
          "ప్రస్తుతం నా వద్ద ఈ విషయంలో సరిపోయే సమాచారం లేదు, కానీ ఒక నిజమైన వ్యక్తి త్వరలో సహాయం చేస్తారు.",
          "",
          "అంతవరకు మీరు ప్రయత్నించగలరు:",
          "• scholarships.gov.in – జాతీయ స్కాలర్‌షిప్ పోర్టల్",
          "• 1098 – చైల్డ్‌లైన్ హెల్ప్‌లైన్",
          "• మీ పాఠశాల ప్రధానాధ్యాపకుడిని లేదా స్థానిక NGOని సంప్రదించండి."
        ].join("\n");
      }

      return [
        "🙏 Your question has been sent to the NGO support queue and a human will follow up.",
        "",
        "I could not find a strong match in the current knowledge base. While you wait, you may try:",
        "• scholarships.gov.in — National Scholarship Portal",
        "• Childline 1098 — free helpline for children",
        "• Your school principal or local education NGO."
      ].join("\n");
    }

    if (lang === "hi") {
      return [
        "मुझे इस विशेष सवाल का भरोसेमंद जवाब अभी नहीं मिला।",
        "",
        "आप यह कोशिश कर सकते हैं:",
        "• 'मुझे इंसान से बात करनी है' — टाइप करें और हम आपको NGO queue में भेज देंगे।",
        "• scholarships.gov.in पर सीधे खोजें।",
        "• DIKSHA, SWAYAM, या e-Pathshala पर पढ़ाई के संसाधन देखें।"
      ].join("\n");
    }

    if (lang === "te") {
      return [
        "ఈ ప్రశ్నకు నా వద్ద ఖచ్చితమైన సమాచారం లేదు.",
        "",
        "మీరు ప్రయత్నించగలరు:",
        "• 'నాకు మానవ సహాయం కావాలి' అని టైప్ చేయండి — మేము NGO queue కి పంపిస్తాం.",
        "• scholarships.gov.in లో నేరుగా వెతకండి.",
        "• DIKSHA లేదా SWAYAM లో అభ్యాస వనరులు చూడండి."
      ].join("\n");
    }

    return [
      "I could not find a reliable answer for that in the current knowledge base.",
      "",
      "You can try:",
      "• Type 'I want to speak to a human' — I will escalate to the NGO queue.",
      "• Search directly on scholarships.gov.in.",
      "• Browse learning resources on DIKSHA, SWAYAM, or e-Pathshala."
    ].join("\n");
  }

  const selected = contexts
    .filter(
      (context, index, list) =>
        list.findIndex((entry) => entry.docId === context.docId) === index
    )
    .slice(0, 3);

  if (lang === "hi") {
    const lines = selected.map(
      (ctx) => `• ${ctx.docTitle}: ${summarizeContext(ctx, lang)}`
    );
    return [
      "✅ मुझे आपके सवाल का जवाब मिला। नीचे जानकारी देखें:",
      "",
      ...lines,
      "",
      escalated
        ? "⚠️ यह मुद्दा इंसानी सहायता के लिए भी भेज दिया गया है।"
        : "👉 ऊपर दिए गए नाम पर क्लिक करके आधिकारिक लिंक पर जाएं और आवेदन करें।"
    ].join("\n");
  }

  if (lang === "te") {
    const lines = selected.map(
      (ctx) => `• ${ctx.docTitle}: ${summarizeContext(ctx, lang)}`
    );
    return [
      "✅ మీ ప్రశ్నకు సమాధానం దొరికింది. దయచేసి చదవండి:",
      "",
      ...lines,
      "",
      escalated
        ? "⚠️ ఈ అంశాన్ని మానవ సహాయానికి కూడా పంపించాం."
        : "👉 పై పేర్లపై క్లిక్ చేసి అధికారిక లింక్‌లో దరఖాస్తు చేయండి."
    ].join("\n");
  }

  const lines = selected.map(
    (ctx) =>
      `• ${ctx.docTitle} (${ctx.docCategory}): ${summarizeContext(ctx, lang)}`
  );
  return [
    "✅ Here is what I found from official sources in the RootED knowledge base:",
    "",
    ...lines,
    "",
    escalated
      ? "⚠️ I have also escalated this to the human support queue since you may need more help."
      : "👉 Click the official links below to verify eligibility and apply. Always use official government URLs."
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
