# brandofme.ai — Backend

The real backend behind the brandofme.ai frontend. It replaces the in-page
simulation (`localApiCore`) with proper persistence and services, while keeping
the same `/api/*` shapes so the frontend drops in with almost no changes.

## What's inside

| Area | Endpoints |
|------|-----------|
| **Auth** | `POST /api/auth/signup` · `login` · `social` · `logout` · `forgot` · `reset` · `GET /api/me` |
| **Brand engine (Conjure)** | `POST /api/brand/generate` · `GET /api/brand/generate?input=` · `POST /api/brand/refine` · `POST /api/brand/chat` |
| **Profiles** | `GET /api/profiles` · `POST /api/profiles` · `PATCH /api/profiles/:id` |
| **Workspace** | `GET /api/workspace` · `PUT /api/workspace` (block-editor doc per user) |
| **Publishing** | `POST /api/publish` · `GET /api/u/:slug` (JSON) · `GET /u/:slug` (indexable HTML) |
| **Billing** | `POST /api/billing/subscribe` · `GET /api/billing/status` · `POST /api/billing/webhook` |

Passwords are hashed with scrypt; sessions are stateless HMAC-signed tokens
(`Authorization: Bearer <token>`). No native dependencies.

## Run it

```bash
npm install
cp .env.example .env      # optional — it runs with defaults
npm start                 # http://localhost:8080
```

Then, in another terminal:

```bash
npm run smoke             # end-to-end test against the running server
# or
curl localhost:8080/api/health
curl localhost:8080/api/brand/generate -H 'content-type: application/json' -d '{"input":"a calm skincare brand"}'
```

## Project layout

```
server.js                 entry point
src/
  app.js                  express app (cors, json, error handling)
  config.js               env config (safe defaults)
  routes.js               all routes -> controllers
  lib/
    auth.js               scrypt hashing + signed tokens
    brand-engine.js       shared Conjure engine (same file as the frontend)
    ids.js, serialize.js  id/slug helpers + user serializer
  middleware/             authRequired, rateLimit
  services/               email, billing (Stripe), oauth (social sign-in)
  controllers/            auth, brand, profile, workspace, publish, billing
  db/
    jsonStore.js          file-backed JSON DB (default, zero-setup)
    schema.sql            Postgres schema for when you migrate
    index.js              adapter selector (json | pg)
data/                     JSON database lives here at runtime
```

## Connecting the frontend

1. Host this API and note its URL (e.g. `https://api.brandofme.ai`).
2. In the frontend, set the API base your `api()` helper uses, and make it send
   `Authorization: Bearer <token>` (the token returned by signup/login/social).
3. Point Conjure at the brand API by setting `window.BOM_BRAND_API` to this URL —
   `/api/brand/generate` and `/api/brand/refine` already match.

## Going to production (what's stubbed)

- **Database** — swap `db/jsonStore.js` for a Postgres adapter using `schema.sql`
  (same method names; set `DB_DRIVER=pg`). The JSON store is for dev/single-instance.
- **Social sign-in** — `services/oauth.js` trusts the posted email in dev
  (`ALLOW_SIMULATED_SOCIAL=true`). In production, verify each provider's ID token
  and set the client IDs.
- **Billing** — `services/billing.js` simulates subscriptions when `STRIPE_SECRET_KEY`
  is empty. Add the Stripe SDK, real Checkout, and webhook signature verification.
- **Email** — `services/email.js` logs to the console unless `SMTP_URL`/a provider
  is configured.
- **Hardening** — add HTTPS, per-route rate limits (Redis-backed for multi-instance),
  secret management, logging/monitoring, and DB backups.

Everything runs out of the box in simulated mode so you can develop the full flow
(signup → build → save → publish → subscribe) before wiring real services.
