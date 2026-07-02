import type { LearnerProfile } from "./store";

export type RiskLevel = "low" | "medium" | "high";

export type RiskAssessment = {
  score: number;
  level: RiskLevel;
  reasons: string[];
  daysSinceLastSeen: number;
};

const HARDSHIP_GOALS = new Set(["financial-freedom", "respect", "family"]);

export function calcRisk(profile: LearnerProfile): RiskAssessment {
  let score = 0;
  const reasons: string[] = [];

  const now = Date.now();
  const lastSeen = new Date(profile.lastSeenAt).getTime();
  const daysSinceLastSeen = Math.floor((now - lastSeen) / (1000 * 60 * 60 * 24));

  if (daysSinceLastSeen > 30) {
    score += 40;
    reasons.push(`Inactive for ${daysSinceLastSeen} days`);
  } else if (daysSinceLastSeen > 14) {
    score += 20;
    reasons.push(`No activity in ${daysSinceLastSeen} days`);
  } else if (daysSinceLastSeen > 7) {
    score += 8;
    reasons.push(`Last seen ${daysSinceLastSeen} days ago`);
  }

  if (profile.quizSessions.length === 0) {
    score += 20;
    reasons.push("Has not completed any quizzes yet");
  } else {
    const avg =
      profile.quizSessions.reduce((sum, s) => sum + s.percentage, 0) /
      profile.quizSessions.length;
    if (avg < 30) {
      score += 20;
      reasons.push(`Average quiz score is low (${Math.round(avg)}%)`);
    } else if (avg < 50) {
      score += 8;
      reasons.push(`Struggling with quizzes (avg ${Math.round(avg)}%)`);
    }
  }

  if (!profile.assignedMentorId) {
    score += 10;
    reasons.push("No mentor assigned yet");
  }

  if (!profile.personalStory) {
    score += 8;
    reasons.push("Has not completed the Welcome Back journey");
  }

  const hardshipGoals = profile.goals.filter((g) => HARDSHIP_GOALS.has(g));
  if (hardshipGoals.length >= 2) {
    score += 10;
    reasons.push("Multiple hardship-related goals (financial / family pressure)");
  } else if (hardshipGoals.length === 1) {
    score += 5;
  }

  const storyLower = (profile.personalStory ?? "").toLowerCase();
  const hardshipKeywords = ["financial", "money", "family", "work", "job", "sick", "marriage", "lost"];
  if (hardshipKeywords.some((kw) => storyLower.includes(kw))) {
    score += 7;
    reasons.push("Personal story mentions financial or family hardship");
  }

  score = Math.min(score, 100);
  const level: RiskLevel = score >= 55 ? "high" : score >= 25 ? "medium" : "low";

  return { score, level, reasons, daysSinceLastSeen };
}

export const RISK_COLOR: Record<RiskLevel, string> = {
  low: "bg-[#e6f9f3] text-[#1a7a55] border-teal/20",
  medium: "bg-tint-warm text-[#8a6300] border-gold/20",
  high: "bg-[#fff0ec] text-coral border-coral/20",
};

export const RISK_DOT: Record<RiskLevel, string> = {
  low: "bg-teal",
  medium: "bg-gold",
  high: "bg-coral",
};

export const RISK_LABEL: Record<RiskLevel, string> = {
  low: "Low risk",
  medium: "At risk",
  high: "High risk",
};
