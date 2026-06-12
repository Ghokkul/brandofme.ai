// src/middleware/auth.js — JWT auth + plan/feature gating middleware.
import jwt from 'jsonwebtoken';
import { getUserById, ensureQuotaPeriod } from '../db.js';
import { planConfig } from '../plans.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export function signToken(user) {
  return jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '30d' });
}

/** Require a valid Bearer token; attaches req.user and req.plan (may be null if locked). */
export function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'auth_required' });
  try {
    const { sub } = jwt.verify(token, JWT_SECRET);
    const user = getUserById(sub);
    if (!user) return res.status(401).json({ error: 'auth_required' });
    ensureQuotaPeriod(user);
    req.user = user;
    req.plan = planConfig(user); // null => trial expired / no plan
    next();
  } catch {
    return res.status(401).json({ error: 'invalid_token' });
  }
}

/** Require any active plan (trial counts while it lasts). */
export function requireActivePlan(req, res, next) {
  if (!req.plan) {
    return res.status(402).json({
      error: 'plan_required',
      message: req.user.plan === 'trial'
        ? 'Your free trial has ended — pick a plan to keep going.'
        : 'Subscribe to a plan to use this feature.',
    });
  }
  next();
}

/** Require a boolean feature flag from the plan config, e.g. requireFeature('hooks'). */
export function requireFeature(flag, upgradeTo = 'plus') {
  return (req, res, next) => {
    if (!req.plan) return requireActivePlan(req, res, next);
    if (!req.plan[flag]) {
      return res.status(403).json({
        error: 'feature_locked',
        feature: flag,
        upgrade_to: upgradeTo,
        message: `This feature unlocks on ${upgradeTo === 'pro' ? 'Pro' : 'Plus'}.`,
      });
    }
    next();
  };
}
