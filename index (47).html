/* ============================================================================
 * brand-engine.js — Brandofme chat-to-brand engine
 * Deterministic: the same input always yields the same brand.
 * Runs in the browser (window.BrandEngine) and in Node (require/module.exports),
 * so the chat interface and the API server generate identical results.
 * ========================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BrandEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const VERSION = '1.1.0';

  /* ---------- deterministic helpers ---------- */
  function hashStr(s) { let h = 2166136261 >>> 0; s = String(s || ''); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function pick(arr, r) { return arr[Math.floor(r() * arr.length) % arr.length]; }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function titleCase(s) { return String(s || '').split(/\s+/).map(cap).join(' '); }

  /* ---------- color ---------- */
  function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x]; else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
    const to = v => ('0' + Math.round((v + m) * 255).toString(16)).slice(-2);
    return '#' + to(r) + to(g) + to(b);
  }
  function readable(hex) { // pick black/white text for a bg
    const n = parseInt(hex.slice(1), 16), r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? '#0F1217' : '#FFFFFF';
  }

  /* ---------- tone model ---------- */
  const TONES = {
    minimal:  { hues: [230, 222, 250], sat: 12, lit: 18, accentH: 246, accentS: 88, accentL: 60, secOff: 8,  secS: 16, secL: 22, paperL: 97, label: 'Minimal', archetype: 'The Minimalist' },
    luxury:   { hues: [345, 160, 42],  sat: 52, lit: 30, accentH: 42,  accentS: 62, accentL: 50, secOff: 12, secS: 38, secL: 20, paperL: 97, label: 'Luxury',  archetype: 'The Connoisseur' },
    tech:     { hues: [226, 262, 200], sat: 84, lit: 56, accentH: 188, accentS: 90, accentL: 58, secOff: -18,secS: 82, secL: 42, paperL: 98, label: 'Modern',  archetype: 'The Innovator' },
    playful:  { hues: [350, 45, 176],  sat: 84, lit: 60, accentH: 0,   accentS: 0,  accentL: 0,  secOff: 180,secS: 80, secL: 54, paperL: 98, label: 'Playful', archetype: 'The Entertainer', compAccent: true },
    bold:     { hues: [8, 22, 350],    sat: 86, lit: 50, accentH: 0,   accentS: 0,  accentL: 0,  secOff: -14,secS: 84, secL: 38, paperL: 98, label: 'Bold',    archetype: 'The Challenger', compAccent: true },
    organic:  { hues: [96, 128, 32],   sat: 44, lit: 40, accentH: 30,  accentS: 56, accentL: 52, secOff: 14, secS: 38, secL: 28, paperL: 96, label: 'Organic', archetype: 'The Nurturer' },
    creative: { hues: [286, 256, 318], sat: 80, lit: 58, accentH: 0,   accentS: 0,  accentL: 0,  secOff: 180,secS: 78, secL: 46, paperL: 98, label: 'Creative',archetype: 'The Creator', compAccent: true }
  };
  const TONE_KEYWORDS = {
    luxury: ['luxury', 'premium', 'elegant', 'gold', 'couture', 'boutique', 'high-end', 'fashion', 'jewel', 'exclusive', 'lux', 'sophisticated', 'fine', 'atelier'],
    tech: ['tech', 'ai', 'software', 'app', 'startup', 'saas', 'dev', 'code', 'data', 'cyber', 'digital', 'future', 'platform', 'cloud', 'web3', 'robot', 'smart'],
    playful: ['kids', 'fun', 'playful', 'game', 'candy', 'toy', 'party', 'quirky', 'cute', 'joy', 'happy', 'colorful', 'colourful', 'sweet', 'ice cream'],
    minimal: ['minimal', 'simple', 'clean', 'modern', 'studio', 'mono', 'zen', 'calm', 'essential', 'quiet', 'understated'],
    bold: ['bold', 'power', 'strong', 'gym', 'fitness', 'sport', 'energy', 'athletic', 'hustle', 'fierce', 'beast', 'fire', 'extreme', 'performance'],
    organic: ['organic', 'natural', 'wellness', 'eco', 'plant', 'vegan', 'green', 'earth', 'yoga', 'skincare', 'herbal', 'bio', 'sustainable', 'farm', 'tea', 'honey', 'botanical'],
    creative: ['art', 'design', 'creative', 'music', 'photo', 'film', 'craft', 'maker', 'paint', 'illustration', 'gallery', 'poetry', 'fashion-house']
  };

  const STOP = new Set(('a an the and or for to of in on with my our your me i we us this that it is are be make makes making create creating build building want wants need brand branding company business called named name about into turn turns please can you something like new help me give get start startup idea ideas thing things using use based around so just really very kind sort').split(/\s+/));

  /* ---------- fonts ---------- */
  const FONT_PAIRS = {
    minimal:  { display: 'Unbounded',       body: 'Instrument Sans', dStack: "'Unbounded',sans-serif",       bStack: "'Instrument Sans',system-ui,sans-serif", note: 'Geometric display + humanist body' },
    luxury:   { display: 'Playfair Display', body: 'Inter',          dStack: "'Playfair Display',serif",       bStack: "'Inter',system-ui,sans-serif",          note: 'High-contrast serif + clean grotesque' },
    tech:     { display: 'Space Grotesk',    body: 'Inter',          dStack: "'Space Grotesk',sans-serif",     bStack: "'Inter',system-ui,sans-serif",          note: 'Technical display + neutral body' },
    playful:  { display: 'Fredoka',          body: 'Nunito',         dStack: "'Fredoka',sans-serif",           bStack: "'Nunito',system-ui,sans-serif",         note: 'Rounded display + friendly body' },
    bold:     { display: 'Archivo Black',    body: 'Archivo',        dStack: "'Archivo Black',sans-serif",     bStack: "'Archivo',system-ui,sans-serif",        note: 'Heavy grotesque + tight body' },
    organic:  { display: 'Fraunces',         body: 'Instrument Sans', dStack: "'Fraunces',serif",              bStack: "'Instrument Sans',system-ui,sans-serif",note: 'Soft serif + warm humanist body' },
    creative: { display: 'Syne',             body: 'Inter',          dStack: "'Syne',sans-serif",              bStack: "'Inter',system-ui,sans-serif",          note: 'Expressive display + neutral body' }
  };
  function googleFontsHref() {
    const fams = ['Unbounded:wght@400;700;800', 'Instrument+Sans:wght@400;500;600', 'IBM+Plex+Mono:wght@400;500',
      'Playfair+Display:wght@600;800', 'Space+Grotesk:wght@500;700', 'Fredoka:wght@500;600;700',
      'Nunito:wght@400;700', 'Archivo:wght@400;600', 'Archivo+Black', 'Fraunces:opsz,wght@9..144,500;9..144,800', 'Syne:wght@600;800', 'Inter:wght@400;500;600'];
    return 'https://fonts.googleapis.com/css2?family=' + fams.join('&family=') + '&display=swap';
  }

  /* ---------- copy banks ---------- */
  const TAGLINES = {
    minimal:  ['{Niche}, distilled.', 'Less, but better.', 'The essential {niche}.', 'Quietly exceptional {niche}.', 'Everything you need. Nothing you don\u2019t.'],
    luxury:   ['{Niche}, elevated.', 'Crafted for the few.', 'Where {niche} becomes art.', 'Timeless {niche}.', 'The art of {niche}.'],
    tech:     ['{Niche}, reimagined.', 'Build the future of {niche}.', 'Smarter {niche}, shipped.', '{Niche} at the speed of now.', 'The {niche} layer for everyone.'],
    playful:  ['{Niche} made fun.', 'Seriously good {niche}.', 'Your daily dose of {niche}.', '{Niche} with a wink.', 'Big {niche} energy.'],
    bold:     ['No limits. Just {niche}.', '{Niche} that hits harder.', 'Own your {niche}.', 'Go all in on {niche}.', 'Built for the relentless.'],
    organic:  ['{Niche}, naturally.', 'Rooted in real {niche}.', 'Good for you. Good for the planet.', 'Honest {niche}.', 'Grown, not faked.'],
    creative: ['{Niche}, unboxed.', 'Make {niche} weird again.', 'Where ideas become {niche}.', 'Original {niche}, always.', 'For people who make things.']
  };
  const BENEFIT = {
    minimal: 'cut the noise and keep only what matters',
    luxury: 'make every detail feel considered and rare',
    tech: 'turn a hard problem into one simple tap',
    playful: 'make people smile while they get the job done',
    bold: 'help you show up loud and win',
    organic: 'do right by people and the planet',
    creative: 'turn raw ideas into things worth sharing'
  };
  const VOICE = {
    minimal: { adjectives: ['clear', 'calm', 'precise'], do: 'Say it in as few words as possible.', dont: 'Don\u2019t over-explain or hype.' },
    luxury: { adjectives: ['refined', 'assured', 'warm'], do: 'Speak with quiet confidence.', dont: 'Don\u2019t shout or discount.' },
    tech: { adjectives: ['sharp', 'optimistic', 'plain-spoken'], do: 'Lead with the benefit, not the jargon.', dont: 'Don\u2019t bury it in buzzwords.' },
    playful: { adjectives: ['cheeky', 'bright', 'human'], do: 'Have fun and use real talk.', dont: 'Don\u2019t take yourself too seriously.' },
    bold: { adjectives: ['direct', 'fearless', 'energetic'], do: 'Make a strong claim and back it.', dont: 'Don\u2019t hedge or apologize.' },
    organic: { adjectives: ['honest', 'grounded', 'kind'], do: 'Be transparent about how and why.', dont: 'Don\u2019t greenwash or exaggerate.' },
    creative: { adjectives: ['expressive', 'curious', 'original'], do: 'Take a point of view.', dont: 'Don\u2019t blend into the feed.' }
  };

  const NAME_SUFFIX = ['lab', 'studio', 'co', 'works', 'house', 'hq', 'ly', 'ify', 'io', 'kit', 'club', 'collective'];
  const NAME_PREFIX = ['Neo', 'Nova', 'Lumen', 'Ever', 'True', 'Wild', 'Hello', 'Studio', 'Maison', 'Soul'];
  const NAME_FALLBACK = ['Lumen', 'Vairo', 'Nori', 'Kova', 'Mira', 'Onda', 'Astra', 'Vela', 'Orin', 'Sable', 'Wren', 'Halo'];

  /* ---------- parsing ---------- */
  function detectTone(text, kws) {
    const t = ' ' + text.toLowerCase() + ' ';
    let best = 'minimal', bestScore = 0;
    for (const tone in TONE_KEYWORDS) {
      let score = 0;
      for (const w of TONE_KEYWORDS[tone]) if (t.indexOf(' ' + w) >= 0 || t.indexOf(w + ' ') >= 0) score += 2;
      for (const k of kws) if (TONE_KEYWORDS[tone].indexOf(k) >= 0) score += 1;
      if (score > bestScore) { bestScore = score; best = tone; }
    }
    return best;
  }
  function explicitName(text) {
    let m = text.match(/(?:called|named|name is|call it|name it)\s+["'\u201c]?([A-Za-z0-9][\w&'\-]{0,22})/i);
    if (m) return titleCase(m[1].replace(/[-_]/g, ' ')).replace(/\s+/g, '');
    m = text.match(/["'\u201c]([A-Za-z][\w &'\-]{1,22})["'\u201d]/);
    if (m) return titleCase(m[1]).replace(/\s{2,}/g, ' ').trim();
    return null;
  }
  function keywordsOf(text) {
    const words = text.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').split(/\s+/).filter(Boolean);
    const out = [];
    for (const w of words) if (w.length >= 3 && !STOP.has(w) && !/^\d+$/.test(w) && out.indexOf(w) < 0) out.push(w);
    return out;
  }
  function nicheWord(kws, tone) {
    const toneKws = TONE_KEYWORDS[tone] || [];
    const concrete = kws.find(w => toneKws.indexOf(w) < 0);
    if (concrete) return concrete;
    if (kws.length) return kws[kws.length - 1];      // all keywords were tone words → take the last (often the concrete noun)
    return tone === 'creative' ? 'ideas' : tone === 'tech' ? 'software' : 'work';
  }
  function synthName(kws, r) {
    const base = (kws[0] || pick(NAME_FALLBACK, r)).replace(/[^a-z]/gi, '');
    const strat = Math.floor(r() * 5);
    let nm;
    if (strat === 0) nm = cap(base) + cap(pick(NAME_SUFFIX, r));
    else if (strat === 1 && kws[1]) nm = cap(base.slice(0, Math.ceil(base.length / 2)) + kws[1].replace(/[^a-z]/gi, '').slice(0, 3));
    else if (strat === 2) nm = pick(NAME_PREFIX, r) + cap(base);
    else if (strat === 3) nm = cap(base) + pick(['o', 'a', 'i', 'u'], r);
    else nm = cap(base);
    nm = nm.replace(/[^A-Za-z]/g, '');
    if (nm.length < 3) nm = pick(NAME_FALLBACK, r);
    if (nm.length > 16) nm = nm.slice(0, 14);
    return nm;
  }
  function monogramOf(name) {
    const parts = String(name).trim().split(/\s+/);
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }

  /* ---------- compose a full brand from a meta descriptor ---------- */
  function compose(meta) {
    const T = TONES[meta.tone] || TONES.minimal;
    const r = mulberry32(meta.seed + meta.variant * 9176);
    const hueBase = T.hues[meta.variant % T.hues.length];
    const h = ((hueBase + (meta.seed % 22) - 11) + (meta.hAdj || 0) + 360) % 360;
    const s = clamp(T.sat + (meta.sAdj || 0) + Math.floor(r() * 8), 6, 100);
    const l = clamp(T.lit + (meta.lAdj || 0), 14, 72);

    const primary = hslToHex(h, s, l);
    const secondary = hslToHex(h + T.secOff, T.secS, T.secL + (meta.lAdj || 0) * 0.5);
    const accentHue = T.compAccent ? h + 180 : T.accentH;
    const accentS = T.accentS || clamp(s + 10, 40, 96);
    const accentL = T.accentL || clamp(l + 6, 30, 70);
    const accent = hslToHex(accentHue, accentS, accentL);
    const ink = hslToHex(h, 22, 12);
    const paper = hslToHex(h, 24, T.paperL);

    const fonts = FONT_PAIRS[meta.tone] || FONT_PAIRS.minimal;
    const niche = meta.niche || 'work';
    const Niche = cap(niche);
    const tagline = pick(TAGLINES[meta.tone] || TAGLINES.minimal, r).replace('{Niche}', Niche).replace('{niche}', niche);
    const voice = VOICE[meta.tone] || VOICE.minimal;
    const bio = meta.name + ' is a ' + voice.adjectives[0] + ', ' + (T.label.toLowerCase()) + ' ' + niche + ' brand built to ' + (BENEFIT[meta.tone] || BENEFIT.minimal) + '.';

    const tags = [];
    const seen = {};
    const addTag = w => { const c = String(w).replace(/[^a-z0-9]/gi, ''); if (!c) return; const tag = '#' + c.charAt(0).toUpperCase() + c.slice(1); const key = tag.toLowerCase(); if (!seen[key]) { seen[key] = 1; tags.push(tag); } };
    [meta.name].concat(meta.keywords.slice(0, 4)).forEach(addTag);
    addTag('brand'); addTag(cap(niche));

    return {
      version: VERSION,
      input: meta.input,
      name: meta.name,
      monogram: monogramOf(meta.name),
      archetype: T.archetype,
      tone: meta.tone,
      toneLabel: T.label,
      niche: niche,
      tagline: tagline,
      bio: bio,
      voice: { adjectives: voice.adjectives.slice(), do: voice.do, dont: voice.dont },
      palette: {
        primary: primary, secondary: secondary, accent: accent, ink: ink, paper: paper,
        onPrimary: readable(primary), onAccent: readable(accent)
      },
      fonts: { display: fonts.display, body: fonts.body, displayStack: fonts.dStack, bodyStack: fonts.bStack, pairing: fonts.note },
      keywords: meta.keywords.slice(0, 8),
      hashtags: tags.slice(0, 6),
      meta: meta            // carried so refine() can recompute deterministically
    };
  }

  /* ---------- public: generate ---------- */
  function generate(input, options) {
    options = options || {};
    input = String(input == null ? '' : input).trim();
    const safe = input || 'a modern personal brand';
    const seed = hashStr(safe.toLowerCase()) >>> 0;
    const r = mulberry32(seed);
    const kws = keywordsOf(safe);
    const tone = options.tone && TONES[options.tone] ? options.tone : detectTone(safe, kws);
    const name = (options.name && titleCase(options.name)) || explicitName(safe) || synthName(kws, r);
    const niche = options.niche || nicheWord(kws, tone);
    const meta = { input: input, seed: seed, variant: options.variant || 0, tone: tone, name: name, niche: niche, keywords: kws, hAdj: 0, sAdj: 0, lAdj: 0, nameLocked: !!(options.name || explicitName(safe)) };
    return compose(meta);
  }

  /* ---------- public: refine (chat instructions) ---------- */
  function refine(brand, instruction) {
    const meta = Object.assign({}, (brand && brand.meta) || {});
    const t = String(instruction || '').toLowerCase();
    let note = 'Updated.';

    const curHue = () => { const T = TONES[meta.tone] || TONES.minimal; const hueBase = T.hues[(meta.variant || 0) % T.hues.length]; return ((((hueBase + (meta.seed % 22) - 11) + (meta.hAdj || 0)) % 360) + 360) % 360; };
    const towardHue = (anchor, step) => { const d = ((anchor - curHue() + 540) % 360) - 180; meta.hAdj = (meta.hAdj || 0) + (d < 0 ? -1 : 1) * Math.min(Math.abs(d), step); };
    const setTone = (tone, label) => { if (TONES[tone]) { meta.tone = tone; meta.hAdj = meta.sAdj = meta.lAdj = 0; note = 'Switched to a ' + (label || tone) + ' direction.'; } };

    if (/\b(rename|different name|another name|new name|change the name|call it|name it)\b/.test(t)) {
      let m = t.match(/\bto\s+["'\u201c]?([a-z0-9][\w'\-]{0,22})/i) || t.match(/\b(?:it|name)\s+["'\u201c]?([a-z0-9][\w'\-]{0,22})/i);
      const STOPNAME = ['to', 'it', 'a', 'an', 'the', 'my', 'name', 'this'];
      if (m && STOPNAME.indexOf(m[1].toLowerCase()) < 0) { meta.name = titleCase(m[1]); meta.nameLocked = true; note = 'Renamed to ' + meta.name + '.'; }
      else { meta.variant = (meta.variant || 0) + 1; meta.nameLocked = false; const nm = synthName(meta.keywords, mulberry32(meta.seed + meta.variant * 9176)); meta.name = nm; note = 'Fresh name: ' + nm + '.'; }
    }
    else if (/\bwarmer|warm\b/.test(t)) { towardHue(32, 45); meta.sAdj = (meta.sAdj || 0) + 4; note = 'Warmed up the palette.'; }
    else if (/\bcooler|cool\b/.test(t)) { towardHue(212, 45); note = 'Cooled the palette down.'; }
    else if (/\bdarker|deeper|moody\b/.test(t)) { meta.lAdj = (meta.lAdj || 0) - 12; note = 'Took it darker.'; }
    else if (/\blighter|brighter|airy\b/.test(t)) { meta.lAdj = (meta.lAdj || 0) + 12; note = 'Lightened things up.'; }
    else if (/\bbolder|punchier|louder|stronger\b/.test(t)) { meta.sAdj = (meta.sAdj || 0) + 16; meta.tone = (meta.tone === 'minimal' || meta.tone === 'luxury') ? 'bold' : meta.tone; note = 'Cranked up the contrast and weight.'; }
    else if (/\bsofter|subtle|muted|quieter\b/.test(t)) { meta.sAdj = (meta.sAdj || 0) - 18; note = 'Softened the palette.'; }
    else if (/\bminimal|simpler|clean\b/.test(t)) setTone('minimal', 'minimal');
    else if (/\bluxur|elegant|premium|high.?end\b/.test(t)) setTone('luxury', 'luxury');
    else if (/\btech|modern|futur\b/.test(t)) setTone('tech', 'modern');
    else if (/\bplayful|fun|friendly\b/.test(t)) setTone('playful', 'playful');
    else if (/\borganic|natural|eco|earthy\b/.test(t)) setTone('organic', 'organic');
    else if (/\bcreative|artsy|expressive\b/.test(t)) setTone('creative', 'creative');
    else if (/\b(another|different|regenerate|again|new version|surprise|remix)\b/.test(t)) { meta.variant = (meta.variant || 0) + 1; meta.hAdj = meta.sAdj = meta.lAdj = 0; note = 'Here\u2019s another take.'; if (!meta.nameLocked) { meta.name = synthName(meta.keywords, mulberry32(meta.seed + meta.variant * 9176)); } }
    else { return null; } // not a recognized refine instruction

    return tagNote(compose(meta), note);
  }
  function tagNote(brand, note) { brand._note = note; return brand; }

  /* ---------- export helpers ---------- */
  function toCSSVars(brand) {
    const p = brand.palette;
    return ':root{\n  --brand-primary:' + p.primary + ';\n  --brand-secondary:' + p.secondary + ';\n  --brand-accent:' + p.accent + ';\n  --brand-ink:' + p.ink + ';\n  --brand-paper:' + p.paper + ';\n  --brand-display:' + brand.fonts.displayStack + ';\n  --brand-body:' + brand.fonts.bodyStack + ';\n}';
  }
  function toBrief(brand) {
    const p = brand.palette;
    return '# ' + brand.name + '\n\n**' + brand.tagline + '**\n\n' + brand.bio + '\n\n' +
      '- **Archetype:** ' + brand.archetype + ' (' + brand.toneLabel + ')\n' +
      '- **Niche:** ' + brand.niche + '\n' +
      '- **Palette:** primary ' + p.primary + ' · secondary ' + p.secondary + ' · accent ' + p.accent + ' · ink ' + p.ink + ' · paper ' + p.paper + '\n' +
      '- **Type:** ' + brand.fonts.display + ' / ' + brand.fonts.body + ' — ' + brand.fonts.pairing + '\n' +
      '- **Voice:** ' + brand.voice.adjectives.join(', ') + '. ' + brand.voice.do + ' ' + brand.voice.dont + '\n' +
      '- **Tags:** ' + brand.hashtags.join(' ') + '\n';
  }

  /* ---------- conversation surface: respond() ----------
     The high-level API the Conjure chat defers to. It ONLY claims brand
     creation + refinement (returns { handled:true, ... }); for anything else
     it returns { handled:false } so the chat keeps its own product Q&A.
     `session` is a persistent object the caller owns: { brand, ctx }. */
  function slugify(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32) || 'me'; }

  function paletteCard(brand) {
    const p = brand.palette;
    return { label: brand.toneLabel + ' \u00B7 ' + brand.name, colors: [
      { hex: p.primary, name: 'Primary' }, { hex: p.accent, name: 'Accent' },
      { hex: p.secondary, name: 'Secondary' }, { hex: p.paper, name: 'Paper' }, { hex: p.ink, name: 'Ink' }
    ] };
  }
  function kitReply(brand, lead) {
    const p = brand.palette, b = brand;
    return (lead ? lead + '\n\n' : '') +
      '**' + b.name + '**  \u00B7  ' + b.monogram + '  \u00B7  _' + b.toneLabel + '_\n' +
      '\u201C' + b.tagline + '\u201D\n\n' +
      b.bio + '\n\n' +
      '- **Palette** \u2014 ' + [p.primary, p.accent, p.secondary, p.paper, p.ink].join('  ') + '\n' +
      '- **Type** \u2014 ' + b.fonts.display + ' / ' + b.fonts.body + '  (' + b.fonts.pairing + ')\n' +
      '- **Voice** \u2014 ' + b.voice.adjectives.join(', ') + '. ' + b.voice.do + '\n' +
      '- **Tags** \u2014 ' + b.hashtags.join(' ') + '\n\n' +
      'Now shape it just by chatting \u2014 try *warmer*, *bolder*, *make it luxury*, or *new name*.';
  }

  const _MAKE = /\b(?:make|build|create|generate|conjure|design|whip up|come up with|give me|i\s*need|i\s*want)\b[^.!?]*\b(?:brand|identity|kit)\b|\bturn\s+.+?\s+into\s+a\s+brand\b|\bmake\s+a\s+brand\b|\bbrand\s+(?:me|of|around|for\s+me)\b/i;
  const _REFINE = /\b(?:warmer|cooler|darker|deeper|moody|lighter|brighter|airy|bolder|punchier|louder|stronger|softer|subtle|muted|quieter|minimal|simpler|cleaner|luxur\w*|elegant|premium|high.?end|tech|modern|futur\w*|playful|fun|friendly|organic|natural|eco|earthy|creative|artsy|expressive|rename|new\s+name|another\s+name|different\s+name|change\s+the\s+name|call\s+it|name\s+it|regenerate|another|again|new\s+version|surprise|remix)\b/i;
  const _RESET = /\b(?:start over|start again|reset|clear (?:it|this)|forget (?:it|that)|from scratch)\b/i;

  function respond(session, message) {
    session = session || {};
    const raw = String(message || '').trim();
    if (!raw) return { handled: false };
    const low = raw.toLowerCase();
    const ctx = session.ctx || {};
    const hasBrand = !!(session.brand && session.brand.meta);

    if (hasBrand && _RESET.test(low)) {
      session.brand = null;
      const who = ctx.name || 'your name';
      return { handled: true, kind: 'text', reply: '\u2728 Cleared. Tell me what to build next \u2014 try *make a brand of ' + who + '* or describe a vibe.',
        chips: ['Make a brand of ' + who, 'A calm wellness brand', 'A bold fitness brand'] };
    }

    // refine the current brand
    if (hasBrand && _REFINE.test(low) && !_MAKE.test(low)) {
      const refined = refine(session.brand, raw);
      if (refined) {
        session.brand = refined;
        return { handled: true, kind: 'text', reply: kitReply(refined, '\u2728 ' + (refined._note || 'Updated.')),
          chips: ['Warmer', 'Bolder', 'New name', 'Make it luxury', 'Start over'],
          palettes: [paletteCard(refined)], brand: refined };
      }
    }

    // generate a new brand
    let trigger = _MAKE.test(low), nameHint = null, m;
    if ((m = raw.match(/\bbrand\s+(?:of|for|around)\s+([A-Za-z][\w'\- ]{1,30})/i))) { nameHint = m[1].trim().split(/\s+\b(?:for|to|with|that|who|in|on|as|and|brand|business|please)\b/i)[0].trim().split(/\s+/).slice(0, 3).join(' '); trigger = true; }
    if ((m = raw.match(/\bturn\s+(.+?)\s+into\s+a\s+brand\b/i))) { const who = m[1].replace(/\bmy\s+name\b/i, '').replace(/^\s*my\s+/i, '').trim(); if (who) nameHint = who; trigger = true; }

    if (trigger) {
      const opts = {};
      const nm = nameHint || ctx.name;
      if (nm && !/^(?:me|you|your name)$/i.test(nm)) opts.name = nm;
      if (ctx.niche) opts.niche = ctx.niche;
      const brand = generate(raw, opts);
      session.brand = brand;
      return { handled: true, kind: 'text', reply: kitReply(brand, '\u2728 Conjured a brand from that:'),
        chips: ['Warmer', 'Bolder', 'Make it luxury', 'New name', 'Start over'],
        palettes: [paletteCard(brand)], brand: brand, cta: true };
    }

    return { handled: false };
  }

  /* map a full brand to the chat's lightweight saved-profile shape */
  function toProfile(brand) {
    return { name: brand.name, tagline: brand.tagline, niche: brand.niche, color: brand.palette.primary, slug: slugify(brand.name) };
  }

  return { version: VERSION, generate, refine, respond, toProfile, slugify, googleFontsHref, toCSSVars, toBrief, TONES: Object.keys(TONES) };
});
