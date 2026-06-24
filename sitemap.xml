/* ============================================================================
 * brand-api.js — Brandofme Brand Studio API (reference server)
 * Zero dependencies. Run:  node brand-api.js   (listens on PORT, default 8787)
 * Shares brand-engine.js with the chat interface, so results are identical.
 *
 * ENDPOINTS
 *   GET  /                      → human-readable usage + JSON
 *   GET  /api/brand/health      → { ok, version }
 *   POST /api/brand/generate    → body { input, options? }            → { brand }
 *   GET  /api/brand/generate    → ?input=...&tone=...&name=...        → { brand }
 *   POST /api/brand/refine      → body { brand, instruction }         → { brand }
 *
 * EXAMPLES
 *   curl -s localhost:8787/api/brand/generate -H 'content-type: application/json' \
 *        -d '{"input":"a calm skincare brand for new parents"}' | jq .brand.name
 *
 *   curl -s 'localhost:8787/api/brand/generate?input=luxury%20watch%20called%20Aurelius'
 *
 *   # refine: POST the brand you got back, plus an instruction
 *   curl -s localhost:8787/api/brand/refine -H 'content-type: application/json' \
 *        -d '{"brand": <BRAND_JSON>, "instruction":"make it warmer"}'
 *
 * RESPONSE SHAPE (brand)
 *   { name, monogram, archetype, tone, toneLabel, niche, tagline, bio,
 *     voice:{adjectives[],do,dont},
 *     palette:{primary,secondary,accent,ink,paper,onPrimary,onAccent},
 *     fonts:{display,body,displayStack,bodyStack,pairing},
 *     keywords[], hashtags[], meta }   // `meta` is required for /refine
 * ========================================================================== */
'use strict';
const http = require('http');
const url = require('url');
const Engine = require('../frontend/brand-engine.js'); // shared engine lives in frontend/

const PORT = process.env.PORT || 8787;
const MAX_BODY = 1024 * 64; // 64KB cap

function send(res, status, obj, isText) {
  const body = isText ? obj : JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': isText ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '', size = 0;
    req.on('data', c => { size += c.length; if (size > MAX_BODY) { reject(new Error('payload too large')); req.destroy(); } else data += c; });
    req.on('end', () => { if (!data) return resolve({}); try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('invalid JSON body')); } });
    req.on('error', reject);
  });
}

const HELP = [
  'Brandofme — Brand Studio API  (v' + Engine.version + ')',
  '',
  'POST /api/brand/generate   { "input": "a calm skincare brand" }            -> { brand }',
  'GET  /api/brand/generate?input=luxury%20watch%20called%20Aurelius          -> { brand }',
  'POST /api/brand/refine     { "brand": <brand>, "instruction": "warmer" }   -> { brand }',
  'GET  /api/brand/health                                                     -> { ok }',
  '',
  'Refine instructions: warmer, cooler, darker, lighter, bolder, softer,',
  'more minimal | luxury | tech | playful | organic | creative,',
  'rename to <name>, another name, surprise me.',
  '',
  'Tones: ' + Engine.TONES.join(', ')
].join('\n');

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname.replace(/\/+$/, '') || '/';

  if (req.method === 'OPTIONS') return send(res, 204, '', true);

  try {
    if (req.method === 'GET' && path === '/') return send(res, 200, HELP, true);
    if (path === '/api/brand/health') return send(res, 200, { ok: true, version: Engine.version });

    if (path === '/api/brand/generate') {
      let input, options = {};
      if (req.method === 'POST') { const b = await readBody(req); input = b.input; options = b.options || {}; }
      else { input = parsed.query.input; if (parsed.query.tone) options.tone = parsed.query.tone; if (parsed.query.name) options.name = parsed.query.name; if (parsed.query.niche) options.niche = parsed.query.niche; }
      if (input == null || String(input).trim() === '') return send(res, 400, { error: 'missing_input', message: 'Provide "input" — any text describing the brand.' });
      const brand = Engine.generate(String(input), options);
      return send(res, 200, { brand });
    }

    if (path === '/api/brand/refine') {
      if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed', message: 'Use POST.' });
      const b = await readBody(req);
      if (!b.brand || !b.brand.meta) return send(res, 400, { error: 'missing_brand', message: 'Provide the full "brand" object (including its meta) returned by /generate.' });
      if (!b.instruction) return send(res, 400, { error: 'missing_instruction', message: 'Provide an "instruction", e.g. "make it warmer".' });
      const refined = Engine.refine(b.brand, String(b.instruction));
      if (!refined) return send(res, 200, { brand: b.brand, recognized: false, message: 'Instruction not recognized — brand unchanged. Try: warmer, bolder, more minimal, rename to X.' });
      return send(res, 200, { brand: refined, recognized: true, note: refined._note || null });
    }

    return send(res, 404, { error: 'not_found', message: 'See GET / for usage.' });
  } catch (e) {
    return send(res, e.message && /JSON|large/.test(e.message) ? 400 : 500, { error: 'bad_request', message: e.message || 'error' });
  }
});

server.listen(PORT, () => {
  console.log('Brand Studio API → http://localhost:' + PORT);
  console.log('Engine v' + Engine.version + ' · tones: ' + Engine.TONES.join(', '));
  console.log('Try: curl -s localhost:' + PORT + "/api/brand/generate -H 'content-type: application/json' -d '{\"input\":\"a calm skincare brand\"}'");
});
