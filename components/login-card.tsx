"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Languages, ShieldCheck, UserRound } from "lucide-react";

import type { SeededUser } from "@/lib/site";
import { roleThemes } from "@/lib/site";
import { Button } from "@/components/ui/button";

const roleCopy = {
  learner: {
    icon: UserRound,
    label: "Learner",
    text: "See the journey the student experiences across bridge learning and support."
  },
  translator: {
    icon: Languages,
    label: "Translator",
    text: "Use this role later for lecture review and skills passport creation."
  },
  ngo: {
    icon: ShieldCheck,
    label: "NGO Partner",
    text: "Use this role later for the grievance queue and resolution workflow."
  }
};

export function LoginCard({ user }: { user: SeededUser }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const role = roleCopy[user.role];
  const theme = roleThemes[user.role];
  const Icon = role.icon;

  async function login() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user.id })
    });

    if (!response.ok) {
      return;
    }

    startTransition(() => {
      router.push("/dashboard");
      router.refresh();
    });
  }

  return (
    <div className={`rounded-[1.5rem] border border-line p-5 ${theme.panelClassName}`}>
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-teal shadow-sm">
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex-1 space-y-2">
          <div>
            <h2 className="text-lg font-semibold text-ink">{user.name}</h2>
            <p className="text-sm text-muted">
              {role.label} · Locale: {user.locale}
            </p>
          </div>
          <p className="text-sm leading-6 text-muted">{role.text}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {theme.summary}
          </p>
          <Button
            type="button"
            onClick={login}
            disabled={isPending}
            className="bg-teal text-white hover:bg-teal-dark"
          >
            {isPending ? "Signing in..." : `Continue as ${role.label}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
