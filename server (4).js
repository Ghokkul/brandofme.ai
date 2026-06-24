const { verify } = require('../lib/auth');
const db = require('../db');

/* Reads "Authorization: Bearer <token>" (or ?token=, or token cookie), loads the user. */
function readToken(req) {
  const h = req.headers.authorization || '';
  if (h.startsWith('Bearer ')) return h.slice(7).trim();
  if (req.query && req.query.token) return String(req.query.token);
  if (req.headers.cookie) { const m = req.headers.cookie.match(/(?:^|;\s*)token=([^;]+)/); if (m) return decodeURIComponent(m[1]); }
  return null;
}

function attachUser(req) {
  const tok = readToken(req);
  const data = tok ? verify(tok) : null;
  req.user = data && data.kind === 'session' ? db.getUserById(data.uid) : null;
  return req.user;
}

function authRequired(req, res, next) {
  if (!attachUser(req)) return res.status(401).json({ error: 'unauthorized', message: 'Sign in to continue.' });
  next();
}

module.exports = { authRequired, attachUser, readToken };
