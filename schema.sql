/* Password hashing (scrypt) + stateless signed tokens (HMAC-SHA256). No native deps. */
const crypto = require('crypto');
const config = require('../config');

function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const dk = crypto.scryptSync(String(pw), salt, 64);
  return 's1$' + salt.toString('hex') + '$' + dk.toString('hex');
}
function verifyPassword(pw, stored) {
  if (!stored || typeof stored !== 'string') return false;
  const [v, saltHex, hashHex] = stored.split('$');
  if (v !== 's1' || !saltHex || !hashHex) return false;
  const dk = crypto.scryptSync(String(pw), Buffer.from(saltHex, 'hex'), 64);
  const a = Buffer.from(hashHex, 'hex');
  return a.length === dk.length && crypto.timingSafeEqual(a, dk);
}

function b64u(buf) { return Buffer.from(buf).toString('base64url'); }
function sign(payload, ttlMs) {
  const body = b64u(JSON.stringify(Object.assign({ iat: Date.now(), exp: ttlMs ? Date.now() + ttlMs : 0 }, payload)));
  const sig = crypto.createHmac('sha256', config.secret).update(body).digest('base64url');
  return body + '.' + sig;
}
function verify(token) {
  if (!token || typeof token !== 'string') return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expSig = crypto.createHmac('sha256', config.secret).update(body).digest('base64url');
  if (sig.length !== expSig.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expSig))) return null;
  let data; try { data = JSON.parse(Buffer.from(body, 'base64url').toString()); } catch (e) { return null; }
  if (data.exp && Date.now() > data.exp) return null;
  return data;
}

const sessionToken = (userId) => sign({ uid: userId, kind: 'session' }, 1000 * 60 * 60 * 24 * 30); // 30d
const resetToken = (userId) => sign({ uid: userId, kind: 'reset' }, 1000 * 60 * 60); // 1h

module.exports = { hashPassword, verifyPassword, sign, verify, sessionToken, resetToken };
