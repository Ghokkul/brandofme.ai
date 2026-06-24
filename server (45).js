/* Shapes a stored user into the object the frontend expects (mirrors demoServe). */
const config = require('../config');

function serveUser(u) {
  const elapsed = Date.now() - (u.createdAt || Date.now());
  const daysUsed = Math.floor(elapsed / 86400000);
  const trialDaysLeft = Math.max(0, config.trialDays - daysUsed);
  const onTrial = u.plan === 'trial';
  const trialExpired = onTrial && trialDaysLeft <= 0;
  const active = !onTrial || !trialExpired;
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    plan: u.plan,
    plan_label: onTrial ? (trialExpired ? 'Trial ended' : 'Free trial · ' + trialDaysLeft + (trialDaysLeft === 1 ? ' day left' : ' days left')) : 'Full Access',
    trial_days_left: trialDaysLeft,
    trial_expired: trialExpired,
    entitlements: { conjure: active, brandChat: active, workspace: active, publish: active, video: active },
    profiles: (u.profiles || []).map(p => Object.assign({ id: p.id, name: p.name, niche: p.niche, slug: p.slug, color: p.color }, p.model || {}))
  };
}
module.exports = { serveUser };
