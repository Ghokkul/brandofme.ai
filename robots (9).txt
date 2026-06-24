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

  const _MAKE = /\b(?:make|build|create|generate|conjure|design|whip up|come up with|give me|i\s*need|i\s*want)\b[^.!?]*\b(?:brand|identity|kit)\b|\bturn\s+.+?\s+into\s+a\s+brand\b(?!\s+story)|\bmake\s+a\s+brand\b|\bbrand\s+(?:me|of|around|for\s+me)\b/i;
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

    /* ── Q&A FIRST — a question shouldn't be hijacked by the refine/make regexes.
       Heuristic: if the message ends with "?" OR starts with an interrogative
       (what / how / why / when / where / who / is / are / can / could / should /
       does / do / am I / will / show / explain / list / examples), it's a question
       — try the answer layer before refine/generate. */
    const isQuestion = /\?$/.test(raw) ||
      /^(what|how|why|when|where|who|whose|which|is\s|are\s|am\s+i|can\s|could\s|should\s|would\s|will\s|does\s|do\s|did\s|show|tell|explain|list|give\s+me|help|examples?\b|hi\b|hey\b|hello\b|yo\b|thanks?\b|thank you|are you|who are you)/i.test(raw);
    if (isQuestion) {
      const earlyAns = answer(session, raw);
      if (earlyAns.handled) return earlyAns;
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
    if ((m = raw.match(/\bturn\s+(.+?)\s+into\s+a\s+brand\b(?!\s+story)/i))) { const who = m[1].replace(/\bmy\s+name\b/i, '').replace(/^\s*my\s+/i, '').trim(); if (who) nameHint = who; trigger = true; }

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

    // Final attempt — the answer layer (catches anything that wasn't obviously a question)
    const ans = answer(session, raw);
    if (ans.handled) return ans;

    return { handled: false };
  }

  /* ============================================================
   * Q&A LAYER — answer any brand-related question, deterministically.
   * Uses the current brand (session.brand) when context-aware,
   * falls back to general brand knowledge when there isn't one.
   * ============================================================ */

  /* WCAG-style contrast ratio between two hex colors */
  function _lum(hex) {
    const n = parseInt(String(hex).replace('#', ''), 16);
    const sR = ((n >> 16) & 255) / 255, sG = ((n >> 8) & 255) / 255, sB = (n & 255) / 255;
    const f = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * f(sR) + 0.7152 * f(sG) + 0.0722 * f(sB);
  }
  function contrastRatio(a, b) {
    const la = _lum(a), lb = _lum(b);
    const hi = Math.max(la, lb), lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  /* example brands per tone — recognizable real-world anchors */
  const EXAMPLE_BRANDS = {
    minimal:  ['Apple', 'Muji', 'Aesop', 'Linear', 'Notion'],
    luxury:   ['Hermès', 'Tiffany & Co.', 'Rolex', 'Louis Vuitton', 'The Row'],
    tech:     ['Stripe', 'Linear', 'Vercel', 'OpenAI', 'Anthropic'],
    playful:  ['Mailchimp', 'Duolingo', 'Slack', 'Headspace', 'Oatly'],
    bold:     ['Nike', 'Red Bull', 'Liquid Death', 'GymShark', 'Supreme'],
    organic:  ['Patagonia', 'Lush', 'Allbirds', 'Innocent', 'Tony\u2019s Chocolonely'],
    creative: ['Pentagram', 'IDEO', 'A24', 'Figma', 'Are.na']
  };

  /* friendly per-tone color advice */
  const COLOR_ADVICE = {
    minimal:  'Stick to a near-black ink, a paper-white background, and ONE saturated accent. Less is the point. Try #0F1217 ink, #F6F7F5 paper, #2B3CFF accent.',
    luxury:  'Use deep ink + warm metallic accent. Cream paper. No fluorescent anything. Think #1A0F08 ink, #F5EFE6 paper, #B89968 gold accent.',
    tech:     'Cool blues and electric cyans on near-white. Keep saturation high in the accent, low everywhere else. Try #0E1217 ink, #FFFFFF paper, #2B6BFF or #00C2D8 accent.',
    playful:  'Bright, complementary pairs. A hot pink with a sky blue, or a sun yellow with a mint. The wrong-on-purpose combo IS the brand. Avoid muddy mid-tones.',
    bold:     'High contrast. Red, orange or near-black, on white. The color should slap. Try #E63946 or #FF4400 on #FFFFFF.',
    organic:  'Earth tones. Greens, terracottas, warm sands. Avoid neons and pure black — use a dark green or chocolate-brown for ink. Try #2A4A2A ink, #F8F4ED paper, #C89163 accent.',
    creative: 'Two unexpected colors fighting each other. Magenta and teal, mustard and royal. Pick a combo people remember.'
  };

  /* per-tone font advice (used when no brand exists yet) */
  const FONT_ADVICE = {
    minimal:  'Unbounded (geometric display) + Instrument Sans (humanist body). Or swap the display for Inter Tight if Unbounded feels too loud.',
    luxury:   'A high-contrast serif like Playfair Display, Fraunces, or Tiempos, paired with a clean grotesque like Inter or Söhne.',
    tech:     'Space Grotesk, JetBrains Mono, or IBM Plex Sans for headlines + Inter for body. Add a mono for code/data, not body text.',
    playful:  'Fredoka, Nunito, or Quicksand for display + a friendly humanist sans for body. Round terminals = friendly feel.',
    bold:     'Archivo Black, Bebas Neue, or Anton — heavy, condensed, takes no prisoners. Pair with a tight body sans.',
    organic:  'Fraunces or Recoleta (warm serif) + Instrument Sans for body. Aim for the feel of a beautifully-set book.',
    creative: 'Syne, Migra, or a variable display font for headlines + Inter or Söhne for body. Save the experimentation for the display.'
  };

  /* brief archetype explanations */
  const ARCHETYPE_EXPLAIN = {
    'The Minimalist': 'Cares about what to leave out. Believes in restraint and signal-over-noise. Quiet confidence beats hype.',
    'The Connoisseur': 'Cares about craft, taste, and the right detail. Believes in fewer, better things and the luxury of patience.',
    'The Innovator': 'Cares about what comes next. Believes a hard problem is a design opportunity. Future-tense, plain-spoken.',
    'The Entertainer': 'Cares about delight. Believes work and joy aren\'t opposites. Lives in the unexpected smile.',
    'The Challenger': 'Cares about the fight. Believes comfort kills. Strong claims, no apology, all conviction.',
    'The Nurturer': 'Cares about people and the planet. Believes good and honest beats clever. Grows slow on purpose.',
    'The Creator': 'Cares about expression. Believes original work matters more than safe work. Always making.'
  };

  /* tiny tone guesser for general questions like "best color for a fitness brand" */
  function guessTone(text) {
    const low = String(text || '').toLowerCase();
    let best = null, score = 0;
    for (const t in TONE_KEYWORDS) {
      let s = 0;
      for (const k of TONE_KEYWORDS[t]) if (low.indexOf(k) >= 0) s++;
      if (s > score) { score = s; best = t; }
    }
    return best;
  }

  /* small helper to format a hex chip inline */
  function _chip(hex) { return '<code style="font-family:var(--mono,monospace);font-weight:600">' + hex + '</code>'; }

  /* ============================================================
   * answer(session, raw)  →  { handled, kind, reply, chips?, action? }
   * Pattern-matches the user's question into one of ~20 categories.
   * ============================================================ */
  function answer(session, raw) {
    session = session || {};
    const low = String(raw || '').trim().toLowerCase();
    if (!low) return { handled: false };
    const b = session.brand;

    /* ---------- greetings & small talk ---------- */
    if (/^(hi|hey|hello|yo|sup|howdy|hiya|gday)\b[!.?\s]*$/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'Hey \u2014 I\u2019m your brand studio. I can <b>conjure a brand</b> from a single sentence, or answer pretty much anything about branding (colors, fonts, tone, taglines, names). What are we doing?',
        chips: ['Make a brand of me', 'Best font for a tech startup', 'What is a brand archetype?'] };
    }
    if (/^(thanks?|thank you|ty|appreciate it|cheers|nice|great|cool|awesome|love it|love this)\b[!.?\s]*$/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'Anytime. Anything else you want me to look at?',
        chips: b ? ['Make it bolder', 'Another tagline', 'Explain my voice'] : ['Make a brand of me', 'Best color for wellness?'] };
    }
    if (/^(bye|goodbye|see ya|later|done)\b/i.test(low)) {
      return { handled: true, kind: 'text', reply: 'Good luck out there. Your brand is saved in this browser \u2014 come back anytime.' };
    }

    /* ---------- who/what are you ---------- */
    if (/(who|what)\s+are\s+you|are\s+you\s+(ai|a\s+bot|chatgpt|claude|gpt|human|real)|is\s+this\s+(ai|chatgpt|gpt)/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'I\u2019m the <b>Brandofme Brand Studio</b>. I run on a deterministic engine \u2014 not a language model \u2014 which means the same input always gives the same brand, no API keys, no tokens, no waiting. I can build complete brand identities and answer brand questions. Try asking me anything.' };
    }

    /* ---------- help / capabilities ---------- */
    if (/^(help|what can you do|what do you do|capabilities|commands|how does this work)\b/i.test(low) || low === '?') {
      return { handled: true, kind: 'text',
        reply: '<b>I can do three things:</b><br>1. <b>Build</b> \u2014 "make a brand of [anything]" \u2192 full identity (name, palette, fonts, tone, voice, tagline).<br>2. <b>Refine</b> \u2014 say "warmer", "bolder", "make it luxury", "new name", "another tagline".<br>3. <b>Answer</b> \u2014 ask me anything about branding, colors, fonts, naming, taglines, archetypes.',
        chips: ['Make a brand of me', 'What is a brand archetype?', 'Best font for tech?', 'How do I write a tagline?'] };
    }

    /* ============================================================
     * QUESTIONS ABOUT THE *CURRENT* BRAND (require session.brand)
     * ============================================================ */
    if (b) {
      /* color / palette */
      if (/(what|show|tell)[^?]*\b(color|colour|palette|hex|shade)/i.test(low) || /^(my|the)\s+(color|colour|palette)/i.test(low) || /\bwhat[\u2019']?s my (color|colour|palette)/i.test(low)) {
        const p = b.palette;
        return { handled: true, kind: 'text',
          reply: 'Your palette: ' + _chip(p.primary) + ' primary \u00b7 ' + _chip(p.secondary) + ' secondary \u00b7 ' + _chip(p.accent) + ' accent \u00b7 ' + _chip(p.ink) + ' ink \u00b7 ' + _chip(p.paper) + ' paper.<br>It reads <b>' + b.toneLabel.toLowerCase() + '</b> \u2014 ' + (COLOR_ADVICE[b.tone] || '').split('.')[0].toLowerCase() + '.',
          chips: ['Warmer', 'Cooler', 'Darker', 'Lighter'] };
      }

      /* tagline */
      if (/(tagline|slogan|catchphrase|strapline)/i.test(low)) {
        return { handled: true, kind: 'text',
          reply: 'Your tagline: <b>\u201c' + b.tagline + '\u201d</b><br>Want another? Hit the chip.',
          chips: ['Another tagline', 'Make it shorter', 'Make it bolder'] };
      }

      /* tone */
      if (/(what|show|tell)[^?]*\btone\b/i.test(low) || /^(my|the)\s+tone/i.test(low) || /what[\u2019']?s my tone/i.test(low)) {
        return { handled: true, kind: 'text',
          reply: 'Your tone is <b>' + b.toneLabel + '</b> \u2014 archetype: <b>' + b.archetype + '</b>. Voice adjectives: <em>' + b.voice.adjectives.join(', ') + '</em>.<br><br><b>Do:</b> ' + b.voice.do + '<br><b>Don\u2019t:</b> ' + b.voice.dont,
          chips: ['Make it bolder', 'Make it minimal', 'Make it luxury', 'Make it playful'] };
      }

      /* archetype  — MUST be checked before fonts (because "archetype" contains "type").
         Don't fire on "what is (a) brand archetype" — that's the general-knowledge question. */
      if (/archetype|personality|character/i.test(low) && !/what\s+(is|are)\s+(a\s+|an\s+)?(brand\s+)?archetype/i.test(low)) {
        const ex = ARCHETYPE_EXPLAIN[b.archetype] || '';
        return { handled: true, kind: 'text',
          reply: 'Your archetype: <b>' + b.archetype + '</b>.<br>' + ex + (ex ? '<br><br>' : '') + 'It maps to the <b>' + b.toneLabel + '</b> tone, which is why your palette and fonts feel the way they do.' };
      }

      /* fonts */
      if (/\b(fonts?|typefaces?|typography)\b/i.test(low) || /\btype\b(?!\s*(?:of|with))/i.test(low)) {
        return { handled: true, kind: 'text',
          reply: 'Your typography: <b>' + b.fonts.display + '</b> for headlines, paired with <b>' + b.fonts.body + '</b> for body. <em>' + (b.fonts.pairing || '') + '</em>.',
          chips: ['Copy CSS variables', 'Show full brief'] };
      }

      /* voice / how to write */
      if (/\b(voice|how (should|do) i|writing style|how to write|caption|copy|content)\b/i.test(low)) {
        return { handled: true, kind: 'text',
          reply: 'Your voice is <em>' + b.voice.adjectives.join(', ') + '</em>.<br><br><b>Do:</b> ' + b.voice.do + '<br><b>Don\u2019t:</b> ' + b.voice.dont + '<br><br>When you\u2019re drafting a post, ask: would a <em>' + b.voice.adjectives[0] + '</em> ' + (b.niche || 'brand') + ' say this? If no, tighten it.' };
      }

      /* hashtags */
      if (/hashtag|#\b|tags?\b/i.test(low)) {
        return { handled: true, kind: 'text', reply: 'Your hashtag set: ' + b.hashtags.map(h => '<b>' + h + '</b>').join(' \u00b7 ') };
      }

      /* bio */
      if (/\b(bio|blurb|brand description)\b/i.test(low) || /(what[\u2019']?s|show me|tell me) (the|my) (intro|description|about)/i.test(low)) {
        return { handled: true, kind: 'text', reply: 'Your bio: \u201c' + b.bio + '\u201d' };
      }

      /* niche */
      if (/\b(niche|industry|category|space|sector|vertical)\b/i.test(low)) {
        return { handled: true, kind: 'text', reply: 'Your brand sits in <b>' + b.niche + '</b>. Tone keeps it ' + b.toneLabel.toLowerCase() + ' \u2014 a ' + b.voice.adjectives[0] + ' ' + b.niche + ' brand.' };
      }

      /* monogram / logo */
      if (/\b(monogram|logo|symbol|icon|mark|avatar)\b/i.test(low)) {
        return { handled: true, kind: 'text',
          reply: 'Your monogram is <b>' + b.monogram + '</b>. Drop it into a rounded ' + _chip(b.palette.primary) + ' square with ' + _chip(b.palette.onPrimary) + ' type for an instant avatar. For a wordmark, set the full name in <b>' + b.fonts.display + '</b>, tight letter-spacing, all caps optional.' };
      }

      /* accessibility / contrast */
      if (/(accessib|contrast|readab|wcag|aa\b|ada\b)/i.test(low)) {
        const r = contrastRatio(b.palette.primary, b.palette.paper);
        const r2 = contrastRatio(b.palette.ink, b.palette.paper);
        const verdict = r >= 4.5 ? '\u2713 passes WCAG AA on body text' : r >= 3 ? '\u26a0 large-text only' : '\u2717 too low for body text \u2014 use ink color for body, save the accent for buttons';
        return { handled: true, kind: 'text',
          reply: '<b>Contrast on paper background:</b><br>\u2022 Primary ' + _chip(b.palette.primary) + ': <b>' + r.toFixed(2) + ':1</b> \u2014 ' + verdict + '<br>\u2022 Ink ' + _chip(b.palette.ink) + ': <b>' + r2.toFixed(2) + ':1</b> \u2014 use this for body copy.' };
      }

      /* "examples like mine" / "similar brands"
         — but NOT when the user explicitly names a different tone, in which case
         the general examples-of-{tone} handler below should answer instead. */
      if (/(example|simil|like\s+my|brands\s+like|reference|inspo|inspiration)/i.test(low) &&
          !/\b(minimal|luxury|tech|playful|bold|organic|creative)\b/i.test(low)) {
        const ex = EXAMPLE_BRANDS[b.tone] || [];
        return { handled: true, kind: 'text',
          reply: 'Brands in the same tonal neighborhood as yours (<b>' + b.toneLabel + '</b>): ' + ex.map(e => '<b>' + e + '</b>').join(', ') + '. Study how they handle whitespace, color and language \u2014 not what they sell.' };
      }

      /* copy actions */
      if (/(css|variables|tokens|design tokens)/i.test(low)) {
        return { handled: true, kind: 'action', action: 'copyCSS', reply: '\u2728 CSS variables copied. Paste into your :root.' };
      }
      if (/(brief|brand book|guidelines|style guide|brand brief)/i.test(low)) {
        return { handled: true, kind: 'action', action: 'copyBrief', reply: '\u2728 Brand brief copied to your clipboard.' };
      }
      if (/(html|snippet|embed|code)/i.test(low)) {
        return { handled: true, kind: 'action', action: 'copyHTML', reply: '\u2728 Sample HTML snippet copied.' };
      }
    }

    /* ============================================================
     * GENERAL BRAND KNOWLEDGE (no current brand needed)
     * ============================================================ */
    /* best color for X */
    if (/(best|good|right|nice)\s+(color|colour|palette)/i.test(low) || /what\s+(color|colour|palette)\s+(for|should|works)/i.test(low) || /^(color|colour)s?\s+for/i.test(low)) {
      const guess = guessTone(low) || 'minimal';
      return { handled: true, kind: 'text',
        reply: 'For a <b>' + guess + '</b> brand: ' + COLOR_ADVICE[guess] + ' (Want me to actually build one? Just say "make a ' + guess + ' brand of [whatever]".)',
        chips: ['Make a ' + guess + ' brand', 'Best font for ' + guess + '?'] };
    }

    /* best font for X */
    if (/(best|good|right|nice)\s+(font|typeface|type)/i.test(low) || /what\s+(font|typeface)\s+(for|should|works)/i.test(low) || /^font\s+for/i.test(low)) {
      const guess = guessTone(low) || 'minimal';
      return { handled: true, kind: 'text',
        reply: 'For a <b>' + guess + '</b> brand: ' + FONT_ADVICE[guess],
        chips: ['Make a ' + guess + ' brand', 'Best color for ' + guess + '?'] };
    }

    /* what is an archetype */
    if (/what\s+(is|are)\s+(an?\s+)?(brand\s+)?archetype/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'A <b>brand archetype</b> is a personality template that gives your brand a recognizable character. I work with seven: <em>The Minimalist, The Connoisseur, The Innovator, The Entertainer, The Challenger, The Nurturer, The Creator.</em> Each maps to a tone (minimal, luxury, tech, playful, bold, organic, creative) which then drives the palette, fonts and voice.',
        chips: ['Make a brand of me', 'What is brand tone?'] };
    }

    /* what is tone */
    if (/what\s+(is|are)\s+(brand\s+)?tone\b|what does tone mean/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'Tone is the <b>personality your brand projects</b> \u2014 calm vs loud, premium vs friendly, technical vs playful. It governs everything: colors, fonts, the words you use, even the punctuation. My seven tones are <b>minimal, luxury, tech, playful, bold, organic, creative</b>.' };
    }

    /* what is a brand / what is branding */
    if (/^what\s+is\s+(a\s+)?brand(ing)?\??$/i.test(low) || /define\s+brand(ing)?/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'A <b>brand</b> is the gap between what you say you are and what people actually feel about you. The job of <b>branding</b> is to close that gap \u2014 through name, voice, design, and consistency. I build your brand model in one shot so you stay consistent everywhere.' };
    }

    /* what is brandofme */
    if (/what\s+is\s+brand\s?of\s?me|what[\u2019']?s brandofme/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: '<b>Brandofme</b> turns your name (or any idea) into a full personal brand: AI brand model, live brand page at <code>brandofme.ai/yourname</code>, video studio, polished status updates. The studio you\u2019re using right now is the front door to it.',
        chips: ['Make a brand of me', 'How much does it cost?'] };
    }

    /* taglines */
    if (/(how\s+(to|do\s+i)|tips\s+for|good)\s+(write\s+a\s+)?tagline|what\s+makes\s+a\s+good\s+tagline/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: '<b>A good tagline is short, memorable, and earns its keep in 5 words or less.</b> It should hint at WHAT you do AND HOW you feel.<br><br>Examples that work: <em>"Just do it."</em> (Nike \u2014 action). <em>"Think different."</em> (Apple \u2014 identity). <em>"The ultimate driving machine."</em> (BMW \u2014 promise).<br><br>Avoid: "Quality you can trust", "Innovation at its finest", anything that could fit any company.' };
    }

    /* naming */
    if (/(how\s+(to|do\s+i)|tips\s+for|help\s+me)\s+(name|naming)|pick\s+a\s+name|name\s+(ideas?|for\s+(my|a))/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: '<b>Naming rules of thumb:</b><br>1. Short \u2014 1\u20133 syllables wins.<br>2. Pronounceable on first try.<br>3. A memorable hook (sound, story, double meaning).<br>4. Available as <code>.com</code> or <code>.ai</code>.<br>5. Doesn\u2019t paint you into a corner.<br><br>Or just say <em>"make a brand of [anything]"</em> and I\u2019ll generate one for you.',
        chips: ['Make a brand of me', 'Make a brand of Aurora', 'Make a brand for runners'] };
    }

    /* pricing */
    if (/(how much|price|pricing|cost|free|trial|subscription|plan)/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'This brand studio is <b>free to use</b> right here. The full Brandofme product (live brand page, video studio, status updates, daily AI feed) is <b>$29/month or $261/year</b> with a <b>7-day free trial</b> \u2014 no card required.' };
    }

    /* difference between two tones */
    const diffMatch = low.match(/(?:difference|vs|versus|compare).*?\b(minimal|luxury|tech|playful|bold|organic|creative)\b.*?\b(minimal|luxury|tech|playful|bold|organic|creative)\b/);
    if (diffMatch) {
      const a = diffMatch[1], b2 = diffMatch[2];
      return { handled: true, kind: 'text',
        reply: '<b>' + TONES[a].label + '</b> (' + TONES[a].archetype + ') vs <b>' + TONES[b2].label + '</b> (' + TONES[b2].archetype + '):<br><br>' +
               '<b>' + TONES[a].label + ' voice:</b> ' + VOICE[a].adjectives.join(', ') + '<br>' +
               '<b>' + TONES[b2].label + ' voice:</b> ' + VOICE[b2].adjectives.join(', ') + '<br><br>' +
               'Picking between them is really picking between <em>' + VOICE[a].do.toLowerCase() + '</em> and <em>' + VOICE[b2].do.toLowerCase() + '</em>.' };
    }

    /* examples of [tone] brands */
    const exMatch = low.match(/(?:examples?|like|list|some)\s+(?:of\s+)?(?:[a-z ]*?)\b(minimal|luxury|tech|playful|bold|organic|creative)\b.*?brand/);
    if (exMatch) {
      const t = exMatch[1];
      return { handled: true, kind: 'text',
        reply: 'Well-known <b>' + t + '</b> brands: ' + EXAMPLE_BRANDS[t].map(e => '<b>' + e + '</b>').join(', ') + '. Study how they handle whitespace, language and color \u2014 not what they sell.',
        chips: ['Make a ' + t + ' brand', 'Best font for ' + t + '?'] };
    }

    /* monogram */
    if (/what\s+is\s+(a\s+)?monogram/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'A <b>monogram</b> is the initials of your brand name, set in a strong typeface, often inside a shape (circle, square, hex). It\u2019s your fallback logo \u2014 the version that works at 16\u00d716 px in a browser tab.' };
    }

    /* "no brand yet" catch for current-brand questions (my X / what's my X) */
    if (/\b(my|the|our)\s+(color|colour|palette|tone|font|voice|tagline|name|niche|bio)\b/i.test(low) ||
        /what(?:[\u2019']s|\s+is)\s+(my|the)\s+(color|colour|palette|tone|font|voice|tagline|name|niche|bio)\b/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'You don\u2019t have a brand built yet \u2014 want me to make one? Tell me anything: a name, a vibe, what you do.',
        chips: ['Make a brand of me', 'A bold fitness brand', 'A calm skincare brand'] };
    }

    /* generic brand-ish question fallback */
    if (/\?\s*$/.test(raw) && /\b(brand|color|colour|font|tone|tagline|niche|name|logo|monogram|voice|palette)\b/i.test(low)) {
      return { handled: true, kind: 'text',
        reply: 'I can answer that better if you\u2019re more specific. Ask it about your <em>current brand</em> (e.g. <b>"what\u2019s my tone?"</b>) or as a <em>general question</em> (e.g. <b>"best font for a tech startup"</b>).',
        chips: ['What\u2019s my tone?', 'Best font for tech?', 'How do I write a tagline?'] };
    }

    return { handled: false };
  }

  /* map a full brand to the chat's lightweight saved-profile shape */
  function toProfile(brand) {
    return { name: brand.name, tagline: brand.tagline, niche: brand.niche, color: brand.palette.primary, slug: slugify(brand.name) };
  }

  return { version: VERSION, generate, refine, respond, answer, toProfile, slugify, googleFontsHref, toCSSVars, toBrief, contrastRatio, TONES: Object.keys(TONES) };
});
