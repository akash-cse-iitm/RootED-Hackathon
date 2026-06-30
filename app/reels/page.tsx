import { redirect } from "next/navigation";

import { ReelsFeed } from "@/components/reels/reels-feed";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { listReels } from "@/lib/reels/store";

export default async function ReelsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const reels = await listReels();

  return (
    <Shell className="pb-16 pt-6">
      <ReelsFeed reels={reels} />
    </Shell>
  );
}
