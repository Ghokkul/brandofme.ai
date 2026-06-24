const db = require('../db');
const fail = (s, c, m) => { const e = new Error(m); e.status = s; e.code = c; e.expose = true; return e; };

async function get(req, res) {
  const ws = db.getWorkspace(req.user.id);
  res.json({ doc: ws ? ws.doc : null, updatedAt: ws ? ws.updatedAt : null });
}

async function put(req, res) {
  const doc = req.body && req.body.doc;
  if (!doc || typeof doc !== 'object') throw fail(400, 'invalid_input', 'Provide the workspace "doc" object.');
  const saved = db.setWorkspace(req.user.id, doc);
  res.json({ ok: true, updatedAt: saved.updatedAt });
}

module.exports = { get, put };
