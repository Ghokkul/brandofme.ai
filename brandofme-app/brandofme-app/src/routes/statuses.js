// src/routes/statuses.js — building-in-public status updates.
// Posting/listing/deleting works on every plan (they power the public page);
// the AI "make it on-brand" polish unlocks on Plus & Pro.
import { Router } from 'express';
import { db } from '../db.js';
import { auth, requireActivePlan } from '../middleware/auth.js';
import { polishStatus } from '../services/ai.js';

const r = Router();
r.use(auth, requireActivePlan);

const ownProfile = (req, id) =>
  db.prepare('SELECT * FROM profiles WHERE id = ? AND user_id = ?').get(id, req.user.id);

function profileFor(req, idFromQueryOrBody) {
  if (idFromQueryOrBody) return ownProfile(req, idFromQueryOrBody);
  return db.prepare('SELECT * FROM profiles WHERE user_id = ? ORDER BY created_at ASC').get(req.user.id);
}

/** GET /api/statuses?profile_id= — latest 50 updates for a profile. */
r.get('/', (req, res) => {
  const p = profileFor(req, req.query.profile_id);
  if (!p) return res.status(400).json({ error: 'no_profile' });
  const statuses = db.prepare(
    'SELECT id, profile_id, content, created_at FROM statuses WHERE profile_id = ? ORDER BY created_at DESC LIMIT 50'
  ).all(p.id);
  res.json({ statuses });
});

/** POST /api/statuses {content, profile_id?} — publish an update (max 280 chars). */
r.post('/', (req, res) => {
  const p = profileFor(req, req.body?.profile_id);
  if (!p) return res.status(400).json({ error: 'no_profile' });
  const content = (req.body?.content || '').trim().slice(0, 280);
  if (!content) return res.status(400).json({ error: 'invalid_input', message: 'Write something first.' });
  const now = Date.now();
  const info = db.prepare(
    'INSERT INTO statuses (user_id, profile_id, content, created_at) VALUES (?, ?, ?, ?)'
  ).run(req.user.id, p.id, content, now);
  res.status(201).json({ status: { id: info.lastInsertRowid, profile_id: p.id, content, created_at: now } });
});

/** POST /api/statuses/polish {content, profile_id?} — AI rewrite in the model's style. Plus+ only. */
r.post('/polish', async (req, res) => {
  if (!req.plan.hooks) {
    return res.status(403).json({
      error: 'feature_locked', feature: 'polish', upgrade_to: 'plus',
      message: 'On-brand AI polish unlocks on Plus.',
    });
  }
  const p = profileFor(req, req.body?.profile_id);
  if (!p) return res.status(400).json({ error: 'no_profile' });
  const content = (req.body?.content || '').trim().slice(0, 280);
  if (!content) return res.status(400).json({ error: 'invalid_input', message: 'Write something first.' });
  const polished = await polishStatus({ name: p.name, niche: p.niche, style: p.style, content });
  res.json({ content: polished });
});

/** DELETE /api/statuses/:id */
r.delete('/:id', (req, res) => {
  const s = db.prepare('SELECT * FROM statuses WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
  if (!s) return res.status(404).json({ error: 'not_found' });
  db.prepare('DELETE FROM statuses WHERE id = ?').run(s.id);
  res.json({ ok: true });
});

export default r;
