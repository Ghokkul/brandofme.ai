# Brandofme.ai — Backend

Node.js + Express + SQLite (Node's built-in `node:sqlite`, zero native deps).
Auth, 7-day free trials, plan-gated features, monthly draft quotas, Pro multi-profiles,
public brand pages, and Stripe-ready billing.

## Quick start

```bash
npm install
cp .env.example .env        # set JWT_SECRET at minimum
npm start                   # → http://localhost:3000
```

Requires **Node 22+**. To serve the frontend from the same server, copy
`brandofme.html` into `public/index.html`.

Works out of the box with **no API keys**:
- Drafts/hooks use style templates (set `ANTHROPIC_API_KEY` for real AI generation)
- Billing runs in **demo mode** (set Stripe keys to charge real money)

## The subscription model

Signup automatically starts a **7-day free trial** (Plus-level features, no card).
The server is the source of truth — every request is checked against the user's plan:

| Capability            | Trial (7d) | Basic $19 | Plus $67 | Pro $199 |
|-----------------------|-----------|-----------|----------|----------|
| Identity kit + bios   | ✓         | ✓         | ✓        | ✓        |
| Drafts / month        | unlimited | **30**    | unlimited| unlimited|
| Styles                | all 3     | BOLD only | all 3    | all 3    |
| Custom accent color   | ✓         | ✗         | ✓        | ✓        |
| Hook generator        | ✓         | ✗ (403)   | ✓        | ✓        |
| Brand profiles        | 1         | 1         | 1        | **5**    |
| Client-ready exports  | ✗         | ✗         | ✗        | ✓        |
| Priority support flag | ✗         | ✗         | ✗        | ✓        |

When a trial expires, `plan` collapses to `null` and gated endpoints return
`402 plan_required`. Quotas reset automatically each calendar month.
Locked features return structured errors the frontend can act on:

```json
{ "error": "feature_locked", "feature": "hooks", "upgrade_to": "plus", "message": "This feature unlocks on Plus." }
```

## API

### Auth
| Method | Path              | Body                              | Notes |
|--------|-------------------|-----------------------------------|-------|
| POST   | /api/auth/signup  | name, email, password(8+), niche? | Creates account, **starts trial**, claims slug, returns JWT |
| POST   | /api/auth/login   | email, password                   | Returns JWT |
| GET    | /api/me           | —                                 | User + plan + entitlements + profiles (frontend's source of truth) |

All authed routes take `Authorization: Bearer <token>`.

### Billing
| Method | Path                   | Notes |
|--------|------------------------|-------|
| GET    | /api/billing/plans     | Public pricing + mode (demo/stripe) |
| POST   | /api/billing/subscribe | `{plan}` — demo mode: activates instantly; the server listens to the specific plan requested and switches entitlements |
| POST   | /api/billing/checkout  | `{plan}` — Stripe mode: returns Checkout URL |
| POST   | /api/billing/webhook   | Stripe webhook (activates plan on `checkout.session.completed`) |

### Content (plan-gated)
| Method | Path        | Gating |
|--------|-------------|--------|
| POST   | /api/drafts | style must be in plan; Basic decrements 30/month quota → `403 quota_exceeded` when spent |
| GET    | /api/drafts | last 50 drafts |
| POST   | /api/hooks  | Plus & Pro only |

### Profiles
| Method | Path               | Gating |
|--------|--------------------|--------|
| GET    | /api/profiles      | — |
| POST   | /api/profiles      | cap enforced (Pro: 5) |
| PATCH  | /api/profiles/:id  | style/color changes gated by plan |
| DELETE | /api/profiles/:id  | — |

### Pages & export
| Method | Path                   | Notes |
|--------|------------------------|-------|
| GET    | /u/:slug               | **Public** brand page (the viral loop) |
| GET    | /api/export/:profileId | Pro only — downloadable client-ready kit (HTML) |

## Going live

1. **Stripe** — create three recurring Prices ($19/$67/$199), set
   `STRIPE_SECRET_KEY`, `STRIPE_PRICE_BASIC/PLUS/PRO`, `STRIPE_WEBHOOK_SECRET`,
   point a webhook at `/api/billing/webhook` for `checkout.session.completed`
   and `customer.subscription.deleted`. **Add signature verification** in
   `routes/billing.js` (marked with a NOTE) before production.
2. **AI** — set `ANTHROPIC_API_KEY`; drafts and hooks switch from templates to Claude.
3. **Security** — set a strong `JWT_SECRET`, run behind HTTPS, add rate limiting
   (e.g. `express-rate-limit`) on auth and generation endpoints.
4. **Frontend wiring** — replace the demo checkout with calls to
   `/api/auth/signup` → store token → `/api/me` to render entitlements →
   `/api/billing/subscribe` (or `/checkout`) on plan buttons →
   `/api/drafts` & `/api/hooks` from the studio.

## Project layout

```
src/
  server.js            # app wiring, static frontend, webhook raw-body order
  plans.js             # single source of truth for entitlements
  db.js                # node:sqlite schema + helpers
  middleware/auth.js   # JWT auth, requireActivePlan, requireFeature
  services/ai.js       # Claude API w/ template fallback
  routes/
    auth.js            # signup (auto-trial), login, /me
    billing.js         # demo subscribe, Stripe checkout + webhook
    profiles.js        # CRUD with plan caps
    content.js         # drafts (quota) + hooks (Plus+)
    pages.js           # public /u/:slug + Pro export
```
