/**
 * Embedding provider with three tiers:
 * 1. HuggingFace sentence-transformers (real semantic search, free with HF_TOKEN)
 * 2. Local 256-dim TF-IDF-style hash embedding (always available, lower accuracy)
 *
 * Both the KB and query must use the same tier so cosine similarity is meaningful.
 * The kbCache in ingest.ts re-embeds on cold start, so switching HF_TOKEN on/off
 * just requires a redeploy.
 */

const HF_EMBED_URL =
  "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

// Larger local dimension → fewer hash collisions, better approximate match
const LOCAL_DIM = 256;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function hashToken(token: string): number {
  let h = 0;
  for (let i = 0; i < token.length; i++) {
    h = (h * 31 + token.charCodeAt(i)) >>> 0;
  }
  return h;
}

function localEmbed(text: string): number[] {
  const vec = new Array<number>(LOCAL_DIM).fill(0);
  const tokens = tokenize(text);

  // Unigrams
  for (const tok of tokens) {
    vec[hashToken(tok) % LOCAL_DIM] += 1;
  }
  // Bigrams for better phrase matching
  for (let i = 0; i < tokens.length - 1; i++) {
    const bigram = tokens[i] + "_" + tokens[i + 1];
    vec[hashToken(bigram) % LOCAL_DIM] += 0.5;
  }

  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

async function hfEmbed(texts: string[]): Promise<number[][]> {
  const res = await fetch(HF_EMBED_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: texts }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!res.ok) {
    throw new Error(`HF embed ${res.status}: ${await res.text().catch(() => "")}`);
  }

  const data = (await res.json()) as number[][];
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error("Unexpected HF embed response shape");
  }
  return data;
}

export async function embed(texts: string[]): Promise<number[][]> {
  if (process.env.HF_TOKEN?.trim()) {
    try {
      return await hfEmbed(texts);
    } catch {
      // fall through to local
    }
  }
  return texts.map(localEmbed);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const len = Math.min(a.length, b.length);
  let total = 0;
  for (let i = 0; i < len; i++) total += a[i] * b[i];
  return total;
}

export function getEmbeddingProvider(): string {
  if (process.env.HF_TOKEN?.trim()) return "huggingface/all-MiniLM-L6-v2";
  return "local-hash-256";
}
