import Link from "next/link";

export function LectureList({
  lectures,
  role
}: {
  lectures: Array<{
    id: string;
    title: string;
    type: "academic" | "vocational";
    reviewLanguage: string;
    transcript: {
      status: "draft" | "in_review" | "published";
      authorId?: string;
    } | null;
  }>;
  role: string;
}) {
  return (
    <div className="grid gap-4">
      {lectures.map((lecture) => (
        <article
          key={lecture.id}
          className="rounded-[2rem] border border-line bg-white p-5 shadow-card"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-teal-dark">
                {lecture.type} · {lecture.reviewLanguage.toUpperCase()} draft
              </p>
              <h2 className="mt-2 font-heading text-2xl text-ink">{lecture.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                Status: {lecture.transcript?.status ?? "draft"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/earn/review/${lecture.id}`}
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink"
              >
                {role === "translator" ? "Review draft" : "View draft"}
              </Link>
              <Link
                href={`/earn/vet/${lecture.id}`}
                className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white"
              >
                Vet transcript
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

