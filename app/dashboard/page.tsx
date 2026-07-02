import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  BookOpen,
  CircleHelp,
  Heart,
  Languages,
  LayoutGrid,
  PlaySquare,
  ShieldCheck,
  UserCheck,
  UserRound,
  Users,
} from "lucide-react";

import { LogoutButton } from "@/components/logout-button";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { getModulesForRole } from "@/lib/site";
import type { AppRole } from "@/lib/site";
import { getAllProfiles } from "@/lib/profiles/store";
import { listUsers } from "@/lib/users/store";
import { calcRisk } from "@/lib/profiles/risk";

const MODULE_ICONS: Record<string, typeof BookOpen> = {
  "gap-finder": BookOpen,
  chat: CircleHelp,
  earn: Languages,
  reels: PlaySquare,
  counseling: Heart,
  grievances: ShieldCheck,
};

const MODULE_COLORS: Record<string, string> = {
  "gap-finder": "bg-tint text-teal",
  chat: "bg-tint text-teal",
  earn: "bg-tint-warm text-gold",
  reels: "bg-tint text-teal",
  counseling: "bg-[#fff0ec] text-coral",
  grievances: "bg-[#fff0ec] text-coral",
};

const ROLE_META: Record<AppRole, { label: string; icon: typeof UserRound; tagline: string; accent: string }> = {
  learner: {
    label: "Learner",
    icon: UserRound,
    tagline: "Your learning tools are ready. Start with Gap-Finder to diagnose your root gap.",
    accent: "bg-tint border-teal/20 text-teal-dark",
  },
  mentor: {
    label: "Mentor",
    icon: Languages,
    tagline: "Guide learners, review lecture content, and earn verified skill badges.",
    accent: "bg-tint-warm border-gold/20 text-[#8a6300]",
  },
  ngo: {
    label: "NGO Partner",
    icon: ShieldCheck,
    tagline: "Manage learner grievances, counseling sessions, and transcript vetting.",
    accent: "bg-[#fff0ec] border-coral/20 text-coral",
  },
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const roleModules = getModulesForRole(user.role);
  const meta = ROLE_META[user.role];
  const RoleIcon = meta.icon;

  // Fetch for mentor / NGO views only
  const needsRosterData = user.role === "mentor" || user.role === "ngo";
  const allProfiles = needsRosterData ? await getAllProfiles() : [];
  const allUsers = needsRosterData ? await listUsers() : [];

  const assignedLearners = user.role === "mentor"
    ? allProfiles
        .filter((p) => p.assignedMentorId === user.id)
        .map((p) => ({ profile: p, risk: calcRisk(p) }))
    : [];

  const ngoHighRisk = user.role === "ngo"
    ? (() => {
        const learners = allUsers.filter((u) => u.role === "learner");
        return learners
          .map((u) => {
            const profile = allProfiles.find((p) => p.userId === u.id) ?? null;
            const risk = profile
              ? calcRisk(profile)
              : { score: 30, level: "medium" as const, reasons: [], daysSinceLastSeen: 999 };
            return { user: u, risk };
          })
          .filter((e) => e.risk.level === "high");
      })()
    : [];

  return (
    <Shell className="pb-16 pt-6">
      {/* ── Welcome card ── */}
      <section className={`mb-8 rounded-[2rem] border p-6 shadow-card ${meta.accent}`}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/60 ${meta.accent}`}>
              <RoleIcon className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-heading text-2xl text-ink">{user.name}</p>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest ${meta.accent}`}>
                  {meta.label}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-muted max-w-md">
                {meta.tagline}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LogoutButton />
          </div>
        </div>
      </section>

      {/* ── Module grid (role-filtered) ── */}
      <div className="mb-2 flex items-center gap-2">
        <LayoutGrid className="h-4 w-4 text-muted" />
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Your features
        </p>
      </div>
      <section className="grid gap-4 sm:grid-cols-2">
        {roleModules.map((mod) => {
          const Icon = MODULE_ICONS[mod.id] ?? BookOpen;
          const iconCls = MODULE_COLORS[mod.id] ?? "bg-tint text-teal";
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className="group rounded-[1.5rem] border border-line bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconCls}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {mod.kicker}
                  </p>
                  <h2 className="font-heading text-xl text-ink">{mod.title}</h2>
                  <p className="text-sm leading-6 text-muted">{mod.description}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-muted transition group-hover:border-teal group-hover:text-teal">
                  Open →
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ── Learner: Welcome Back Journey ── */}
      {user.role === "learner" && (
        <section className="mt-8 rounded-[2rem] border border-teal/20 bg-tint p-6 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-dark mb-1">
                Returning learner journey
              </p>
              <h3 className="font-heading text-xl text-ink">Not sure where to begin?</h3>
              <p className="mt-1 text-sm leading-6 text-muted max-w-sm">
                A 5-minute guided experience that sets your study schedule, finds your motivation,
                and builds a personalised action plan using AI.
              </p>
            </div>
            <Link
              href="/welcome-back"
              className="shrink-0 rounded-full bg-teal px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-dark"
            >
              Begin my journey →
            </Link>
          </div>
        </section>
      )}

      {/* ── NGO: dropout alert ── */}
      {user.role === "ngo" && ngoHighRisk.length > 0 && (
        <section className="mt-8 flex items-start gap-3 rounded-[2rem] border border-coral/30 bg-[#fff0ec] p-5 shadow-card">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
          <div className="flex-1">
            <p className="font-semibold text-coral text-sm">
              {ngoHighRisk.length} learner{ngoHighRisk.length > 1 ? "s" : ""} at high dropout risk
            </p>
            <p className="mt-0.5 text-xs text-coral/80">
              {ngoHighRisk.map((e) => e.user.name).join(", ")}
            </p>
          </div>
          <Link
            href="/ngo/learners"
            className="shrink-0 rounded-full bg-coral px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
          >
            View roster →
          </Link>
        </section>
      )}

      {/* ── NGO quick-action strip ── */}
      {user.role === "ngo" && (
        <section className="mt-4 rounded-[2rem] border border-coral/20 bg-[#fff8f6] p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-widest text-coral mb-3">
            Quick actions
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ngo/learners"
              className="flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Users className="h-4 w-4" /> Learner roster →
            </Link>
            <Link
              href="/grievances"
              className="rounded-full border border-coral bg-white px-5 py-2.5 text-sm font-semibold text-coral transition hover:bg-[#fff0ec]"
            >
              Grievance queue →
            </Link>
            <Link
              href="/counseling"
              className="rounded-full border border-coral bg-white px-5 py-2.5 text-sm font-semibold text-coral transition hover:bg-[#fff0ec]"
            >
              Counseling →
            </Link>
          </div>
        </section>
      )}

      {/* ── Mentor: assigned learners ── */}
      {user.role === "mentor" && assignedLearners.length > 0 && (
        <section className="mt-8 rounded-[2rem] border border-gold/20 bg-tint-warm p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-3 flex items-center gap-1.5">
            <UserCheck className="h-3.5 w-3.5" />
            Your assigned learners ({assignedLearners.length})
          </p>
          <div className="space-y-2">
            {assignedLearners.map(({ profile, risk }) => (
              <div key={profile.userId} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tint text-teal font-bold text-sm">
                  {profile.userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink">{profile.userName}</p>
                  <p className="text-xs text-muted truncate">
                    {profile.quizSessions.length} quiz{profile.quizSessions.length !== 1 ? "zes" : ""} ·{" "}
                    {risk.daysSinceLastSeen === 0 ? "active today" : `${risk.daysSinceLastSeen}d ago`}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border ${
                  risk.level === "high" ? "bg-[#fff0ec] text-coral border-coral/20" :
                  risk.level === "medium" ? "bg-tint-warm text-[#8a6300] border-gold/20" :
                  "bg-[#e6f9f3] text-teal-dark border-teal/20"
                }`}>
                  {risk.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Mentor passport shortcut ── */}
      {user.role === "mentor" && (
        <section className="mt-4 rounded-[2rem] border border-gold/20 bg-tint-warm p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">
            Skills passport
          </p>
          <p className="text-sm text-muted mb-3">
            Every verified transcript earns a badge and ₹15 micro-payout.
          </p>
          <Link
            href="/earn/passport"
            className="inline-block rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:opacity-90"
          >
            View my passport →
          </Link>
        </section>
      )}
    </Shell>
  );
}
