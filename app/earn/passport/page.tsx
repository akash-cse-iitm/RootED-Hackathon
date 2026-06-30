import { redirect } from "next/navigation";

import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { getPassport } from "@/lib/earn/store";

export default async function PassportPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }

  const passport = await getPassport(user.id);
  const total = passport.payouts.reduce((sum, payout) => sum + payout.amount, 0);

  return (
    <Shell className="pb-16 pt-6">
      <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
          Skills passport
        </p>
        <h1 className="mt-2 font-heading text-3xl text-ink">
          Verified work and earned total
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          This is RootED&apos;s vocational skill documentation view for the current
          user.
        </p>
        <div className="mt-5 rounded-2xl bg-tint-warm p-4 text-sm font-medium text-text">
          Total earned: ₹{(total / 100).toFixed(2)}
        </div>
      </section>

      <section className="mt-6 grid gap-4">
        {passport.skills.length === 0 ? (
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
            No verified skills yet. Submit a transcript and have it approved to
            unlock your first passport entry.
          </div>
        ) : null}
        {passport.skills.map((skill) => (
          <article
            key={skill.id}
            className="rounded-[2rem] border border-line bg-white p-5 shadow-card"
          >
            <h2 className="font-semibold text-ink">{skill.label}</h2>
            <p className="mt-2 text-sm text-muted">
              Verified at {new Date(skill.verifiedAt).toLocaleString()}
            </p>
          </article>
        ))}
      </section>
    </Shell>
  );
}

