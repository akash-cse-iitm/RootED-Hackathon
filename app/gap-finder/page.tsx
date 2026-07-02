import { GapFinderApp } from "@/components/gap-finder/gap-finder-app";
import { Shell } from "@/components/shell";
import { requireAuth } from "@/lib/auth";

export default async function GapFinderPage() {
  const user = await requireAuth("gap-finder");
  return (
    <Shell className="pb-16 pt-6">
      <GapFinderApp userId={user.id} />
    </Shell>
  );
}
