import { redirect } from "next/navigation";

import { LoginCard } from "@/components/login-card";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { seededUsers } from "@/lib/site";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <Shell className="flex min-h-screen items-center py-10">
      <div className="w-full rounded-[2rem] border border-line bg-white p-6 shadow-card sm:p-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-teal-dark">
            Dev Login
          </p>
          <h1 className="font-heading text-3xl text-ink">
            Pick a demo role
          </h1>
          <p className="max-w-xl text-sm leading-6 text-muted">
            Choose one of the seeded users to enter the MVP.{" "}
            <span className="font-medium text-text">
              TODO(prod): phone OTP via SMS provider.
            </span>
          </p>
        </div>
        <div className="mt-6 rounded-[1.5rem] bg-ink p-5 text-white">
          <p className="text-sm uppercase tracking-[0.22em] text-white/65">
            Distinct role experiences
          </p>
          <p className="mt-2 text-sm leading-7 text-white/80">
            Learner opens on bridge learning, translator opens on verified work,
            and NGO opens on the human support queue so the UI changes with the
            person using it.
          </p>
        </div>
        <div className="mt-6 grid gap-4">
          {seededUsers.map((userOption) => (
            <LoginCard key={userOption.id} user={userOption} />
          ))}
        </div>
      </div>
    </Shell>
  );
}
