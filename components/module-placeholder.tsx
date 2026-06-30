import Link from "next/link";

import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";

export function ModulePlaceholder({
  title,
  eyebrow,
  description
}: {
  title: string;
  eyebrow: string;
  description: string;
}) {
  return (
    <Shell className="flex min-h-screen items-center py-10">
      <div className="w-full rounded-[2rem] border border-line bg-white p-6 shadow-card sm:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-3xl text-ink">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          {description}
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "default" })}
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </Shell>
  );
}
