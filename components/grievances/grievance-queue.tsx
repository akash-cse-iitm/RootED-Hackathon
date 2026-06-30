"use client";

import { useEffect, useState } from "react";

type Grievance = {
  id: string;
  text: string;
  language: string;
  status: "open" | "claimed" | "resolved";
  createdAt: string;
  claimedBy?: string;
  resolvedBy?: string;
};

export function GrievanceQueue() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const response = await fetch("/api/grievances");
    const payload = await response.json();
    setGrievances(payload.grievances ?? []);
    setLoading(false);
  }

  async function update(id: string, status: "claimed" | "resolved") {
    await fetch(`/api/grievances/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    await load();
  }

  useEffect(() => {
    void load();
  }, []);

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
        Loading grievance queue...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {grievances.length === 0 ? (
        <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
          No grievances yet. Ask an off-KB question in chat to see escalation.
        </div>
      ) : null}
      {grievances.map((grievance) => (
        <article
          key={grievance.id}
          className="rounded-[2rem] border border-line bg-white p-5 shadow-card"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-teal-dark">
                {grievance.status}
              </p>
              <p className="mt-2 text-sm leading-7 text-text">{grievance.text}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
                Language: {grievance.language} · Created:{" "}
                {new Date(grievance.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              {grievance.status === "open" ? (
                <button
                  type="button"
                  onClick={() => update(grievance.id, "claimed")}
                  className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink"
                >
                  Claim
                </button>
              ) : null}
              {grievance.status !== "resolved" ? (
                <button
                  type="button"
                  onClick={() => update(grievance.id, "resolved")}
                  className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white"
                >
                  Mark resolved
                </button>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

