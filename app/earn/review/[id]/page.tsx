import { notFound, redirect } from "next/navigation";

import { TranscriptEditor } from "@/components/earn/transcript-editor";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { getLectureBundle } from "@/lib/earn/store";

export default async function ReviewTranscriptPage({
  params
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const bundle = await getLectureBundle(params.id);
  if (!bundle) {
    notFound();
  }

  return (
    <Shell className="pb-16 pt-6">
      <section className="mb-6 rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          Review draft
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          {bundle.lecture.title}
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Source language: {bundle.lecture.sourceLang.toUpperCase()} · Review
          language: {bundle.transcript.language.toUpperCase()} · Lecture type:{" "}
          {bundle.lecture.type}
        </p>
      </section>
      <TranscriptEditor
        lectureId={bundle.lecture.id}
        role={user.role}
        initialSegments={bundle.transcript.segments}
        canEdit={user.role === "translator"}
        status={bundle.transcript.status}
      />
    </Shell>
  );
}

