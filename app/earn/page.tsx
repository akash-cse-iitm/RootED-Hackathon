import Link from "next/link";

import { LectureList } from "@/components/earn/lecture-list";
import { UploadLectureForm } from "@/components/earn/upload-lecture-form";
import { Shell } from "@/components/shell";
import { requireAuth } from "@/lib/auth";
import { listLectureCards, listUploadedLectures } from "@/lib/earn/store";

export default async function EarnPage() {
  const user = await requireAuth("earn");

  const [lectures, uploaded] = await Promise.all([
    listLectureCards(),
    listUploadedLectures()
  ]);

  return (
    <Shell className="pb-16 pt-6">
      {/* Header */}
      <section className="mb-6 rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
              Learn and earn
            </p>
            <h1 className="mt-2 font-heading text-3xl text-ink">
              Review and upload lecture transcripts
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Upload popular lectures and get a native-language transcript ready for vetting.
              Translators earn a verified skill badge and ₹15 per approved transcript.
            </p>
          </div>
          <Link
            href="/earn/passport"
            className="shrink-0 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white"
          >
            Open skills passport
          </Link>
        </div>
      </section>

      {/* Upload panel */}
      <section className="mb-8 rounded-[2rem] border border-teal/20 bg-tint p-6 shadow-card">
        <h2 className="mb-4 font-heading text-xl text-ink">
          Submit a lecture for transcription
        </h2>
        <UploadLectureForm />
      </section>

      {/* Uploaded lectures (if any) */}
      {uploaded.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 font-heading text-xl text-ink">
            Uploaded lectures ({uploaded.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {uploaded.map((lec) => (
              <div
                key={lec.id}
                className="rounded-[1.5rem] border border-line bg-white p-4 shadow-card"
              >
                <p className="font-medium text-ink">{lec.title}</p>
                <p className="mt-1 text-xs capitalize text-muted">
                  {lec.type} · Transcript in{" "}
                  {lec.reviewLanguage.toUpperCase()} · Uploaded{" "}
                  {new Date(lec.uploadedAt).toLocaleDateString("en-IN")}
                </p>
                <span className="mt-2 inline-block rounded-full bg-tint px-3 py-0.5 text-xs font-medium text-teal-dark">
                  In review queue
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Seed lecture review list */}
      <h2 className="mb-3 font-heading text-xl text-ink">Review queue</h2>
      <LectureList lectures={lectures} role={user.role} />
    </Shell>
  );
}
