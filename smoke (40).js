const db = require('../db');
const Engine = require('../lib/brand-engine');
const { newId, slugify } = require('../lib/ids');
const { serveUser } = require('../lib/serialize');
const fail = (s, c, m) => { const e = new Error(m); e.status = s; e.code = c; e.expose = true; return e; };

async function list(req, res) { res.json({ profiles: serveUser(req.user).profiles }); }

async function create(req, res) {
  const name = String(req.body.name || '').trim();
  const niche = String(req.body.niche || '').trim();
  if (!name) throw fail(400, 'invalid_input', 'A profile name is required.');
  const brand = Engine.generate(name + ' ' + niche, { name, niche });
  const profile = { id: newId('prof'), name, niche, slug: slugify(name), color: brand.palette.primary, model: brand };
  req.user.profiles = req.user.profiles || []; req.user.profiles.push(profile); db.updateUser(req.user);
  res.json({ profile, user: serveUser(req.user) });
}

async function patch(req, res) {
  const p = (req.user.profiles || []).find(x => x.id === req.params.id);
  if (!p) throw fail(404, 'not_found', 'Profile not found.');
  for (const k of ['name', 'niche', 'color', 'tagline', 'slug']) if (k in req.body) p[k] = req.body[k];
  if (req.body.model && typeof req.body.model === 'object') p.model = Object.assign({}, p.model, req.body.model);
  db.updateUser(req.user);
  res.json({ profile: p, user: serveUser(req.user) });
}

module.exports = { list, create, patch };
