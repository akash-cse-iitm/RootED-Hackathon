import { ChatApp } from "@/components/chat/chat-app";
import { Shell } from "@/components/shell";
import { requireAuth } from "@/lib/auth";

export default async function ChatPage({
  searchParams
}: {
  searchParams: { topic?: string };
}) {
  await requireAuth("chat");

  return (
    <Shell className="pb-16 pt-6">
      <ChatApp initialTopic={searchParams.topic} />
    </Shell>
  );
}
