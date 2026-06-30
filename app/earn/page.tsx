import Link from "next/link";
import { redirect } from "next/navigation";

import { LectureList } from "@/components/earn/lecture-list";
import { RoleHero } from "@/components/role-hero";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { listLectureCards } from "@/lib/earn/store";

export default async function EarnPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const lectures = await listLectureCards();

  return (
    <Shell className="pb-16 pt-6">
      <RoleHero
        role={user.role}
        name={user.name}
        title="Learn & Earn workspace"
        body="This role emphasizes verified language work, vocational evidence, and the passport trail that makes contribution visible."
      />
      <section className="mb-6 rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
              Learn and earn
            </p>
            <h1 className="mt-2 font-heading text-3xl text-ink">
              Review local-language lecture drafts and turn them into verified skill
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              The mock transcription provider seeds an academic lecture and a
              vocational lecture so the demo path always works.
            </p>
          </div>
          <Link
            href="/earn/passport"
            className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white"
          >
            Open skills passport
          </Link>
        </div>
      </section>
      <LectureList lectures={lectures} role={user.role} />
    </Shell>
  );
}
