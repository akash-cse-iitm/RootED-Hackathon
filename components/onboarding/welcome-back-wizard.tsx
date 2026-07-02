"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Heart,
  Lightbulb,
  MapPin,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import type { OnboardingMatch } from "@/app/api/onboarding/match/route";

type Phase = "time" | "why" | "brave" | "challenge" | "results";

const STEPS: Phase[] = ["time", "why", "brave", "challenge", "results"];
const STEP_LABEL: Record<Phase, string> = {
  time: "Your time",
  why: "Your why",
  brave: "Your strength",
  challenge: "Your path",
  results: "Your plan",
};

/* ─── Study window options ─────────────────────────────────────────────── */
const WINDOWS = [
  { id: "morning", label: "Early morning", sub: "5 – 8 AM", emoji: "🌅" },
  { id: "midday", label: "Lunch break", sub: "12 – 2 PM", emoji: "☀️" },
  { id: "evening", label: "Evening", sub: "6 – 9 PM", emoji: "🌆" },
  { id: "night", label: "Late night", sub: "After 9 PM", emoji: "🌙" },
  { id: "commute", label: "Commute time", sub: "Bus / train", emoji: "🚌" },
  { id: "short", label: "Small pockets", sub: "10–15 min whenever", emoji: "⚡" },
];

/* ─── Goal cards ────────────────────────────────────────────────────────── */
const GOALS = [
  { id: "family", label: "For my family", sub: "Give them a better life", emoji: "🏠" },
  { id: "career", label: "Better career", sub: "Job, promotion, new field", emoji: "💼" },
  { id: "financial-freedom", label: "Financial freedom", sub: "Not depend on anyone", emoji: "💰" },
  { id: "self-growth", label: "My own growth", sub: "Prove it to myself", emoji: "🌱" },
  { id: "complete", label: "Complete what I started", sub: "Finish what's pending", emoji: "🎓" },
  { id: "respect", label: "Earn respect", sub: "Be taken seriously", emoji: "🤝" },
];

/* ─── Module icon map ───────────────────────────────────────────────────── */
const MOD_ICON: Record<string, typeof Target> = {
  "gap-finder": Target,
  chat: Lightbulb,
  reels: TrendingUp,
  counseling: Heart,
};

/* ─── Progress dots ─────────────────────────────────────────────────────── */
function ProgressBar({ phase }: { phase: Phase }) {
  const current = STEPS.indexOf(phase);
  return (
    <div className="flex items-center gap-2">
      {STEPS.filter((s) => s !== "results").map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full transition-all ${
              i < current ? "bg-teal" : i === current ? "bg-teal scale-125" : "bg-line"
            }`}
          />
          {i < STEPS.length - 2 && (
            <div className={`h-px w-8 ${i < current ? "bg-teal" : "bg-line"}`} />
          )}
        </div>
      ))}
      <span className="ml-2 text-xs text-muted">{STEP_LABEL[phase]}</span>
    </div>
  );
}

/* ─── Step 1: Time Management ───────────────────────────────────────────── */
function StepTime({ onNext }: { onNext: (window: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tint">
          <Clock className="h-8 w-8 text-teal" />
        </div>
        <h2 className="font-heading text-3xl text-ink">Let's talk about time</h2>
        <p className="mt-3 text-sm leading-7 text-muted max-w-sm mx-auto">
          You don't need hours. Research shows <strong className="text-ink">20 minutes a day</strong> done
          consistently beats 3-hour marathon sessions every weekend.
        </p>
      </div>

      {/* Visual: 20 min = 120 hrs/year */}
      <div className="rounded-2xl border border-teal/20 bg-tint p-5 text-center">
        <p className="text-4xl font-heading text-teal">20 min × 365 days</p>
        <p className="mt-1 text-sm text-muted">= <strong className="text-ink">122 hours of learning per year.</strong></p>
        <p className="mt-2 text-xs text-muted">That's more than most full-time students get in a semester.</p>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          When can you give yourself 20 minutes?
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {WINDOWS.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelected(w.id)}
              className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                selected === w.id
                  ? "border-teal bg-tint shadow-md"
                  : "border-line bg-white hover:border-teal/40"
              }`}
            >
              <span className="text-2xl">{w.emoji}</span>
              <p className="mt-2 font-medium text-ink text-sm">{w.label}</p>
              <p className="text-xs text-muted">{w.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="rounded-xl border border-teal/20 bg-[#e6f9f3] p-4 text-sm text-[#1a7a55]">
          <strong>Great choice.</strong> We'll remind you to use your {WINDOWS.find(w => w.id === selected)?.label.toLowerCase()} slot for learning. Consistency is your superpower.
        </div>
      )}

      <button
        onClick={() => selected && onNext(selected)}
        disabled={!selected}
        className="w-full rounded-2xl bg-teal py-4 text-sm font-bold text-white transition hover:bg-teal-dark disabled:opacity-40 flex items-center justify-center gap-2"
      >
        That's my time slot <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ─── Step 2: Why Learn ─────────────────────────────────────────────────── */
function StepWhy({ onNext }: { onNext: (goals: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tint-warm">
          <Heart className="h-8 w-8 text-gold" />
        </div>
        <h2 className="font-heading text-3xl text-ink">Why does this matter to you?</h2>
        <p className="mt-3 text-sm leading-7 text-muted max-w-sm mx-auto">
          Your "why" is the fuel that keeps you going on hard days. Pick everything that feels true.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {GOALS.map((g) => {
          const isOn = selected.includes(g.id);
          return (
            <button
              key={g.id}
              onClick={() => toggle(g.id)}
              className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                isOn
                  ? "border-gold bg-tint-warm shadow-md"
                  : "border-line bg-white hover:border-gold/40"
              }`}
            >
              <span className="text-2xl">{g.emoji}</span>
              <p className="mt-2 font-medium text-ink text-sm">{g.label}</p>
              <p className="text-xs text-muted">{g.sub}</p>
              {isOn && (
                <CheckCircle2 className="mt-2 h-3.5 w-3.5 text-gold" />
              )}
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="rounded-xl border border-gold/20 bg-tint-warm p-4 text-sm text-[#8a6300]">
          <strong>Powerful.</strong>{" "}
          {selected.length === 1
            ? `"${GOALS.find((g) => g.id === selected[0])?.label}" is a strong reason.`
            : `You have ${selected.length} powerful reasons to keep going.`}{" "}
          Remember these on the days learning feels hard.
        </div>
      )}

      <button
        onClick={() => selected.length > 0 && onNext(selected)}
        disabled={selected.length === 0}
        className="w-full rounded-2xl bg-ink py-4 text-sm font-bold text-white transition hover:bg-teal disabled:opacity-40 flex items-center justify-center gap-2"
      >
        These are my reasons <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ─── Step 3: You Are Brave ─────────────────────────────────────────────── */
function StepBrave({ name, onNext }: { name: string; onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0ec]">
          <Shield className="h-8 w-8 text-coral" />
        </div>
        <h2 className="font-heading text-3xl text-ink">
          {name}, you are braver than you think.
        </h2>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { stat: "< 5%", label: "Of people who stop learning ever come back.", emoji: "🏆" },
          { stat: "You.", label: "Just became part of that rare 5%.", emoji: "⭐" },
          { stat: "Day 1", label: "Is always the hardest. You just did it.", emoji: "🚀" },
        ].map((s) => (
          <div key={s.stat} className="rounded-2xl border border-line bg-white p-5 text-center shadow-card">
            <p className="text-3xl font-heading text-teal">{s.stat}</p>
            <p className="mt-2 text-xs leading-5 text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Affirmation cards */}
      <div className="space-y-3">
        {[
          {
            icon: "💡",
            heading: "You didn't fail. Life happened.",
            body: "Stopping wasn't weakness — it was survival. Coming back is strength. There's a difference between giving up and pausing.",
          },
          {
            icon: "⏳",
            heading: "You are not behind.",
            body: "There is no race. No one gets disqualified for starting later. Every single person you look up to had a chapter they don't talk about.",
          },
          {
            icon: "🔁",
            heading: "Consistency beats intensity.",
            body: "20 minutes today. 20 minutes tomorrow. 20 minutes the day after. That's how mountains are moved — not in one dramatic push, but in daily commitment.",
          },
        ].map((c) => (
          <div key={c.heading} className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="flex gap-4">
              <span className="text-2xl mt-0.5">{c.icon}</span>
              <div>
                <p className="font-semibold text-ink">{c.heading}</p>
                <p className="mt-1.5 text-sm leading-6 text-muted">{c.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full rounded-2xl bg-coral py-4 text-sm font-bold text-white transition hover:opacity-90 flex items-center justify-center gap-2"
      >
        I'm ready to continue <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ─── Step 4: Challenge + AI Match ─────────────────────────────────────── */
function StepChallenge({
  goals,
  studyWindow,
  onNext,
}: {
  goals: string[];
  studyWindow: string;
  onNext: (match: OnboardingMatch) => void;
}) {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (story.trim().length < 10) {
      setError("Please tell us a little more — even a few sentences help.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const [matchRes] = await Promise.all([
        fetch("/api/onboarding/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ story: story.trim(), goals, studyWindow }),
        }),
        // Save profile server-side so NGOs can see it
        fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            personalStory: story.trim(),
            goals,
            studyWindow,
          }),
        }),
      ]);
      if (!matchRes.ok) throw new Error("Failed");
      const match = (await matchRes.json()) as OnboardingMatch;
      onNext(match);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tint">
          <MapPin className="h-8 w-8 text-teal" />
        </div>
        <h2 className="font-heading text-3xl text-ink">What stopped you?</h2>
        <p className="mt-3 text-sm leading-7 text-muted max-w-sm mx-auto">
          No judgment here. The more honestly you share, the better we can match
          the right support for your specific situation.
        </p>
      </div>

      <div className="rounded-xl border border-line bg-tint p-4 text-xs text-muted leading-5">
        <strong className="text-ink">Examples:</strong> "I had to stop because my family needed me to work", "I lost confidence after failing an exam", "Financial problems made it impossible", "I didn't have anyone to guide me"…
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-muted">
          In your own words
        </label>
        <textarea
          value={story}
          onChange={(e) => { setStory(e.target.value); setError(""); }}
          placeholder="Tell us what happened. What made it hard to continue? What's different now?"
          rows={5}
          className="w-full rounded-2xl border border-line bg-white px-4 py-4 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none"
        />
        <p className="text-right text-xs text-muted">{story.length} characters</p>
      </div>

      {error && (
        <p className="rounded-xl border border-coral/20 bg-[#fff1ed] px-4 py-3 text-sm text-coral">
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || story.trim().length < 10}
        className="w-full rounded-2xl bg-teal py-4 text-sm font-bold text-white transition hover:bg-teal-dark disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Sparkles className="h-4 w-4 animate-pulse" />
            Analysing your situation…
          </>
        ) : (
          <>
            Build my personalised plan <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}

/* ─── Step 5: Results ────────────────────────────────────────────────────── */
function StepResults({ match, name }: { match: OnboardingMatch; name: string }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tint">
          <Sparkles className="h-8 w-8 text-teal" />
        </div>
        <h2 className="font-heading text-3xl text-ink">Your personalised plan, {name.split(" ")[0]}</h2>
        {match.aiGenerated && (
          <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-teal/20 bg-tint px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-teal-dark">
            <Sparkles className="h-2.5 w-2.5" /> AI-generated for your situation
          </span>
        )}
      </div>

      {/* Personal message */}
      <div className="rounded-2xl border border-teal/20 bg-tint p-5">
        <p className="text-sm leading-7 text-ink italic">"{match.personalMessage}"</p>
      </div>

      {/* Challenges & Strengths */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-coral/20 bg-[#fff8f6] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-coral">
            What we heard
          </p>
          <ul className="space-y-2">
            {match.challenges.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-teal/20 bg-tint p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-dark">
            What we see in you
          </p>
          <ul className="space-y-2">
            {match.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-muted">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action plan */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          Your 3-step plan
        </p>
        <div className="space-y-3">
          {match.actionPlan.map((step) => (
            <div key={step.step} className="flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-card">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                {step.step}
              </div>
              <div>
                <p className="font-medium text-ink text-sm">{step.action}</p>
                <p className="mt-0.5 text-xs text-muted">{step.timeframe}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended modules */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          Your matched tools
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {match.modules.map((mod) => {
            const Icon = MOD_ICON[mod.id] ?? Target;
            return (
              <Link
                key={mod.id}
                href={mod.href}
                className="group flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint text-teal">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium text-ink text-sm">{mod.title}</p>
                    {mod.priority === 1 && (
                      <span className="rounded-full bg-teal/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-teal-dark">
                        Start here
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs leading-5 text-muted">{mod.why}</p>
                </div>
                <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 self-center text-muted opacity-0 transition group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </div>

      <Link
        href="/dashboard"
        className="block w-full rounded-2xl bg-ink py-4 text-center text-sm font-bold text-white transition hover:bg-teal"
      >
        Take me to my dashboard →
      </Link>
    </div>
  );
}

/* ─── Orchestrator ──────────────────────────────────────────────────────── */
export function WelcomeBackWizard({ name }: { name: string }) {
  const [phase, setPhase] = useState<Phase>("time");
  const [studyWindow, setStudyWindow] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [match, setMatch] = useState<OnboardingMatch | null>(null);

  return (
    <div className="mx-auto max-w-xl py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-teal-dark">
          <User className="h-3.5 w-3.5" />
          Welcome back
        </div>
        <ProgressBar phase={phase} />
      </div>

      {phase === "time" && (
        <StepTime
          onNext={(w) => {
            setStudyWindow(w);
            setPhase("why");
          }}
        />
      )}

      {phase === "why" && (
        <StepWhy
          onNext={(g) => {
            setGoals(g);
            setPhase("brave");
          }}
        />
      )}

      {phase === "brave" && (
        <StepBrave name={name} onNext={() => setPhase("challenge")} />
      )}

      {phase === "challenge" && (
        <StepChallenge
          goals={goals}
          studyWindow={studyWindow}
          onNext={(m) => {
            setMatch(m);
            setPhase("results");
          }}
        />
      )}

      {phase === "results" && match && (
        <StepResults match={match} name={name} />
      )}
    </div>
  );
}
