# RootED

RootED is a mobile-first Next.js MVP that helps first-generation learners stay in school through bridge learning, multilingual support, verified skills, and short-form nudges.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL with `pgvector`
- Anthropic-ready AI helpers with graceful fallback
- Seeded RAG and transcription providers for demo-safe execution

## Environment

Copy `.env.example` to `.env` and fill in values as needed.

`DATABASE_URL` should point to a PostgreSQL database with the `pgvector` extension available.

For the current MVP, the app still runs without AI keys. Chat, roadmap, and transcription paths fall back to seeded logic instead of crashing.

## Commands

```bash
npm install
npm run seed
npm run embed-kb
npm run prisma:generate
npm run dev
```

`npm run seed` resets the local demo state in `data/` so the learner, grievance, and Learn & Earn flows start fresh again.

## Demo auth

Use `/login` to select one of the three seeded demo roles. Real SMS authentication is intentionally deferred.

## Notes

- Gap-Finder supports deep links such as `/gap-finder?mode=returnee&focus=fractions`.
- Scholarship reels can deep-link into `/chat?topic=...` for the demo.
- Learn & Earn uses the mock transcription provider by default. `USE_LIVE_TRANSCRIPTION=true` is reserved for later real-provider wiring.

## Deploy

- Recommended app host: Vercel
- Recommended database: Neon or Supabase Postgres with `pgvector`
- Set the environment variables from `.env.example`
- If you are using the current seeded demo path, run `npm run seed` after deploy to initialize local demo files where applicable

## Demo path

1. Login as learner and use Gap-Finder returnee mode.
2. Ask a Hindi scholarship question in chat, then send an off-KB grievance.
3. Switch to NGO and resolve the grievance queue item.
4. Switch to translator, submit the vocational transcript review, then approve it as NGO.
5. Return to the translator passport and confirm the verified skill plus earned amount.
6. Open reels, answer a quiz card, and follow a scholarship deep link back into chat.
