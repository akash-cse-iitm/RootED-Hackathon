export type AppRole = "learner" | "mentor" | "ngo";

export const SESSION_COOKIE = "rooted-demo-user";

export const modules = [
  {
    id: "gap-finder",
    href: "/gap-finder",
    kicker: "Dropout prevention",
    title: "Gap-Finder",
    icon: "gap",
    description:
      "Diagnose the first broken concept in the chain and turn it into a catch-up roadmap."
  },
  {
    id: "chat",
    href: "/chat",
    kicker: "Mother-tongue access",
    title: "RAG Help Chatbot",
    icon: "chat",
    description:
      "Answer scholarships, schemes, career, and skill questions in your own language."
  },
  {
    id: "earn",
    href: "/earn",
    kicker: "Skills and earning",
    title: "Learn & Earn",
    icon: "earn",
    description:
      "Upload lectures, review native-language transcripts, and build a verified skills passport."
  },
  {
    id: "reels",
    href: "/reels",
    kicker: "Re-engagement",
    title: "Reels Feed",
    icon: "reels",
    description:
      "Short recaps, quizzes, and scholarship alerts that pull learners back into the journey."
  },
  {
    id: "counseling",
    href: "/counseling",
    kicker: "Family support",
    title: "Family Counseling",
    icon: "counseling",
    description:
      "Request a confidential counseling session for dropout pressure, financial difficulty, or family concerns."
  },
  {
    id: "grievances",
    href: "/grievances",
    kicker: "NGO queue",
    title: "Grievance Queue",
    icon: "grievances",
    description:
      "Review and resolve learner support requests escalated by the chatbot."
  }
];

// Which modules each role can access
export const ROLE_MODULES: Record<AppRole, string[]> = {
  learner: ["gap-finder", "chat", "reels", "counseling"],
  mentor: ["earn", "chat", "counseling", "gap-finder"],
  ngo: ["grievances", "counseling", "earn", "chat", "gap-finder", "reels"]
};

export function getModulesForRole(role: AppRole) {
  return modules.filter((m) => ROLE_MODULES[role].includes(m.id));
}
