const db = require('../db');
const Engine = require('../lib/brand-engine');
const { hashPassword, verifyPassword, sessionToken, resetToken, verify } = require('../lib/auth');
const { newId, slugify } = require('../lib/ids');
const { serveUser } = require('../lib/serialize');
const email = require('../services/email');
const oauth = require('../services/oauth');
const config = require('../config');

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const fail = (status, code, message) => { const e = new Error(message); e.status = status; e.code = code; e.expose = true; return e; };

function buildProfile(name, niche) {
  const brand = Engine.generate((name || '') + ' ' + (niche || ''), { name, niche });
  return { id: newId('prof'), name: name || brand.name, niche: niche || brand.niche, slug: slugify(name || brand.name), color: brand.palette.primary, model: brand };
}

async function signup(req, res) {
  const name = String(req.body.name || '').trim();
  const e = String(req.body.email || '').trim().toLowerCase();
  const pw = String(req.body.password || '');
  const niche = String(req.body.niche || '').trim();
  if (!name) throw fail(400, 'invalid_input', 'Please enter your name.');
  if (!EMAIL_RE.test(e)) throw fail(400, 'invalid_input', 'Please enter a valid email.');
  if (pw.length < 8) throw fail(400, 'invalid_input', 'Password must be at least 8 characters.');
  if (db.getUserByEmail(e)) throw fail(409, 'email_taken', 'An account with that email already exists.');
  const user = { id: newId('user'), name, email: e, niche, password_hash: hashPassword(pw), provider: null, plan: 'trial', draftsUsed: 0, statuses: [], createdAt: Date.now(), profiles: [buildProfile(name, niche)] };
  db.insertUser(user);
  email.welcome(user).catch(() => {});
  res.json({ token: sessionToken(user.id), user: serveUser(user) });
}

async function login(req, res) {
  const e = String(req.body.email || '').trim().toLowerCase();
  const pw = String(req.body.password || '');
  const user = db.getUserByEmail(e);
  if (!user || !verifyPassword(pw, user.password_hash)) throw fail(401, 'bad_credentials', 'Email or password is incorrect.');
  res.json({ token: sessionToken(user.id), user: serveUser(user) });
}

async function social(req, res) {
  const verified = await oauth.verifyProvider({ provider: req.body.provider, email: req.body.email, name: req.body.name, idToken: req.body.idToken });
  let user = db.getUserByEmail(verified.email);
  const created = !user;
  if (!user) {
    const nm = verified.name || verified.email.split('@')[0];
    user = { id: newId('user'), name: nm, email: verified.email, niche: req.body.niche || '', password_hash: null, provider: verified.provider, plan: 'trial', draftsUsed: 0, statuses: [], createdAt: Date.now(), profiles: [buildProfile(nm, req.body.niche)] };
    db.insertUser(user);
    email.welcome(user).catch(() => {});
  } else if (!user.provider) { user.provider = verified.provider; db.updateUser(user); }
  res.json({ token: sessionToken(user.id), created, user: serveUser(user) });
}

async function me(req, res) { res.json({ user: serveUser(req.user) }); }

async function logout(req, res) { res.json({ ok: true }); } // stateless: client discards the token

async function forgot(req, res) {
  const e = String(req.body.email || '').trim().toLowerCase();
  const user = db.getUserByEmail(e);
  if (user) {
    const url = config.publicBase + '/reset?token=' + resetToken(user.id);
    await email.resetLink(user, url).catch(() => {});
  }
  res.json({ ok: true }); // never reveal whether the email exists
}

async function reset(req, res) {
  const data = verify(String(req.body.token || ''));
  if (!data || data.kind !== 'reset') throw fail(400, 'bad_token', 'That reset link is invalid or has expired.');
  const pw = String(req.body.password || '');
  if (pw.length < 8) throw fail(400, 'invalid_input', 'Password must be at least 8 characters.');
  const user = db.getUserById(data.uid);
  if (!user) throw fail(400, 'bad_token', 'That reset link is invalid or has expired.');
  user.password_hash = hashPassword(pw); db.updateUser(user);
  res.json({ ok: true });
}

module.exports = { signup, login, social, me, logout, forgot, reset };
