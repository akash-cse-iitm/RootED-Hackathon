import { NextResponse } from "next/server";

import { loadKnowledgeBase } from "@/lib/rag/ingest";

export async function GET() {
  const kb = await loadKnowledgeBase();

  return NextResponse.json({
    docs: kb.docs.length,
    chunks: kb.chunks.length,
    provider: kb.provider
  });
}

