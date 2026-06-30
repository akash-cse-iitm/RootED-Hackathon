"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });

    startTransition(() => {
      router.push("/login");
      router.refresh();
    });
  }

  return (
    <Button onClick={logout} disabled={isPending} className="bg-ink text-white">
      {isPending ? "Leaving..." : "Log out"}
    </Button>
  );
}

