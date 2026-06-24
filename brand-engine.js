const db = require('../db');
const { slugify } = require('../lib/ids');
const fail = (s, c, m) => { const e = new Error(m); e.status = s; e.code = c; e.expose = true; return e; };

/* Publish a profile to a public slug. */
async function publish(req, res) {
  const profileId = req.body.profileId;
  const profile = (req.user.profiles || []).find(p => p.id === profileId) || (req.user.profiles || [])[0];
  if (!profile) throw fail(400, 'no_profile', 'Create a brand profile first.');
  let slug = slugify(req.body.slug || profile.slug || profile.name);
  const existing = db.getPage(slug);
  if (existing && existing.userId !== req.user.id) throw fail(409, 'slug_taken', 'That address is taken — try another.');
  db.setPage(slug, { userId: req.user.id, profileId: profile.id, published: true, createdAt: Date.now() });
  profile.slug = slug; db.updateUser(req.user);
  res.json({ ok: true, slug, url: require('../config').publicBase + '/u/' + slug });
}

/* Public brand data for a slug (JSON). */
async function getPublic(req, res) {
  const rec = db.getPage(req.params.slug);
  if (!rec || !rec.published) throw fail(404, 'not_found', 'No published page at that address.');
  const user = db.getUserById(rec.userId);
  const profile = user && (user.profiles || []).find(p => p.id === rec.profileId);
  if (!profile) throw fail(404, 'not_found', 'Page not found.');
  res.json({ slug: req.params.slug, name: profile.name, niche: profile.niche, color: profile.color, brand: profile.model });
}

/* Public, server-rendered page (indexable HTML). */
async function renderPublic(req, res) {
  const rec = db.getPage(req.params.slug);
  const user = rec && db.getUserById(rec.userId);
  const p = user && (user.profiles || []).find(x => x.id === rec.profileId);
  if (!rec || !rec.published || !p) return res.status(404).send('<!doctype html><meta charset=utf-8><title>Not found</title><p>No page here yet.</p>');
  const b = p.model || {};
  const pal = b.palette || { primary: p.color || '#2B3CFF', secondary: '#222', accent: '#7A3CFF', onPrimary: '#fff' };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  res.set('Content-Type', 'text/html; charset=utf-8').send(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + esc(p.name) + ' — Brandofme</title><meta name="description" content="' + esc(b.tagline || p.niche || '') + '">' +
    '<style>body{margin:0;font-family:system-ui,sans-serif;color:#0F1217}.hero{padding:14vh 8vw;background:linear-gradient(135deg,' + esc(pal.primary) + ',' + esc(pal.secondary) + ');color:' + esc(pal.onPrimary || '#fff') + '}h1{font-size:clamp(38px,8vw,72px);margin:0}p{font-size:20px;opacity:.92}</style></head>' +
    '<body><div class="hero"><h1>' + esc(p.name) + '</h1><p>' + esc(b.tagline || '') + '</p></div></body></html>'
  );
}

module.exports = { publish, getPublic, renderPublic };
