// src/middleware/security.js — rate limiting + headers, no external deps.
const buckets = new Map();

/** Sliding-window-ish limiter. Keyed per IP (or per token when present) per route. */
export function rateLimit({ windowMs = 60_000, max = 30 } = {}) {
  return (req, res, next) => {
    const who = req.headers.authorization || req.ip || 'anon';
    const k = `${who}:${req.baseUrl || req.path}`;
    const now = Date.now();
    let b = buckets.get(k);
    if (!b || now > b.reset) { b = { count: 0, reset: now + windowMs }; buckets.set(k, b); }
    b.count++;
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - b.count));
    if (b.count > max) {
      res.setHeader('Retry-After', Math.ceil((b.reset - now) / 1000));
      return res.status(429).json({ error: 'rate_limited', message: 'Too many requests — give it a moment.' });
    }
    next();
  };
}

setInterval(() => {
  const now = Date.now();
  for (const [k, b] of buckets) if (now > b.reset) buckets.delete(k);
}, 60_000).unref();

export function securityHeaders(_req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
}
