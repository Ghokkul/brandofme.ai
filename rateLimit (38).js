const billing = require('../services/billing');
const { serveUser } = require('../lib/serialize');
const db = require('../db');

async function subscribe(req, res) {
  const out = await billing.createCheckout({ user: req.user, plan: req.body.plan });
  const fresh = db.getUserById(req.user.id);
  res.json(Object.assign({ ok: true, user: serveUser(fresh) }, out));
}

async function webhook(req, res) {
  const result = billing.handleWebhook(req.body, req.headers['stripe-signature']);
  res.json(result);
}

async function status(req, res) {
  res.json({ active: billing.isActive(req.user), subscription: db.getSubscription(req.user.id) || null });
}

module.exports = { subscribe, webhook, status };
