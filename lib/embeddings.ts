const DEFAULT_DIMENSIONS = 32;

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function hashToken(token: string) {
  let hash = 0;
  for (let index = 0; index < token.length; index += 1) {
    hash = (hash * 31 + token.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function localEmbed(text: string) {
  const vector = Array.from({ length: DEFAULT_DIMENSIONS }, () => 0);
  const tokens = tokenize(text);

  for (const token of tokens) {
    const slot = hashToken(token) % DEFAULT_DIMENSIONS;
    vector[slot] += 1;
  }

  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => value / norm);
}

export async function embed(texts: string[]) {
  return texts.map(localEmbed);
}

export function cosineSimilarity(a: number[], b: number[]) {
  const length = Math.min(a.length, b.length);
  let total = 0;
  for (let index = 0; index < length; index += 1) {
    total += a[index] * b[index];
  }
  return total;
}

export function getEmbeddingProvider() {
  return process.env.EMBEDDINGS_PROVIDER || "openai";
}

