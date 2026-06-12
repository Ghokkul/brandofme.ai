// src/routes/content.js — draft generation (quota-gated) and hooks (Plus+).
import { Router } from 'express';
import { db } from '../db.js';
import { auth, requireActivePlan, requireFeature } from '../middleware/auth.js';
import { generateDraft, generateHooks } from '../services/ai.js';

const r = Router();
r.use(auth, requireActivePlan);

function profileFor(req) {
  const id = req.body?.profile_id;
  if (id) return db.prepare('SELECT * FROM profiles WHERE id = ? AND user_id = ?').get(id, req.user.id);
  return db.prepare('SELECT * FROM profiles WHERE user_id = ? ORDER BY created_at ASC').get(req.user.id);
}

/** POST /api/drafts {topic, style?, profile_id?}
 *  Enforces: style allowed by plan, monthly quota (Basic: 30). */
r.post('/drafts', async (req, res) => {
  const profile = profileFor(req);
  if (!profile) return res.status(400).json({ error: 'no_profile' });

  const style = req.body?.style || profile.style || 'bold';
  if (!req.plan.styles.includes(style)) {
    return res.status(403).json({ error: 'feature_locked', feature: 'style:' + style, upgrade_to: 'plus',
      message: `The ${style.toUpperCase()} style unlocks on Plus.` });
  }

  if (req.plan.draftQuota !== Infinity && req.user.drafts_used >= req.plan.draftQuota) {
    return res.status(403).json({ error: 'quota_exceeded', upgrade_to: 'plus',
      message: 'Out of drafts this month — Plus is unlimited.' });
  }

  const topic = (req.body?.topic || profile.niche).trim().slice(0, 60).toLowerCase();
  const content = await generateDraft({ name: profile.name, niche: profile.niche, topic, style });

  db.prepare('UPDATE users SET drafts_used = drafts_used + 1 WHERE id = ?').run(req.user.id);
  const info = db.prepare(
    'INSERT INTO drafts (user_id, profile_id, topic, style, content, created_at) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(req.user.id, profile.id, topic, style, content, Date.now());

  const used = req.user.drafts_used + 1;
  res.status(201).json({
    draft: { id: info.lastInsertRowid, topic, style, content },
    quota: req.plan.draftQuota === Infinity
      ? { unlimited: true }
      : { used, total: req.plan.draftQuota, left: Math.max(0, req.plan.draftQuota - used) },
  });
});

/** GET /api/drafts — recent drafts. */
r.get('/drafts', (req, res) => {
  const drafts = db.prepare(
    'SELECT id, profile_id, topic, style, content, created_at FROM drafts WHERE user_id = ? ORDER BY created_at DESC LIMIT 50'
  ).all(req.user.id);
  res.json({ drafts });
});

/** POST /api/hooks {topic, profile_id?} — Plus & Pro only. */
r.post('/hooks', requireFeature('hooks', 'plus'), async (req, res) => {
  const profile = profileFor(req);
  if (!profile) return res.status(400).json({ error: 'no_profile' });
  const topic = (req.body?.topic || profile.niche).trim().slice(0, 60).toLowerCase();
  const hooks = await generateHooks({ name: profile.name, topic });
  res.json({ topic, hooks });
});

export default r;
