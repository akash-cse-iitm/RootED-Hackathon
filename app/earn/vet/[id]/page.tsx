import { notFound, redirect } from "next/navigation";

import { VettingPanel } from "@/components/earn/vetting-panel";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { getLectureBundle } from "@/lib/earn/store";

export default async function VetTranscriptPage({
  params
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }

  const bundle = await getLectureBundle(params.id);
  if (!bundle) {
    notFound();
  }

  return (
    <Shell className="pb-16 pt-6">
      <section className="mb-6 rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          Vet translation
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          {bundle.lecture.title}
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Approve this {bundle.lecture.type} lecture draft to publish it and
          award the author in the mocked payout ledger.
        </p>
      </section>
      <VettingPanel
        lectureId={bundle.lecture.id}
        role={user.role}
        canVet={user.role === "mentor" || user.role === "ngo"}
        status={bundle.transcript.status}
        authorId={bundle.transcript.authorId}
      />
    </Shell>
  );
}

