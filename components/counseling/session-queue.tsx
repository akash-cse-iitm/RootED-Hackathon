"use client";

import { useState } from "react";
import { Phone, Calendar, CheckCircle2, X, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TOPIC_LABELS } from "@/lib/counseling/guidance";
import type { CounselingSession } from "@/lib/counseling/store";

const STATUS_COLORS: Record<CounselingSession["status"], string> = {
  pending: "bg-gold/15 text-gold",
  scheduled: "bg-tint text-teal-dark",
  completed: "bg-[#e6f9f3] text-[#1a7a55]",
  closed: "bg-[#f3f3f3] text-muted"
};

function SessionCard({ session, onUpdate }: { session: CounselingSession; onUpdate: (s: CounselingSession) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(session.counselorNotes ?? "");
  const [scheduledAt, setScheduledAt] = useState(session.scheduledAt ?? "");
  const [saving, setSaving] = useState(false);

  async function update(status: CounselingSession["status"]) {
    setSaving(true);
    const res = await fetch("/api/counseling/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: session.id, status, scheduledAt, counselorNotes: notes })
    });
    if (res.ok) {
      const { session: updated } = await res.json();
      onUpdate(updated);
    }
    setSaving(false);
  }

  return (
    <div className="rounded-[1.5rem] border border-line bg-white shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_COLORS[session.status]}`}>
              {session.status}
            </span>
            <span className="text-xs text-muted">
              {new Date(session.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
          <p className="font-medium text-ink">{TOPIC_LABELS[session.topic]}</p>
          <p className="text-sm text-muted">
            {session.contactName} · {session.contactPhone} · {session.language.toUpperCase()}
          </p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 rounded-full p-1.5 hover:bg-tint"
        >
          {expanded ? <ChevronUp className="h-4 w-4 text-muted" /> : <ChevronDown className="h-4 w-4 text-muted" />}
        </button>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-line px-5 pb-5 pt-4 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-1">Description</p>
            <p className="text-sm leading-6 text-text">{session.description}</p>
          </div>

          {/* Schedule time */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink" htmlFor={`sched-${session.id}`}>
              Schedule callback date &amp; time
            </label>
            <input
              id={`sched-${session.id}`}
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full rounded-xl border border-line bg-tint px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
            />
          </div>

          {/* Counselor notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink" htmlFor={`notes-${session.id}`}>
              Counselor notes (internal)
            </label>
            <textarea
              id={`notes-${session.id}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Observations, follow-up actions…"
              className="w-full rounded-xl border border-line bg-tint px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            {session.status === "pending" && (
              <Button className="gap-1.5 px-4 py-2 text-xs" disabled={saving} onClick={() => update("scheduled")}>
                <Calendar className="h-3.5 w-3.5" />
                {saving ? "Saving…" : "Schedule call"}
              </Button>
            )}
            {(session.status === "pending" || session.status === "scheduled") && (
              <Button variant="outline" className="gap-1.5 px-4 py-2 text-xs" disabled={saving} onClick={() => update("completed")}>
                <CheckCircle2 className="h-3.5 w-3.5 text-teal" />
                {saving ? "Saving…" : "Mark completed"}
              </Button>
            )}
            {session.status !== "closed" && session.status !== "completed" && (
              <button
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-muted transition hover:border-coral/40 hover:text-coral disabled:opacity-50"
                disabled={saving}
                onClick={() => update("closed")}
              >
                <X className="h-3.5 w-3.5" />
                Close
              </button>
            )}
            {(session.status === "scheduled" || session.status === "completed") && (
              <Button variant="outline" className="gap-1.5 px-4 py-2 text-xs" disabled={saving} onClick={() => update(session.status)}>
                Save notes
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function SessionQueue({ initialSessions }: { initialSessions: CounselingSession[] }) {
  const [sessions, setSessions] = useState(initialSessions);

  function handleUpdate(updated: CounselingSession) {
    setSessions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  }

  const pending = sessions.filter((s) => s.status === "pending");
  const scheduled = sessions.filter((s) => s.status === "scheduled");
  const done = sessions.filter((s) => s.status === "completed" || s.status === "closed");

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <Phone className="h-12 w-12 text-teal/40" />
        <p className="font-heading text-xl text-ink">No counseling requests yet</p>
        <p className="text-sm text-muted">When families submit requests, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <section>
          <h3 className="mb-3 font-heading text-lg text-ink">
            Pending ({pending.length})
          </h3>
          <div className="space-y-3">
            {pending.map((s) => <SessionCard key={s.id} session={s} onUpdate={handleUpdate} />)}
          </div>
        </section>
      )}

      {scheduled.length > 0 && (
        <section>
          <h3 className="mb-3 font-heading text-lg text-ink">
            Scheduled ({scheduled.length})
          </h3>
          <div className="space-y-3">
            {scheduled.map((s) => <SessionCard key={s.id} session={s} onUpdate={handleUpdate} />)}
          </div>
        </section>
      )}

      {done.length > 0 && (
        <section>
          <h3 className="mb-3 font-heading text-lg text-ink text-muted">
            Completed &amp; closed ({done.length})
          </h3>
          <div className="space-y-3">
            {done.map((s) => <SessionCard key={s.id} session={s} onUpdate={handleUpdate} />)}
          </div>
        </section>
      )}
    </div>
  );
}
