# RootED — AI-Powered School Dropout Prevention

**Live:** https://rooted-hackathon.onrender.com

RootED is a multilingual, mobile-first platform that uses adaptive AI to help first-generation learners in India stay in school. It addresses the 1.5 crore school dropout crisis with personalised gap analysis, a grounded multilingual chatbot, verified skills passport, family counselling, and re-engagement reels.

---

## Features

| Module | What it does | AI used |
|---|---|---|
| **Gap Finder** | 10-question adaptive quiz on *any* topic; difficulty adjusts per answer; AI-generates mastered concepts, gaps, and personalised roadmap | Anthropic Claude → HuggingFace Mistral-7B → seed bank |
| **AI Hint** | Wrong answer? Click "Explain this concept" for an AI-generated explanation + Indian-context example | Claude → HF Mistral → built-in |
| **RAG Chatbot** | Answers scholarship, scheme, career, re-enrollment in Hindi, Telugu, Hinglish — grounded in 10 verified government documents | HF sentence-transformers + GK pre-emption |
| **Learn & Earn** | Upload lectures, review native-language transcripts, build a verified skills passport | — |
| **Reels Feed** | Short recap cards, quiz reels, scholarship alerts to re-engage dropped learners | — |
| **Family Counselling** | Confidential session request for dropout pressure, financial difficulty | — |
| **Grievance Queue** | NGO dashboard to resolve escalated chat queries | — |

---

## AI / LLM Stack

Three-tier fallback so the app always works even without API keys:

```
Tier 1  Anthropic Claude (claude-haiku)          ← paid, highest quality
  ↓
Tier 2  HuggingFace Mistral-7B-Instruct (free)   ← free with HF_TOKEN
  ↓
Tier 3  Local seed bank / static GK module        ← always available, no key needed
```

### What AI does in each module

**Gap Finder — question generation**
Claude or HF Mistral generates fresh MCQs for any topic the student types in. No hardcoded question bank needed for custom topics.

**Gap Finder — gap analysis & roadmap**
After 10 questions the AI produces:
- Topic-specific mastered concepts (based on actual answer pattern at each level)
- Knowledge gaps (subtopics to learn next)
- 3–4 step learning roadmap with real Indian resources (NPTEL, SWAYAM, Khan Academy)
- Personalised recommendation paragraph

**Gap Finder — AI hint on wrong answer**
One click after any incorrect answer fetches an AI explanation of the underlying concept with a concrete Indian-context example and a study tip.

**RAG Chatbot — semantic search**
When `HF_TOKEN` is set, the chatbot uses `sentence-transformers/all-MiniLM-L6-v2` (384-dim semantic embeddings) for document retrieval. Without the token it falls back to a 256-dim bigram hash embedding. Real embeddings dramatically improve accuracy for multilingual and Hinglish queries.

**RAG Chatbot — language-aware replies**
Server-side detection: Hindi (Devanagari) → reply in Hindi, Telugu → reply in Telugu, Hinglish (romanised Hindi) → reply in casual English. The chat UI shows a live language-detection badge as the user types.

---

## Stack

- **Next.js 14** App Router, TypeScript, Tailwind CSS
- **Auth** — JSON file store, bcrypt, HTTP-only signed session cookie
- **RAG** — Markdown KB with frontmatter, cosine similarity, GK pre-emption layer
- **AI** — Anthropic Claude API + HuggingFace Inference API (both optional, graceful fallback)
- **Deployment** — Render (`render.yaml` included)

---

## Local Setup

```bash
git clone <repo>
cd SamaHack
npm install
cp .env.example .env.local
# fill in SESSION_SECRET at minimum
npm run dev
```

Open http://localhost:3000 — sign up on the login page (any email/password).

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SESSION_SECRET` | **Yes** | Random string ≥ 32 chars — `openssl rand -hex 32` |
| `ANTHROPIC_API_KEY` | Optional | Enables Claude for question generation, gap analysis, hints |
| `ANTHROPIC_MODEL` | Optional | Defaults to `claude-haiku-4-5-20251001` |
| `HF_TOKEN` | Optional | Enables HF Mistral (question gen / gap analysis / hints) and semantic embeddings — get free at huggingface.co/settings/tokens |
| `EMBEDDINGS_PROVIDER` | Optional | Set to `local` to force hash embeddings (auto when no HF_TOKEN) |

> All AI features degrade gracefully to seeded content. The app runs fully without any AI key.

---

## Deployment on Render

`render.yaml` in the repo root auto-configures a free-tier Node.js web service.

1. Push to GitHub
2. In Render dashboard → **New → Blueprint** → connect the repo
3. Add environment variables under **Environment**:
   - `SESSION_SECRET` (required)
   - `ANTHROPIC_API_KEY` (optional)
   - `HF_TOKEN` (optional, free)
4. Render runs `npm ci && npm run build && npm start` automatically

---

## Architecture

```
Browser
  │
  ├─ /gap-finder ──► GapFinderApp
  │       ├─ /api/gap-finder/question  Claude → HF Mistral → seed bank
  │       ├─ /api/gap-finder/analyze   Claude → HF Mistral → static fallback
  │       └─ /api/gap-finder/hint      Claude → HF Mistral → built-in explanation
  │
  ├─ /chat ────────► ChatApp (typewriter + language badge)
  │       └─ /api/chat
  │               ├─ detectLocale() + detectHinglish()
  │               ├─ generalKnowledgeAnswer()  [GK pre-emption, checked first]
  │               └─ retrieveContext()         [cosine sim on HF/hash embeddings]
  │
  ├─ /counseling ──► /api/counseling/request → data/counseling.json
  ├─ /grievances ──► NGO queue view
  └─ /earn ────────► Upload + transcript + skills passport
```

---

## Role-Based Access

| Role | Modules |
|---|---|
| `learner` | Gap Finder, Chat, Reels, Counselling |
| `mentor` | Learn & Earn, Gap Finder, Chat, Counselling |
| `ngo` | Grievance Queue, Counselling, Learn & Earn, all modules |
| `admin` | All modules |

---

## Demo Path

1. Sign up as a **learner** → try Gap Finder with "Organic Chemistry" or any custom topic
2. Get a question wrong → click "Explain this concept with AI"
3. See your AI-generated gap analysis and learning roadmap in results
4. Go to **Chat** → type a question in Hindi or Hinglish and see language detection in action
5. Sign up as **ngo** → resolve a grievance in the queue
6. Sign up as **translator** → submit a transcript review, approve the skill
