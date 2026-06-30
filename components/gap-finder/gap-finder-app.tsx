"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Flame, Sparkles, Star } from "lucide-react";

import {
  advanceDiagnosticSession,
  createDiagnosticSession
} from "@/lib/gapfinder/engine";
import { conceptMap } from "@/lib/gapfinder/graph";
import type {
  DiagnosticSession,
  GapFinderMode,
  GapFinderResult,
  RoadmapStep
} from "@/lib/gapfinder/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProgressState = {
  xp: number;
  streak: number;
  badges: string[];
  completedStepIds: string[];
  lastCompletedOn?: string;
};

const defaultProgress: ProgressState = {
  xp: 0,
  streak: 0,
  badges: [],
  completedStepIds: []
};

function storageKey(userId: string) {
  return `rooted-gapfinder-progress:${userId}`;
}

function loadProgress(userId: string) {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  const raw = window.localStorage.getItem(storageKey(userId));
  return raw ? (JSON.parse(raw) as ProgressState) : defaultProgress;
}

function saveProgress(userId: string, progress: ProgressState) {
  window.localStorage.setItem(storageKey(userId), JSON.stringify(progress));
}

function sameDay(a?: string, b?: string) {
  return Boolean(a && b && a === b);
}

export function GapFinderApp({
  userId,
  initialMode,
  initialFocus
}: {
  userId: string;
  initialMode?: GapFinderMode;
  initialFocus?: string;
}) {
  const [mode, setMode] = useState<GapFinderMode | null>(null);
  const [session, setSession] = useState<DiagnosticSession | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [result, setResult] = useState<GapFinderResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);

  const currentQuestion = session?.currentQuestion;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProgress(loadProgress(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (initialMode && !session && !result) {
      setMode(initialMode);
      setResult(null);
      setSelectedIndex(null);
      setSession(createDiagnosticSession(initialMode));
      setProgress(loadProgress(userId));
    }
  }, [initialMode, result, session, userId]);

  function begin(selectedMode: GapFinderMode) {
    setMode(selectedMode);
    setResult(null);
    setSelectedIndex(null);
    setSession(createDiagnosticSession(selectedMode));
    setProgress(loadProgress(userId));
  }

  async function submitAnswer() {
    if (!session || selectedIndex === null) {
      return;
    }

    const nextSession = advanceDiagnosticSession(session, selectedIndex);
    setSelectedIndex(null);

    if (nextSession.currentQuestion) {
      setSession(nextSession);
      return;
    }

    setSession(nextSession);
    setLoading(true);

    const response = await fetch("/api/gapfinder/roadmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mode,
        responses: nextSession.responses
      })
    });

    const payload = (await response.json()) as GapFinderResult;
    setResult(payload);
    setLoading(false);
  }

  function completeStep(rootGapName: string, step: RoadmapStep) {
    const today = new Date().toISOString().slice(0, 10);
    const snapshot = loadProgress(userId);
    if (snapshot.completedStepIds.includes(step.id)) {
      setProgress(snapshot);
      return;
    }

    const completedStepIds = [...snapshot.completedStepIds, step.id];
    const streak =
      sameDay(snapshot.lastCompletedOn, today)
        ? snapshot.streak
        : snapshot.lastCompletedOn
          ? snapshot.streak + 1
          : 1;
    const badges = snapshot.badges.includes(`Closed ${rootGapName}`)
      ? snapshot.badges
      : [...snapshot.badges, `Closed ${rootGapName}`];

    const nextProgress = {
      xp: snapshot.xp + 20,
      streak,
      badges,
      completedStepIds,
      lastCompletedOn: today
    };

    saveProgress(userId, nextProgress);
    setProgress(nextProgress);
  }

  if (!session && !result) {
    return (
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
            Bridge learning
          </p>
          <h1 className="mt-3 font-heading text-3xl text-ink">
            Find the first broken link, not just the last chapter that felt hard
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            The diagnostic adapts as you answer. If a surface question breaks,
            RootED walks downward through the math chain until it finds the
            earliest concept that needs repair.
          </p>
          {initialFocus && conceptMap[initialFocus] ? (
            <div className="mt-4 rounded-2xl bg-tint-warm p-4 text-sm leading-6 text-text">
              Deep link focus: <strong>{conceptMap[initialFocus].name}</strong>.
              This reel sent the learner here to rebuild the path into that
              concept.
            </div>
          ) : null}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => begin("current")}
              className="rounded-[1.5rem] border border-line bg-tint p-5 text-left transition hover:-translate-y-1"
            >
              <p className="font-semibold text-ink">I&apos;m studying now</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                A tighter diagnostic around the current topic, usually 8 to 10
                questions.
              </p>
            </button>
            <button
              type="button"
              onClick={() => begin("returnee")}
              className="rounded-[1.5rem] border border-gold/30 bg-tint-warm p-5 text-left transition hover:-translate-y-1"
            >
              <p className="font-semibold text-ink">
                I&apos;m coming back after a break
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                A broader bridge-mode diagnostic that goes deeper into
                foundations before rebuilding the path to linear equations.
              </p>
            </button>
          </div>
        </section>

        <section className="rounded-[2rem] border border-line bg-ink p-6 text-white shadow-card">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 text-gold">
                <Star className="h-4 w-4" />
                XP
              </div>
              <p className="mt-2 text-2xl font-semibold">{progress.xp}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gold">
                <Flame className="h-4 w-4" />
                Streak
              </div>
              <p className="mt-2 text-2xl font-semibold">{progress.streak}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gold">
                <Sparkles className="h-4 w-4" />
                Latest badges
              </div>
              <p className="mt-2 text-sm leading-6 text-white/80">
                {progress.badges.length > 0
                  ? progress.badges.join(" · ")
                  : "No badges yet. Finish one roadmap step to unlock momentum."}
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (currentQuestion) {
    return (
      <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
              {mode === "returnee" ? "Returnee bridge mode" : "Current learner mode"}
            </p>
            <h1 className="mt-2 font-heading text-3xl text-ink">
              Question {(session?.totalQuestions ?? 0) + 1} of {session?.maxQuestions}
            </h1>
          </div>
          <div className="rounded-full bg-tint px-4 py-2 text-sm text-teal-dark">
            Probing {conceptMap[currentQuestion.conceptId].name}
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-tint p-5">
          <p className="text-lg font-semibold text-ink">
            {currentQuestion.question.stem}
          </p>
          <div className="mt-4 grid gap-3">
            {currentQuestion.question.options.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm transition",
                  selectedIndex === index
                    ? "border-teal bg-white text-ink"
                    : "border-transparent bg-white/80 text-muted"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={selectedIndex === null}
            onClick={submitAnswer}
            className={buttonVariants({ variant: "default" })}
          >
            {session.totalQuestions + 1 >= session.maxQuestions
              ? "Finish diagnostic"
              : "Save and continue"}
          </button>
          <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
            Exit to dashboard
          </Link>
        </div>
      </section>
    );
  }

  if (loading || !result) {
    return (
      <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          Building roadmap
        </p>
        <h1 className="mt-3 font-heading text-3xl text-ink">
          Finding the earliest break in the chain
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          RootED is scoring each concept, checking prerequisites in topological
          order, and generating the first catch-up steps now.
        </p>
      </section>
    );
  }

  const firstRoadmap = result.roadmaps[0];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          Diagnostic result
        </p>
        <h1 className="mt-3 font-heading text-3xl text-ink">
          Your first repair point is {firstRoadmap.rootGapName}
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          This is the earliest failed concept whose prerequisites looked stable,
          so it is the root gap most likely blocking progress toward linear
          equations.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {firstRoadmap.pathToTarget.map((conceptId, index) => (
            <span
              key={conceptId}
              className="rounded-full bg-tint px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-dark"
            >
              {conceptMap[conceptId].name}
              {index < firstRoadmap.pathToTarget.length - 1 ? " →" : ""}
            </span>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-tint-warm p-4 text-sm leading-6 text-text">
          {result.aiConfigured ? (
            "Claude is configured, so these step descriptions were refreshed through the AI pathway."
          ) : (
            "AI is not configured right now, so RootED used its seeded bridge-learning micro-lessons instead of crashing."
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-line bg-ink p-6 text-white shadow-card">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-gold">
              <Star className="h-4 w-4" />
              XP
            </div>
            <p className="mt-2 text-2xl font-semibold">{progress.xp}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gold">
              <Flame className="h-4 w-4" />
              Streak
            </div>
            <p className="mt-2 text-2xl font-semibold">{progress.streak}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="h-4 w-4" />
              Badge
            </div>
            <p className="mt-2 text-sm leading-6 text-white/80">
              {progress.badges.join(" · ") || "Finish a step to unlock a badge."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {firstRoadmap.steps.map((step, index) => {
          const complete = progress.completedStepIds.includes(step.id);

          return (
            <article
              key={step.id}
              className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.22em] text-teal-dark">
                    Step {index + 1}
                  </p>
                  <h2 className="font-heading text-2xl text-ink">{step.title}</h2>
                  <p className="text-sm leading-7 text-muted">{step.explanation}</p>
                  <div className="rounded-2xl bg-tint p-4 text-sm leading-7 text-text">
                    <strong>Worked example:</strong> {step.workedExample}
                  </div>
                  <div className="rounded-2xl bg-tint-warm p-4 text-sm leading-7 text-text">
                    <strong>Practice:</strong> {step.practiceQuestions.join(" · ")}
                  </div>
                  {step.resourceLabel ? (
                    <p className="text-sm font-medium text-teal-dark">
                      {step.resourceLabel}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => completeStep(firstRoadmap.rootGapName, step)}
                  className={cn(
                    buttonVariants({ variant: complete ? "outline" : "default" }),
                    "shrink-0"
                  )}
                >
                  {complete ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Completed
                    </>
                  ) : (
                    "Mark complete +20 XP"
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setSession(null);
            setResult(null);
            setMode(null);
            setSelectedIndex(null);
          }}
          className={buttonVariants({ variant: "outline" })}
        >
          Start another diagnostic
        </button>
        <Link href="/dashboard" className={buttonVariants({ variant: "default" })}>
          Back to dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
