"use client";

import { useState } from "react";
import { CheckCircle2, Plus, ShieldCheck, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VocationalSkill, VocationalCategory } from "@/lib/earn/constants";
import { VOCATIONAL_CATEGORIES } from "@/lib/earn/constants";
import type { AppRole } from "@/lib/site";

const CATEGORY_EMOJI: Record<string, string> = {
  "Tailoring & Stitching": "🧵",
  "Farming & Agriculture": "🌾",
  "Driving & Transport": "🚗",
  "Plumbing & Sanitation": "🔧",
  "Electrical Work": "⚡",
  "Carpentry & Woodwork": "🪵",
  "Mobile Phone Repair": "📱",
  "Cooking & Catering": "🍳",
  "Beauty & Wellness": "💅",
  "Masonry & Construction": "🏗️",
  "Solar Panel Installation": "☀️",
  "Other": "🛠️",
};

type Props = {
  initialSkills: VocationalSkill[];
  userRole: AppRole;
  userId: string;
};

export function VocationalSkillSection({ initialSkills, userRole, userId }: Props) {
  const [skills, setSkills] = useState(initialSkills);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    category: VOCATIONAL_CATEGORIES[0] as VocationalCategory,
    title: "",
    description: "",
    yearsOfExperience: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [error, setError] = useState("");

  const isMentor = userRole === "mentor" || userRole === "ngo";
  const mySkills = isMentor ? skills : skills.filter((s) => s.userId === userId);
  const pendingSkills = isMentor ? skills.filter((s) => s.status === "self-reported") : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/earn/vocational-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json();
        setError(j.error ?? "Failed to save");
        return;
      }
      const skill = (await res.json()) as VocationalSkill;
      setSkills((prev) => [skill, ...prev]);
      setShowForm(false);
      setForm({ category: VOCATIONAL_CATEGORIES[0], title: "", description: "", yearsOfExperience: 1 });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerify(skillId: string) {
    setVerifying(skillId);
    try {
      const res = await fetch("/api/earn/vocational-skill/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId }),
      });
      if (res.ok) {
        const updated = (await res.json()) as VocationalSkill;
        setSkills((prev) => prev.map((s) => (s.id === skillId ? updated : s)));
      }
    } finally {
      setVerifying(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Mentor: pending verification queue */}
      {isMentor && pendingSkills.length > 0 && (
        <div className="rounded-2xl border border-gold/30 bg-tint-warm p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
            Pending your verification ({pendingSkills.length})
          </p>
          <div className="space-y-3">
            {pendingSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-line bg-white p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{CATEGORY_EMOJI[skill.category] ?? "🛠️"}</span>
                    <p className="font-medium text-ink text-sm">{skill.title}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{skill.category} · {skill.yearsOfExperience}yr exp · by {skill.userName}</p>
                  <p className="mt-1.5 text-xs text-ink/80 leading-5">{skill.description}</p>
                </div>
                <button
                  onClick={() => handleVerify(skill.id)}
                  disabled={verifying === skill.id}
                  className="shrink-0 flex items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-dark disabled:opacity-60"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {verifying === skill.id ? "Verifying…" : "Verify"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All verified/own skills */}
      {mySkills.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {mySkills.map((skill) => (
            <div
              key={skill.id}
              className={`rounded-2xl border p-4 ${
                skill.status === "mentor-verified"
                  ? "border-teal/20 bg-[#e6f9f3]"
                  : "border-line bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{CATEGORY_EMOJI[skill.category] ?? "🛠️"}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-ink text-sm">{skill.title}</p>
                    {skill.status === "mentor-verified" ? (
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-teal-dark">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#8a6300]">
                        Self-reported
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{skill.category} · {skill.yearsOfExperience} yr experience</p>
                  {isMentor && (
                    <p className="mt-0.5 text-xs text-muted flex items-center gap-1">
                      <User className="h-3 w-3" /> {skill.userName}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs text-ink/70 leading-5">{skill.description}</p>
                  {skill.verifiedAt && (
                    <p className="mt-1 text-[10px] text-teal-dark">
                      Verified {new Date(skill.verifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {mySkills.length === 0 && !showForm && (
        <div className="rounded-2xl border border-line bg-white p-6 text-center">
          <p className="text-sm text-muted">
            {isMentor
              ? "No vocational skills documented yet. Learners can self-report skills here for your verification."
              : "Document your first vocational skill to build your skills passport."}
          </p>
        </div>
      )}

      {/* Add skill form */}
      {!isMentor && showForm && (
        <div className="rounded-2xl border border-teal/20 bg-tint p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Document a new skill</p>
            <button onClick={() => setShowForm(false)} className="text-muted hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as VocationalCategory }))}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
              >
                {VOCATIONAL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_EMOJI[c]} {c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Skill title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Ladies blouse stitching, Drip irrigation setup…"
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none"
                required
                minLength={3}
                maxLength={120}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Description <span className="normal-case font-normal text-muted/70">(what you can do)</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Describe what you can do, your tools, any training or on-the-job experience…"
                rows={3}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-teal focus:outline-none resize-none"
                required
                minLength={10}
                maxLength={600}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Years of experience
              </label>
              <input
                type="number"
                value={form.yearsOfExperience}
                onChange={(e) => setForm((f) => ({ ...f, yearsOfExperience: Math.max(0, Number(e.target.value)) }))}
                min={0}
                max={60}
                className="w-28 rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-coral">{error}</p>}
            <div className="flex gap-3">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Save skill"}
              </Button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm text-muted hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add button */}
      {!isMentor && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line py-4 text-sm font-medium text-muted transition hover:border-teal/40 hover:text-teal"
        >
          <Plus className="h-4 w-4" />
          Document a vocational skill
        </button>
      )}
    </div>
  );
}
