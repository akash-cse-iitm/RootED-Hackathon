"use client";

import { useState, useCallback, useEffect } from "react";
import {
  BookOpen,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Star,
  Sparkles,
  Target,
  TrendingUp,
  Map,
} from "lucide-react";

import {
  createSession,
  recordAnswer,
  isComplete,
  LEVEL_DESC,
} from "@/lib/gapfinder/adaptive";
import { PRESET_TOPICS } from "@/lib/gapfinder/seed-questions";
import { Button } from "@/components/ui/button";
import type { AdaptiveQuestion, AdaptiveSession, DifficultyLevel } from "@/lib/gapfinder/adaptive";
import type { GapAnalysis } from "@/app/api/gap-finder/analyze/route";

type Phase = "topic" | "quiz" | "results";
type Lang = "en" | "hi" | "te";

/* ── Translated UI strings ────────────────────────────────────────────── */
const UI: Record<Lang, {
  chooseTitle: string; chooseDesc: string; chooseTopic: string; orEnter: string;
  enterPh: string; start: string; recentQuizzes: string;
  questionOf: (n: number, t: number) => string;
  levelLabel: string; loading: string;
  correct: string; wrong: string; explain: string; fetching: string;
  next: string; finish: string;
  profIn: string; beginner: string; expert: string;
  mastered: string; gaps: string; roadmap: string; recommendation: string;
  retry: string; askTutor: string; aiLabel: string;
  analysing: string; analysingDesc: string;
  scoreBylevel: string; lvl: string;
  levels: Record<number, string>;
}> = {
  en: {
    chooseTitle: "Gap Finder", chooseDesc: "Answer 10 adaptive questions. Difficulty adjusts in real-time based on your answers to pinpoint exactly where your knowledge gaps are.",
    chooseTopic: "Choose a topic", orEnter: "Or enter any topic", enterPh: "e.g. Organic Chemistry, JavaScript, Economics…", start: "Start", recentQuizzes: "Recent quizzes",
    questionOf: (n, t) => `Question ${n} of ${t}`, levelLabel: "Level", loading: "Generating your next question…",
    correct: "Correct!", wrong: "Not quite.", explain: "Explain this concept with AI", fetching: "Fetching AI explanation…",
    next: "Next question", finish: "See my results",
    profIn: "Your proficiency in", beginner: "Beginner", expert: "Expert",
    mastered: "Mastered", gaps: "Your gaps (learn next)", roadmap: "Your learning roadmap", recommendation: "Recommendation",
    retry: "Try another topic", askTutor: "Ask the AI tutor →", aiLabel: "AI-generated analysis personalised for your quiz performance",
    analysing: "Analysing your results…", analysingDesc: "AI is generating your personalised gap analysis and learning roadmap.",
    scoreBylevel: "Score by difficulty level", lvl: "Lvl",
    levels: { 1: "Beginner", 2: "Basic", 3: "Intermediate", 4: "Advanced", 5: "Expert" },
  },
  hi: {
    chooseTitle: "गैप फाइंडर", chooseDesc: "10 अनुकूली प्रश्नों के उत्तर दें। कठिनाई स्तर आपके उत्तरों के आधार पर बदलता है।",
    chooseTopic: "विषय चुनें", orEnter: "या अपना विषय लिखें", enterPh: "जैसे: जीव विज्ञान, गणित, इतिहास…", start: "शुरू करें", recentQuizzes: "हाल की परीक्षाएं",
    questionOf: (n, t) => `प्रश्न ${n} / ${t}`, levelLabel: "स्तर", loading: "अगला प्रश्न तैयार हो रहा है…",
    correct: "सही!", wrong: "गलत।", explain: "AI से समझाएं", fetching: "AI उत्तर ला रहा है…",
    next: "अगला प्रश्न", finish: "परिणाम देखें",
    profIn: "आपकी दक्षता", beginner: "शुरुआती", expert: "विशेषज्ञ",
    mastered: "आपने सीखा", gaps: "आगे सीखें", roadmap: "सीखने का रोडमैप", recommendation: "सुझाव",
    retry: "दूसरा विषय आज़माएं", askTutor: "AI शिक्षक से पूछें →", aiLabel: "आपके प्रदर्शन पर AI-आधारित विश्लेषण",
    analysing: "परिणाम विश्लेषण हो रहा है…", analysingDesc: "AI आपका व्यक्तिगत गैप विश्लेषण और रोडमैप तैयार कर रहा है।",
    scoreBylevel: "कठिनाई स्तर के अनुसार स्कोर", lvl: "स्तर",
    levels: { 1: "शुरुआती", 2: "बुनियादी", 3: "मध्यम", 4: "उन्नत", 5: "विशेषज्ञ" },
  },
  te: {
    chooseTitle: "గ్యాప్ ఫైండర్", chooseDesc: "10 అడాప్టివ్ ప్రశ్నలకు సమాధానం ఇవ్వండి. మీ సమాధానాల ఆధారంగా కష్టత స్థాయి మారుతుంది.",
    chooseTopic: "విషయం ఎంచుకోండి", orEnter: "లేదా మీ విషయం రాయండి", enterPh: "ఉదా: జీవశాస్త్రం, గణితం, చరిత్ర…", start: "ప్రారంభించు", recentQuizzes: "ఇటీవలి క్విజ్‌లు",
    questionOf: (n, t) => `ప్రశ్న ${n} / ${t}`, levelLabel: "స్థాయి", loading: "తదుపరి ప్రశ్న సిద్ధమవుతోంది…",
    correct: "సరైనది!", wrong: "తప్పు.", explain: "AI తో వివరించు", fetching: "AI వివరణ తీసుకొస్తోంది…",
    next: "తదుపరి ప్రశ్న", finish: "ఫలితాలు చూడండి",
    profIn: "మీ నైపుణ్యం", beginner: "ప్రారంభకుడు", expert: "నిపుణుడు",
    mastered: "నేర్చుకున్నారు", gaps: "తదుపరి నేర్చుకోండి", roadmap: "నేర్చుకునే మార్గం", recommendation: "సూచన",
    retry: "వేరే విషయం ప్రయత్నించండి", askTutor: "AI ట్యూటర్‌ని అడగండి →", aiLabel: "మీ ప్రదర్శన ఆధారంగా AI విశ్లేషణ",
    analysing: "ఫలితాలు విశ్లేషిస్తోంది…", analysingDesc: "AI మీ వ్యక్తిగత గ్యాప్ విశ్లేషణ మరియు రోడ్‌మ్యాప్ తయారు చేస్తోంది.",
    scoreBylevel: "కష్టత స్థాయి వారీగా స్కోర్", lvl: "స్థాయి",
    levels: { 1: "ప్రారంభకుడు", 2: "ప్రాథమిక", 3: "మధ్యస్తం", 4: "అభివృద్ధి", 5: "నిపుణుడు" },
  },
};

const LEVEL_COLOR: Record<number, string> = {
  1: "bg-slate-100 text-slate-600",
  2: "bg-blue-50 text-blue-600",
  3: "bg-tint text-teal",
  4: "bg-gold/10 text-[#8a6300]",
  5: "bg-[#fff0ec] text-coral",
};

const PROFICIENCY_BAR_COLOR: Record<number, string> = {
  1: "bg-slate-400",
  2: "bg-blue-400",
  3: "bg-teal",
  4: "bg-gold",
  5: "bg-coral",
};

function StarRating({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= level ? "fill-gold text-gold" : "text-line"}`}
        />
      ))}
    </div>
  );
}

type QuizHistoryEntry = {
  topic: string;
  level: number;
  label: string;
  date: string;
};

const HISTORY_KEY = "rooted_quiz_history";

function loadHistory(): QuizHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveHistory(entry: QuizHistoryEntry) {
  if (typeof window === "undefined") return;
  const prev = loadHistory();
  const next = [entry, ...prev].slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

const LEVEL_BADGE: Record<number, string> = {
  1: "bg-slate-100 text-slate-600",
  2: "bg-blue-50 text-blue-600",
  3: "bg-tint text-teal",
  4: "bg-gold/10 text-[#8a6300]",
  5: "bg-[#fff0ec] text-coral",
};

const LANG_OPTIONS: { id: Lang; label: string; native: string }[] = [
  { id: "en", label: "English", native: "English" },
  { id: "hi", label: "Hindi", native: "हिंदी" },
  { id: "te", label: "Telugu", native: "తెలుగు" },
];

function LangPicker({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex gap-1 rounded-xl border border-line bg-[#f5f5f5] p-1">
      {LANG_OPTIONS.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            lang === o.id ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
          }`}
        >
          {o.native}
        </button>
      ))}
    </div>
  );
}

function TopicSelect({
  lang, onLangChange, onStart,
}: {
  lang: Lang; onLangChange: (l: Lang) => void; onStart: (topic: string) => void;
}) {
  const t = UI[lang];
  const [custom, setCustom] = useState("");
  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tint">
            <Target className="h-5 w-5 text-teal" />
          </span>
          <h1 className="font-heading text-2xl text-ink">{t.chooseTitle}</h1>
        </div>
        <LangPicker lang={lang} onChange={onLangChange} />
      </div>
      <p className="mb-6 text-sm leading-6 text-muted">{t.chooseDesc}</p>

      {/* Past quiz history */}
      {history.length > 0 && (
        <div className="mb-6 rounded-2xl border border-line bg-white p-4 shadow-card">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
            Recent quizzes
          </p>
          <div className="space-y-2">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => onStart(h.topic)}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-line px-3 py-2 text-left transition hover:border-teal/40 hover:bg-tint"
              >
                <span className="text-sm font-medium text-ink">{h.topic}</span>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${LEVEL_BADGE[h.level]}`}>
                    {h.label}
                  </span>
                  <span className="text-[10px] text-muted">{h.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          {t.chooseTopic}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PRESET_TOPICS.map((tp) => (
            <button
              key={tp.id}
              onClick={() => onStart(tp.label)}
              className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white p-4 text-center shadow-card transition-all hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-md"
            >
              <span className="text-2xl">{tp.emoji}</span>
              <span className="text-sm font-medium text-ink">{tp.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-tint p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
          {t.orEnter}
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && custom.trim().length >= 3) onStart(custom.trim());
            }}
            placeholder={t.enterPh}
            className="flex-1 rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none"
          />
          <Button
            onClick={() => { if (custom.trim().length >= 3) onStart(custom.trim()); }}
            disabled={custom.trim().length < 3}
          >
            {t.start}
          </Button>
        </div>
      </div>
    </div>
  );
}

type HintState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; concept: string; explanation: string; example: string; tip: string };

function QuizScreen({
  question,
  questionNumber,
  lang,
  onAnswer,
  isLoading,
}: {
  question: AdaptiveQuestion | null;
  questionNumber: number;
  lang: Lang;
  onAnswer: (index: number) => void;
  isLoading: boolean;
}) {
  const t = UI[lang];
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState<HintState>({ status: "idle" });
  const total = 10;

  // Reset hint whenever question changes
  useEffect(() => {
    setHint({ status: "idle" });
  }, [question?.id]);

  function handleSelect(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
  }

  function handleNext() {
    if (selected === null) return;
    onAnswer(selected);
    setSelected(null);
    setRevealed(false);
  }

  async function fetchHint() {
    if (!question) return;
    setHint({ status: "loading" });
    try {
      const res = await fetch("/api/gap-finder/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: question.topic,
          question: question.question,
          correctAnswer: question.options[question.correctIndex],
          explanation: question.explanation,
          lang,
        }),
      });
      const data = await res.json();
      setHint({ status: "done", ...data });
    } catch {
      setHint({ status: "idle" });
    }
  }

  if (isLoading || !question) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <Sparkles className="h-8 w-8 animate-pulse text-teal" />
        <p className="text-sm text-muted">{t.loading}</p>
      </div>
    );
  }

  const correct = revealed && selected === question.correctIndex;

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-1 flex items-center justify-between text-xs text-muted">
          <span>{t.questionOf(questionNumber, total)}</span>
          <div className="flex items-center gap-1.5">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${LEVEL_COLOR[question.level]}`}>
              {t.levelLabel} {question.level} — {t.levels[question.level]}
            </span>
            <StarRating level={question.level} />
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-teal transition-all duration-500"
            style={{ width: `${((questionNumber - 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-5 rounded-2xl border border-line bg-white p-6 shadow-card">
        <p className="font-heading text-lg leading-7 text-ink">{question.question}</p>
      </div>

      {/* Options */}
      <div className="mb-4 space-y-2.5">
        {question.options.map((opt, i) => {
          let cls =
            "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-left text-sm text-ink transition-all hover:border-teal/40 hover:bg-tint";
          if (revealed && i === question.correctIndex)
            cls = "w-full rounded-xl border-2 border-teal bg-tint px-4 py-3.5 text-left text-sm font-medium text-teal-dark";
          else if (revealed && i === selected)
            cls = "w-full rounded-xl border-2 border-coral bg-[#fff0ec] px-4 py-3.5 text-left text-sm text-coral";
          else if (!revealed && selected === i)
            cls = "w-full rounded-xl border-2 border-teal/60 bg-tint px-4 py-3.5 text-left text-sm text-teal-dark";

          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              <span className="mr-3 inline-block w-6 text-center font-semibold">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback + AI hint */}
      {revealed && (
        <div
          className={`mb-4 rounded-xl p-4 text-sm leading-6 ${
            correct ? "bg-[#e6f9f3] text-[#1a7a55]" : "bg-[#fff0ec] text-coral"
          }`}
        >
          <div className="flex items-start gap-3">
            {correct ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <span>
              <strong>{correct ? t.correct + " " : t.wrong + " "}</strong>
              {question.explanation}
            </span>
          </div>

          {/* AI Explain button — only shown on wrong answer */}
          {!correct && hint.status === "idle" && (
            <button
              onClick={fetchHint}
              className="mt-3 flex items-center gap-1.5 rounded-lg border border-coral/30 bg-white/70 px-3 py-1.5 text-xs font-medium text-coral transition hover:bg-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t.explain}
            </button>
          )}

          {!correct && hint.status === "loading" && (
            <div className="mt-3 flex items-center gap-2 text-xs text-coral/70">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              {t.fetching}
            </div>
          )}

          {!correct && hint.status === "done" && (
            <div className="mt-3 rounded-lg border border-coral/20 bg-white/80 p-3 space-y-1.5">
              <p className="text-xs font-semibold text-ink uppercase tracking-widest">
                {hint.concept}
              </p>
              <p className="text-xs text-ink/80">{hint.explanation}</p>
              <p className="text-xs text-muted">
                <strong>Example:</strong> {hint.example}
              </p>
              <p className="text-xs font-medium text-teal-dark">
                💡 {hint.tip}
              </p>
            </div>
          )}
        </div>
      )}

      {revealed && (
        <Button className="w-full gap-2" onClick={handleNext}>
          {questionNumber < total ? t.next : t.finish}
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

function ResultsScreen({
  topic,
  result,
  lang,
  onRetry,
}: {
  topic: string;
  result: GapAnalysis;
  lang: Lang;
  onRetry: () => void;
}) {
  const t = UI[lang];
  const barColor = PROFICIENCY_BAR_COLOR[result.proficiencyLevel];

  return (
    <div className="mx-auto max-w-xl">
      {result.aiGenerated && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-tint px-4 py-2 text-xs text-teal-dark">
          <Sparkles className="h-3.5 w-3.5 text-teal" />
          {t.aiLabel}
        </div>
      )}

      {/* Proficiency header */}
      <div className="mb-6 rounded-2xl border border-line bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t.profIn}
            </p>
            <h2 className="font-heading text-2xl text-ink">{topic}</h2>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-bold uppercase tracking-widest ${LEVEL_COLOR[result.proficiencyLevel]}`}>
            {result.proficiencyLabel}
          </span>
        </div>

        <div className="mb-1 flex items-center justify-between text-xs text-muted">
          <span>{t.beginner}</span>
          <span>{t.expert}</span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full bg-line">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${result.percentage}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-muted leading-6">{LEVEL_DESC[result.proficiencyLevel]}</p>
      </div>

      {/* Per-level breakdown */}
      <div className="mb-6 rounded-2xl border border-line bg-white p-5 shadow-card">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          {t.scoreBylevel}
        </p>
        <div className="space-y-2.5">
          {([1, 2, 3, 4, 5] as const).map((l) => {
            const s = result.correctAtLevel[l];
            if (!s || s.total === 0) return null;
            const pct = Math.round((s.correct / s.total) * 100);
            return (
              <div key={l} className="flex items-center gap-3">
                <span className={`w-28 rounded-full px-2 py-0.5 text-center text-[10px] font-bold uppercase tracking-widest ${LEVEL_COLOR[l]}`}>
                  {t.lvl} {l} · {t.levels[l]}
                </span>
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                    <div
                      className={`h-full rounded-full ${pct >= 50 ? "bg-teal" : "bg-coral"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className="w-16 text-right text-xs text-muted">
                  {s.correct}/{s.total} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mastered vs gaps */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {result.masteredConcepts.length > 0 && (
          <div className="rounded-2xl border border-teal/20 bg-[#e6f9f3] p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-teal-dark">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t.mastered}
            </p>
            <ul className="space-y-1">
              {result.masteredConcepts.map((c) => (
                <li key={c} className="text-sm text-[#1a7a55]">• {c}</li>
              ))}
            </ul>
          </div>
        )}
        {result.gapConcepts.length > 0 && (
          <div className="rounded-2xl border border-coral/20 bg-[#fff0ec] p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-coral">
              <TrendingUp className="h-3.5 w-3.5" />
              {t.gaps}
            </p>
            <ul className="space-y-1">
              {result.gapConcepts.map((c) => (
                <li key={c} className="text-sm text-coral">• {c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* AI-generated roadmap */}
      {result.roadmap.length > 0 && (
        <div className="mb-6 rounded-2xl border border-line bg-white p-5 shadow-card">
          <p className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
            <Map className="h-3.5 w-3.5" />
            {t.roadmap}
          </p>
          <div className="space-y-4">
            {result.roadmap.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal text-xs font-bold text-white">
                  {step.step}
                </div>
                <div>
                  <p className="font-medium text-ink text-sm">{step.title}</p>
                  <p className="mt-0.5 text-sm leading-6 text-muted">{step.description}</p>
                  {step.resources.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {step.resources.map((r) => (
                        <li key={r} className="text-xs text-teal-dark">→ {r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      <div className="mb-6 rounded-2xl border border-gold/20 bg-tint-warm p-5">
        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
          <BookOpen className="h-3.5 w-3.5" />
          {t.recommendation}
        </p>
        <p className="text-sm leading-6 text-muted">{result.recommendation}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={onRetry} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          {t.retry}
        </Button>
        <a
          href="/chat"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-teal hover:text-teal"
        >
          {t.askTutor}
        </a>
      </div>
    </div>
  );
}

export function GapFinderApp({ userId: _userId }: { userId: string }) {
  const [phase, setPhase] = useState<Phase>("topic");
  const [lang, setLang] = useState<Lang>("en");
  const [topic, setTopic] = useState("");
  const [session, setSession] = useState<AdaptiveSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveQuestion | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState<GapAnalysis | null>(null);

  const fetchQuestion = useCallback(async (sess: AdaptiveSession, currentLang: Lang) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gap-finder/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: sess.topic,
          level: sess.currentLevel,
          askedIds: sess.askedIds,
          lang: currentLang,
        }),
      });
      if (!res.ok) throw new Error("fetch failed");
      const q = (await res.json()) as AdaptiveQuestion;
      setCurrentQuestion(q);
    } catch {
      setCurrentQuestion(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function handleStart(selectedTopic: string) {
    setTopic(selectedTopic);
    const sess = createSession(selectedTopic);
    setSession(sess);
    setQuestionNumber(1);
    setPhase("quiz");
    await fetchQuestion(sess, lang);
  }

  async function handleAnswer(selectedIndex: number) {
    if (!session || !currentQuestion) return;
    const { session: updated } = recordAnswer(session, currentQuestion, selectedIndex);
    setSession(updated);

    if (isComplete(updated)) {
      setIsAnalysing(true);
      try {
        const res = await fetch("/api/gap-finder/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: updated.topic,
            answers: updated.answers,
            lang,
          }),
        });
        if (res.ok) {
          const analysis = (await res.json()) as GapAnalysis;
          setResult(analysis);
          saveHistory({
            topic: updated.topic,
            level: analysis.proficiencyLevel,
            label: analysis.proficiencyLabel,
            date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
          });
          // Sync to server so NGOs can track quiz performance
          fetch("/api/profile/quiz-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              topic: updated.topic,
              proficiencyLevel: analysis.proficiencyLevel,
              proficiencyLabel: analysis.proficiencyLabel,
              percentage: analysis.percentage,
            }),
          }).catch(() => {/* non-critical */});
        }
      } finally {
        setIsAnalysing(false);
      }
      setPhase("results");
      return;
    }

    setQuestionNumber((n) => n + 1);
    await fetchQuestion(updated, lang);
  }

  function handleRetry() {
    setPhase("topic");
    setTopic("");
    setSession(null);
    setCurrentQuestion(null);
    setResult(null);
    setQuestionNumber(1);
  }

  const t = UI[lang];

  return (
    <div>
      {phase === "topic" && (
        <TopicSelect lang={lang} onLangChange={setLang} onStart={handleStart} />
      )}
      {phase === "quiz" && (
        <>
          {isAnalysing ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <Sparkles className="h-10 w-10 animate-pulse text-teal" />
              <p className="font-heading text-xl text-ink">{t.analysing}</p>
              <p className="text-sm text-muted">{t.analysingDesc}</p>
            </div>
          ) : (
            <QuizScreen
              question={currentQuestion}
              questionNumber={questionNumber}
              lang={lang}
              onAnswer={handleAnswer}
              isLoading={isLoading}
            />
          )}
        </>
      )}
      {phase === "results" && result && (
        <ResultsScreen topic={topic} result={result} lang={lang} onRetry={handleRetry} />
      )}
    </div>
  );
}
