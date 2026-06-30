import {
  conceptMap,
  concepts,
  getInitialQueue,
  questionBankByConcept,
  seededResources,
  TARGET_CONCEPT_ID
} from "@/lib/gapfinder/graph";
import type {
  ConceptScore,
  DiagnosticSession,
  GapFinderMode,
  GapFinderResult,
  QuestionResponse,
  RoadmapStep
} from "@/lib/gapfinder/types";

function uniqueQueue(items: string[]) {
  return items.filter((item, index) => items.indexOf(item) === index);
}

function getNextQuestionForConcept(conceptId: string, askedQuestionIds: string[]) {
  return questionBankByConcept[conceptId]?.find(
    (question) => !askedQuestionIds.includes(question.id)
  );
}

function pullNextQuestion(session: Omit<DiagnosticSession, "currentQuestion">): DiagnosticSession {
  const queue = [...session.queue];

  while (queue.length > 0) {
    const conceptId = queue.shift()!;
    const question = getNextQuestionForConcept(conceptId, session.askedQuestionIds);

    if (question) {
      return {
        ...session,
        queue,
        currentQuestion: {
          conceptId,
          question
        }
      };
    }
  }

  return {
    ...session,
    queue: [],
    currentQuestion: null
  };
}

export function createDiagnosticSession(mode: GapFinderMode): DiagnosticSession {
  return pullNextQuestion({
    mode,
    queue: getInitialQueue(mode),
    askedQuestionIds: [],
    askedConceptCounts: {},
    responses: [],
    totalQuestions: 0,
    maxQuestions: mode === "returnee" ? 12 : 10
  });
}

export function advanceDiagnosticSession(
  session: DiagnosticSession,
  selectedIndex: number
): DiagnosticSession {
  if (!session.currentQuestion) {
    return session;
  }

  const { conceptId, question } = session.currentQuestion;
  const isCorrect = question.answerIndex === selectedIndex;
  const askedCount = (session.askedConceptCounts[conceptId] ?? 0) + 1;
  const responses: QuestionResponse[] = [
    ...session.responses,
    {
      questionId: question.id,
      conceptId,
      selectedIndex,
      isCorrect
    }
  ];

  const prereqs = conceptMap[conceptId]?.prereqIds ?? [];
  const remainingQuestion = getNextQuestionForConcept(conceptId, [
    ...session.askedQuestionIds,
    question.id
  ]);

  const nextQueue = [...session.queue];

  if (!isCorrect) {
    nextQueue.unshift(...prereqs);
  }

  if (remainingQuestion && askedCount < 2) {
    nextQueue.push(conceptId);
  }

  const nextSession: Omit<DiagnosticSession, "currentQuestion"> = {
    mode: session.mode,
    queue: uniqueQueue(nextQueue),
    askedQuestionIds: [...session.askedQuestionIds, question.id],
    askedConceptCounts: {
      ...session.askedConceptCounts,
      [conceptId]: askedCount
    },
    responses,
    totalQuestions: session.totalQuestions + 1,
    maxQuestions: session.maxQuestions
  };

  const shouldStop =
    nextSession.totalQuestions >= nextSession.maxQuestions ||
    (nextSession.totalQuestions >= 8 && nextSession.queue.length === 0);

  if (shouldStop) {
    return {
      ...nextSession,
      currentQuestion: null
    };
  }

  return pullNextQuestion(nextSession);
}

export function scoreResponses(responses: QuestionResponse[]): ConceptScore[] {
  return concepts.map((concept) => {
    const conceptResponses = responses.filter(
      (response) => response.conceptId === concept.id
    );
    const correct = conceptResponses.filter((response) => response.isCorrect).length;
    const total = conceptResponses.length;
    const mastered = total > 0 && correct / total >= 0.6;

    return {
      conceptId: concept.id,
      correct,
      total,
      mastered
    };
  });
}

function topologicalOrder() {
  return [...concepts].sort((a, b) => a.level - b.level);
}

export function computeRootGaps(scores: ConceptScore[]) {
  const scoreMap = Object.fromEntries(scores.map((score) => [score.conceptId, score]));
  const failures = scores.filter((score) => score.total > 0 && !score.mastered);

  return topologicalOrder()
    .filter((concept) => failures.some((failure) => failure.conceptId === concept.id))
    .filter((concept) =>
      concept.prereqIds.every((prereqId) => scoreMap[prereqId]?.mastered === true)
    )
    .map((concept) => concept.id);
}

function dfsPath(currentId: string, targetId: string, visited = new Set<string>()): string[] | null {
  if (currentId === targetId) {
    return [currentId];
  }

  if (visited.has(currentId)) {
    return null;
  }

  visited.add(currentId);
  const nextConcepts = concepts
    .filter((concept) => concept.prereqIds.includes(currentId))
    .sort((a, b) => a.level - b.level);

  for (const nextConcept of nextConcepts) {
    const subPath = dfsPath(nextConcept.id, targetId, new Set(visited));
    if (subPath) {
      return [currentId, ...subPath];
    }
  }

  return null;
}

export function buildPathToTarget(rootGapId: string) {
  return dfsPath(rootGapId, TARGET_CONCEPT_ID) ?? [rootGapId];
}

function fallbackRoadmapSteps(rootGapId: string, mode: GapFinderMode): RoadmapStep[] {
  const concept = conceptMap[rootGapId];
  const base: RoadmapStep[] = [
    {
      id: `${rootGapId}-refresh`,
      title: `Refresh ${concept.name}`,
      explanation: concept.summary,
      workedExample: `Start with one simple ${concept.name.toLowerCase()} example and say each step aloud.`,
      practiceQuestions: [
        `Explain ${concept.name.toLowerCase()} in your own words.`,
        `Solve one easy problem for ${concept.name.toLowerCase()}.`
      ],
      resourceLabel: seededResources[rootGapId]
    },
    {
      id: `${rootGapId}-worked`,
      title: `Watch one worked example`,
      explanation:
        "Copy the exact steps once, then cover the answer and do the same pattern yourself.",
      workedExample: `Write the steps for ${concept.name.toLowerCase()} in a notebook and label why each step happens.`,
      practiceQuestions: [
        "Do the same pattern with different numbers.",
        "Circle the operation you undo first."
      ]
    },
    {
      id: `${rootGapId}-practice`,
      title: "Do two checkpoint questions",
      explanation:
        "Use short practice before moving up the chain so the learner gets a quick confidence win.",
      workedExample: `Check your final answer by plugging it back or explaining why it makes sense.`,
      practiceQuestions: [
        `Solve a fresh ${concept.name.toLowerCase()} question.`,
        "Teach the step order to a friend or sibling."
      ]
    }
  ];

  if (mode === "returnee") {
    base.unshift({
      id: `${rootGapId}-bridge`,
      title: `Bridge back into ${concept.name}`,
      explanation:
        "Returnee mode starts broader so the learner can rebuild confidence before tackling the surface topic.",
      workedExample: "Spend 10 calm minutes reviewing the easiest version first, then step up once it feels familiar.",
      practiceQuestions: [
        "List one thing you already remember about this topic.",
        "Try one warm-up problem without worrying about speed."
      ]
    });
  }

  base.push({
    id: `${rootGapId}-climb`,
    title: "Climb to the next concept",
    explanation:
      "Only after the root gap feels stable should the learner return to the next concept in the chain.",
    workedExample: `Use the root skill inside a ${TARGET_CONCEPT_ID.replace("-", " ")} style question.`,
    practiceQuestions: [
      "Name the next concept you are now ready for.",
      "Do one mixed question that uses both skills."
    ]
  });

  return base;
}

export function buildGapFinderResult(
  mode: GapFinderMode,
  responses: QuestionResponse[],
  aiConfigured: boolean
): GapFinderResult {
  const scores = scoreResponses(responses);
  const rootGaps = computeRootGaps(scores);
  const roadmaps = rootGaps.map((rootGapId) => ({
    rootGapId,
    rootGapName: conceptMap[rootGapId].name,
    pathToTarget: buildPathToTarget(rootGapId),
    steps: fallbackRoadmapSteps(rootGapId, mode)
  }));

  if (roadmaps.length === 0) {
    const fallbackRoot = mode === "returnee" ? "fractions" : "two-step-equations";
    roadmaps.push({
      rootGapId: fallbackRoot,
      rootGapName: conceptMap[fallbackRoot].name,
      pathToTarget: buildPathToTarget(fallbackRoot),
      steps: fallbackRoadmapSteps(fallbackRoot, mode)
    });
    rootGaps.push(fallbackRoot);
  }

  return {
    mode,
    scores,
    rootGaps,
    roadmaps,
    aiConfigured
  };
}

