import { Sparkles } from "lucide-react";

export function AiCapabilityPanel({
  configured,
  roleLabel,
  bullets
}: {
  configured: boolean;
  roleLabel: string;
  bullets: string[];
}) {
  return (
    <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tint text-teal">
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="w-full">
          <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
            AI in this role
          </p>
          <h2 className="mt-2 font-heading text-2xl text-ink">
            {configured ? "AI is configured and active" : "AI-ready with seeded fallback"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            RootED shows AI differently for the {roleLabel} experience so the demo
            still works even if external keys are missing.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {bullets.map((bullet) => (
              <div key={bullet} className="rounded-[1.25rem] bg-tint p-4 text-sm leading-6 text-text">
                {bullet}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
