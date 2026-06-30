import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { listGrievances } from "@/lib/grievances/store";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ngo") {
    return NextResponse.json({ error: "NGO role required." }, { status: 403 });
  }

  const grievances = await listGrievances();
  return NextResponse.json({ grievances });
}

