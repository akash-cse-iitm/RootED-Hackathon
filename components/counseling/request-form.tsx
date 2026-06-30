"use client";

import { useState } from "react";
import { Heart, CheckCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getGuidance } from "@/lib/counseling/guidance";
import { TOPIC_LABELS } from "@/lib/counseling/guidance";
import type { CounselingTopic } from "@/lib/counseling/store";

const TOPICS: { value: CounselingTopic; emoji: string }[] = [
  { value: "dropout-pressure", emoji: "📚" },
  { value: "child-marriage", emoji: "💍" },
  { value: "financial", emoji: "💰" },
  { value: "mental-health", emoji: "🧠" },
  { value: "peer-conflict", emoji: "🤝" },
  { value: "domestic-violence", emoji: "🏠" },
  { value: "attendance", emoji: "📅" },
  { value: "other", emoji: "💬" }
];

type Language = "en" | "hi" | "te";

const LANG_LABEL: Record<Language, string> = { en: "English", hi: "Hindi / हिंदी", te: "Telugu / తెలుగు" };

export function CounselingRequestForm() {
  const [step, setStep] = useState<"form" | "guidance" | "done">("form");
  const [lang, setLang] = useState<Language>("en");
  const [topic, setTopic] = useState<CounselingTopic>("dropout-pressure");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const guidance = getGuidance(topic, lang);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/counseling/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactName, contactPhone, language: lang, topic, description })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setStep("guidance");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle className="h-14 w-14 text-teal" />
        <p className="font-heading text-2xl text-ink">Your request has been sent</p>
        <p className="max-w-sm text-sm leading-6 text-muted">
          A counselor will call you within 48 hours. If you need immediate help,
          call <strong>CHILDLINE 1098</strong> or <strong>iCall 9152987821</strong>.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => { setStep("form"); setContactName(""); setContactPhone(""); setDescription(""); }}>
          Submit another request
        </Button>
      </div>
    );
  }

  if (step === "guidance") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-7 w-7 shrink-0 text-teal" />
          <div>
            <p className="font-heading text-xl text-ink">Request received!</p>
            <p className="text-sm text-muted">A counselor will follow up within 48 hours.</p>
          </div>
        </div>

        {/* Immediate guidance card */}
        <div className="rounded-[1.5rem] border border-teal/20 bg-tint p-5">
          <p className="text-xs uppercase tracking-widest text-teal-dark mb-3">While you wait — guidance for your situation</p>
          <h3 className="font-heading text-lg text-ink mb-4">{guidance.heading}</h3>

          <ul className="space-y-3">
            {guidance.tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm leading-6 text-text">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-bold text-teal">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="rounded-[1.5rem] border border-gold/20 bg-tint-warm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Phone className="h-4 w-4 text-gold" />
            <p className="text-sm font-semibold text-ink">Helplines & resources</p>
          </div>
          <ul className="space-y-1.5">
            {guidance.resources.map((r, i) => (
              <li key={i} className="text-sm text-text">• {r}</li>
            ))}
          </ul>
        </div>

        <Button className="w-full" onClick={() => setStep("done")}>
          Got it — done
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Language */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-ink">Preferred language</p>
        <div className="flex gap-2 flex-wrap">
          {(Object.entries(LANG_LABEL) as [Language, string][]).map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`rounded-full px-4 py-1.5 text-sm border transition ${
                lang === code
                  ? "border-teal bg-tint text-teal-dark font-semibold"
                  : "border-line bg-white text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Topic */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-ink">
          What is the main concern? <span className="text-coral">*</span>
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {TOPICS.map(({ value, emoji }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTopic(value)}
              className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                topic === value
                  ? "border-teal bg-tint font-medium text-teal-dark"
                  : "border-line bg-white text-muted hover:border-teal/30"
              }`}
            >
              <span className="text-base">{emoji}</span>
              <span>{TOPIC_LABELS[value]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact name */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="cname">
          Your name <span className="text-coral">*</span>
        </label>
        <input
          id="cname"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Parent or guardian name"
          required
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
        />
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="cphone">
          Phone number <span className="text-coral">*</span>
        </label>
        <input
          id="cphone"
          type="tel"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="10-digit mobile number"
          required
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
        />
        <p className="text-xs text-muted">A counselor will call this number within 48 hours.</p>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="cdesc">
          Brief description <span className="text-coral">*</span>
        </label>
        <textarea
          id="cdesc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what is happening in a few sentences. You do not need to share more than you are comfortable with."
          required
          rows={4}
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal resize-none"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-coral/10 px-4 py-2.5 text-sm text-coral">{error}</p>
      )}

      {/* Emergency note */}
      <div className="rounded-xl border border-coral/20 bg-[#fff0ec] px-4 py-3 text-sm text-text">
        <strong className="text-coral">Need help right now?</strong> Call{" "}
        <strong>CHILDLINE 1098</strong> (free, 24/7) or{" "}
        <strong>iCall 9152987821</strong> for immediate support.
      </div>

      <Button type="submit" disabled={loading || !contactName || !contactPhone || !description} className="w-full gap-2">
        <Heart className="h-4 w-4" />
        {loading ? "Submitting…" : "Request counseling session"}
      </Button>
    </form>
  );
}
