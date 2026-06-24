# Brandofme.ai — Backend

A real backend for the brandofme.ai site. It implements the exact `/api/*` contract
the front-end (`index.html`) already expects, so connecting it requires **no rewrite**:
the page tries the real API first and only falls back to its built-in local demo if no
backend answers.

## What it does

- **Accounts & auth** — signup/login with real bcrypt-hashed passwords and JWT sessions.
- **Password reset** — 6-digit codes with 15-minute expiry, single-use, no account enumeration.
- **Email** — welcome + reset emails. Sends for real over SMTP when configured; otherwise
  logs to the console and an `outbox` table (dev mode).
- **Brand profiles** — create, update (incl. studio fields: about, presence, status, avatar,
  website model), rebuild the AI model, multi-profile on the Pro plan.
- **Statuses** — post, AI-polish, list, delete.
- **Content generation** — drafts & hooks. Uses **Claude** when `ANTHROPIC_API_KEY` is set,
  otherwise a built-in template generator (always works, no key needed).
- **Billing** — plan upgrades. Demo by default; verifies a Stripe Checkout session when
  `STRIPE_SECRET_KEY` is set (integration point included).
- **Published pages** — real, crawlable server-rendered brand pages at `/u/:slug` with OG tags.
- **Export** — downloadable brand kit at `/api/export/:id`.
- **Storage** — SQLite via Node's built-in `node:sqlite` (no native build, single file).

## Requirements

- Node.js **22.5+** (uses the built-in `node:sqlite`). Check with `node -v`.

## Run it

```bash
cd backend
cp .env.example .env          # then edit .env (at minimum set a real JWT_SECRET)
npm install
npm start                     # → http://localhost:3000
```

Put your site file where the server can serve it (so the API and page share one origin):

- Easiest: copy `index.html` into `backend/public/` — it's served automatically.
- Or set `STATIC_DIR` in `.env` to the folder that contains `index.html`.
- If you skip this, the server falls back to serving `../index.html` (the repo root).

Open `http://localhost:3000` — the site now uses the real backend. Sign up, and the
login token becomes a real JWT, which flips the front-end into "remote" mode.

Run the end-to-end test anytime:

```bash
npm run smoke      # boots the app and exercises the whole API contract
```

## How the connection works

`index.html` calls `fetch(API + '/api/...')` where `API` comes from `window.BOM_API_BASE`
(set in the `#backend-config` block at the top of the page) and defaults to `''` =
**same origin**. So:

- **Same-origin (recommended):** serve `index.html` from this backend → no config needed.
- **Separate origins:** host the page anywhere and set, in the page's `#backend-config`:
  ```html
  <script>window.BOM_API_BASE = 'https://api.brandofme.ai';</script>
  ```
  (and the server already sends permissive CORS headers).

If the backend is unreachable, the page silently uses its built-in local demo engine.

## Configuration (.env)

| Variable | Purpose |
|---|---|
| `PORT` | Port to listen on (default 3000) |
| `JWT_SECRET` | **Change in production.** Signs login tokens |
| `JWT_EXPIRES` | Session length (default 30d) |
| `DB_PATH` | SQLite file path |
| `SMTP_HOST/PORT/USER/PASS`, `MAIL_FROM` | Real email. Empty = dev outbox |
| `EXPOSE_RESET_CODE` | Dev only — returns the reset code in the API response. **Set `false` in production** |
| `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` | Optional real AI drafts via Claude |
| `STRIPE_SECRET_KEY` | Optional real billing verification |
| `STATIC_DIR` | Folder containing `index.html` to serve |
| `PUBLIC_ORIGIN` | Origin used in emails and public-page links |

## Endpoints

```
POST /api/preview                     name → slug + availability + model preview
POST /api/auth/signup | login         → { token, user }
POST /api/auth/forgot | reset         password reset by emailed code
GET  /api/me                          current user + entitlements + profiles
GET  /api/stats                       drafts / statuses / member_since
GET  /api/statuses?profile_id=        list (latest 50)
POST /api/statuses                    post a status
POST /api/statuses/polish             AI-polish a status
DEL  /api/statuses/:id                delete a status
POST /api/billing/subscribe           upgrade plan (basic|plus|pro)
POST /api/drafts                      generate a post draft
POST /api/hooks                       generate 5 hooks
POST /api/profiles                    add a profile (Pro)
PATCH/api/profiles/:id                update profile (core + studio fields)
POST /api/profiles/:id/rebuild        rebuild the AI brand model
GET  /api/export/:id                  download brand-kit HTML
GET  /u/:slug                         public, crawlable brand page
```

## Project layout

```
backend/
  server.js            Express app — routes, auth middleware, static serving
  src/
    db.js              SQLite schema + queries (node:sqlite)
    model.js           plans, slug/accent/monogram, draft/hook templates (ported from front-end)
    auth.js            bcrypt + JWT + middleware
    email.js           pluggable mailer (SMTP or dev outbox)
    ai.js              Claude generation with template fallback
    publicPage.js      /u/:slug renderer + export kit
  test/smoke.js        end-to-end contract test
  .env.example
  package.json
```

## Production notes

- Set a strong `JWT_SECRET` and `EXPOSE_RESET_CODE=false`.
- Configure SMTP so reset/welcome emails actually deliver.
- Put a reverse proxy (or platform like Render/Railway/Fly/Heroku) in front for TLS.
- Back up the SQLite file, or swap `db.js` for Postgres if you outgrow it (the rest of the
  code is storage-agnostic — only `db.js` would change).
