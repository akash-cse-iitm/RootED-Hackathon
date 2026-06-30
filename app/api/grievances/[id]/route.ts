import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { updateGrievanceStatus } from "@/lib/grievances/store";

const requestSchema = z.object({
  status: z.enum(["claimed", "resolved"])
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ngo") {
    return NextResponse.json({ error: "NGO role required." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status update." }, { status: 400 });
  }

  const grievance = await updateGrievanceStatus(
    params.id,
    parsed.data.status,
    user.id
  );

  return NextResponse.json({ grievance });
}

