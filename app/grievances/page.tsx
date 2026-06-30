import { GrievanceQueue } from "@/components/grievances/grievance-queue";
import { Shell } from "@/components/shell";
import { requireAuth } from "@/lib/auth";

export default async function GrievancesPage() {
  await requireAuth("grievances");

  return (
    <Shell className="pb-16 pt-6">
      <section className="mb-6 rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-coral">
          NGO queue
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          Claim and resolve escalated learner grievances
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Learner messages that could not be answered by the chatbot, or requests
          for human support, appear here. Claim a grievance to own it, then
          resolve it with a response.
        </p>
      </section>
      <GrievanceQueue />
    </Shell>
  );
}
