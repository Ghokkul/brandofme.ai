// src/routes/billing.js
// Two modes:
//  - DEMO (default): POST /subscribe sets the plan directly, so the whole app works end-to-end.
//  - STRIPE (set STRIPE_SECRET_KEY + STRIPE_PRICE_BASIC/PLUS/PRO + STRIPE_WEBHOOK_SECRET):
//    /checkout creates a Stripe Checkout Session, /webhook activates the plan on payment.
import { Router, raw } from 'express';
import { db } from '../db.js';
import { auth } from '../middleware/auth.js';
import { PLANS } from '../plans.js';
import { serializeMe } from './auth.js';

const r = Router();
const PAID = ['basic', 'plus', 'pro'];
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

/** GET /api/billing/plans — public pricing data. */
r.get('/plans', (_req, res) => {
  res.json({
    plans: PAID.map(k => ({
      key: k,
      name: PLANS[k].name,
      price_usd_month: PLANS[k].price,
      features: {
        draft_quota: PLANS[k].draftQuota === Infinity ? 'unlimited' : PLANS[k].draftQuota,
        styles: PLANS[k].styles,
        custom_color: PLANS[k].customColor,
        hooks: PLANS[k].hooks,
        max_profiles: PLANS[k].maxProfiles,
        exports: PLANS[k].exports,
        priority_support: PLANS[k].prioritySupport,
      },
    })),
    trial_days: 7,
    mode: STRIPE_KEY ? 'stripe' : 'demo',
  });
});

/** POST /api/billing/subscribe {plan} — DEMO mode: activates the plan immediately.
 *  The server *listens to the user's specific plan request* and switches entitlements. */
r.post('/subscribe', auth, (req, res) => {
  const { plan } = req.body || {};
  if (!PAID.includes(plan)) return res.status(400).json({ error: 'unknown_plan' });
  if (STRIPE_KEY) {
    return res.status(400).json({ error: 'use_checkout', message: 'Stripe is configured — call POST /api/billing/checkout instead.' });
  }
  db.prepare('UPDATE users SET plan = ?, trial_ends_at = NULL WHERE id = ?').run(plan, req.user.id);

  // Downgrade housekeeping: archive profiles beyond the new cap (keep oldest).
  const cap = PLANS[plan].maxProfiles;
  const ids = db.prepare('SELECT id FROM profiles WHERE user_id = ? ORDER BY created_at ASC').all(req.user.id).map(p => p.id);
  ids.slice(cap).forEach(id => db.prepare('DELETE FROM profiles WHERE id = ?').run(id));

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  res.json({ ok: true, message: `Subscribed to ${PLANS[plan].name}.`, user: serializeMe(user) });
});

/** POST /api/billing/checkout {plan} — STRIPE mode: returns a Checkout Session URL. */
r.post('/checkout', auth, async (req, res) => {
  if (!STRIPE_KEY) return res.status(400).json({ error: 'stripe_not_configured' });
  const { plan } = req.body || {};
  if (!PAID.includes(plan)) return res.status(400).json({ error: 'unknown_plan' });
  const priceId = process.env['STRIPE_PRICE_' + plan.toUpperCase()];
  if (!priceId) return res.status(500).json({ error: 'missing_price_id' });

  const params = new URLSearchParams({
    mode: 'subscription',
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': '1',
    customer_email: req.user.email,
    'metadata[user_id]': String(req.user.id),
    'metadata[plan]': plan,
    success_url: (process.env.APP_URL || 'http://localhost:3000') + '/?subscribed=' + plan,
    cancel_url: (process.env.APP_URL || 'http://localhost:3000') + '/#plans',
  });
  const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${STRIPE_KEY}`, 'content-type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  const session = await resp.json();
  if (!resp.ok) return res.status(502).json({ error: 'stripe_error', detail: session.error?.message });
  res.json({ url: session.url });
});

/** POST /api/billing/webhook — Stripe webhook (checkout.session.completed activates the plan).
 *  Verifies the Stripe-Signature header (HMAC-SHA256, timing-safe) when
 *  STRIPE_WEBHOOK_SECRET is set — required in production. */
import crypto from 'node:crypto';
export const webhookHandler = [
  raw({ type: 'application/json' }),
  (req, res) => {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (secret) {
      const sig = String(req.headers['stripe-signature'] || '');
      const t = (sig.match(/t=([^,]+)/) || [])[1];
      const v1 = (sig.match(/v1=([0-9a-f]+)/) || [])[1];
      if (!t || !v1) return res.status(400).json({ error: 'bad_signature' });
      const expected = crypto.createHmac('sha256', secret).update(`${t}.${req.body}`).digest('hex');
      const a = Buffer.from(v1), b = Buffer.from(expected);
      if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
        return res.status(400).json({ error: 'bad_signature' });
      }
      if (Math.abs(Date.now() / 1000 - Number(t)) > 300) {
        return res.status(400).json({ error: 'stale_signature' }); // replay guard: 5 min tolerance
      }
    }
    let event;
    try { event = JSON.parse(req.body.toString()); } catch { return res.status(400).end(); }
    if (event.type === 'checkout.session.completed') {
      const s = event.data.object;
      const userId = Number(s.metadata?.user_id);
      const plan = s.metadata?.plan;
      if (userId && PAID.includes(plan)) {
        db.prepare(
          'UPDATE users SET plan = ?, trial_ends_at = NULL, stripe_customer_id = ?, stripe_subscription_id = ? WHERE id = ?'
        ).run(plan, s.customer || null, s.subscription || null, userId);
      }
    }
    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object;
      db.prepare('UPDATE users SET plan = NULL WHERE stripe_subscription_id = ?').run(sub.id);
    }
    res.json({ received: true });
  },
];

export default r;
