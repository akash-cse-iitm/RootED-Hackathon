"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Link2, PlayCircle, Share2 } from "lucide-react";

type Reel = {
  id: string;
  type: "recap" | "quiz" | "scholarship";
  title: string;
  body: string;
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
    accent: "bg-tint text-teal-dark"
  },
  quiz: {
    label: "Quiz reel",
    accent: "bg-tint-warm text-ink"
  },
  scholarship: {
    label: "Scholarship alert",
    accent: "bg-[#fff0ec] text-coral"
  }
};

function shareUrl(href: string) {
  return `${window.location.origin}${href}`;
}

export function ReelsFeed({ reels }: { reels: Reel[] }) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!shareMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setShareMessage(null), 2200);
    return () => window.clearTimeout(timeout);
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
        // Fall through to clipboard.
      }
    }

    await navigator.clipboard.writeText(`${text}\n${url}`);
    setShareMessage("Link copied");
  }

  const orderedReels = useMemo(() => reels, [reels]);

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          Reels feed
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          Swipe through short recaps, quiz wins, and support alerts
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Each reel links back into a real RootED module, so the feed is more
          than engagement. It is a doorway back into action.
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

          return (
            <article
              key={reel.id}
              className="snap-start rounded-[2rem] border border-line bg-white p-5 shadow-card md:min-h-[72vh]"
            >
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${typeInfo.accent}`}
                    >
                      {typeInfo.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => share(reel)}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm font-medium text-ink"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>

                  <h2 className="mt-5 font-heading text-3xl leading-tight text-ink">
                    {reel.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted">{reel.body}</p>

                  {reel.concept ? (
                    <div className="mt-5 rounded-2xl bg-tint p-4 text-sm leading-6 text-text">
                      <strong>Concept link:</strong> {reel.concept.name}
                    </div>
                  ) : null}

                  {reel.question ? (
                    <div className="mt-5 space-y-3 rounded-2xl bg-tint-warm p-4">
                      <div className="text-sm font-semibold text-ink">
                        {reel.question.stem}
                      </div>
                      <div className="grid gap-2">
                        {reel.question.options.map((option, index) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setSelectedAnswers((current) => ({
                                ...current,
                                [reel.id]: index
                              }))
                            }
                            className={`rounded-2xl border px-4 py-3 text-left text-sm ${
                              selected === index
                                ? "border-teal bg-white text-ink"
                                : "border-transparent bg-white/80 text-muted"
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
                            {quizCorrect ? "Correct" : "Try again next time"}
                          </div>
                          <p className="mt-2">{reel.question.explanation}</p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {reel.doc ? (
                    <div className="mt-5 rounded-2xl bg-tint p-4 text-sm leading-6 text-text">
                      <strong>Official resource:</strong> {reel.doc.title}
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
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={reel.ctaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    <PlayCircle className="h-4 w-4" />
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

