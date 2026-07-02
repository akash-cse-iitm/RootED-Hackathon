"use client";

import { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

const LANG_LABELS: Record<string, string> = {
  hi: "Hindi",
  te: "Telugu",
  kn: "Kannada",
  ta: "Tamil",
  en: "English"
};

export function UploadLectureForm({ onSuccess }: { onSuccess?: () => void }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"academic" | "vocational">("academic");
  const [reviewLanguage, setReviewLanguage] = useState("hi");
  const [sourceUrl, setSourceUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/transcription/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, type, reviewLanguage, sourceUrl })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Upload failed. Please try again.");
      } else {
        setSuccess(true);
        setTitle("");
        setSourceUrl("");
        onSuccess?.();
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle className="h-12 w-12 text-teal" />
        <p className="font-heading text-xl text-ink">Lecture submitted!</p>
        <p className="text-sm leading-6 text-muted">
          A draft transcript has been created in the target language.
          Mentors can now open it from the review queue.
        </p>
        <Button
          variant="outline"
          onClick={() => setSuccess(false)}
          className="mt-2"
        >
          Upload another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="title">
          Lecture title <span className="text-coral">*</span>
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Introduction to Solar Energy Systems"
          required
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
        />
      </div>

      {/* Type */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-ink">Lecture type</p>
        <div className="flex gap-3">
          {(["academic", "vocational"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex-1 rounded-xl border px-4 py-2.5 text-sm capitalize transition ${
                type === t
                  ? "border-teal bg-tint font-semibold text-teal-dark"
                  : "border-line bg-white text-muted hover:border-teal/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Target review language */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="lang">
          Target review language
        </label>
        <select
          id="lang"
          value={reviewLanguage}
          onChange={(e) => setReviewLanguage(e.target.value)}
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
        >
          {Object.entries(LANG_LABELS).map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted">
          Mentors reviewing this lecture will work in this language.
        </p>
      </div>

      {/* Source URL (optional) */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="url">
          Source URL{" "}
          <span className="text-muted font-normal">(optional)</span>
        </label>
        <input
          id="url"
          type="url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://nptel.ac.in/courses/..."
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-coral/10 px-4 py-2.5 text-sm text-coral">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading || !title.trim()}
        className="w-full gap-2 rounded-xl"
      >
        <Upload className="h-4 w-4" />
        {loading ? "Submitting…" : "Submit lecture for transcription"}
      </Button>
    </form>
  );
}
