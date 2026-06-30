import Link from "next/link";
import { redirect } from "next/navigation";
import { Award, BookOpen, Languages, PlaySquare, ShieldCheck } from "lucide-react";

import { DashboardProgressWidget } from "@/components/dashboard-progress-widget";
import { LogoutButton } from "@/components/logout-button";
import { Shell } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { modules, vidyaItems } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = {
  "first-generation": ShieldCheck,
  tongue: Languages,
  dropout: BookOpen,
  vocational: Award,
  bridge: PlaySquare
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <Shell className="pb-16 pt-6">
      <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Badge className="bg-tint text-teal-dark ring-1 ring-teal/10">
              Dashboard
            </Badge>
            <div>
              <h1 className="font-heading text-3xl text-ink">
                Welcome back, {user.name}
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted">
                RootED keeps the demo focused on the five VIDYA promises:
                bridge learning, mother-tongue support, dropout prevention,
                skill verification, and first-generation learner confidence.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-tint px-4 py-2 text-sm font-medium text-teal-dark">
              Role: {user.role}
            </span>
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Switch user
            </Link>
            <LogoutButton />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
              Built for VIDYA
            </p>
            <h2 className="font-heading text-3xl text-ink">
              Five visible promises, each linked to a working module
            </h2>
          </div>
        </div>
        <div className="grid gap-4">
          {vidyaItems.map((item) => {
            const Icon = icons[item.icon];

            return (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tint-warm text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-teal-dark">
                  {module.kicker}
                </p>
                <h3 className="mt-1 font-heading text-2xl text-ink">
                  {module.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {module.description}
                </p>
              </div>
              <span
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "pointer-events-none"
                )}
              >
                Open
              </span>
            </div>
          </Link>
        ))}
      </section>

      <DashboardProgressWidget userId={user.id} />
    </Shell>
  );
}
