const crypto = require('crypto');
const newId = (p = 'id') => p + '_' + crypto.randomBytes(9).toString('base64url');
function slugify(s) {
  return String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'brand';
}
module.exports = { newId, slugify };
