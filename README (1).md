'use strict';
/* Email delivery. If SMTP_* env vars are set, sends real email via nodemailer.
   Otherwise runs in DEV mode: logs the message and stores it in the outbox table,
   mirroring the in-app email preview the front-end already shows. */

const db = require('./db');

let transporter = null;
const HAS_SMTP = !!(process.env.SMTP_HOST && process.env.SMTP_USER);

if (HAS_SMTP) {
  try {
    const nodemailer = require('nodemailer');
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  } catch (e) {
    console.warn('[email] nodemailer unavailable, falling back to dev outbox:', e.message);
  }
}

const FROM = process.env.MAIL_FROM || 'Brandofme.ai <ghokkul.muhunthan@gmail.com>';

async function sendMail(to, subject, html) {
  db.saveOutbox(to, subject, html); // always keep a copy
  if (transporter) {
    try {
      const info = await transporter.sendMail({ from: FROM, to, subject, html });
      console.log(`[email] sent to ${to} (${info.messageId})`);
      return { sent: true };
    } catch (e) {
      console.error('[email] send failed, kept in outbox:', e.message);
      return { sent: false, error: e.message };
    }
  }
  console.log(`\n[email:DEV] → ${to}\n  subject: ${subject}\n  (not sent — configure SMTP_* to deliver; saved to outbox)\n`);
  return { sent: false, dev: true };
}

function welcomeEmail(name) {
  const first = String(name || '').split(' ')[0] || 'there';
  return {
    subject: '\uD83C\uDF89 Congrats — you\u2019ve signed up for Brandofme.ai!',
    html: `<p>Hi ${esc(first)},</p>
<p><b>Congratulations — you\u2019ve signed up for Brandofme.ai!</b> \uD83C\uDF89</p>
<p>Your brand is live: we\u2019ve built your AI brand model and reserved your page. Sign in any time to publish it, post updates, and create videos.</p>
<p>There\u2019s only one brand of you. Go build it.</p>
<p>\u2014 Ghokkul, Brandofme.ai<br><a href="mailto:ghokkul.muhunthan@gmail.com">ghokkul.muhunthan@gmail.com</a></p>`,
  };
}

function resetEmail(name, code) {
  const first = name ? ' ' + String(name).split(' ')[0] : '';
  return {
    subject: 'Reset your Brandofme.ai password',
    html: `<p>Hi${esc(first)},</p>
<p>Use this code to reset your password — it expires in 15 minutes:</p>
<p style="font-size:26px;font-weight:700;letter-spacing:4px">${esc(code)}</p>
<p style="opacity:.7;font-size:13px">If you didn't request this, you can ignore this email — your password won't change.</p>`,
  };
}

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

module.exports = { sendMail, welcomeEmail, resetEmail, HAS_SMTP, esc };
