import { conceptMap, questionMap } from "@/lib/gapfinder/graph";
import { loadKnowledgeBase } from "@/lib/rag/ingest";

export type ReelType = "recap" | "quiz" | "scholarship";

export type ReelSeed = {
  id: string;
  type: ReelType;
  title: string;
  body: string;
  keyPoints?: string[];
  miniLesson?: {
    concept: string;
    explanation: string;
    example: string;
  };
  conceptId?: string;
  questionId?: string;
  docId?: string;
  ctaLabel: string;
  ctaHref: string;
};

const reelSeeds: ReelSeed[] = [
  {
    id: "reel-root-gap-fractions",
    type: "recap",
    title: "Why fractions block algebra — and how to fix it fast",
    body: "Most students who struggle with linear equations hit a wall earlier than they think. Fractions are the hidden break in the chain. Once fractions click, every higher concept opens up.",
    keyPoints: [
      "A fraction shows equal parts of a whole — numerator on top, denominator below",
      "Equivalent fractions: ½ = 2/4 = 3/6 — same amount, different look",
      "To compare fractions, find a common denominator first",
      "Adding fractions: same denominator? Add numerators and keep it. Different? Find LCM first"
    ],
    miniLesson: {
      concept: "Fractions",
      explanation: "The denominator says how many equal parts the whole is cut into. The numerator says how many parts you have. 3/4 = three pieces of something cut into four equal pieces.",
      example: "½ + ¼: common denominator = 4. Convert: 2/4 + 1/4 = 3/4. Check: more than half? Yes — 3/4 > 1/2. ✓"
    },
    conceptId: "fractions",
    ctaLabel: "Start the diagnostic",
    ctaHref: "/gap-finder?focus=fractions&mode=returnee"
  },
  {
    id: "reel-signed-numbers-recap",
    type: "recap",
    title: "Negative numbers without panic — the number-line trick",
    body: "Negative numbers stop being scary the moment you picture them as steps on a street. Zero is your home. Right = positive. Left = negative. That single image handles every signed-number problem.",
    keyPoints: [
      "−3 means 3 steps left of zero on the number line",
      "−3 + 7 = start at −3, walk 7 right → land on 4",
      "Same signs when multiplying → positive result",
      "Different signs when multiplying → negative result",
      "−3 × −4 = +12 (both negative → positive)"
    ],
    miniLesson: {
      concept: "Signed numbers",
      explanation: "Walk the number line: start at your number, move right for +, move left for −. The landing point is the answer.",
      example: "−5 + 8: start at −5, walk 8 right → land on 3. So −5 + 8 = 3. Check: 8 − 5 = 3. ✓"
    },
    conceptId: "signed-numbers",
    ctaLabel: "Practice signed numbers",
    ctaHref: "/gap-finder?focus=signed-numbers"
  },
  {
    id: "reel-fractions-quiz",
    type: "quiz",
    title: "Quick check: fraction sense",
    body: "Can you spot which fraction matches one half? This is the most common fraction check — and it reveals whether the core idea is solid.",
    conceptId: "fractions",
    questionId: "q7",
    ctaLabel: "Build fraction skills",
    ctaHref: "/gap-finder?focus=fractions"
  },
  {
    id: "reel-one-step-quiz",
    type: "quiz",
    title: "Quick check: one-step equations",
    body: "A 10-second win can rebuild confidence. Solve x + 5 = 11. The answer is the difference between 11 and 5. Equations are just questions with a balance sign.",
    conceptId: "one-step-equations",
    questionId: "q19",
    ctaLabel: "Try the roadmap",
    ctaHref: "/gap-finder?focus=one-step-equations"
  },
  {
    id: "reel-nsp-alert",
    type: "scholarship",
    title: "Scholarship alert: how to apply on the NSP",
    body: "The National Scholarship Portal is the single official place to check and apply for most central government scholarships in India. Keep your documents ready before you start.",
    keyPoints: [
      "Visit scholarships.gov.in — the only official portal",
      "Documents needed: Aadhaar, income certificate, bank passbook, marksheet",
      "Register with your mobile number and email",
      "Track your application status on the same portal",
      "New registrations usually open July–September each year"
    ],
    docId: "national-scholarship-portal",
    ctaLabel: "Ask the chatbot for help",
    ctaHref: "/chat?topic=national-scholarship-portal"
  },
  {
    id: "reel-pm-poshan-alert",
    type: "scholarship",
    title: "PM POSHAN — school meals and why they matter",
    body: "Attendance and nutrition are linked. PM POSHAN provides free mid-day meals to school children across India. If meal access is affecting school attendance for you or someone you know, this is the scheme to check.",
    keyPoints: [
      "PM POSHAN (formerly Mid-Day Meal Scheme) covers all government school students",
      "Provides nutritious hot meals on school days",
      "Linked directly to improving attendance and reducing dropout",
      "Check eligibility and local implementation at pmposhan.education.gov.in",
      "Contact your school headmaster or local block education officer"
    ],
    docId: "pm-poshan",
    ctaLabel: "Ask for support",
    ctaHref: "/chat?topic=pm-poshan"
  },
  {
    id: "reel-vocational-pathway",
    type: "recap",
    title: "Skill work counts — and now it's verifiable",
    body: "Translating one educational lecture into your native language is a real, marketable skill. RootED's Learn & Earn module lets you do that, earn a micro-payout, and get a verified skills passport entry that documents the work.",
    keyPoints: [
      "Choose a lecture (academic or vocational) from the queue",
      "Review and correct the AI-generated draft transcript segment by segment",
      "Submit for vetting by a second reviewer",
      "Once approved: a verified SkillRecord appears on your Skills Passport",
      "Each verified transcript adds a micro-payout to your ledger"
    ],
    ctaLabel: "Open Learn & Earn",
    ctaHref: "/earn"
  },
  {
    id: "reel-career-resource",
    type: "scholarship",
    title: "What comes after school? Career guidance resources",
    body: "When learners finish school or vocational training and ask 'what next?', National Career Service is the official government platform for job listings, skill matching, and career guidance.",
    keyPoints: [
      "NCS Portal: ncs.gov.in — free job and career matching",
      "Register with your education details to get matched opportunities",
      "Vocational training listings under Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
      "Career counselling services available online and at NCS centres",
      "Apprenticeship listings under National Apprenticeship Promotion Scheme"
    ],
    docId: "national-career-service",
    ctaLabel: "Ask about careers",
    ctaHref: "/chat?topic=national-career-service"
  }
];

export async function listReels() {
  const kb = await loadKnowledgeBase();
  const kbMap = Object.fromEntries(kb.docs.map((doc) => [doc.id, doc]));

  return reelSeeds.map((reel) => ({
    ...reel,
    concept: reel.conceptId ? conceptMap[reel.conceptId] ?? null : null,
    question: reel.questionId ? questionMap[reel.questionId] ?? null : null,
    doc: reel.docId ? kbMap[reel.docId] ?? null : null
  }));
}
