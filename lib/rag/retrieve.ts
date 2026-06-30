import { cosineSimilarity, embed } from "@/lib/embeddings";
import { loadKnowledgeBase } from "@/lib/rag/ingest";

const hindiScholarshipTerms = ["छात्रवृत्ति", "स्कॉलरशिप", "वजीफा"];
const hindiHumanTerms = ["इंसान", "मानव", "किसी से बात", "शिकायत", "समाधान नहीं"];
const teluguScholarshipTerms = ["స్కాలర్‌షిప్", "విద్యార్థి వేతనం"];
const teluguHumanTerms = ["మనిషి", "ఫిర్యాదు", "సహాయం కావాలి"];

export type SupportedLocale = "en" | "hi" | "te";
export type ChatIntent = "scholarship" | "scheme" | "resource" | "grievance" | "human" | "unknown";

export type RetrievedContext = {
  chunkId: string;
  docId: string;
  docTitle: string;
  docCategory: string;
  sourceUrl: string;
  summary: string;
  summary_hi: string;
  summary_te: string;
  text: string;
  score: number;
};

export function detectLocale(query: string): SupportedLocale {
  if (/[\u0C00-\u0C7F]/u.test(query)) {
    return "te";
  }

  if (/[\u0900-\u097F]/u.test(query)) {
    return "hi";
  }

  return "en";
}

export function detectIntent(query: string): ChatIntent {
  const normalized = query.toLowerCase();

  if (
    normalized.includes("human") ||
    normalized.includes("agent") ||
    normalized.includes("person") ||
    normalized.includes("complaint") ||
    normalized.includes("grievance") ||
    hindiHumanTerms.some((term) => query.includes(term)) ||
    teluguHumanTerms.some((term) => query.includes(term))
  ) {
    return normalized.includes("human") || normalized.includes("agent")
      ? "human"
      : "grievance";
  }

  if (
    normalized.includes("scholarship") ||
    normalized.includes("fee") ||
    normalized.includes("stipend") ||
    hindiScholarshipTerms.some((term) => query.includes(term)) ||
    teluguScholarshipTerms.some((term) => query.includes(term))
  ) {
    return "scholarship";
  }

  if (
    normalized.includes("scheme") ||
    normalized.includes("meal") ||
    normalized.includes("dropout") ||
    normalized.includes("return to school")
  ) {
    return "scheme";
  }

  if (
    normalized.includes("course") ||
    normalized.includes("study") ||
    normalized.includes("resource") ||
    normalized.includes("career") ||
    normalized.includes("skill")
  ) {
    return "resource";
  }

  return "unknown";
}

function expandQuery(query: string, intent: ChatIntent) {
  const locale = detectLocale(query);
  const normalized = query.toLowerCase();
  const pieces = [query];

  if (intent === "scholarship") {
    pieces.push("scholarship aid fee reimbursement NSP");
    if (
      normalized.includes("apply") ||
      normalized.includes("application") ||
      query.includes("apply") ||
      query.includes("आवेदन") ||
      query.includes("कहाँ") ||
      query.includes("कहां")
    ) {
      pieces.push("portal application register official");
    }
  }

  if (intent === "scheme") {
    pieces.push("scheme school support education");
  }

  if (intent === "resource") {
    pieces.push("resource study learning career support");
  }

  if (locale === "hi") {
    pieces.push("hindi learner support india");
  }

  if (locale === "te") {
    pieces.push("telugu learner support india");
  }

  return pieces.join(" ");
}

export async function retrieveKnowledge(query: string, intent: ChatIntent, topK = 5) {
  const kb = await loadKnowledgeBase();
  const [queryVector] = await embed([expandQuery(query, intent)]);
  const docMap = Object.fromEntries(kb.docs.map((doc) => [doc.id, doc]));

  const scored = kb.chunks
    .map((chunk) => {
      const doc = docMap[chunk.docId];
      const baseScore = cosineSimilarity(queryVector, chunk.embedding);
      const queryLower = query.toLowerCase();
      const keywordBoost = doc.tags.some((tag) =>
        queryLower.includes(tag.toLowerCase())
      )
        ? 0.25
        : 0;
      const categoryBoost =
        intent !== "unknown" && doc.category === intent ? 0.2 : 0;
      const portalBoost =
        intent === "scholarship" &&
        (queryLower.includes("apply") ||
          query.includes("आवेदन") ||
          query.includes("कहाँ") ||
          query.includes("कहां")) &&
        (doc.title.includes("National Scholarship Portal") ||
          doc.tags.some((tag) => ["nsp", "portal"].includes(tag.toLowerCase())))
          ? 0.45
          : 0;

      return {
        chunkId: chunk.id,
        docId: doc.id,
        docTitle: doc.title,
        docCategory: doc.category,
        sourceUrl: doc.sourceUrl,
        summary: doc.summary,
        summary_hi: doc.summary_hi,
        summary_te: doc.summary_te,
        text: chunk.text,
        score: baseScore + keywordBoost + categoryBoost + portalBoost
      } satisfies RetrievedContext;
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, topK);

  return scored;
}
