require('dotenv').config();
const crypto = require('crypto');
const path = require('path');

const SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.JWT_SECRET) {
  console.warn('[config] JWT_SECRET not set — using a random ephemeral secret. Sessions reset on restart. Set JWT_SECRET in .env for production.');
}

module.exports = {
  port: parseInt(process.env.PORT || '8080', 10),
  secret: SECRET,
  dataDir: process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(__dirname, '..', 'data'),
  clientOrigin: process.env.CLIENT_ORIGIN || '*',
  trialDays: parseInt(process.env.TRIAL_DAYS || '7', 10),
  allowSimulatedSocial: String(process.env.ALLOW_SIMULATED_SOCIAL || 'true') === 'true',
  publicBase: process.env.PUBLIC_BASE_URL || ('http://localhost:' + (process.env.PORT || 8080)),
  stripeKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  priceMonthly: parseInt(process.env.PRICE_MONTHLY || '2900', 10),
  priceYearly: parseInt(process.env.PRICE_YEARLY || '26100', 10),
  emailFrom: process.env.EMAIL_FROM || 'hello@brandofme.ai',
  smtpUrl: process.env.SMTP_URL || ''
};
