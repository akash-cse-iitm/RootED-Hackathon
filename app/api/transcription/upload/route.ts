import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { addUploadedLecture } from "@/lib/earn/store";

const DRAFT_TEMPLATES: Record<string, Array<{ start: number; end: number; text: string }>> = {
  hi: [
    { start: 0, end: 20, text: "इस व्याख्यान में हम विषय का परिचय देंगे और मुख्य अवधारणाओं पर चर्चा करेंगे।" },
    { start: 20, end: 45, text: "पहला मुख्य बिंदु: विषय की परिभाषा और इसके व्यावहारिक उपयोग।" },
    { start: 45, end: 70, text: "दूसरा मुख्य बिंदु: इस विषय में उपयोग की जाने वाली महत्वपूर्ण विधियाँ।" },
    { start: 70, end: 95, text: "तीसरा मुख्य बिंदु: वास्तविक जीवन में इस ज्ञान का अनुप्रयोग कैसे करें।" },
    { start: 95, end: 120, text: "सारांश: आज हमने जो सीखा उसे अभ्यास में लाएं। आगे के लिए संसाधन उपलब्ध हैं।" }
  ],
  te: [
    { start: 0, end: 20, text: "ఈ పాఠంలో మనం అంశం పరిచయం మరియు ముఖ్య భావనలను చర్చిస్తాము." },
    { start: 20, end: 45, text: "మొదటి ముఖ్య అంశం: నిర్వచనం మరియు ఆచరణాత్మక ఉపయోగం." },
    { start: 45, end: 70, text: "రెండవ ముఖ్య అంశం: ఈ రంగంలో ఉపయోగించే ముఖ్యమైన పద్ధతులు." },
    { start: 70, end: 95, text: "మూడవ ముఖ్య అంశం: ఈ జ్ఞానాన్ని వాస్తవ జీవితంలో ఎలా వర్తింపజేయాలి." },
    { start: 95, end: 120, text: "సారాంశం: నేడు నేర్చుకున్న విషయాలను ప్రాక్టీస్ చేయండి. అదనపు వనరులు అందుబాటులో ఉన్నాయి." }
  ],
  kn: [
    { start: 0, end: 20, text: "ಈ ಪಾಠದಲ್ಲಿ ನಾವು ವಿಷಯದ ಪರಿಚಯ ಮತ್ತು ಮುಖ್ಯ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಚರ್ಚಿಸುತ್ತೇವೆ." },
    { start: 20, end: 45, text: "ಮೊದಲನೇ ಮುಖ್ಯ ಅಂಶ: ವ್ಯಾಖ್ಯಾನ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಬಳಕೆ." },
    { start: 45, end: 70, text: "ಎರಡನೇ ಮುಖ್ಯ ಅಂಶ: ಈ ಕ್ಷೇತ್ರದಲ್ಲಿ ಬಳಸುವ ಪ್ರಮುಖ ವಿಧಾನಗಳು." },
    { start: 70, end: 95, text: "ಮೂರನೇ ಮುಖ್ಯ ಅಂಶ: ಈ ಜ್ಞಾನವನ್ನು ನಿಜ ಜೀವನದಲ್ಲಿ ಹೇಗೆ ಅನ್ವಯಿಸುವುದು." },
    { start: 95, end: 120, text: "ಸಾರಾಂಶ: ಇಂದು ಕಲಿತದ್ದನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ. ಹೆಚ್ಚಿನ ಸಂಪನ್ಮೂಲಗಳು ಲಭ್ಯ." }
  ],
  ta: [
    { start: 0, end: 20, text: "இந்தப் பாடத்தில் நாம் தலைப்பின் அறிமுகம் மற்றும் முக்கிய கருத்துகளை விவாதிப்போம்." },
    { start: 20, end: 45, text: "முதல் முக்கிய புள்ளி: வரையறை மற்றும் நடைமுறை பயன்பாடு." },
    { start: 45, end: 70, text: "இரண்டாவது முக்கிய புள்ளி: இந்தத் துறையில் பயன்படுத்தப்படும் முக்கியமான முறைகள்." },
    { start: 70, end: 95, text: "மூன்றாவது முக்கிய புள்ளி: இந்த அறிவை நிஜ வாழ்வில் எவ்வாறு பயன்படுத்துவது." },
    { start: 95, end: 120, text: "சுருக்கம்: இன்று கற்றதை பயிற்சி செய்யுங்கள். கூடுதல் வளங்கள் கிடைக்கின்றன." }
  ],
  en: [
    { start: 0, end: 20, text: "In this lecture we introduce the topic and outline the key concepts that will be covered." },
    { start: 20, end: 45, text: "First key point: definition of the subject and its practical relevance in the field." },
    { start: 45, end: 70, text: "Second key point: important methods and techniques used in this domain." },
    { start: 70, end: 95, text: "Third key point: how to apply this knowledge in real-world scenarios and projects." },
    { start: 95, end: 120, text: "Summary: Practice what you learned today. Additional resources are linked below." }
  ]
};

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  type: z.enum(["academic", "vocational"]),
  reviewLanguage: z.enum(["hi", "te", "kn", "ta", "en"]),
  sourceUrl: z.string().url().optional().or(z.literal(""))
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Invalid upload data.";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { title, type, reviewLanguage, sourceUrl } = parsed.data;
  const lectureId = `lecture-upload-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const draftSegments =
    DRAFT_TEMPLATES[reviewLanguage] ?? DRAFT_TEMPLATES.en;

  const lecture = await addUploadedLecture({
    id: lectureId,
    title,
    type,
    sourceLang: "en",
    reviewLanguage,
    sourceUrl: sourceUrl || "",
    englishSegments: DRAFT_TEMPLATES.en,
    draftSegments
  });

  return NextResponse.json({ ok: true, lecture });
}
