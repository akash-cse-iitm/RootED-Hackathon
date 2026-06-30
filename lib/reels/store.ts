import { conceptMap, questionMap } from "@/lib/gapfinder/graph";
import { loadKnowledgeBase } from "@/lib/rag/ingest";

export type ReelType = "recap" | "quiz" | "scholarship";

export type ReelSeed = {
  id: string;
  type: ReelType;
  title: string;
  body: string;
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
    title: "Bridge back with fractions",
    body: "If linear equations feel impossible, the real block might be earlier. Fractions often break the chain first for returnee learners.",
    conceptId: "fractions",
    ctaLabel: "Open Gap-Finder",
    ctaHref: "/gap-finder?focus=fractions&mode=returnee"
  },
  {
    id: "reel-signed-numbers-recap",
    type: "recap",
    title: "Signed numbers without panic",
    body: "Think of negative numbers as steps left on the number line. One calm visual can unlock later algebra faster than memorising rules.",
    conceptId: "signed-numbers",
    ctaLabel: "Go to Gap-Finder",
    ctaHref: "/gap-finder?focus=signed-numbers"
  },
  {
    id: "reel-fractions-quiz",
    type: "quiz",
    title: "Quick check: fraction sense",
    body: "Can you spot which fraction matches one half?",
    conceptId: "fractions",
    questionId: "q7",
    ctaLabel: "Practice in Gap-Finder",
    ctaHref: "/gap-finder?focus=fractions"
  },
  {
    id: "reel-one-step-quiz",
    type: "quiz",
    title: "Quick check: one-step equations",
    body: "A 10-second win can rebuild confidence. Try this before the full diagnostic.",
    conceptId: "one-step-equations",
    questionId: "q19",
    ctaLabel: "Try the roadmap",
    ctaHref: "/gap-finder?focus=one-step-equations"
  },
  {
    id: "reel-nsp-alert",
    type: "scholarship",
    title: "Scholarship alert: where to apply",
    body: "For a general scholarship application starting point, the National Scholarship Portal is the first official place to check.",
    docId: "national-scholarship-portal",
    ctaLabel: "Ask the chatbot",
    ctaHref: "/chat?topic=national-scholarship-portal"
  },
  {
    id: "reel-pm-poshan-alert",
    type: "scholarship",
    title: "Support alert: school meal scheme",
    body: "Attendance and nutrition are linked. PM POSHAN is worth checking if school continuity is affected by meal access.",
    docId: "pm-poshan",
    ctaLabel: "Open support chat",
    ctaHref: "/chat?topic=pm-poshan"
  },
  {
    id: "reel-vocational-pathway",
    type: "recap",
    title: "Skill work counts too",
    body: "Vocational learning is part of RootED. Reviewing one local-language lecture can turn into a verified passport entry.",
    ctaLabel: "Open Learn & Earn",
    ctaHref: "/earn"
  },
  {
    id: "reel-career-resource",
    type: "scholarship",
    title: "Career guidance resource",
    body: "When learners ask what comes after school or skills training, National Career Service is a grounded next stop.",
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

