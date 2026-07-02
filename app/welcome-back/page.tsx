import { redirect } from "next/navigation";

import { Shell } from "@/components/shell";
import { WelcomeBackWizard } from "@/components/onboarding/welcome-back-wizard";
import { requireAuth } from "@/lib/auth";

export default async function WelcomeBackPage() {
  const user = await requireAuth("gap-finder"); // learners have gap-finder access
  if (user.role !== "learner") redirect("/dashboard");

  return (
    <Shell className="pb-16 pt-6">
      <WelcomeBackWizard name={user.name} />
    </Shell>
  );
}
