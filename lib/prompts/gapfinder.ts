export function roadmapPrompt({
  conceptName,
  learnerMode
}: {
  conceptName: string;
  learnerMode: string;
}) {
  return `
You are building a micro-lesson for RootED, a support product for first-generation learners.
Keep the language plain, warm, and practical.

Return valid JSON with keys:
- title
- explanation
- workedExample
- practiceQuestions (array of exactly 2 strings)

Concept: ${conceptName}
Learner mode: ${learnerMode}
Constraints:
- 70 words max for explanation
- 60 words max for workedExample
- practice questions should be short and confidence-building
`;
}

