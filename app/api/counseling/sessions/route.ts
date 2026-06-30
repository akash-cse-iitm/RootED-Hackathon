import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { listSessions } from "@/lib/counseling/store";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ngo") {
    return NextResponse.json({ error: "NGO role required." }, { status: 403 });
  }

  const sessions = await listSessions();
  return NextResponse.json({ sessions });
}
