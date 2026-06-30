import { Heart, Phone } from "lucide-react";

import { CounselingRequestForm } from "@/components/counseling/request-form";
import { SessionQueue } from "@/components/counseling/session-queue";
import { Shell } from "@/components/shell";
import { requireAuth } from "@/lib/auth";
import { listSessions } from "@/lib/counseling/store";

export default async function CounselingPage() {
  const user = await requireAuth("counseling");

  const isNgo = user.role === "ngo";
  const sessions = isNgo ? await listSessions() : [];

  return (
    <Shell className="pb-16 pt-6">
      {/* Header */}
      <section className="mb-8 rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff0ec] text-coral">
            <Heart className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-coral">
              Family Counseling
            </p>
            <h1 className="mt-1 font-heading text-3xl text-ink">
              {isNgo ? "Counseling session queue" : "Request a family counseling session"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              {isNgo
                ? "Review requests from families, schedule callback calls, and add counselor notes."
                : "Facing pressure to drop out, financial difficulty, or a family concern? Tell us — a trained counselor will call you back within 48 hours. Everything you share is confidential."}
            </p>
          </div>
        </div>

        {!isNgo && (
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-coral/20 bg-[#fff0ec] px-4 py-2 text-sm text-coral">
              <Phone className="h-3.5 w-3.5" />
              Need help now? Call CHILDLINE 1098 (free, 24/7)
            </div>
          </div>
        )}
      </section>

      {/* Main content */}
      {isNgo ? (
        <SessionQueue initialSessions={sessions} />
      ) : (
        <div className="mx-auto max-w-xl">
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
            <CounselingRequestForm />
          </div>
        </div>
      )}
    </Shell>
  );
}
