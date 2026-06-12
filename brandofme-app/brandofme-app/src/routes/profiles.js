// src/routes/profiles.js — brand profiles (Pro: up to 5, for ghostwriters & agencies).
import { Router } from 'express';
import { db, uniqueSlug } from '../db.js';
import { auth, requireActivePlan } from '../middleware/auth.js';
import { buildBrandModel } from '../services/ai.js';

const r = Router();
r.use(auth, requireActivePlan);

const own = (req, id) =>
  db.prepare('SELECT * FROM profiles WHERE id = ? AND user_id = ?').get(id, req.user.id);
const serializeProfile = (p) => p && ({ ...p, hooks: p.hooks ? JSON.parse(p.hooks) : [] });

/** GET /api/profiles */
r.get('/', (req, res) => {
  const profiles = db.prepare(
    'SELECT * FROM profiles WHERE user_id = ? ORDER BY created_at ASC'
  ).all(req.user.id).map(serializeProfile);
  res.json({ profiles, max: req.plan.maxProfiles });
});

/** POST /api/profiles {name, niche?} — enforces the plan's profile cap.
 *  Every new profile gets its own AI model built on creation. */
r.post('/', async (req, res) => {
  const count = db.prepare('SELECT COUNT(*) c FROM profiles WHERE user_id = ?').get(req.user.id).c;
  if (count >= req.plan.maxProfiles) {
    return res.status(403).json({
      error: 'profile_limit',
      max: req.plan.maxProfiles,
      upgrade_to: 'pro',
      message: req.plan.maxProfiles === 1
        ? 'Multiple brand profiles unlock on Pro (up to 5) — built for ghostwriters & agencies.'
        : `Your plan allows ${req.plan.maxProfiles} profiles.`,
    });
  }
  const { name, niche } = req.body || {};
  if (!name?.trim()) return res.status(400).json({ error: 'invalid_input' });
  const now = Date.now();
  const cleanName = name.trim().slice(0, 24);
  const cleanNiche = (niche || 'Personal brand').trim().slice(0, 32);
  const model = await buildBrandModel({ name: cleanName, niche: cleanNiche });
  const info = db.prepare(
    `INSERT INTO profiles (user_id, name, niche, slug, color, style, tagline, bio_linkedin, bio_x, hooks, model_built_at, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(req.user.id, cleanName, cleanNiche, uniqueSlug(name),
        model.color, model.style, model.tagline, model.bio_linkedin, model.bio_x,
        JSON.stringify(model.hooks), now, now);
  res.status(201).json({ profile: serializeProfile(own(req, info.lastInsertRowid)) });
});

/** POST /api/profiles/:id/rebuild — regenerate this profile's AI model. */
r.post('/:id/rebuild', async (req, res) => {
  const p = own(req, req.params.id);
  if (!p) return res.status(404).json({ error: 'not_found' });
  const model = await buildBrandModel({ name: p.name, niche: p.niche });
  db.prepare(
    `UPDATE profiles SET tagline = ?, bio_linkedin = ?, bio_x = ?, hooks = ?, style = ?, model_built_at = ? WHERE id = ?`
  ).run(model.tagline, model.bio_linkedin, model.bio_x, JSON.stringify(model.hooks),
        req.plan.styles.includes(model.style) ? model.style : p.style, Date.now(), p.id);
  res.json({ profile: serializeProfile(own(req, p.id)) });
});

/** PATCH /api/profiles/:id {name?, niche?, color?, style?} — gates style & color by plan. */
r.patch('/:id', (req, res) => {
  const p = own(req, req.params.id);
  if (!p) return res.status(404).json({ error: 'not_found' });
  const { name, niche, color, style } = req.body || {};
  if (style && !req.plan.styles.includes(style)) {
    return res.status(403).json({ error: 'feature_locked', feature: 'style:' + style, upgrade_to: 'plus' });
  }
  if (color && !req.plan.customColor) {
    return res.status(403).json({ error: 'feature_locked', feature: 'custom_color', upgrade_to: 'plus' });
  }
  if (color && !/^#[0-9a-fA-F]{6}$/.test(color)) return res.status(400).json({ error: 'invalid_color' });
  db.prepare('UPDATE profiles SET name = ?, niche = ?, color = ?, style = ? WHERE id = ?').run(
    (name?.trim().slice(0, 24)) || p.name,
    (niche?.trim().slice(0, 32)) || p.niche,
    color || p.color,
    style || p.style,
    p.id
  );
  res.json({ profile: serializeProfile(own(req, p.id)) });
});

/** DELETE /api/profiles/:id */
r.delete('/:id', (req, res) => {
  const p = own(req, req.params.id);
  if (!p) return res.status(404).json({ error: 'not_found' });
  db.prepare('DELETE FROM profiles WHERE id = ?').run(p.id);
  res.json({ ok: true });
});

export default r;
