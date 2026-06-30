import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BookOpen,
  CircleHelp,
  Heart,
  Languages,
  LayoutGrid,
  PlaySquare,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { LogoutButton } from "@/components/logout-button";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { getModulesForRole } from "@/lib/site";
import type { AppRole } from "@/lib/site";

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
  translator: {
    label: "Translator",
    icon: Languages,
    tagline: "Review lecture transcripts to earn verified skill badges and micro-payouts.",
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

      {/* ── NGO quick-action strip ── */}
      {user.role === "ngo" && (
        <section className="mt-8 rounded-[2rem] border border-coral/20 bg-[#fff8f6] p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-widest text-coral mb-3">
            Quick actions
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/grievances"
              className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Open grievance queue →
            </Link>
            <Link
              href="/counseling"
              className="rounded-full border border-coral bg-white px-5 py-2.5 text-sm font-semibold text-coral transition hover:bg-[#fff0ec]"
            >
              Counseling sessions →
            </Link>
          </div>
        </section>
      )}

      {/* ── Translator passport shortcut ── */}
      {user.role === "translator" && (
        <section className="mt-8 rounded-[2rem] border border-gold/20 bg-tint-warm p-5 shadow-card">
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
