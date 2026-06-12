// src/routes/pages.js — public brand pages (/u/:slug) and Pro kit export.
import { Router } from 'express';
import { db, slugify } from '../db.js';
import { auth, requireFeature } from '../middleware/auth.js';
import { nameAccent } from '../services/ai.js';

const r = Router();

/** POST /api/preview {name, niche?} — PUBLIC.
 *  "Claim your name": builds the brand model for a name before signup,
 *  and reports whether the slug is still available. */
r.post('/api/preview', (req, res) => {
  const name = (req.body?.name || '').trim().slice(0, 24);
  if (!name) return res.status(400).json({ error: 'invalid_input', message: 'Type a name to claim.' });
  const niche = (req.body?.niche || 'Personal brand').trim().slice(0, 32);
  const slug = slugify(name);
  const taken = !!db.prepare('SELECT 1 FROM profiles WHERE slug = ?').get(slug);
  res.json({
    name, niche, slug,
    available: !taken,
    color: nameAccent(name),
    monogram: initials(name),
    bios: {
      linkedin: `${name} — ${niche}. I turn ideas into work people remember. Building in public, one post at a time.`,
      x: `${niche.toLowerCase()} · thoughts by ${name.split(' ')[0]} · there's only one brand of me`,
    },
    hook: `Everyone is wrong about ${niche.toLowerCase()}. Here's what ${name.split(' ')[0]} sees instead:`,
  });
});

const initials = (name) => {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (!p.length) return 'ME';
  return p.length === 1 ? p[0].slice(0, 2).toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase();
};
const palette = (c) => [c, '#0F1217', '#F6F7F5', '#E7E4F7'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function kitHtml(p, { client = false } = {}) {
  const statuses = db.prepare(
    'SELECT content, created_at FROM statuses WHERE profile_id = ? ORDER BY created_at DESC LIMIT 5'
  ).all(p.id);
  const fmt = (ts) => new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const timeline = statuses.length
    ? `<h2>Updates</h2>` + statuses.map(s =>
        `<div class="upd"><span class="upd-date">${fmt(s.created_at)}</span>${esc(s.content)}</div>`).join('')
    : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(p.name)} — ${client ? 'Brand Kit' : 'Brandofme.ai'}</title>
<style>
body{font-family:system-ui,Arial,sans-serif;max-width:560px;margin:0 auto;padding:60px 24px;color:#0F1217;background:#F6F7F5;text-align:${client ? 'left' : 'center'}}
h1{color:${p.color};font-size:40px;letter-spacing:-.02em;margin:14px 0 4px}
.tag{font-style:italic;color:#555;margin:2px 0 8px}
.mono{display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;background:${p.color};color:#fff;font-weight:800;font-size:22px;border-radius:16px}
.niche{font-family:ui-monospace,monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#777;margin-bottom:28px}
.sw{display:inline-block;width:34px;height:34px;border-radius:9px;margin:0 4px;border:1px solid #ddd}
h2{font-family:ui-monospace,monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#999;margin:36px 0 10px}
.link{display:block;border:1.5px solid ${p.color};color:${p.color};border-radius:100px;padding:11px;font-weight:600;text-decoration:none;margin:8px auto;max-width:300px}
.upd{background:#fff;border:1px solid #e4e5e3;border-radius:14px;padding:13px 16px;margin:8px auto;max-width:430px;text-align:left;font-size:14.5px;line-height:1.55}
.upd-date{display:block;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.1em;color:#999;margin-bottom:3px}
.fine{margin-top:48px;font-size:11px;color:#aaa}
</style></head><body>
<span class="mono">${initials(p.name)}</span>
<h1>${esc(p.name)}</h1>
${p.tagline ? `<p class="tag">\u201C${esc(p.tagline)}\u201D</p>` : ''}
<p class="niche">${esc(p.niche)}</p>
${client ? `
<h2>Palette</h2><div>${palette(p.color).map(c => `<span class="sw" style="background:${c}" title="${c}"></span>`).join('')}</div>
<p style="font-family:ui-monospace,monospace;font-size:12px">${palette(p.color).join(' · ')}</p>
<h2>LinkedIn bio</h2><p>${esc(p.bio_linkedin || '')}</p>
<h2>X bio</h2><p>${esc(p.bio_x || '')}</p>
<h2>Brand page</h2><p>brandofme.ai/${esc(p.slug)}</p>
` : `
<a class="link" href="#">Newsletter</a>
<a class="link" href="#">Work with me</a>
${timeline}
`}
<p class="fine">Made with Brandofme.ai — there's only one brand of you.</p>
</body></html>`;
}

/** GET /u/:slug — PUBLIC brand page. Every page is a billboard for the product. */
r.get('/u/:slug', (req, res) => {
  const p = db.prepare('SELECT * FROM profiles WHERE slug = ?').get(req.params.slug);
  if (!p) return res.status(404).send('<h1>This name is still unclaimed.</h1>');
  res.type('html').send(kitHtml(p));
});

/** GET /api/export/:profileId — PRO ONLY: downloadable client-ready kit. */
r.get('/api/export/:profileId', auth, requireFeature('exports', 'pro'), (req, res) => {
  const p = db.prepare('SELECT * FROM profiles WHERE id = ? AND user_id = ?').get(req.params.profileId, req.user.id);
  if (!p) return res.status(404).json({ error: 'not_found' });
  res.setHeader('Content-Disposition', `attachment; filename="${p.slug}-brand-kit.html"`);
  res.type('html').send(kitHtml(p, { client: true }));
});

export default r;
