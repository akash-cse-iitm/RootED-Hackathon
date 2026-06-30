import type { GapConcept, GapQuestion, GapFinderMode } from "@/lib/gapfinder/types";

export const TARGET_CONCEPT_ID = "linear-equations";

export const concepts: GapConcept[] = [
  {
    id: "number-sense",
    name: "Number sense",
    subject: "Math",
    level: 1,
    prereqIds: [],
    summary: "Read, compare, and break apart whole numbers with confidence."
  },
  {
    id: "addition-subtraction",
    name: "Addition and subtraction",
    subject: "Math",
    level: 1,
    prereqIds: ["number-sense"],
    summary: "Use inverse operations to add and subtract accurately."
  },
  {
    id: "multiplication-division",
    name: "Multiplication and division",
    subject: "Math",
    level: 2,
    prereqIds: ["addition-subtraction"],
    summary: "Think in equal groups, times tables, and sharing."
  },
  {
    id: "fractions",
    name: "Fractions",
    subject: "Math",
    level: 2,
    prereqIds: ["multiplication-division"],
    summary: "Read, compare, and simplify parts of a whole."
  },
  {
    id: "decimals-percentages",
    name: "Decimals and percentages",
    subject: "Math",
    level: 3,
    prereqIds: ["fractions"],
    summary: "Move between fractions, decimals, and percentages."
  },
  {
    id: "ratio-proportion",
    name: "Ratio and proportion",
    subject: "Math",
    level: 3,
    prereqIds: ["fractions", "multiplication-division"],
    summary: "Compare quantities and scale them fairly."
  },
  {
    id: "signed-numbers",
    name: "Signed numbers",
    subject: "Math",
    level: 3,
    prereqIds: ["addition-subtraction"],
    summary: "Work with positive and negative numbers on the number line."
  },
  {
    id: "algebraic-expressions",
    name: "Algebraic expressions",
    subject: "Math",
    level: 4,
    prereqIds: ["signed-numbers"],
    summary: "Translate words into expressions and read variables naturally."
  },
  {
    id: "like-terms",
    name: "Combining like terms",
    subject: "Math",
    level: 4,
    prereqIds: ["algebraic-expressions", "signed-numbers"],
    summary: "Group matching variable parts and constants correctly."
  },
  {
    id: "one-step-equations",
    name: "One-step equations",
    subject: "Math",
    level: 5,
    prereqIds: ["algebraic-expressions", "addition-subtraction"],
    summary: "Undo a single operation to solve for the variable."
  },
  {
    id: "two-step-equations",
    name: "Two-step equations",
    subject: "Math",
    level: 5,
    prereqIds: ["one-step-equations", "multiplication-division", "signed-numbers"],
    summary: "Work backwards through two operations in order."
  },
  {
    id: "linear-equations",
    name: "Linear equations",
    subject: "Math",
    level: 6,
    prereqIds: ["two-step-equations", "like-terms", "fractions"],
    summary: "Solve and check equations with variables on one side."
  }
];

export const questions: GapQuestion[] = [
  {
    id: "q1",
    conceptId: "number-sense",
    stem: "Which number is greater?",
    options: ["304", "340", "243", "34"],
    answerIndex: 1,
    difficulty: 1,
    explanation: "340 has 3 hundreds and 4 tens, so it is the largest."
  },
  {
    id: "q2",
    conceptId: "number-sense",
    stem: "What is 400 + 30 + 6 written as a number?",
    options: ["436", "346", "406", "460"],
    answerIndex: 0,
    difficulty: 1,
    explanation: "400 + 30 + 6 forms 436."
  },
  {
    id: "q3",
    conceptId: "addition-subtraction",
    stem: "Solve: 52 - 19",
    options: ["31", "33", "41", "29"],
    answerIndex: 1,
    difficulty: 1,
    explanation: "52 - 19 = 33."
  },
  {
    id: "q4",
    conceptId: "addition-subtraction",
    stem: "What is the missing number? 18 + ___ = 45",
    options: ["27", "23", "37", "63"],
    answerIndex: 0,
    difficulty: 1,
    explanation: "45 - 18 = 27."
  },
  {
    id: "q5",
    conceptId: "multiplication-division",
    stem: "Solve: 6 × 7",
    options: ["36", "42", "48", "56"],
    answerIndex: 1,
    difficulty: 1,
    explanation: "6 groups of 7 make 42."
  },
  {
    id: "q6",
    conceptId: "multiplication-division",
    stem: "Solve: 48 ÷ 6",
    options: ["6", "7", "8", "9"],
    answerIndex: 2,
    difficulty: 1,
    explanation: "48 shared into 6 equal groups gives 8."
  },
  {
    id: "q7",
    conceptId: "fractions",
    stem: "Which fraction is equal to 1/2?",
    options: ["2/3", "3/6", "4/5", "2/5"],
    answerIndex: 1,
    difficulty: 1,
    explanation: "3/6 simplifies to 1/2."
  },
  {
    id: "q8",
    conceptId: "fractions",
    stem: "What is 1/4 of 20?",
    options: ["4", "5", "10", "15"],
    answerIndex: 1,
    difficulty: 2,
    explanation: "20 ÷ 4 = 5."
  },
  {
    id: "q9",
    conceptId: "decimals-percentages",
    stem: "0.25 is the same as:",
    options: ["25%", "2.5%", "250%", "1/25"],
    answerIndex: 0,
    difficulty: 2,
    explanation: "0.25 means 25 hundredths, which is 25%."
  },
  {
    id: "q10",
    conceptId: "decimals-percentages",
    stem: "50% of 80 is:",
    options: ["20", "30", "40", "50"],
    answerIndex: 2,
    difficulty: 2,
    explanation: "50% means half, and half of 80 is 40."
  },
  {
    id: "q11",
    conceptId: "ratio-proportion",
    stem: "If red:blue is 2:3, how many blue marbles are there when red marbles are 4?",
    options: ["5", "6", "7", "8"],
    answerIndex: 1,
    difficulty: 2,
    explanation: "Doubling 2 to 4 means doubling 3 to 6."
  },
  {
    id: "q12",
    conceptId: "ratio-proportion",
    stem: "A recipe uses 1 cup rice for 2 cups water. How much water for 3 cups rice?",
    options: ["4 cups", "5 cups", "6 cups", "8 cups"],
    answerIndex: 2,
    difficulty: 2,
    explanation: "Scale both parts by 3: 1→3 and 2→6."
  },
  {
    id: "q13",
    conceptId: "signed-numbers",
    stem: "What is -3 + 7?",
    options: ["-10", "4", "-4", "10"],
    answerIndex: 1,
    difficulty: 2,
    explanation: "Starting at -3 and moving 7 right lands on 4."
  },
  {
    id: "q14",
    conceptId: "signed-numbers",
    stem: "What is 5 - 9?",
    options: ["4", "-4", "-14", "14"],
    answerIndex: 1,
    difficulty: 2,
    explanation: "5 - 9 = -4."
  },
  {
    id: "q15",
    conceptId: "algebraic-expressions",
    stem: "Which expression means '3 more than x'?",
    options: ["3x", "x - 3", "x + 3", "3 - x"],
    answerIndex: 2,
    difficulty: 2,
    explanation: "'More than' means add 3 to x."
  },
  {
    id: "q16",
    conceptId: "algebraic-expressions",
    stem: "If x = 4, what is 2x + 1?",
    options: ["6", "8", "9", "10"],
    answerIndex: 2,
    difficulty: 2,
    explanation: "2(4) + 1 = 9."
  },
  {
    id: "q17",
    conceptId: "like-terms",
    stem: "Simplify: 2x + 3x",
    options: ["5x", "6x", "5x²", "x + 5"],
    answerIndex: 0,
    difficulty: 2,
    explanation: "Both terms are x terms, so add coefficients: 2 + 3 = 5."
  },
  {
    id: "q18",
    conceptId: "like-terms",
    stem: "Simplify: 4y - 2y + 6",
    options: ["2y + 6", "6y", "2y", "8y + 6"],
    answerIndex: 0,
    difficulty: 2,
    explanation: "4y - 2y = 2y, and the +6 stays."
  },
  {
    id: "q19",
    conceptId: "one-step-equations",
    stem: "Solve: x + 5 = 11",
    options: ["5", "6", "11", "16"],
    answerIndex: 1,
    difficulty: 2,
    explanation: "Undo +5 by subtracting 5 from 11."
  },
  {
    id: "q20",
    conceptId: "one-step-equations",
    stem: "Solve: 3x = 12",
    options: ["3", "4", "9", "15"],
    answerIndex: 1,
    difficulty: 2,
    explanation: "Undo ×3 by dividing 12 by 3."
  },
  {
    id: "q21",
    conceptId: "two-step-equations",
    stem: "Solve: 2x + 3 = 11",
    options: ["3", "4", "5", "7"],
    answerIndex: 1,
    difficulty: 3,
    explanation: "Subtract 3 first, then divide by 2."
  },
  {
    id: "q22",
    conceptId: "two-step-equations",
    stem: "Solve: x/3 - 2 = 4",
    options: ["6", "12", "18", "2"],
    answerIndex: 2,
    difficulty: 3,
    explanation: "Add 2 to get x/3 = 6, then multiply by 3."
  },
  {
    id: "q23",
    conceptId: "linear-equations",
    stem: "Solve: 3x - 5 = 16",
    options: ["6", "7", "11", "21"],
    answerIndex: 1,
    difficulty: 3,
    explanation: "Add 5 to get 3x = 21, then divide by 3."
  },
  {
    id: "q24",
    conceptId: "linear-equations",
    stem: "Solve: 4(x + 1) = 20",
    options: ["3", "4", "5", "16"],
    answerIndex: 1,
    difficulty: 3,
    explanation: "Divide by 4 first, then subtract 1."
  }
];

export const conceptMap = Object.fromEntries(concepts.map((concept) => [concept.id, concept]));

export const questionMap = Object.fromEntries(questions.map((question) => [question.id, question]));

export const questionBankByConcept = concepts.reduce<Record<string, GapQuestion[]>>(
  (acc, concept) => {
    acc[concept.id] = questions.filter((question) => question.conceptId === concept.id);
    return acc;
  },
  {}
);

export const seededResources: Record<string, string> = {
  "number-sense": "Reel: Break big numbers into hundreds, tens, and ones.",
  "addition-subtraction": "Reel: Use inverse operations to check subtraction.",
  "multiplication-division": "Resource: Equal groups practice set.",
  fractions: "Reel: Fractions on a paper-fold model.",
  "signed-numbers": "Reel: Number-line jumps for positives and negatives.",
  "algebraic-expressions": "Resource: Translate words into x expressions.",
  "one-step-equations": "Reel: Undo one operation at a time.",
  "two-step-equations": "Resource: Step-order checklist for equations.",
  "linear-equations": "Reel: Check your answer by substitution."
};

export function getInitialQueue(mode: GapFinderMode) {
  if (mode === "returnee") {
    return [
      TARGET_CONCEPT_ID,
      "two-step-equations",
      "one-step-equations",
      "algebraic-expressions",
      "fractions",
      "multiplication-division",
      "addition-subtraction",
      "number-sense",
      "signed-numbers",
      "like-terms"
    ];
  }

  return [
    TARGET_CONCEPT_ID,
    "two-step-equations",
    "one-step-equations",
    "like-terms",
    "algebraic-expressions",
    "fractions",
    "signed-numbers"
  ];
}
