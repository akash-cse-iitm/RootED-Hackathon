export type AppRole = "learner" | "translator" | "ngo";

export type SeededUser = {
  id: string;
  name: string;
  locale: string;
  role: AppRole;
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
