# RootED

RootED is a mobile-first Next.js MVP that helps first-generation learners stay in school through bridge learning, multilingual support, verified skills, and short-form nudges.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL with `pgvector`
- Planned Anthropic + embeddings provider abstractions in later phases

## Environment

Copy `.env.example` to `.env` and fill in values as needed.

`DATABASE_URL` should point to a PostgreSQL database with the `pgvector` extension available.

## Commands

```bash
npm install
npm run prisma:generate
npm run dev
```

## Demo auth

Use `/login` to select one of the three seeded demo roles. Real SMS authentication is intentionally deferred.

## Notes

- `P0` intentionally ships with placeholder module routes so the app stays runnable while feature phases are built incrementally.
- Future phases will replace placeholder content with seeded logic and API handlers.
