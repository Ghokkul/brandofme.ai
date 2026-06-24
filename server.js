/* Subscriptions + trial logic.
   No STRIPE_SECRET_KEY -> simulated mode: "subscribe" flips the user to Full Access.
   With a key -> create real Stripe Checkout sessions and handle webhooks (see TODOs). */
const config = require('../config');
const db = require('../db');

function isActive(user) {
  if (user.plan && user.plan !== 'trial') return true;
  const sub = db.getSubscription(user.id);
  return !!(sub && sub.status === 'active');
}

async function createCheckout({ user, plan }) {
  plan = plan === 'yearly' ? 'yearly' : 'monthly';
  const amount = plan === 'yearly' ? config.priceYearly : config.priceMonthly;
  if (!config.stripeKey) {
    // Simulated: mark active immediately and return a fake "checkout" URL.
    db.setSubscription(user.id, { status: 'active', plan, provider_id: 'sim_' + Date.now(), updatedAt: Date.now() });
    const u = db.getUserById(user.id); u.plan = 'active'; db.updateUser(u);
    return { simulated: true, plan, amount, url: config.publicBase + '/billing/success?simulated=1' };
  }
  // TODO real Stripe:
  //   const stripe = require('stripe')(config.stripeKey);
  //   const session = await stripe.checkout.sessions.create({ mode:'subscription', line_items:[...], success_url, cancel_url, customer_email:user.email });
  //   return { url: session.url };
  const e = new Error('Stripe configured but checkout not yet implemented — see src/services/billing.js'); e.status = 501; e.expose = true; throw e;
}

function handleWebhook(rawBody, signature) {
  // TODO verify signature with config.stripeWebhookSecret, then on
  // 'checkout.session.completed' / 'customer.subscription.updated' update db.setSubscription + user.plan.
  let event = {};
  try { event = JSON.parse(rawBody.toString() || '{}'); } catch (e) {}
  return { received: true, type: event.type || 'unknown' };
}

module.exports = { isActive, createCheckout, handleWebhook };
