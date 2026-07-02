"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Languages, Link2, ShieldAlert } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  escalated?: boolean;
  language?: string;
  source?: string;
  citations?: Array<{
    title: string;
    sourceUrl: string;
    category: string;
  }>;
};

// Client-side language detection — mirrors server-side detectLocale + detectHinglish
function detectInputLanguage(text: string): { label: string; flag: string; color: string } | null {
  if (!text.trim() || text.length < 4) return null;
  if (/[ऀ-ॿ]/u.test(text))
    return { label: "Hindi detected", flag: "🇮🇳", color: "bg-orange-50 text-orange-600 border-orange-200" };
  if (/[ఀ-౿]/u.test(text))
    return { label: "Telugu detected", flag: "🇮🇳", color: "bg-blue-50 text-blue-600 border-blue-200" };
  const markers = ["mujhe", "chahiye", "kaise", "nahi", "wala", "wali", "bhai", "yaar",
    "seekhna", "sikho", "padhai", "naukri", "agar", "lekin", "aur ", "mein ", "liye", "kya "];
  if (markers.filter((m) => text.toLowerCase().includes(m)).length >= 2)
    return { label: "Hinglish detected", flag: "🇮🇳", color: "bg-yellow-50 text-yellow-700 border-yellow-200" };
  return null;
}

const SOURCE_LABEL: Record<string, string> = {
  "general-knowledge": "Answered from knowledge base",
  "rag": "Retrieved from documents",
  "escalated": "Escalated to support queue",
};

export function ChatApp({ initialTopic }: { initialTopic?: string }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [streamingIdx, setStreamingIdx] = useState(-1);
  const [streamedLen, setStreamedLen] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Ask about scholarships, school support, study resources, or say you want a human if the issue is unresolved. You can type in Hindi (हिंदी), Telugu (తెలుగు), or Hinglish.",
    },
  ]);

  // Typewriter effect for the latest assistant message
  useEffect(() => {
    if (streamingIdx === -1) return;
    const fullText = messages[streamingIdx]?.text ?? "";
    if (streamedLen >= fullText.length) {
      setStreamingIdx(-1);
      return;
    }
    const t = setTimeout(() => setStreamedLen((n) => n + 5), 14);
    return () => clearTimeout(t);
  }, [streamingIdx, streamedLen, messages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedLen]);

  const langBadge = useMemo(() => detectInputLanguage(message), [message]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;

    const nextUserMessage = message.trim();
    setMessages((cur) => [...cur, { role: "user", text: nextUserMessage }]);
    setMessage("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: nextUserMessage }),
      });

      const payload = await response.json();
      setProvider(payload.provider ?? null);

      setMessages((cur) => {
        const next = [
          ...cur,
          {
            role: "assistant" as const,
            text: payload.answer,
            escalated: payload.escalated,
            language: payload.language,
            source: payload.source,
            citations: payload.citations,
          },
        ];
        // Start typewriter for the new message
        setStreamingIdx(next.length - 1);
        setStreamedLen(0);
        return next;
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tint text-teal">
            <Languages className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
              Grounded multilingual help
            </p>
            <h1 className="mt-2 font-heading text-3xl text-ink">
              Ask in your language.
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Supports Hindi, Telugu, and Hinglish. Covers scholarships, schemes, career,
              re-enrollment, and helplines — grounded in verified Indian government sources.
            </p>
          </div>
        </div>
        {provider && (
          <p className="mt-4 rounded-xl bg-tint-warm px-4 py-2 text-xs text-muted">
            Search: {provider}
          </p>
        )}
      </section>

      {/* Conversation */}
      <section className="rounded-[2rem] border border-line bg-white p-4 shadow-card sm:p-6">
        <div className="space-y-4">
          {messages.map((entry, index) => {
            const isStreaming = index === streamingIdx;
            const displayText = isStreaming
              ? entry.text.slice(0, streamedLen)
              : entry.text;

            return (
              <div
                key={`${entry.role}-${index}`}
                className={`rounded-[1.5rem] p-4 ${
                  entry.role === "user"
                    ? "ml-8 bg-ink text-white"
                    : "mr-8 bg-tint text-text"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-7">
                  {displayText}
                  {isStreaming && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-teal align-text-bottom" />
                  )}
                </p>

                {/* Source tag */}
                {entry.role === "assistant" && entry.source && !isStreaming && (
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-muted/60">
                    {SOURCE_LABEL[entry.source] ?? entry.source}
                    {entry.language && entry.language !== "en" && ` · Replied in ${entry.language === "hi" ? "Hindi" : "Telugu"}`}
                  </p>
                )}

                {entry.escalated && !isStreaming && (
                  <div className="mt-3 flex items-center gap-2 text-sm font-medium text-coral">
                    <ShieldAlert className="h-4 w-4" />
                    Sent to human grievance queue
                  </div>
                )}

                {entry.citations?.length && !isStreaming ? (
                  <div className="mt-4 space-y-2">
                    {entry.citations.map((citation) => (
                      <a
                        key={citation.sourceUrl}
                        href={citation.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-teal-dark underline-offset-4 hover:underline"
                      >
                        <Link2 className="h-4 w-4" />
                        {citation.title}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* Typing indicator while waiting for server */}
          {sending && (
            <div className="mr-8 flex items-center gap-2 rounded-[1.5rem] bg-tint px-5 py-4">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-teal/60"
                    style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }}
                  />
                ))}
              </span>
              <span className="text-xs text-muted">Finding grounded answer…</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Type in Hindi, Telugu, Hinglish, or English… (Enter to send)"
              rows={3}
              className="w-full rounded-[1.5rem] border border-line bg-tint px-4 py-4 pr-4 text-sm outline-none ring-0 placeholder:text-muted focus:border-teal"
            />
            {/* Language detection badge */}
            {langBadge && (
              <span
                className={`absolute bottom-3 left-4 flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${langBadge.color}`}
              >
                {langBadge.flag} {langBadge.label}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={sending || !message.trim()}
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </form>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
