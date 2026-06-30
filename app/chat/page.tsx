import { redirect } from "next/navigation";

import { ChatApp } from "@/components/chat/chat-app";
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
      <ChatApp initialTopic={searchParams.topic} />
    </Shell>
  );
}
