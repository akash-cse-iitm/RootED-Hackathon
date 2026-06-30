"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Segment = {
  start: number;
  end: number;
  text: string;
};

export function TranscriptEditor({
  lectureId,
  role,
  initialSegments,
  canEdit,
  status
}: {
  lectureId: string;
  role: string;
  initialSegments: Segment[];
  canEdit: boolean;
  status: string;
}) {
  const router = useRouter();
  const [segments, setSegments] = useState(initialSegments);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/transcription/review/${lectureId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ segments })
    });
    setSaving(false);
    router.push("/earn");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-tint-warm p-4 text-sm leading-6 text-text">
        {canEdit
          ? "Edit each translated segment, then submit for second review."
          : `You are signed in as ${role}. Only the translator role can submit transcript edits.`}
        <div className="mt-2 font-medium text-teal-dark">Current status: {status}</div>
      </div>
      {segments.map((segment, index) => (
        <div
          key={`${segment.start}-${segment.end}`}
          className="rounded-[1.5rem] border border-line bg-white p-4 shadow-card"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">
            Segment {index + 1} · {segment.start}s - {segment.end}s
          </div>
          <textarea
            value={segment.text}
            disabled={!canEdit}
            onChange={(event) =>
              setSegments((current) =>
                current.map((item, itemIndex) =>
                  itemIndex === index ? { ...item, text: event.target.value } : item
                )
              )
            }
            className="min-h-[120px] w-full rounded-2xl border border-line bg-tint px-4 py-3 text-sm outline-none"
          />
        </div>
      ))}
      {canEdit ? (
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white"
        >
          {saving ? "Submitting..." : "Submit for vetting"}
        </button>
      ) : null}
    </div>
  );
}

