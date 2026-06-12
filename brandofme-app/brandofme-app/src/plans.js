// src/plans.js — single source of truth for plan entitlements.
// Mirrors the pricing page: Basic $19 / Plus $67 / Pro $199, trial = 7 days of Plus.

export const PLANS = {
  trial: {
    name: 'Free Trial',
    price: 0,
    draftQuota: Infinity,
    styles: ['bold', 'minimal', 'electric'],
    customColor: true,
    hooks: true,
    maxProfiles: 1,
    exports: false,
    prioritySupport: false,
  },
  basic: {
    name: 'Basic',
    price: 19,
    draftQuota: 30,
    styles: ['bold'],
    customColor: false,
    hooks: false,
    maxProfiles: 1,
    exports: false,
    prioritySupport: false,
  },
  plus: {
    name: 'Plus',
    price: 67,
    draftQuota: Infinity,
    styles: ['bold', 'minimal', 'electric'],
    customColor: true,
    hooks: true,
    maxProfiles: 1,
    exports: false,
    prioritySupport: false,
  },
  pro: {
    name: 'Pro',
    price: 199,
    draftQuota: Infinity,
    styles: ['bold', 'minimal', 'electric'],
    customColor: true,
    hooks: true,
    maxProfiles: 5,
    exports: true,
    prioritySupport: true,
  },
};

export const TRIAL_DAYS = 7;

/** Effective plan for a user row: an expired trial collapses to null (locked). */
export function effectivePlan(user) {
  if (!user.plan) return null;
  if (user.plan === 'trial') {
    if (!user.trial_ends_at || Date.now() > user.trial_ends_at) return null; // trial expired
  }
  return user.plan;
}

export function planConfig(user) {
  const key = effectivePlan(user);
  return key ? { key, ...PLANS[key] } : null;
}

export function trialDaysLeft(user) {
  if (user.plan !== 'trial' || !user.trial_ends_at) return 0;
  return Math.max(0, Math.ceil((user.trial_ends_at - Date.now()) / 86400000));
}
