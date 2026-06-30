import { ReelsFeed } from "@/components/reels/reels-feed";
import { Shell } from "@/components/shell";
import { requireAuth } from "@/lib/auth";
import { listReels } from "@/lib/reels/store";

export default async function ReelsPage() {
  await requireAuth("reels");

  const reels = await listReels();

  return (
    <Shell className="pb-16 pt-6">
      <ReelsFeed reels={reels} />
    </Shell>
  );
}
