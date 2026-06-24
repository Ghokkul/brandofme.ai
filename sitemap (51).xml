/* A tiny file-backed JSON database. Zero dependencies, runs anywhere.
   Domain methods mirror what the API needs. Swap this module for a real
   Postgres adapter later (see src/db/schema.sql) without touching controllers. */
const fs = require('fs');
const path = require('path');
const config = require('../config');

const FILE = path.join(config.dataDir, 'db.json');
let cache = null;
let writeTimer = null;

function ensureDir() { fs.mkdirSync(config.dataDir, { recursive: true }); }
function load() {
  if (cache) return cache;
  ensureDir();
  try { cache = JSON.parse(fs.readFileSync(FILE, 'utf8')); }
  catch (e) { cache = { users: {}, emailIndex: {}, workspaces: {}, pages: {}, subscriptions: {} }; }
  for (const k of ['users', 'emailIndex', 'workspaces', 'pages', 'subscriptions']) if (!cache[k]) cache[k] = {};
  return cache;
}
function persist() {
  clearTimeout(writeTimer);
  writeTimer = setTimeout(() => {
    try { ensureDir(); fs.writeFileSync(FILE, JSON.stringify(cache, null, 2)); }
    catch (e) { console.error('[db] write failed', e.message); }
  }, 40);
}

const db = load();

module.exports = {
  /* users (profiles are embedded on the user) */
  getUserByEmail(email) { const id = db.emailIndex[String(email).toLowerCase()]; return id ? db.users[id] : null; },
  getUserById(id) { return db.users[id] || null; },
  insertUser(u) { db.users[u.id] = u; db.emailIndex[u.email.toLowerCase()] = u.id; persist(); return u; },
  updateUser(u) { db.users[u.id] = u; persist(); return u; },

  /* workspace block-editor document, one per user */
  getWorkspace(userId) { return db.workspaces[userId] || null; },
  setWorkspace(userId, doc) { db.workspaces[userId] = { doc, updatedAt: Date.now() }; persist(); return db.workspaces[userId]; },

  /* published pages, keyed by slug */
  getPage(slug) { return db.pages[slug] || null; },
  setPage(slug, rec) { db.pages[slug] = rec; persist(); return rec; },
  slugTaken(slug) { return !!db.pages[slug]; },

  /* subscriptions, keyed by userId */
  getSubscription(userId) { return db.subscriptions[userId] || null; },
  setSubscription(userId, sub) { db.subscriptions[userId] = sub; persist(); return sub; },

  _raw: db
};
