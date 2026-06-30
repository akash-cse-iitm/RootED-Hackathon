import Link from "next/link";

import type { AppRole } from "@/lib/site";
import { roleThemes } from "@/lib/site";

export function RoleHero({
  role,
  name,
  title,
  body
}: {
  role: AppRole;
  name: string;
  title: string;
  body: string;
}) {
  const theme = roleThemes[role];

  return (
    <section className={`rounded-[2rem] p-6 shadow-card ${theme.gradient}`}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${theme.chipClassName}`}>
            {theme.eyebrow}
          </div>
          <h1 className="mt-4 font-heading text-3xl leading-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/80">
            {body}
          </p>
          <p className="mt-4 text-sm font-medium text-white/80">
            Signed in as {name} · {theme.label}
          </p>
        </div>

        <div className="grid gap-3 lg:w-[320px]">
          <div className="rounded-[1.5rem] bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/65">
              This role leads with
            </p>
            <p className="mt-2 text-sm leading-6 text-white/85">
              {theme.summary}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {theme.quickStats.map((stat) => (
              <div key={stat.label} className="rounded-[1.25rem] bg-white/10 p-3">
                <p className="text-xs uppercase tracking-[0.16em] text-white/65">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {theme.quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

