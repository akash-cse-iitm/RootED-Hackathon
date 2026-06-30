import { redirect } from "next/navigation";

import { ChatApp } from "@/components/chat/chat-app";
import { RoleHero } from "@/components/role-hero";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";

export default async function ChatPage({
  searchParams
}: {
  searchParams: { topic?: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <Shell className="pb-16 pt-6">
      <RoleHero
        role={user.role}
        name={user.name}
        title="Multilingual support chat"
        body="This role lands on a grounded support assistant that can answer with cited context, detect language, and escalate to human support when needed."
      />
      <div className="mt-6">
        <ChatApp initialTopic={searchParams.topic} />
      </div>
    </Shell>
  );
}
