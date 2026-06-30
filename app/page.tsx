import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Sign in · RootED",
};

export default async function RootPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");
  return <AuthForm />;
}
