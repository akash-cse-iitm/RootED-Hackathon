"use client";

import { FormEvent, useState } from "react";
import { Languages, Link2, ShieldAlert } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  escalated?: boolean;
  citations?: Array<{
    title: string;
    sourceUrl: string;
    category: string;
  }>;
};

export function ChatApp({ initialTopic }: { initialTopic?: string }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Ask about scholarships, school support, study resources, or say you want a human if the issue is unresolved."
    }
  ]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }

    const nextUserMessage = message.trim();
    setMessages((current) => [...current, { role: "user", text: nextUserMessage }]);
    setMessage("");
    setSending(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: nextUserMessage })
    });

    const payload = await response.json();
    setProvider(payload.provider ?? null);
    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        text: payload.answer,
        escalated: payload.escalated,
        citations: payload.citations
      }
    ]);
    setSending(false);
  }

  return (
    <div className="space-y-6">
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
              Ask in your language. RootED answers only from seeded knowledge.
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              The MVP uses seeded scholarship, scheme, resource, and helpline
              documents. If the answer is weak or you ask for a person, the
              message is escalated to the NGO queue.
            </p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl bg-tint-warm p-4 text-sm leading-6 text-text">
          {provider
            ? `Embedding provider path: ${provider}. If API keys are missing, retrieval still works with RootED's local fallback.`
            : initialTopic
              ? `Deep link topic loaded: ${initialTopic}. Ask a follow-up question to keep exploring that resource.`
              : "Ask a question like: 'मुझे scholarship के लिए कहाँ apply करना है?' or 'I need to return to school after dropping out.'"}
        </div>
      </section>

      <section className="rounded-[2rem] border border-line bg-white p-4 shadow-card sm:p-6">
        <div className="space-y-4">
          {messages.map((entry, index) => (
            <div
              key={`${entry.role}-${index}`}
              className={`rounded-[1.5rem] p-4 ${
                entry.role === "user"
                  ? "ml-8 bg-ink text-white"
                  : "mr-8 bg-tint text-text"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-7">{entry.text}</p>
              {entry.escalated ? (
                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-coral">
                  <ShieldAlert className="h-4 w-4" />
                  Sent to human grievance queue
                </div>
              ) : null}
              {entry.citations?.length ? (
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
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type your question here..."
            className="min-h-[120px] w-full rounded-[1.5rem] border border-line bg-tint px-4 py-4 text-sm outline-none ring-0 placeholder:text-muted"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark disabled:opacity-60"
            >
              {sending ? "Finding grounded answer..." : "Send"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
