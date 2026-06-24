const express = require('express');
const router = express.Router();
const Engine = require('./lib/brand-engine');
const config = require('./config');

const auth = require('./controllers/authController');
const brand = require('./controllers/brandController');
const profile = require('./controllers/profileController');
const workspace = require('./controllers/workspaceController');
const publish = require('./controllers/publishController');
const billing = require('./controllers/billingController');

const { authRequired } = require('./middleware/authRequired');
const { rateLimit } = require('./middleware/rateLimit');

/* wrap async handlers so thrown errors hit the error middleware */
const h = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const authLimit = rateLimit({ windowMs: 60000, max: 20 });

/* meta */
router.get('/', (req, res) => res.json({
  name: 'brandofme.ai API', version: '1.0.0', engine: Engine.version,
  endpoints: {
    auth: ['POST /api/auth/signup', 'POST /api/auth/login', 'POST /api/auth/social', 'POST /api/auth/logout', 'GET /api/me', 'POST /api/auth/forgot', 'POST /api/auth/reset'],
    brand: ['POST /api/brand/generate', 'GET /api/brand/generate?input=', 'POST /api/brand/refine', 'POST /api/brand/chat'],
    profiles: ['GET /api/profiles', 'POST /api/profiles', 'PATCH /api/profiles/:id'],
    workspace: ['GET /api/workspace', 'PUT /api/workspace'],
    publish: ['POST /api/publish', 'GET /api/u/:slug', 'GET /u/:slug (HTML)'],
    billing: ['POST /api/billing/subscribe', 'GET /api/billing/status', 'POST /api/billing/webhook']
  }
}));
router.get('/api/health', (req, res) => res.json({ ok: true, version: '1.0.0', engine: Engine.version, time: Date.now() }));

/* auth */
router.post('/api/auth/signup', authLimit, h(auth.signup));
router.post('/api/auth/login', authLimit, h(auth.login));
router.post('/api/auth/social', authLimit, h(auth.social));
router.post('/api/auth/logout', h(auth.logout));
router.post('/api/auth/forgot', authLimit, h(auth.forgot));
router.post('/api/auth/reset', authLimit, h(auth.reset));
router.get('/api/me', authRequired, h(auth.me));

/* brand engine (Conjure) — generate is public, refine too */
router.post('/api/brand/generate', h(brand.generate));
router.get('/api/brand/generate', h(brand.generate));
router.post('/api/brand/refine', h(brand.refine));
router.post('/api/brand/chat', h(brand.chat));

/* profiles (auth) */
router.get('/api/profiles', authRequired, h(profile.list));
router.post('/api/profiles', authRequired, h(profile.create));
router.patch('/api/profiles/:id', authRequired, h(profile.patch));

/* workspace (auth) */
router.get('/api/workspace', authRequired, h(workspace.get));
router.put('/api/workspace', authRequired, h(workspace.put));

/* publish */
router.post('/api/publish', authRequired, h(publish.publish));
router.get('/api/u/:slug', h(publish.getPublic));
router.get('/u/:slug', h(publish.renderPublic));

/* billing */
router.post('/api/billing/subscribe', authRequired, h(billing.subscribe));
router.get('/api/billing/status', authRequired, h(billing.status));
router.post('/api/billing/webhook', h(billing.webhook));

module.exports = router;
