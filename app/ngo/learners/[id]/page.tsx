import { redirect, notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, MessageSquare, Target, UserCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Shell } from "@/components/shell";
import { requireAuth } from "@/lib/auth";
import { getProfile } from "@/lib/profiles/store";
import { findUserById, listUsers } from "@/lib/users/store";
import { calcRisk, RISK_COLOR, RISK_DOT, RISK_LABEL } from "@/lib/profiles/risk";
import { MentorAssignPanel } from "@/components/ngo/mentor-assign-panel";
import { MentorNoteForm } from "@/components/ngo/mentor-note-form";

const GOAL_LABELS: Record<string, string> = {
  family: "🏠 For my family",
  career: "💼 Better career",
  "financial-freedom": "💰 Financial freedom",
  "self-growth": "🌱 Self-growth",
  complete: "🎓 Complete what I started",
  respect: "🤝 Earn respect",
};

const WINDOW_LABELS: Record<string, string> = {
  morning: "🌅 Early morning (5–8 AM)",
  midday: "☀️ Lunch break (12–2 PM)",
  evening: "🌆 Evening (6–9 PM)",
  night: "🌙 Late night (after 9 PM)",
  commute: "🚌 Commute time",
  short: "⚡ Short pockets (10–15 min)",
};

export default async function LearnerProfilePage({ params }: { params: { id: string } }) {
  const ngo = await requireAuth("grievances");
  if (ngo.role !== "ngo") redirect("/dashboard");

  const [learnerUser, profile, allUsers] = await Promise.all([
    findUserById(params.id),
    getProfile(params.id),
    listUsers(),
  ]);

  if (!learnerUser || learnerUser.role !== "learner") notFound();

  const mentors = allUsers.filter((u) => u.role === "mentor");
  const risk = profile
    ? calcRisk(profile)
    : { score: 30, level: "medium" as const, reasons: ["No activity recorded yet"], daysSinceLastSeen: 999 };

  return (
    <Shell className="pb-16 pt-6">
      {/* Back */}
      <Link
        href="/ngo/learners"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to roster
      </Link>

      {/* Header card */}
      <section className="mb-6 rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-tint text-teal font-bold text-2xl">
              {learnerUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-heading text-2xl text-ink">{learnerUser.name}</h1>
              <p className="text-sm text-muted">{learnerUser.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${RISK_COLOR[risk.level]}`}>
                  <span className={`h-2 w-2 rounded-full ${RISK_DOT[risk.level]}`} />
                  {RISK_LABEL[risk.level]} · {risk.score}/100
                </span>
                {profile?.assignedMentorName && (
                  <span className="flex items-center gap-1 rounded-full bg-tint px-2.5 py-1 text-xs font-semibold text-teal-dark">
                    <UserCheck className="h-3.5 w-3.5" />
                    Mentor: {profile.assignedMentorName}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-sm text-muted">
            <p className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {risk.daysSinceLastSeen > 365
                ? "Never seen active"
                : risk.daysSinceLastSeen === 0
                ? "Active today"
                : `Last seen ${risk.daysSinceLastSeen} days ago`}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column — profile details */}
        <div className="lg:col-span-2 space-y-6">

          {/* Risk reasons */}
          <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
              <AlertTriangle className="h-3.5 w-3.5" />
              Dropout risk factors
            </p>
            {risk.reasons.length === 0 ? (
              <p className="text-sm text-muted">No risk factors detected.</p>
            ) : (
              <ul className="space-y-2">
                {risk.reasons.map((r) => (
                  <li key={r} className={`flex items-start gap-2 text-sm ${
                    risk.level === "high" ? "text-coral" : risk.level === "medium" ? "text-[#8a6300]" : "text-muted"
                  }`}>
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${RISK_DOT[risk.level]}`} />
                    {r}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Personal story */}
          {profile?.personalStory ? (
            <section className="rounded-2xl border border-teal/20 bg-tint p-5 shadow-card">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-dark">
                Personal story
              </p>
              <p className="text-sm leading-7 text-ink italic">"{profile.personalStory}"</p>
            </section>
          ) : (
            <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Personal story</p>
              <p className="text-sm text-muted">Learner has not completed the Welcome Back journey yet.</p>
            </section>
          )}

          {/* Goals & study window */}
          {profile && (profile.goals.length > 0 || profile.studyWindow) && (
            <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <div className="grid gap-4 sm:grid-cols-2">
                {profile.goals.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Learning goals</p>
                    <ul className="space-y-1.5">
                      {profile.goals.map((g) => (
                        <li key={g} className="text-sm text-ink">{GOAL_LABELS[g] ?? g}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {profile.studyWindow && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Study window</p>
                    <p className="text-sm text-ink">{WINDOW_LABELS[profile.studyWindow] ?? profile.studyWindow}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Quiz history */}
          <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
              <BookOpen className="h-3.5 w-3.5" />
              Quiz history ({profile?.quizSessions.length ?? 0} sessions)
            </p>
            {!profile || profile.quizSessions.length === 0 ? (
              <p className="text-sm text-muted">No quizzes completed yet.</p>
            ) : (
              <div className="space-y-2.5">
                {[...profile.quizSessions].reverse().map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tint text-xs font-bold text-teal">
                      {s.proficiencyLevel}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink truncate">{s.topic}</p>
                      <p className="text-xs text-muted">{s.proficiencyLabel} · {s.percentage}%</p>
                    </div>
                    <div className="w-20 shrink-0">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                        <div
                          className={`h-full rounded-full ${s.percentage >= 60 ? "bg-teal" : s.percentage >= 40 ? "bg-gold" : "bg-coral"}`}
                          style={{ width: `${s.percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted shrink-0">
                      {new Date(s.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Mentor interactions */}
          <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
              <MessageSquare className="h-3.5 w-3.5" />
              Mentor notes ({profile?.mentorInteractions.length ?? 0})
            </p>
            {!profile || profile.mentorInteractions.length === 0 ? (
              <p className="text-sm text-muted">No mentor notes yet.</p>
            ) : (
              <div className="space-y-3">
                {[...profile.mentorInteractions].reverse().map((m, i) => (
                  <div key={i} className="rounded-xl border border-line bg-[#fafafa] p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-ink">{m.mentorName}</p>
                      <p className="text-xs text-muted">
                        {new Date(m.at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <p className="text-sm text-muted leading-5">{m.note}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <MentorNoteForm learnerId={learnerUser.id} />
            </div>
          </section>
        </div>

        {/* Right column — actions */}
        <div className="space-y-4">
          {/* Mentor assignment */}
          <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
              <Target className="h-3.5 w-3.5" />
              Assign mentor
            </p>
            <MentorAssignPanel
              learnerId={learnerUser.id}
              currentMentorId={profile?.assignedMentorId ?? null}
              mentors={mentors.map((m) => ({ id: m.id, name: m.name }))}
            />
          </section>

          {/* Quick stats */}
          <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Quick stats</p>
            <div className="space-y-2.5">
              {[
                {
                  label: "Quizzes done",
                  value: String(profile?.quizSessions.length ?? 0),
                  good: (profile?.quizSessions.length ?? 0) > 0,
                },
                {
                  label: "Avg quiz score",
                  value: profile && profile.quizSessions.length > 0
                    ? `${Math.round(profile.quizSessions.reduce((s, q) => s + q.percentage, 0) / profile.quizSessions.length)}%`
                    : "—",
                  good: profile
                    ? profile.quizSessions.reduce((s, q) => s + q.percentage, 0) / Math.max(1, profile.quizSessions.length) >= 50
                    : false,
                },
                {
                  label: "Mentor assigned",
                  value: profile?.assignedMentorName ?? "None",
                  good: !!profile?.assignedMentorId,
                },
                {
                  label: "Story shared",
                  value: profile?.personalStory ? "Yes" : "No",
                  good: !!profile?.personalStory,
                },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted">{stat.label}</span>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${stat.good ? "text-teal-dark" : "text-coral"}`}>
                    {stat.good
                      ? <CheckCircle2 className="h-3 w-3" />
                      : <AlertTriangle className="h-3 w-3" />}
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Shell>
  );
}
