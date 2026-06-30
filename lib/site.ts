export type AppRole = "learner" | "translator" | "ngo";

export type SeededUser = {
  id: string;
  name: string;
  locale: string;
  role: AppRole;
};

export type RoleTheme = {
  label: string;
  eyebrow: string;
  summary: string;
  gradient: string;
  chipClassName: string;
  panelClassName: string;
  quickStats: Array<{ label: string; value: string }>;
  quickLinks: Array<{ label: string; href: string }>;
};

export type VidyaIconKey =
  | "first-generation"
  | "tongue"
  | "dropout"
  | "vocational"
  | "bridge";

export const SESSION_COOKIE = "rooted-demo-user";

export const seededUsers: SeededUser[] = [
  {
    id: "learner-demo",
    name: "Ananya Reddy",
    locale: "en",
    role: "learner"
  },
  {
    id: "translator-demo",
    name: "Sravani Telugu",
    locale: "te",
    role: "translator"
  },
  {
    id: "ngo-demo",
    name: "Rahul Foundation",
    locale: "hi",
    role: "ngo"
  }
];

export const roleThemes: Record<AppRole, RoleTheme> = {
  learner: {
    label: "Learner view",
    eyebrow: "Stay in school",
    summary:
      "See bridge-learning support, scholarship help, and confidence-building next steps first.",
    gradient:
      "bg-[linear-gradient(135deg,#0F3D3E_0%,#14746F_55%,#2A9D8F_100%)] text-white",
    chipClassName: "bg-white/12 text-white border border-white/15",
    panelClassName: "bg-tint text-teal-dark",
    quickStats: [
      { label: "Today’s focus", value: "Root gaps" },
      { label: "Support mode", value: "Bridge learning" },
      { label: "Primary path", value: "Gap-Finder" }
    ],
    quickLinks: [
      { label: "Start returnee mode", href: "/gap-finder?mode=returnee" },
      { label: "Ask in your language", href: "/chat" }
    ]
  },
  translator: {
    label: "Translator view",
    eyebrow: "Learn and earn",
    summary:
      "Put verified language work first, track published drafts, and turn contribution into a passport entry.",
    gradient:
      "bg-[linear-gradient(135deg,#1D3B2A_0%,#2A9D8F_55%,#E9A23B_100%)] text-white",
    chipClassName: "bg-white/14 text-white border border-white/15",
    panelClassName: "bg-tint-warm text-ink",
    quickStats: [
      { label: "Work type", value: "Local-language review" },
      { label: "Evidence", value: "Skills passport" },
      { label: "Primary path", value: "Learn & Earn" }
    ],
    quickLinks: [
      { label: "Open lecture queue", href: "/earn" },
      { label: "View passport", href: "/earn/passport" }
    ]
  },
  ngo: {
    label: "NGO view",
    eyebrow: "Human support queue",
    summary:
      "Resolve escalated learner issues fast, keep the queue visible, and route learners back into safe support.",
    gradient:
      "bg-[linear-gradient(135deg,#3D201A_0%,#A44A3F_45%,#E76F51_100%)] text-white",
    chipClassName: "bg-white/12 text-white border border-white/15",
    panelClassName: "bg-[#fff0ec] text-coral",
    quickStats: [
      { label: "Priority", value: "Escalations" },
      { label: "Queue type", value: "Human follow-up" },
      { label: "Primary path", value: "Grievances" }
    ],
    quickLinks: [
      { label: "Open grievance queue", href: "/grievances" },
      { label: "Check support chat", href: "/chat" }
    ]
  }
};

export const modules = [
  {
    href: "/gap-finder",
    kicker: "Dropout prevention",
    title: "Gap-Finder",
    icon: "gap",
    description:
      "Diagnose the first broken concept in the chain and turn it into a catch-up roadmap."
  },
  {
    href: "/chat",
    kicker: "Mother-tongue access",
    title: "RAG Help Chatbot",
    icon: "chat",
    description:
      "Answer scholarships, schemes, and resource questions with grounded multilingual support."
  },
  {
    href: "/earn",
    kicker: "Skills and earning",
    title: "Learn & Earn",
    icon: "earn",
    description:
      "Review native-language transcripts, earn mocked payouts, and build a verified skills passport."
  },
  {
    href: "/reels",
    kicker: "Re-engagement",
    title: "Reels Feed",
    icon: "reels",
    description:
      "Deliver short recaps, quizzes, and scholarship alerts that pull learners back into the journey."
  }
];

export const vidyaItems = [
  {
    title: "First-generation learner support",
    description:
      "The dashboard and every module are framed around reducing overwhelm, clarifying next steps, and making support visible.",
    href: "/dashboard",
    icon: "first-generation" as VidyaIconKey
  },
  {
    title: "Learning in mother tongue",
    description:
      "The chatbot and transcription pathways are where native-language support becomes a daily tool, not a side feature.",
    href: "/chat",
    icon: "tongue" as VidyaIconKey
  },
  {
    title: "School dropout prevention",
    description:
      "Gap-Finder is designed to uncover foundational breaks before the student gives up on the surface topic.",
    href: "/gap-finder",
    icon: "dropout" as VidyaIconKey
  },
  {
    title: "Vocational skill documentation",
    description:
      "Learn & Earn converts completed translation work into a verifiable skills passport and payout trail.",
    href: "/earn",
    icon: "vocational" as VidyaIconKey
  },
  {
    title: "Bridge learning for returnees",
    description:
      "Returnee mode in Gap-Finder will widen the diagnostic and generate a broader catch-up path for learners coming back after a break.",
    href: "/gap-finder",
    icon: "bridge" as VidyaIconKey
  }
];
