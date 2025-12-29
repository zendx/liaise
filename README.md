# Liaise — eSIM Command Center

Next.js App Router project with credential auth (NextAuth + Prisma + Postgres), gated dashboards for users/admins, and a marketing landing page.

## Stack
- Next.js 16 (App Router), React 19
- Auth: NextAuth credentials + Prisma adapter; JWT sessions
- DB: Postgres via Prisma ORM
- UI: Tailwind-style utilities, framer-motion

## Setup
1) Install deps: `npm install`
2) Copy env: `cp .env.example .env` and set `DATABASE_URL`, `NEXTAUTH_SECRET`, admin creds (`ADMIN_EMAIL` + either `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`).
3) Generate client + migrate:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4) Seed sample data (optional, creates a demo user and sample numbers/orders/messages):
   ```bash
   npm run seed
   ```
5) Run dev server: `npm run dev` then open http://localhost:3000.

## Auth flows
- Public: landing, login (`/login`), signup (`/signup`), admin login (`/admin/login`).
- Protected: `/dashboard` (any user), `/admin` (admin role). Middleware redirects unauthenticated or non-admin users.
- Admin password can be supplied as plaintext (local only) or as a hash; set `NEXTAUTH_SECRET` for session signing.

## Data model
See `prisma/schema.prisma` for users/accounts/sessions plus domain tables: numbers, messages, orders. Seed script inserts sample rows to make dashboards non-empty.
