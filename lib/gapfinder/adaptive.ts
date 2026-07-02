export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type AdaptiveQuestion = {
  id: string;
  topic: string;
  level: DifficultyLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type AdaptiveAnswer = {
  questionId: string;
  level: DifficultyLevel;
  correct: boolean;
};

export type AdaptiveSession = {
  topic: string;
  currentLevel: DifficultyLevel;
  answers: AdaptiveAnswer[];
  askedIds: string[];
};

export type ProficiencyResult = {
  topic: string;
  proficiencyLevel: DifficultyLevel;
  label: string;
  percentage: number;
  correctAtLevel: Record<number, { correct: number; total: number }>;
  masteredConcepts: string[];
  gapConcepts: string[];
  recommendation: string;
};

export const LEVEL_LABELS: Record<DifficultyLevel, string> = {
  1: "Beginner",
  2: "Basic",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export const LEVEL_DESC: Record<DifficultyLevel, string> = {
  1: "Knows core definitions and basic recall",
  2: "Can apply concepts in simple scenarios",
  3: "Solves moderate problems independently",
  4: "Handles advanced analysis and edge cases",
  5: "Expert — competitive exam / professional level",
};

export function createSession(topic: string): AdaptiveSession {
  return { topic, currentLevel: 3, answers: [], askedIds: [] };
}

export function recordAnswer(
  session: AdaptiveSession,
  question: AdaptiveQuestion,
  selectedIndex: number
): { session: AdaptiveSession; correct: boolean } {
  const correct = selectedIndex === question.correctIndex;
  const nextLvl = correct
    ? (Math.min(session.currentLevel + 1, 5) as DifficultyLevel)
    : (Math.max(session.currentLevel - 1, 1) as DifficultyLevel);

  const updated: AdaptiveSession = {
    ...session,
    currentLevel: nextLvl,
    askedIds: [...session.askedIds, question.id],
    answers: [
      ...session.answers,
      { questionId: question.id, level: session.currentLevel, correct },
    ],
  };
  return { session: updated, correct };
}

export function isComplete(session: AdaptiveSession): boolean {
  return session.answers.length >= 10;
}

export function computeResult(
  session: AdaptiveSession,
  topicConcepts: Record<DifficultyLevel, string[]>
): ProficiencyResult {
  const levelStats: Record<number, { correct: number; total: number }> = {};
  for (let l = 1; l <= 5; l++) levelStats[l] = { correct: 0, total: 0 };

  for (const a of session.answers) {
    levelStats[a.level].total++;
    if (a.correct) levelStats[a.level].correct++;
  }

  // Proficiency = highest level where accuracy ≥ 50% (with at least 1 question)
  let proficiency: DifficultyLevel = 1;
  for (let l = 1; l <= 5; l++) {
    const s = levelStats[l];
    if (s.total > 0 && s.correct / s.total >= 0.5) {
      proficiency = l as DifficultyLevel;
    }
  }

  const mastered: string[] = [];
  const gaps: string[] = [];
  for (let l = 1; l <= 5; l++) {
    const concepts = topicConcepts[l as DifficultyLevel] ?? [];
    if (l <= proficiency) mastered.push(...concepts);
    else gaps.push(...concepts);
  }

  return {
    topic: session.topic,
    proficiencyLevel: proficiency,
    label: LEVEL_LABELS[proficiency],
    percentage: proficiency * 20,
    correctAtLevel: levelStats,
    masteredConcepts: mastered,
    gapConcepts: gaps,
    recommendation: getRecommendation(proficiency, session.topic),
  };
}

function getRecommendation(level: DifficultyLevel, topic: string): string {
  switch (level) {
    case 1:
      return `Start with the absolute basics of ${topic}. Focus on definitions, core ideas, and simple examples before moving on.`;
    case 2:
      return `You have a basic grasp of ${topic}. Practice applying concepts in simple problems — try NPTEL or Khan Academy for structured lessons.`;
    case 3:
      return `Solid foundation in ${topic}! Push yourself with harder problems and real-world projects to reach the advanced level.`;
    case 4:
      return `Strong skills in ${topic}. Focus on expert topics, competitive exam problems, and building projects that use advanced techniques.`;
    case 5:
      return `Expert in ${topic}! Consider teaching, open-source contributions, or taking a specialization certification.`;
  }
}

export const TOPIC_CONCEPTS: Record<string, Record<DifficultyLevel, string[]>> = {
  "organic chemistry": {
    1: ["Carbon bonding", "Functional groups", "Alkanes & molecular formula"],
    2: ["IUPAC nomenclature", "Structural isomers", "Alkene addition reactions"],
    3: ["Benzene & aromaticity", "Esterification", "Aldehyde vs ketone tests"],
    4: ["SN1 & SN2 mechanisms", "Markovnikov's rule", "Grignard reactions", "Friedel-Crafts"],
    5: ["Retrosynthesis", "Woodward-Hoffmann rules", "E1cb vs E2", "NMR spectroscopy"],
  },
  chemistry: {
    1: ["Carbon bonding", "Functional groups", "Alkanes & molecular formula"],
    2: ["IUPAC nomenclature", "Structural isomers", "Oxidation of alcohols"],
    3: ["Benzene & aromaticity", "Esterification", "Aldehyde vs ketone tests"],
    4: ["SN1 & SN2 mechanisms", "Markovnikov's rule", "Grignard reactions"],
    5: ["Retrosynthesis", "NMR spectroscopy", "Complex mechanisms"],
  },
  python: {
    1: ["Variables & data types", "Print statements", "Basic input/output"],
    2: ["If/else conditions", "For & while loops", "Lists & tuples"],
    3: ["Functions", "Dictionaries", "File handling", "List comprehensions"],
    4: ["OOP (classes)", "Error handling", "Modules & packages", "Lambda & map/filter"],
    5: ["Decorators", "Generators", "Async/await", "Metaclasses"],
  },
  mathematics: {
    1: ["Number system", "Basic arithmetic", "BODMAS"],
    2: ["Fractions & percentages", "Ratio & proportion", "Basic algebra"],
    3: ["Quadratic equations", "Geometry", "Trigonometry basics"],
    4: ["Coordinate geometry", "Sequences & series", "Probability"],
    5: ["Calculus basics", "Matrices", "Differential equations"],
  },
  english: {
    1: ["Parts of speech", "Basic sentence structure", "Common vocabulary"],
    2: ["Tenses", "Subject-verb agreement", "Reading comprehension"],
    3: ["Idioms & phrases", "Active/Passive voice", "Essay writing"],
    4: ["Advanced grammar", "Critical reading", "Argument analysis"],
    5: ["Literary devices", "Formal writing", "Advanced comprehension"],
  },
  science: {
    1: ["Basic physics concepts", "Matter & its states", "Cell biology"],
    2: ["Newton's laws", "Chemical reactions", "Photosynthesis"],
    3: ["Electricity", "Acids & bases", "Genetics basics"],
    4: ["Thermodynamics", "Organic chemistry", "Ecosystems"],
    5: ["Quantum concepts", "Electrochemistry", "Molecular biology"],
  },
  "computer science": {
    1: ["What is a computer", "Input/output devices", "Internet basics"],
    2: ["Operating systems", "File systems", "Basic networking"],
    3: ["Algorithms & data structures", "Databases", "HTML/CSS"],
    4: ["Data structures (advanced)", "Network protocols", "SQL queries"],
    5: ["OS internals", "Cryptography", "System design"],
  },
  history: {
    1: ["Ancient India — Indus Valley", "Vedic period", "Maurya Empire"],
    2: ["Medieval India — Delhi Sultanate", "Mughal Empire", "Bhakti movement"],
    3: ["Colonial India", "1857 revolt", "Indian National Congress"],
    4: ["Freedom movement", "Constitution of India", "Post-independence"],
    5: ["Economic history", "Foreign policy", "Constitutional amendments"],
  },
};

export function getTopicConcepts(topic: string): Record<DifficultyLevel, string[]> {
  const key = topic.toLowerCase().trim();
  // Check longest key first so "organic chemistry" beats "chemistry"
  const sorted = Object.entries(TOPIC_CONCEPTS).sort(([a], [b]) => b.length - a.length);
  for (const [k, v] of sorted) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  // Generic fallback
  return {
    1: ["Basic definitions", "Core terminology"],
    2: ["Simple applications", "Foundational problems"],
    3: ["Intermediate problems", "Applied concepts"],
    4: ["Advanced analysis", "Complex problems"],
    5: ["Expert topics", "Competitive level"],
  };
}
