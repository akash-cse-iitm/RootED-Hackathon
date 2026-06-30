import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { approveTranscript } from "@/lib/earn/store";

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();

  if (!user || (user.role !== "translator" && user.role !== "ngo")) {
    return NextResponse.json(
      { error: "Translator or NGO role required." },
      { status: 403 }
    );
  }

  const transcript = await approveTranscript({
    lectureId: params.id,
    vetterId: user.id
  });

  return NextResponse.json({ transcript });
}

