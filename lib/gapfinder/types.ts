export type GapFinderMode = "current" | "returnee";

export type GapConcept = {
  id: string;
  name: string;
  subject: string;
  level: number;
  prereqIds: string[];
  summary: string;
};

export type GapQuestion = {
  id: string;
  conceptId: string;
  stem: string;
  options: string[];
  answerIndex: number;
  difficulty: number;
  explanation: string;
};

export type DiagnosticQuestion = {
  conceptId: string;
  question: GapQuestion;
};

export type QuestionResponse = {
  questionId: string;
  conceptId: string;
  selectedIndex: number;
  isCorrect: boolean;
};

export type DiagnosticSession = {
  mode: GapFinderMode;
  queue: string[];
  askedQuestionIds: string[];
  askedConceptCounts: Record<string, number>;
  responses: QuestionResponse[];
  currentQuestion: DiagnosticQuestion | null;
  totalQuestions: number;
  maxQuestions: number;
};

export type ConceptScore = {
  conceptId: string;
  correct: number;
  total: number;
  mastered: boolean;
};

export type RoadmapStep = {
  id: string;
  title: string;
  explanation: string;
  workedExample: string;
  practiceQuestions: string[];
  resourceLabel?: string;
};

export type GapRoadmap = {
  rootGapId: string;
  rootGapName: string;
  pathToTarget: string[];
  steps: RoadmapStep[];
};

export type GapFinderResult = {
  mode: GapFinderMode;
  scores: ConceptScore[];
  rootGaps: string[];
  roadmaps: GapRoadmap[];
  aiConfigured: boolean;
};

