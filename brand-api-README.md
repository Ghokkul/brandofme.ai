/* Minimal in-memory fixed-window limiter. Good enough for one instance / dev.
   For production behind multiple instances, back this with Redis. */
const hits = new Map();
function rateLimit({ windowMs = 60000, max = 30 } = {}) {
  return (req, res, next) => {
    const key = (req.ip || 'ip') + ':' + req.path;
    const now = Date.now();
    let rec = hits.get(key);
    if (!rec || now > rec.reset) { rec = { count: 0, reset: now + windowMs }; hits.set(key, rec); }
    rec.count++;
    if (rec.count > max) {
      res.set('Retry-After', Math.ceil((rec.reset - now) / 1000));
      return res.status(429).json({ error: 'rate_limited', message: 'Too many requests — slow down a moment.' });
    }
    next();
  };
}
setInterval(() => { const now = Date.now(); for (const [k, v] of hits) if (now > v.reset) hits.delete(k); }, 120000).unref();
module.exports = { rateLimit };
