import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Languages,
  PlaySquare,
  Sparkles
} from "lucide-react";

import { Shell } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { modules } from "@/lib/site";

const highlights = [
  "Find the root learning gap before it becomes dropout risk",
  "Ask for scholarships and grievance help in your own language",
  "Turn translation work into verified skills and earned income"
];

export default function LandingPage() {
  return (
    <Shell className="pb-16 pt-6">
      <section className="overflow-hidden rounded-[2rem] bg-ink bg-hero-glow px-6 py-8 text-white shadow-card">
        <Badge className="bg-white/10 text-white ring-1 ring-white/15">
          Built for first-generation learners
        </Badge>
        <div className="mt-5 space-y-5">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">
              RootED
            </p>
            <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
              Stay in school by fixing the real reason students fall behind.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              RootED combines bridge learning, local-language support, verified
              skills, and short-form nudges into one deployable learner safety
              net.
            </p>
          </div>
          <div className="grid gap-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-gold text-ink hover:bg-[#f0b457]"
              )}
            >
              Enter the demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-white/20 bg-white/5 text-white hover:bg-white/10"
              )}
            >
              View the dashboard shell
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tint text-teal">
                {module.icon === "gap" && <BookOpen className="h-5 w-5" />}
                {module.icon === "chat" && <CircleHelp className="h-5 w-5" />}
                {module.icon === "earn" && <Languages className="h-5 w-5" />}
                {module.icon === "reels" && <PlaySquare className="h-5 w-5" />}
              </span>
              <div className="space-y-2">
                <h2 className="font-heading text-2xl text-ink">
                  {module.title}
                </h2>
                <p className="text-sm leading-6 text-muted">
                  {module.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </Shell>
  );
}
