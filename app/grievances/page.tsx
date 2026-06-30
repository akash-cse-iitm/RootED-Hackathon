import { redirect } from "next/navigation";

import { GrievanceQueue } from "@/components/grievances/grievance-queue";
import { RoleHero } from "@/components/role-hero";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";

export default async function GrievancesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <Shell className="pb-16 pt-6">
      <RoleHero
        role={user.role}
        name={user.name}
        title="Human grievance queue"
        body="This role is intentionally different from the learner view: it prioritizes follow-up, resolution, and safe handoff once AI can no longer help."
      />
      <section className="mb-6 rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          NGO queue
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          Claim and resolve escalated learner grievances
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          This page is role-gated for the NGO user in the demo. If a learner asks
          for a human or the chat cannot ground an answer, the grievance appears
          here.
        </p>
      </section>
      {user.role !== "ngo" ? (
        <section className="rounded-[2rem] border border-line bg-tint-warm p-6 shadow-card">
          <p className="text-sm leading-7 text-text">
            You are signed in as <strong>{user.role}</strong>. Switch to the NGO
            demo user to manage the grievance queue.
          </p>
        </section>
      ) : (
        <GrievanceQueue />
      )}
    </Shell>
  );
}
