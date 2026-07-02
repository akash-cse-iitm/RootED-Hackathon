"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function VettingPanel({
  lectureId,
  role,
  canVet,
  status,
  authorId
}: {
  lectureId: string;
  role: string;
  canVet: boolean;
  status: string;
  authorId?: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function approve() {
    setSaving(true);
    const response = await fetch(`/api/transcription/vet/${lectureId}`, {
      method: "POST"
    });
    if (response.ok) {
      setDone(true);
      router.refresh();
    }
    setSaving(false);
  }

  return (
    <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
      <p className="text-sm uppercase tracking-[0.22em] text-teal-dark">
        Vetting
      </p>
      <h2 className="mt-2 font-heading text-2xl text-ink">
        Second-review approval
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        Current status: {status}. Author: {authorId ?? "Not submitted yet"}.
      </p>
      <div className="mt-4 rounded-2xl bg-tint-warm p-4 text-sm leading-6 text-text">
        {canVet
          ? "Approving this draft publishes it, creates a mocked payout entry, and adds a verified skill to the author's passport."
          : `You are signed in as ${role}. Only a mentor acting as second reviewer or the NGO role can approve.`}
      </div>
      {done ? (
        <div className="mt-4 rounded-2xl bg-tint p-4 text-sm font-medium text-teal-dark">
          Approved. The author&apos;s skills passport and earned total are now updated.
        </div>
      ) : null}
      {canVet ? (
        <button
          type="button"
          onClick={approve}
          disabled={saving}
          className="mt-5 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white"
        >
          {saving ? "Approving..." : "Approve and publish"}
        </button>
      ) : null}
    </div>
  );
}
