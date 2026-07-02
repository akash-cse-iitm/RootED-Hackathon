"use client";

import { useState } from "react";
import { UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mentor = { id: string; name: string };

export function MentorAssignPanel({
  learnerId,
  currentMentorId,
  mentors,
}: {
  learnerId: string;
  currentMentorId: string | null;
  mentors: Mentor[];
}) {
  const [selected, setSelected] = useState(currentMentorId ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleAssign() {
    if (!selected) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/profile/assign-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learnerId, mentorId: selected }),
      });
      if (!res.ok) {
        const j = await res.json();
        setError(j.error ?? "Failed to assign");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (mentors.length === 0) {
    return (
      <p className="text-sm text-muted">No mentors registered yet. Ask a mentor to sign up.</p>
    );
  }

  return (
    <div className="space-y-3">
      <select
        value={selected}
        onChange={(e) => { setSelected(e.target.value); setSaved(false); }}
        className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
      >
        <option value="">— Select a mentor —</option>
        {mentors.map((m) => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
      {error && <p className="text-xs text-coral">{error}</p>}
      {saved && (
        <p className="flex items-center gap-1.5 text-xs text-teal-dark">
          <UserCheck className="h-3.5 w-3.5" /> Mentor assigned successfully
        </p>
      )}
      <Button
        onClick={handleAssign}
        disabled={!selected || saving || selected === currentMentorId}
        className="w-full"
      >
        {saving ? "Assigning…" : selected === currentMentorId ? "Already assigned" : "Assign mentor"}
      </Button>
    </div>
  );
}
