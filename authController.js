const Engine = require('../lib/brand-engine');
const fail = (s, c, m) => { const e = new Error(m); e.status = s; e.code = c; e.expose = true; return e; };

async function generate(req, res) {
  const input = req.method === 'GET' ? req.query.input : req.body.input;
  if (!input || !String(input).trim()) throw fail(400, 'missing_input', 'Provide "input" — any text describing the brand.');
  const options = (req.body && req.body.options) || {};
  if (req.query.tone) options.tone = req.query.tone;
  res.json({ brand: Engine.generate(String(input), options) });
}

async function refine(req, res) {
  const { brand, instruction } = req.body || {};
  if (!brand || !brand.meta) throw fail(400, 'missing_brand', 'Provide the full "brand" object (including its meta) from /generate.');
  if (!instruction) throw fail(400, 'missing_instruction', 'Provide an "instruction", e.g. "make it warmer".');
  const out = Engine.refine(brand, String(instruction));
  if (!out) return res.json({ brand, recognized: false, message: 'Instruction not recognized — brand unchanged.' });
  res.json({ brand: out, recognized: true, note: out._note || null });
}

/* Back-compat with the in-app brand chat: returns a generated brand for a message. */
async function chat(req, res) {
  const msg = String((req.body && req.body.message) || '').trim();
  if (!msg) throw fail(400, 'missing_input', 'Provide a "message".');
  res.json({ kind: 'brand', reply: 'Here it is.', brand: Engine.generate(msg) });
}

module.exports = { generate, refine, chat };
