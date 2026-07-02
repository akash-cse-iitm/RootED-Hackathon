import { redirect } from "next/navigation";
import { CheckCircle2, Award } from "lucide-react";

import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { getPassport, listVocationalSkills } from "@/lib/earn/store";
import { VocationalSkillSection } from "@/components/earn/vocational-skill-section";

export default async function PassportPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const passport = await getPassport(user.id);
  const total = passport.payouts.reduce((sum, payout) => sum + payout.amount, 0);
  const vocationalSkills = await listVocationalSkills(
    user.role === "mentor" || user.role === "ngo" ? undefined : user.id
  );

  return (
    <Shell className="pb-16 pt-6">
      {/* Header */}
      <section className="mb-8 rounded-[2rem] border border-gold/20 bg-tint-warm p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">
              Skills passport
            </p>
            <h1 className="font-heading text-2xl text-ink">{user.name}</h1>
            <p className="mt-1 text-sm text-muted">
              Verified work, vocational skills, and earned total
            </p>
          </div>
          <div className="rounded-2xl bg-white/70 px-6 py-3 text-center">
            <p className="text-xs text-muted uppercase tracking-widest">Total earned</p>
            <p className="font-heading text-2xl text-ink">₹{(total / 100).toFixed(2)}</p>
          </div>
        </div>
      </section>

      {/* Transcript-verified skills */}
      {passport.skills.length > 0 && (
        <section className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
            Transcript review badges
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {passport.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-start gap-3 rounded-2xl border border-teal/20 bg-[#e6f9f3] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <div>
                  <p className="font-medium text-ink text-sm">{skill.label}</p>
                  <p className="text-xs text-muted mt-0.5">
                    Verified {new Date(skill.verifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Vocational skills + add form */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Award className="h-4 w-4 text-gold" />
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Vocational skills
          </p>
        </div>
        <VocationalSkillSection
          initialSkills={vocationalSkills}
          userRole={user.role}
          userId={user.id}
        />
      </section>
    </Shell>
  );
}
