/**
 * HuggingFace Inference API helper.
 * Used as a free-tier fallback when Anthropic is not configured.
 * Set HF_TOKEN in environment to enable.
 */

const HF_BASE = "https://api-inference.huggingface.co/models";

// Mistral-7B-Instruct: best free model for structured JSON generation
export const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.1";

export function isHfConfigured(): boolean {
  return Boolean(process.env.HF_TOKEN?.trim());
}

export async function hfGenerate(
  prompt: string,
  maxTokens = 500
): Promise<string> {
  const res = await fetch(`${HF_BASE}/${HF_MODEL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: maxTokens,
        temperature: 0.6,
        do_sample: true,
        return_full_text: false,
      },
    }),
    signal: AbortSignal.timeout(28_000),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`HF ${res.status}: ${msg.slice(0, 120)}`);
  }

  const data = (await res.json()) as Array<{ generated_text?: string }>;
  return data[0]?.generated_text?.trim() ?? "";
}

export function extractJson(raw: string): string {
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("No JSON in HF response");
  return m[0];
}
