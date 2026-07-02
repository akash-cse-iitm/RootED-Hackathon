import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle, Users, ChevronRight, Clock, BookOpen, UserCheck } from "lucide-react";

import { Shell } from "@/components/shell";
import { requireAuth } from "@/lib/auth";
import { getAllProfiles } from "@/lib/profiles/store";
import { listUsers } from "@/lib/users/store";
import { calcRisk, RISK_COLOR, RISK_DOT, RISK_LABEL } from "@/lib/profiles/risk";

export default async function NGOLearnersPage() {
  const user = await requireAuth("grievances");
  if (user.role !== "ngo") redirect("/dashboard");

  const [profiles, users] = await Promise.all([getAllProfiles(), listUsers()]);

  // Merge profiles with users — every learner gets an entry even without a profile
  const learners = users.filter((u) => u.role === "learner");
  const enriched = learners.map((u) => {
    const profile = profiles.find((p) => p.userId === u.id) ?? null;
    const risk = profile
      ? calcRisk(profile)
      : { score: 30, level: "medium" as const, reasons: ["No activity recorded yet"], daysSinceLastSeen: 999 };
    return { user: u, profile, risk };
  });

  enriched.sort((a, b) => b.risk.score - a.risk.score);

  const highRisk = enriched.filter((e) => e.risk.level === "high");
  const medRisk = enriched.filter((e) => e.risk.level === "medium");

  return (
    <Shell className="pb-16 pt-6">
      {/* Alert banner */}
      {highRisk.length > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-coral/30 bg-[#fff0ec] p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
          <div>
            <p className="font-semibold text-coral text-sm">
              {highRisk.length} learner{highRisk.length > 1 ? "s" : ""} at high dropout risk
            </p>
            <p className="mt-0.5 text-xs text-coral/80">
              {highRisk.map((e) => e.user.name).join(", ")} — assign a mentor or reach out now.
            </p>
          </div>
        </div>
      )}

      {medRisk.length > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-gold/30 bg-tint-warm p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <div>
            <p className="font-semibold text-[#8a6300] text-sm">
              {medRisk.length} learner{medRisk.length > 1 ? "s" : ""} showing early warning signs
            </p>
            <p className="mt-0.5 text-xs text-[#8a6300]/80">
              Consider proactive outreach before disengagement sets in.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted" />
          <h1 className="font-heading text-xl text-ink">Learner Roster</h1>
          <span className="rounded-full bg-tint px-2.5 py-0.5 text-xs font-semibold text-teal-dark">
            {learners.length}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-coral inline-block" /> High</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-gold inline-block" /> At risk</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-teal inline-block" /> Low</span>
        </div>
      </div>

      {learners.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-8 text-center text-sm text-muted shadow-card">
          No learners registered yet.
        </div>
      ) : (
        <div className="space-y-3">
          {enriched.map(({ user: u, profile, risk }) => (
            <Link
              key={u.id}
              href={`/ngo/learners/${u.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-md"
            >
              {/* Avatar */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tint text-teal font-bold text-lg">
                {u.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-ink text-sm">{u.name}</p>
                  <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${RISK_COLOR[risk.level]}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOT[risk.level]}`} />
                    {RISK_LABEL[risk.level]}
                  </span>
                  {profile?.assignedMentorName && (
                    <span className="flex items-center gap-1 rounded-full bg-tint px-2 py-0.5 text-[10px] font-semibold text-teal-dark">
                      <UserCheck className="h-3 w-3" />
                      {profile.assignedMentorName}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted truncate">{u.email}</p>
                <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {risk.daysSinceLastSeen > 365
                      ? "Never active"
                      : risk.daysSinceLastSeen === 0
                      ? "Active today"
                      : `${risk.daysSinceLastSeen}d ago`}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {profile?.quizSessions.length ?? 0} quiz{(profile?.quizSessions.length ?? 0) !== 1 ? "zes" : ""}
                  </span>
                  {profile?.goals && profile.goals.length > 0 && (
                    <span className="truncate max-w-[180px]">
                      Goal: {profile.goals[0].replace(/-/g, " ")}
                    </span>
                  )}
                </div>
              </div>

              <ChevronRight className="h-4 w-4 shrink-0 text-muted transition group-hover:text-teal" />
            </Link>
          ))}
        </div>
      )}
    </Shell>
  );
}
