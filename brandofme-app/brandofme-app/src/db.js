// src/db.js — SQLite via Node's built-in node:sqlite (no native deps).
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'brandofme.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

export const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  plan          TEXT,                -- 'trial' | 'basic' | 'plus' | 'pro' | NULL (locked)
  trial_ends_at INTEGER,             -- ms epoch, only for trial
  drafts_used   INTEGER NOT NULL DEFAULT 0,
  quota_period  TEXT,                -- 'YYYY-MM' the drafts_used counter belongs to
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  created_at    INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  niche      TEXT NOT NULL DEFAULT 'Personal brand',
  color      TEXT NOT NULL DEFAULT '#2B3CFF',
  style      TEXT NOT NULL DEFAULT 'bold',
  slug       TEXT UNIQUE NOT NULL,
  tagline        TEXT,
  bio_linkedin   TEXT,
  bio_x          TEXT,
  hooks          TEXT,            -- JSON array: the model's hook bank
  model_built_at INTEGER,
  created_at INTEGER NOT NULL
);
`);

/* migration for databases created before the brand-model columns existed */
for (const col of ['tagline TEXT', 'bio_linkedin TEXT', 'bio_x TEXT', 'hooks TEXT', 'model_built_at INTEGER']) {
  try { db.exec(`ALTER TABLE profiles ADD COLUMN ${col}`); } catch { /* already exists */ }
}

db.exec(`
CREATE TABLE IF NOT EXISTS drafts (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE SET NULL,
  topic      TEXT NOT NULL,
  style      TEXT NOT NULL,
  content    TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS statuses (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
`);

/* ---------- helpers ---------- */

export function slugify(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'me';
}

export function uniqueSlug(base) {
  let slug = slugify(base);
  let n = 1;
  const stmt = db.prepare('SELECT 1 FROM profiles WHERE slug = ?');
  while (stmt.get(slug)) slug = `${slugify(base)}-${++n}`;
  return slug;
}

export function getUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}
export function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
}

/** Reset the monthly draft counter when the calendar month rolls over. */
export function ensureQuotaPeriod(user) {
  const period = new Date().toISOString().slice(0, 7); // YYYY-MM
  if (user.quota_period !== period) {
    db.prepare('UPDATE users SET drafts_used = 0, quota_period = ? WHERE id = ?').run(period, user.id);
    user.drafts_used = 0;
    user.quota_period = period;
  }
  return user;
}
