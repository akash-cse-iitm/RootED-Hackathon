import { NextResponse } from "next/server";

import { listReels } from "@/lib/reels/store";

export async function GET() {
  const reels = await listReels();
  return NextResponse.json({ reels });
}

