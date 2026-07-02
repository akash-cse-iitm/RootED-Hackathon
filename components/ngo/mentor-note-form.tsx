"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function MentorNoteForm({ learnerId }: { learnerId: string }) {
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/profile/interaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learnerId, note: note.trim() }),
      });
      if (!res.ok) {
        setError("Failed to save note.");
        return;
      }
      setNote("");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={note}
        onChange={(e) => { setNote(e.target.value); setSaved(false); }}
        placeholder="Add a note about this learner — progress, concerns, next steps…"
        rows={3}
        className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none resize-none"
        maxLength={500}
      />
      {error && <p className="text-xs text-coral">{error}</p>}
      {saved && <p className="text-xs text-teal-dark">Note saved.</p>}
      <Button type="submit" disabled={!note.trim() || saving}>
        {saving ? "Saving…" : "Add note"}
      </Button>
    </form>
  );
}
