// src/server.js — Brandofme.ai backend.
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';

import authRoutes, { serializeMe } from './routes/auth.js';
import { auth } from './middleware/auth.js';
import billingRoutes, { webhookHandler } from './routes/billing.js';
import profileRoutes from './routes/profiles.js';
import statusRoutes from './routes/statuses.js';
import contentRoutes from './routes/content.js';
import pageRoutes from './routes/pages.js';
import { db } from './db.js';
import { rateLimit, securityHeaders } from './middleware/security.js';

const app = express();
app.set('trust proxy', 1); // correct client IPs behind Hostinger/nginx
app.use(cors());
app.use(securityHeaders);

// Stripe webhook needs the raw body — register BEFORE express.json()
app.post('/api/billing/webhook', ...webhookHandler);

app.use(express.json({ limit: '100kb' }));

// API
app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));
app.get('/api/me', auth, (req, res) => res.json({ user: serializeMe(req.user) }));
app.get('/api/stats', auth, (req, res) => {
  const drafts = db.prepare('SELECT COUNT(*) c FROM drafts WHERE user_id = ?').get(req.user.id).c;
  const statuses = db.prepare('SELECT COUNT(*) c FROM statuses WHERE user_id = ?').get(req.user.id).c;
  res.json({ drafts, statuses, member_since: req.user.created_at });
});
app.use('/api/auth', rateLimit({ max: 10 }), authRoutes);          // brute-force guard
app.use('/api/billing', billingRoutes);
app.use('/api/profiles', rateLimit({ max: 60 }), profileRoutes);
app.use('/api/statuses', rateLimit({ max: 60 }), statusRoutes);
app.use('/', pageRoutes);         // /u/:slug (public), /api/export/:id
app.use('/api', rateLimit({ max: 40 }), contentRoutes);            // drafts + hooks: AI cost guard

// Serve the frontend if public/index.html exists (drop brandofme.html in as public/index.html)
const pub = path.join(process.cwd(), 'public');
if (fs.existsSync(path.join(pub, 'index.html'))) app.use(express.static(pub));

// 404 + error handler
app.use('/api', (_req, res) => res.status(404).json({ error: 'not_found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'server_error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Brandofme.ai backend → http://localhost:${PORT}`);
  console.log(`  AI drafts:  ${process.env.ANTHROPIC_API_KEY ? 'Claude API' : 'template fallback (set ANTHROPIC_API_KEY)'}`);
  console.log(`  Billing:    ${process.env.STRIPE_SECRET_KEY ? 'Stripe' : 'demo mode (set STRIPE_SECRET_KEY to go live)'}`);
});
