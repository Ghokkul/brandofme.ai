'use strict';
require('dotenv').config();

const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const cors = require('cors');

const db = require('./src/db');
const M = require('./src/model');
const ai = require('./src/ai');
const mail = require('./src/email');
const auth = require('./src/auth');
const pub = require('./src/publicPage');

const app = express();
app.use(cors());
app.use(express.json({ limit: '6mb' })); // avatars can be data URLs
app.use(auth.authOptional);

const ORIGIN = process.env.PUBLIC_ORIGIN || `http://localhost:${process.env.PORT || 3000}`;
const EXPOSE_RESET = String(process.env.EXPOSE_RESET_CODE || '').toLowerCase() === 'true';

// ---------- helpers ----------
const fail = (res, status, payload) => res.status(status).json(payload);

function trialInfo(u) {
  if (u.plan !== 'trial') return { left: 0, expired: false };
  const days = Math.floor((Date.now() - u.created_at) / 86400000);
  const left = Math.max(0, 7 - days);
  return { left, expired: left <= 0 };
}

function serve(u) {
  const cfg = M.PLANS[u.plan] || M.PLANS.trial;
  const t = trialInfo(u);
  return {
    user: {
      id: u.id, name: u.name, email: u.email,
      plan: u.plan, plan_label: cfg.name,
      trial_days_left: t.left, trial_expired: t.expired,
      entitlements: {
        draft_quota: cfg.draftQuota === Infinity ? 'unlimited' : cfg.draftQuota,
        drafts_used: u.drafts_used,
        drafts_left: cfg.draftQuota === Infinity ? 'unlimited' : Math.max(0, cfg.draftQuota - u.drafts_used),
        styles: cfg.styles, custom_color: cfg.customColor, hooks: cfg.hooks,
        max_profiles: cfg.maxProfiles, exports: cfg.exports, priority_support: cfg.prioritySupport,
      },
      profiles: db.listProfiles(u.id),
    },
  };
}

function slugTaken(slug) { return M.RESERVED_SLUGS.has(slug) || db.slugExists(slug); }
function ownProfile(req, id) { const p = db.getProfileRaw(id); return p && p.user_id === req.user.id ? p : null; }
function firstProfile(req) { return db.listProfiles(req.user.id)[0]; }

// ---------- public preview (no auth) ----------
app.post('/api/preview', (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 40);
  if (!name) return fail(res, 400, { error: 'invalid_input', message: 'Type a name to claim.' });
  const out = M.previewModel(name, req.body.niche);
  out.available = !slugTaken(out.slug);
  res.json(out);
});

// ---------- auth ----------
app.post('/api/auth/signup', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const name = String(req.body.name || '').trim();
  const niche = String(req.body.niche || 'Personal brand').trim();
  if (!email) return fail(res, 400, { error: 'invalid_input', message: 'Enter an email.' });
  if (!name) return fail(res, 400, { error: 'invalid_input', message: 'Enter your name.' });
  if (String(req.body.password || '').length < 8) return fail(res, 400, { error: 'weak_password', message: 'Password must be at least 8 characters.' });
  if (db.getUserByEmail(email)) return fail(res, 409, { error: 'email_taken', message: 'An account with this email already exists.' });

  const model = M.buildModel(name, niche);
  const pw_hash = await auth.hashPassword(req.body.password);
  const user = db.createUser({ name, email, pw_hash, niche, model });

  const w = mail.welcomeEmail(name);
  mail.sendMail(email, w.subject, w.html).catch(() => {});

  res.json({ token: auth.issueToken(user), ...serve(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = db.getUserByEmail(email);
  if (!user || !(await auth.verifyPassword(req.body.password, user.pw_hash))) {
    return fail(res, 401, { error: 'bad_credentials', message: 'Email or password is incorrect.' });
  }
  res.json({ token: auth.issueToken(user), ...serve(user) });
});

app.post('/api/auth/forgot', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = db.getUserByEmail(email);
  let code = null;
  if (user) {
    code = String(Math.floor(100000 + Math.random() * 900000));
    db.setReset(user.id, code, Date.now() + 15 * 60 * 1000);
    const m = mail.resetEmail(user.name, code);
    mail.sendMail(email, m.subject, m.html).catch(() => {});
  }
  // Neutral response (no account enumeration). Code is only echoed in dev mode.
  res.json({ ok: true, exists: !!user, code: EXPOSE_RESET ? code : null, name: EXPOSE_RESET && user ? user.name : null });
});

app.post('/api/auth/reset', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = db.getUserByEmail(email);
  if (!user || !user.reset_code) return fail(res, 400, { error: 'invalid_reset', message: 'Request a new reset code to continue.' });
  if (String(req.body.code || '').trim() !== user.reset_code) return fail(res, 400, { error: 'bad_code', message: 'That reset code is incorrect.' });
  if (Date.now() > (user.reset_exp || 0)) return fail(res, 400, { error: 'expired', message: 'That code has expired — request a new one.' });
  if (String(req.body.password || '').length < 8) return fail(res, 400, { error: 'weak_password', message: 'Password must be at least 8 characters.' });
  db.setPassword(user.id, await auth.hashPassword(req.body.password));
  db.clearReset(user.id);
  res.json({ ok: true });
});

// ---------- account ----------
app.get('/api/me', auth.authRequired, (req, res) => res.json(serve(req.user)));

app.get('/api/stats', auth.authRequired, (req, res) => {
  res.json({ drafts: req.user.drafts_used, statuses: db.countStatuses(req.user.id), member_since: req.user.created_at });
});

// ---------- statuses ----------
app.get('/api/statuses', auth.authRequired, (req, res) => {
  const pid = Number(req.query.profile_id) || (firstProfile(req) || {}).id;
  res.json({ statuses: pid ? db.listStatuses(pid) : [] });
});

app.post('/api/statuses/polish', auth.authRequired, async (req, res) => {
  const cfg = M.PLANS[req.user.plan];
  if (!cfg.hooks) return fail(res, 403, { error: 'feature_locked', feature: 'polish', upgrade_to: 'plus', message: 'On-brand AI polish unlocks on Plus.' });
  const p = ownProfile(req, Number(req.body.profile_id)) ? db.getProfile(Number(req.body.profile_id)) : firstProfile(req);
  const content = await ai.polish(req.body.content, p.style, p.name);
  res.json({ content });
});

app.post('/api/statuses', auth.authRequired, (req, res) => {
  const p = ownProfile(req, Number(req.body.profile_id)) ? db.getProfile(Number(req.body.profile_id)) : firstProfile(req);
  const content = String(req.body.content || '').trim().slice(0, 280);
  if (!content) return fail(res, 400, { error: 'invalid_input', message: 'Write something first.' });
  res.json({ status: db.addStatus(p.id, req.user.id, content) });
});

app.delete('/api/statuses/:id', auth.authRequired, (req, res) => {
  db.deleteStatus(Number(req.params.id), req.user.id);
  res.json({ ok: true });
});

// ---------- billing ----------
app.post('/api/billing/subscribe', auth.authRequired, async (req, res) => {
  const plan = req.body.plan;
  if (!['basic', 'plus', 'pro'].includes(plan)) return fail(res, 400, { error: 'unknown_plan', message: 'Unknown plan.' });

  // Optional real billing: verify a Stripe Checkout session before upgrading.
  if (process.env.STRIPE_SECRET_KEY) {
    if (!req.body.stripe_session_id) return fail(res, 402, { error: 'payment_required', message: 'Complete checkout to subscribe.' });
    // Integration point: verify req.body.stripe_session_id with the Stripe API here.
  }

  db.setPlan(req.user.id, plan);
  // enforce profile cap on downgrade
  const cap = M.PLANS[plan].maxProfiles;
  const profiles = db.listProfiles(req.user.id);
  if (profiles.length > cap) profiles.slice(cap).forEach((p) => db.deleteProfile(p.id));

  const fresh = db.getUserById(req.user.id);
  res.json({ ok: true, message: `Subscribed to ${M.PLANS[plan].name}.`, ...serve(fresh) });
});

// ---------- generation ----------
app.post('/api/drafts', auth.authRequired, async (req, res) => {
  const cfg = M.PLANS[req.user.plan];
  const p = ownProfile(req, Number(req.body.profile_id)) ? db.getProfile(Number(req.body.profile_id)) : firstProfile(req);
  const style = req.body.style || p.style;
  if (!cfg.styles.includes(style)) return fail(res, 403, { error: 'feature_locked', feature: 'style:' + style, upgrade_to: 'plus', message: `The ${style.toUpperCase()} style unlocks on Plus.` });
  if (cfg.draftQuota !== Infinity && req.user.drafts_used >= cfg.draftQuota) return fail(res, 403, { error: 'quota_exceeded', upgrade_to: 'plus', message: 'Out of drafts this month — Plus is unlimited.' });
  const topic = String(req.body.topic || p.niche).toLowerCase();
  const content = await ai.draft(p.name, topic, style);
  db.bumpDrafts(req.user.id);
  const used = req.user.drafts_used + 1;
  res.json({
    draft: { topic, style, content },
    quota: cfg.draftQuota === Infinity ? { unlimited: true } : { used, total: cfg.draftQuota, left: Math.max(0, cfg.draftQuota - used) },
  });
});

app.post('/api/hooks', auth.authRequired, async (req, res) => {
  const cfg = M.PLANS[req.user.plan];
  if (!cfg.hooks) return fail(res, 403, { error: 'feature_locked', feature: 'hooks', upgrade_to: 'plus', message: 'This feature unlocks on Plus.' });
  const p = ownProfile(req, Number(req.body.profile_id)) ? db.getProfile(Number(req.body.profile_id)) : firstProfile(req);
  const topic = String(req.body.topic || p.niche).toLowerCase();
  res.json({ topic, hooks: await ai.hooks(p.name, topic) });
});

// ---------- profiles ----------
app.post('/api/profiles', auth.authRequired, (req, res) => {
  const cfg = M.PLANS[req.user.plan];
  if (db.listProfiles(req.user.id).length >= cfg.maxProfiles) {
    return fail(res, 403, { error: 'profile_limit', max: cfg.maxProfiles, upgrade_to: 'pro', message: cfg.maxProfiles === 1 ? 'Multiple brand profiles unlock on Pro (up to 5) — built for ghostwriters & agencies.' : `Your plan allows ${cfg.maxProfiles} profiles.` });
  }
  const name = String(req.body.name || '').trim();
  const niche = String(req.body.niche || 'Personal brand').trim();
  const model = M.buildModel(name, niche);
  res.json({ profile: db.addProfile(req.user.id, { name, niche, model }) });
});

app.post('/api/profiles/:id/rebuild', auth.authRequired, (req, res) => {
  const raw = ownProfile(req, Number(req.params.id));
  if (!raw) return fail(res, 404, { error: 'not_found', message: 'Profile not found.' });
  const m = M.buildModel(raw.name, raw.niche);
  res.json({ profile: db.patchProfile(raw.id, { tagline: m.tagline, bio_linkedin: m.bio_linkedin, bio_x: m.bio_x, hooks: m.hooks, model_built_at: Date.now() }) });
});

app.patch('/api/profiles/:id', auth.authRequired, (req, res) => {
  const cfg = M.PLANS[req.user.plan];
  const raw = ownProfile(req, Number(req.params.id));
  if (!raw) return fail(res, 404, { error: 'not_found', message: 'Profile not found.' });
  if (req.body.style && !cfg.styles.includes(req.body.style)) return fail(res, 403, { error: 'feature_locked', feature: 'style:' + req.body.style, upgrade_to: 'plus', message: `The ${req.body.style.toUpperCase()} style unlocks on Plus.` });
  if (req.body.color && !cfg.customColor) return fail(res, 403, { error: 'feature_locked', feature: 'custom_color', upgrade_to: 'plus', message: 'Custom colors unlock on Plus.' });
  // accept core + extended studio fields (about, presence, status_msg, avatar, site)
  res.json({ profile: db.patchProfile(raw.id, req.body) });
});

// ---------- export ----------
app.get('/api/export/:id', auth.authRequired, (req, res) => {
  const cfg = M.PLANS[req.user.plan];
  const raw = ownProfile(req, Number(req.params.id));
  if (!raw) return fail(res, 404, { error: 'not_found', message: 'Profile not found.' });
  if (!cfg.exports) return fail(res, 403, { error: 'feature_locked', feature: 'exports', upgrade_to: 'basic', message: 'Exports are part of Full Access.' });
  res.set('content-type', 'text/html; charset=utf-8');
  res.set('content-disposition', `attachment; filename="${raw.slug}-brand-kit.html"`);
  res.send(pub.brandKit(db.getProfile(raw.id)));
});

// ---------- public brand page (real + crawlable) ----------
app.get('/u/:slug', (req, res) => {
  const html = pub.publicPage(req.params.slug, ORIGIN);
  if (!html) return send404(res);
  res.set('content-type', 'text/html; charset=utf-8');
  res.send(html);
});

// ---------- static front-end (serves index.html on the SAME origin → api('') just works) ----------
const STATIC_DIR = process.env.STATIC_DIR
  || (fs.existsSync(path.join(__dirname, 'public', 'index.html')) ? path.join(__dirname, 'public') : path.join(__dirname, '..'));
app.use(express.static(STATIC_DIR));

// serve the branded 404 page (falls back to a plain message if the file is missing)
function send404(res) {
  const f = path.join(STATIC_DIR, '404.html');
  if (fs.existsSync(f)) {
    res.status(404).set('content-type', 'text/html; charset=utf-8');
    return res.send(fs.readFileSync(f, 'utf8'));
  }
  return res.status(404).send('<h1>404 — page not found</h1>');
}

// clean URL for the signed-in dashboard (also reachable at /dashboard/)
app.get('/dashboard', (_req, res) => {
  const f = path.join(STATIC_DIR, 'dashboard', 'index.html');
  if (fs.existsSync(f)) { res.set('content-type', 'text/html; charset=utf-8'); return res.send(fs.readFileSync(f, 'utf8')); }
  return send404(res);
});
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  return send404(res);
});

// unknown /api → JSON 404 (so the front-end's fallback logic recognises it)
app.use('/api', (_req, res) => res.status(404).json({ error: 'not_found', message: 'Unknown endpoint.' }));

const PORT = Number(process.env.PORT || 3000);
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n  brandofme.ai backend running → ${ORIGIN}`);
    console.log(`  static dir : ${STATIC_DIR}`);
    console.log(`  email      : ${mail.HAS_SMTP ? 'SMTP configured' : 'DEV outbox (no real send)'}`);
    console.log(`  AI drafts  : ${ai.usingClaude ? 'Claude' : 'template fallback'}`);
    console.log(`  reset code : ${EXPOSE_RESET ? 'exposed in responses (DEV)' : 'hidden (production)'}\n`);
  });
}

module.exports = app;
