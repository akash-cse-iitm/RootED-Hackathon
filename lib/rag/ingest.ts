import { promises as fs } from "node:fs";
import path from "node:path";

import { embed, getEmbeddingProvider } from "@/lib/embeddings";

export type SeededKnowledgeDoc = {
  id: string;
  title: string;
  category: string;
  language: string;
  sourceUrl: string;
  tags: string[];
  summary: string;
  summary_hi: string;
  summary_te: string;
  body: string;
};

export type SeededDocChunk = {
  id: string;
  docId: string;
  text: string;
  embedding: number[];
};

export type KnowledgeBase = {
  docs: SeededKnowledgeDoc[];
  chunks: SeededDocChunk[];
  provider: string;
};

const KB_DIR = path.join(process.cwd(), "content", "kb");

let kbCache: Promise<KnowledgeBase> | null = null;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFrontmatter(fileContents: string) {
  const match = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error("KB markdown must include frontmatter.");
  }

  const [, rawFrontmatter, body] = match;
  const entries = rawFrontmatter.split("\n").reduce<Record<string, string>>((acc, line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    acc[key] = value;
    return acc;
  }, {});

  return { entries, body: body.trim() };
}

function chunkBody(doc: SeededKnowledgeDoc) {
  const paragraphs = doc.body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph, index) => ({
    id: `${doc.id}-chunk-${index + 1}`,
    docId: doc.id,
    text: `${doc.title}. ${doc.summary}. ${paragraph}`
  }));
}

export async function loadKnowledgeBase() {
  if (!kbCache) {
    kbCache = (async () => {
      const filenames = await fs.readdir(KB_DIR);
      const docs = await Promise.all(
        filenames
          .filter((filename) => filename.endsWith(".md"))
          .sort()
          .map(async (filename) => {
            const filePath = path.join(KB_DIR, filename);
            const fileContents = await fs.readFile(filePath, "utf8");
            const { entries, body } = parseFrontmatter(fileContents);
            const title = entries.title || filename.replace(/\.md$/, "");

            return {
              id: slugify(title),
              title,
              category: entries.category || "resource",
              language: entries.language || "en",
              sourceUrl: entries.sourceUrl || "",
              tags: (entries.tags || "")
                .split("|")
                .map((tag) => tag.trim())
                .filter(Boolean),
              summary: entries.summary || "",
              summary_hi: entries.summary_hi || entries.summary || "",
              summary_te: entries.summary_te || entries.summary || "",
              body
            } satisfies SeededKnowledgeDoc;
          })
      );

      const rawChunks = docs.flatMap((doc) => chunkBody(doc));
      const vectors = await embed(rawChunks.map((chunk) => chunk.text));
      const chunks = rawChunks.map((chunk, index) => ({
        ...chunk,
        embedding: vectors[index]
      }));

      return {
        docs,
        chunks,
        provider: getEmbeddingProvider()
      };
    })();
  }

  return kbCache;
}

export function resetKnowledgeBaseCache() {
  kbCache = null;
}

