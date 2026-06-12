// src/routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db, getUserByEmail, uniqueSlug } from '../db.js';
import { signToken, auth } from '../middleware/auth.js';
import { PLANS, TRIAL_DAYS, planConfig, trialDaysLeft, effectivePlan } from '../plans.js';
import { buildBrandModel } from '../services/ai.js';

const r = Router();

function serializeMe(user) {
  const plan = planConfig(user);
  const profiles = db.prepare(
    'SELECT id, name, niche, color, style, slug, tagline, bio_linkedin, bio_x, hooks, model_built_at FROM profiles WHERE user_id = ?'
  ).all(user.id).map(p => ({ ...p, hooks: p.hooks ? JSON.parse(p.hooks) : [] }));
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: effectivePlan(user),                       // null if locked / trial expired
    plan_label: plan ? plan.name : null,
    trial_days_left: trialDaysLeft(user),
    trial_expired: user.plan === 'trial' && !plan,
    entitlements: plan
      ? {
          draft_quota: plan.draftQuota === Infinity ? 'unlimited' : plan.draftQuota,
          drafts_used: user.drafts_used,
          drafts_left: plan.draftQuota === Infinity ? 'unlimited' : Math.max(0, plan.draftQuota - user.drafts_used),
          styles: plan.styles,
          custom_color: plan.customColor,
          hooks: plan.hooks,
          max_profiles: plan.maxProfiles,
          exports: plan.exports,
          priority_support: plan.prioritySupport,
        }
      : null,
    profiles,
  };
}

/** POST /api/auth/signup {name, email, password, niche?}
 *  Creates the account AND starts the 7-day free trial (no card required). */
r.post('/signup', async (req, res) => {
  const { name, email, password, niche } = req.body || {};
  if (!name?.trim() || !email?.trim() || !password || password.length < 8) {
    return res.status(400).json({ error: 'invalid_input', message: 'Name, email, and a password of 8+ characters are required.' });
  }
  if (getUserByEmail(email)) {
    return res.status(409).json({ error: 'email_taken' });
  }
  const hash = await bcrypt.hash(password, 10);
  const now = Date.now();
  const trialEnds = now + TRIAL_DAYS * 86400000;
  const period = new Date().toISOString().slice(0, 7);
  const info = db.prepare(
    `INSERT INTO users (email, password_hash, name, plan, trial_ends_at, drafts_used, quota_period, created_at)
     VALUES (?, ?, ?, 'trial', ?, 0, ?, ?)`
  ).run(email.toLowerCase().trim(), hash, name.trim().slice(0, 24), trialEnds, period, now);

  // First profile + claimed slug — and THE AI MODEL, built at signup.
  const slug = uniqueSlug(name);
  const cleanName = name.trim().slice(0, 24);
  const cleanNiche = (niche || 'Personal brand').trim().slice(0, 32);
  const model = await buildBrandModel({ name: cleanName, niche: cleanNiche });
  db.prepare(
    `INSERT INTO profiles (user_id, name, niche, slug, color, style, tagline, bio_linkedin, bio_x, hooks, model_built_at, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(info.lastInsertRowid, cleanName, cleanNiche, slug,
        model.color, model.style, model.tagline, model.bio_linkedin, model.bio_x,
        JSON.stringify(model.hooks), now, now);

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json({ token: signToken(user), user: serializeMe(user) });
});

/** POST /api/auth/login {email, password} */
r.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = email && getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password || '', user.password_hash))) {
    return res.status(401).json({ error: 'bad_credentials' });
  }
  res.json({ token: signToken(user), user: serializeMe(user) });
});

/** GET /api/me — current user + plan + entitlements (the frontend's source of truth). */
r.get('/me', auth, (req, res) => res.json({ user: serializeMe(req.user) }));

export default r;
export { serializeMe };
