"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CircleHelp,
  Eye,
  EyeOff,
  Heart,
  Languages,
  PlaySquare,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type Tab = "signin" | "signup";
type Role = "learner" | "mentor" | "ngo";

const ROLE_CONFIG: {
  value: Role;
  label: string;
  tagline: string;
  icon: typeof UserRound;
  features: string[];
  color: string;
}[] = [
  {
    value: "learner",
    label: "Learner",
    tagline: "I want to study and catch up",
    icon: UserRound,
    features: ["Gap-Finder diagnostic", "Scholarship chatbot", "Reels feed", "Family counseling"],
    color: "teal",
  },
  {
    value: "mentor",
    label: "Mentor",
    tagline: "I want to guide learners and review content",
    icon: Languages,
    features: ["Review lecture transcripts", "Earn per verified transcript", "Skills passport", "Gap Finder & chatbot access"],
    color: "gold",
  },
  {
    value: "ngo",
    label: "NGO / Counselor",
    tagline: "I support learners and families",
    icon: ShieldCheck,
    features: ["Grievance queue", "Counseling session queue", "Transcript vetting", "All platform access"],
    color: "coral",
  },
];

const DEMO_ACCOUNTS: { role: string; email: string; pw: string; roleValue: Role }[] = [
  { role: "Learner", email: "ananya@demo.com", pw: "demo123", roleValue: "learner" },
  { role: "Mentor", email: "sravani@demo.com", pw: "demo123", roleValue: "mentor" },
  { role: "NGO", email: "rahul@demo.com", pw: "demo123", roleValue: "ngo" },
];

const ROLE_ICON_COLOR: Record<Role, string> = {
  learner: "bg-tint text-teal",
  mentor: "bg-tint-warm text-gold",
  ngo: "bg-[#fff0ec] text-coral",
};

const ROLE_BORDER: Record<Role, string> = {
  learner: "border-teal bg-tint",
  mentor: "border-gold bg-tint-warm",
  ngo: "border-coral bg-[#fff0ec]",
};

export function AuthForm() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("signin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  // sign-in
  const [siEmail, setSiEmail] = useState("");
  const [siPw, setSiPw] = useState("");

  // sign-up
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPw, setSuPw] = useState("");
  const [suRole, setSuRole] = useState<Role>("learner");

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: siEmail, password: siPw }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Login failed."); return; }
      router.push("/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: suName, email: suEmail, password: suPw, role: suRole }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Signup failed."); return; }
      router.push("/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(email: string, pw: string) {
    setSiEmail(email);
    setSiPw(pw);
    setTab("signin");
    setError("");
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* ── Left panel: branding ── */}
      <div className="hidden lg:flex lg:w-[46%] flex-col justify-between bg-ink p-10 text-white">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">RootED</p>
          <h1 className="mt-6 font-heading text-5xl leading-tight">
            Keep every learner in school.
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/70 max-w-xs">
            A mobile-first platform that diagnoses learning gaps, answers questions
            in your language, and connects families with support.
          </p>
        </div>

        {/* Role previews */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Three roles, one platform</p>
          {ROLE_CONFIG.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.value} className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{r.label}</p>
                  <p className="text-xs text-white/50">{r.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-white/30">
          RootED · Built for first-generation learners in India
        </p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile logo */}
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-teal-dark lg:hidden">
            RootED
          </p>

          {/* Tabs */}
          <div className="mb-6 flex rounded-2xl border border-line bg-[#f5f5f5] p-1">
            {(["signin", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
                  tab === t
                    ? "bg-white text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                {t === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl border border-coral/20 bg-[#fff1ed] px-4 py-3 text-sm font-medium text-coral">
              {error}
            </div>
          )}

          {/* ── SIGN IN ── */}
          {tab === "signin" ? (
            <div className="space-y-5">
              <form onSubmit={handleSignIn} className="space-y-4">
                <Field label="Email address">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={siEmail}
                    onChange={(e) => setSiEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </Field>

                <Field label="Password">
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={siPw}
                      onChange={(e) => setSiPw(e.target.value)}
                      placeholder="••••••••"
                      className={`${inputCls} pr-11`}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-ink py-3.5 text-sm font-bold text-white transition hover:bg-teal disabled:opacity-50"
                >
                  {loading ? "Signing in…" : "Sign in →"}
                </button>
              </form>

              {/* Demo accounts */}
              <div>
                <div className="relative my-4 flex items-center">
                  <div className="flex-1 border-t border-line" />
                  <span className="mx-3 text-xs text-muted">or try a demo account</span>
                  <div className="flex-1 border-t border-line" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {DEMO_ACCOUNTS.map((a) => {
                    const cfg = ROLE_CONFIG.find((r) => r.value === a.roleValue)!;
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={a.email}
                        type="button"
                        onClick={() => fillDemo(a.email, a.pw)}
                        className="flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-white px-3 py-3 text-center transition hover:border-teal/40 hover:bg-tint"
                      >
                        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${ROLE_ICON_COLOR[a.roleValue]}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <p className="text-xs font-semibold text-ink">{a.role}</p>
                        <p className="text-[10px] leading-tight text-muted">{a.email}</p>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-center text-[10px] text-muted">All demo accounts use password: <strong>demo123</strong></p>
              </div>
            </div>
          ) : (
            /* ── SIGN UP ── */
            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <input
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    value={suName}
                    onChange={(e) => setSuName(e.target.value)}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </Field>
                <Field label="Email address">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={suEmail}
                    onChange={(e) => setSuEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Password">
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={suPw}
                    onChange={(e) => setSuPw(e.target.value)}
                    placeholder="At least 6 characters"
                    className={`${inputCls} pr-11`}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>

              {/* Role selector */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  I am joining as
                </p>
                <div className="grid gap-2">
                  {ROLE_CONFIG.map((r) => {
                    const Icon = r.icon;
                    const selected = suRole === r.value;
                    return (
                      <label
                        key={r.value}
                        className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border-2 p-4 transition ${
                          selected ? `${ROLE_BORDER[r.value]} border-2` : "border-line bg-white hover:bg-[#fafafa]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={r.value}
                          checked={selected}
                          onChange={() => setSuRole(r.value)}
                          className="sr-only"
                        />
                        <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          selected ? ROLE_ICON_COLOR[r.value] : "bg-[#f5f5f5] text-muted"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-ink">{r.label}</p>
                            {selected && (
                              <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-teal-dark">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-muted">{r.tagline}</p>
                          {selected && (
                            <ul className="mt-2 space-y-1">
                              {r.features.map((f) => (
                                <li key={f} className="flex items-center gap-1.5 text-xs text-text">
                                  <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-ink py-3.5 text-sm font-bold text-white transition hover:bg-teal disabled:opacity-50"
              >
                {loading ? "Creating account…" : "Create account →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-2xl border border-line bg-[#fafafa] px-4 py-3 text-sm text-ink placeholder:text-muted outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20";
