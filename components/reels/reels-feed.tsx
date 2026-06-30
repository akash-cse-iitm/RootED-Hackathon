"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Link2, Share2 } from "lucide-react";

type Reel = {
  id: string;
  type: "recap" | "quiz" | "scholarship";
  title: string;
  body: string;
  keyPoints?: string[];
  miniLesson?: {
    concept: string;
    explanation: string;
    example: string;
  };
  ctaLabel: string;
  ctaHref: string;
  concept: { id: string; name: string } | null;
  question: {
    id: string;
    stem: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  } | null;
  doc: { title: string; sourceUrl: string } | null;
};

const typeCopy = {
  recap: {
    label: "Concept recap",
    accent: "bg-tint text-teal-dark",
    headerBg: "bg-tint"
  },
  quiz: {
    label: "Quiz reel",
    accent: "bg-tint-warm text-ink",
    headerBg: "bg-tint-warm"
  },
  scholarship: {
    label: "Scholarship / Scheme alert",
    accent: "bg-[#fff0ec] text-coral",
    headerBg: "bg-[#fff0ec]"
  }
};

function shareUrl(href: string) {
  return `${window.location.origin}${href}`;
}

export function ReelsFeed({ reels }: { reels: Reel[] }) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!shareMessage) return;
    const t = window.setTimeout(() => setShareMessage(null), 2200);
    return () => window.clearTimeout(t);
  }, [shareMessage]);

  async function share(reel: Reel) {
    const url = shareUrl(reel.ctaHref);
    const text = `${reel.title} — ${reel.body}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: reel.title, text, url });
        setShareMessage("Shared");
        return;
      } catch {
        // fall through
      }
    }
    await navigator.clipboard.writeText(`${text}\n${url}`);
    setShareMessage("Link copied");
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const orderedReels = useMemo(() => reels, [reels]);

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          Reels feed
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          Short recaps, quiz wins, and support alerts
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Each reel contains an educational mini-lesson or resource. Swipe
          through, learn something, share it with a friend who needs it.
        </p>
        {shareMessage ? (
          <div className="mt-4 rounded-2xl bg-tint p-3 text-sm font-medium text-teal-dark">
            {shareMessage}
          </div>
        ) : null}
      </section>

      <div className="snap-y snap-mandatory space-y-4 md:space-y-6">
        {orderedReels.map((reel) => {
          const selected = selectedAnswers[reel.id];
          const quizAnswered = reel.question && selected !== undefined;
          const quizCorrect = reel.question && selected === reel.question.answerIndex;
          const typeInfo = typeCopy[reel.type];
          const isExpanded = expanded[reel.id] ?? false;

          return (
            <article
              key={reel.id}
              className="snap-start rounded-[2rem] border border-line bg-white shadow-card"
            >
              {/* Header band */}
              <div className={`rounded-t-[2rem] px-5 py-4 ${typeInfo.headerBg}`}>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${typeInfo.accent}`}
                  >
                    {typeInfo.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => share(reel)}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1.5 text-sm font-medium text-ink"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
                <h2 className="mt-4 font-heading text-2xl leading-tight text-ink">
                  {reel.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted">{reel.body}</p>
              </div>

              {/* Body content */}
              <div className="p-5 space-y-4">

                {/* Mini-lesson (recap reels) */}
                {reel.miniLesson ? (
                  <div className="rounded-2xl border border-teal/20 bg-tint p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-teal-dark">
                      <BookOpen className="h-4 w-4" />
                      Mini-lesson: {reel.miniLesson.concept}
                    </div>
                    <p className="text-sm leading-7 text-text">
                      {reel.miniLesson.explanation}
                    </p>
                    <div className="rounded-xl bg-white p-3 text-sm leading-7 text-text">
                      <strong>Example:</strong> {reel.miniLesson.example}
                    </div>
                  </div>
                ) : null}

                {/* Key points (expandable) */}
                {reel.keyPoints && reel.keyPoints.length > 0 ? (
                  <div className="rounded-2xl border border-line bg-white p-4">
                    <button
                      type="button"
                      onClick={() => toggleExpand(reel.id)}
                      className="flex w-full items-center justify-between text-sm font-semibold text-ink"
                    >
                      <span>Key points ({reel.keyPoints.length})</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted" />
                      )}
                    </button>
                    {isExpanded ? (
                      <ul className="mt-3 space-y-2">
                        {reel.keyPoints.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 text-sm leading-6 text-muted"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-muted">
                        {reel.keyPoints[0]}
                        {reel.keyPoints.length > 1
                          ? ` — and ${reel.keyPoints.length - 1} more.`
                          : ""}
                      </p>
                    )}
                  </div>
                ) : null}

                {/* Quiz */}
                {reel.question ? (
                  <div className="space-y-3 rounded-2xl bg-tint-warm p-4">
                    <div className="text-sm font-semibold text-ink">
                      {reel.question.stem}
                    </div>
                    <div className="grid gap-2">
                      {reel.question.options.map((option, index) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((cur) => ({ ...cur, [reel.id]: index }))
                          }
                          className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                            selected === index
                              ? "border-teal bg-white text-ink"
                              : "border-transparent bg-white/80 text-muted hover:bg-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizAnswered ? (
                      <div
                        className={`rounded-2xl p-3 text-sm leading-6 ${
                          quizCorrect
                            ? "bg-[#ecfbf7] text-teal-dark"
                            : "bg-[#fff1ed] text-coral"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-medium">
                          <CheckCircle2 className="h-4 w-4" />
                          {quizCorrect ? "Correct!" : "Not quite — try again next time"}
                        </div>
                        <p className="mt-2">{reel.question.explanation}</p>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* Official resource link */}
                {reel.doc ? (
                  <div className="rounded-2xl border border-line bg-tint p-4 text-sm leading-6 text-text">
                    <p className="font-semibold text-ink">{reel.doc.title}</p>
                    <a
                      href={reel.doc.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 flex items-center gap-2 font-medium text-teal-dark underline-offset-4 hover:underline"
                    >
                      <Link2 className="h-4 w-4" />
                      Open official link
                    </a>
                  </div>
                ) : null}

                {/* CTA */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href={reel.ctaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark"
                  >
                    {reel.ctaLabel}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
