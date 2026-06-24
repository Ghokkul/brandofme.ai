<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Brand Studio — chat your brand into existence · Brandofme</title>
<meta name="description" content="Type anything — a vibe, a name, what you do — and watch it become a complete brand: name, tagline, palette, type, voice. Powered by Brandofme.">
<style>
:root{
  --paper:#F6F7F5;--ink:#0F1217;--accent:#2B3CFF;--accent2:#7A3CFF;
  --card:#FFFFFF;--line:rgba(15,18,23,.12);--line-strong:rgba(15,18,23,.26);--muted:rgba(15,18,23,.55);
  --grad:linear-gradient(120deg,#2B3CFF,#7A3CFF);--warn:#C8102E;
  --display:'Unbounded',sans-serif;--body:'Instrument Sans',system-ui,sans-serif;--mono:'IBM Plex Mono',monospace;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{font-family:var(--body);color:var(--ink);background:var(--paper);font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;overflow:hidden}
button{font-family:inherit;cursor:pointer}
::selection{background:rgba(43,60,255,.18)}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}

/* top bar */
.bar{height:56px;display:flex;align-items:center;gap:12px;padding:0 18px;background:var(--card);border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:10px}
.brand .dot{width:24px;height:24px;border-radius:7px;background:var(--grad)}
.brand b{font-family:var(--display);font-weight:800;font-size:16px;letter-spacing:-.02em}
.brand span{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.04em}
.api-pill{margin-left:auto;font-family:var(--mono);font-size:11px;color:var(--muted);border:1px solid var(--line);border-radius:100px;padding:5px 11px;display:flex;align-items:center;gap:6px}
.api-pill .d{width:7px;height:7px;border-radius:50%;background:#0a8a3a}
.api-pill.api .d{background:var(--accent)}

/* layout */
.wrap{display:flex;height:calc(100% - 56px)}
.chat{flex:1;min-width:0;display:flex;flex-direction:column;border-right:1px solid var(--line)}
.preview{width:46%;max-width:620px;flex:none;overflow-y:auto;background:linear-gradient(180deg,#fff,rgba(244,246,255,.5))}
@media(max-width:900px){.wrap{flex-direction:column;overflow-y:auto}.chat{border-right:none;border-bottom:1px solid var(--line);height:auto}.preview{width:100%;max-width:none}}

/* chat */
.log{flex:1;overflow-y:auto;padding:22px 20px 8px;display:flex;flex-direction:column;gap:14px}
.msg{display:flex;gap:10px;max-width:96%}
.msg .ava{width:30px;height:30px;border-radius:9px;flex:none;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:11px;font-weight:600}
.msg.bot .ava{background:var(--ink);color:#fff}
.msg.me{flex-direction:row-reverse;align-self:flex-end}
.msg.me .ava{background:var(--grad);color:#fff}
.bubble{border:1px solid var(--line);background:var(--card);border-radius:14px;padding:11px 14px;font-size:15px}
.msg.me .bubble{background:var(--ink);color:#fff;border-color:var(--ink)}
.bubble.note{background:rgba(43,60,255,.06);border-color:rgba(43,60,255,.18);font-size:14px}

/* brand mini card in chat */
.mini{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--card);max-width:420px}
.mini-top{padding:16px;display:flex;gap:13px;align-items:center}
.mini-mono{width:48px;height:48px;border-radius:13px;flex:none;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px}
.mini-name{font-weight:800;font-size:19px;line-height:1.1}
.mini-tag{font-size:13px;color:var(--muted);margin-top:2px}
.mini-sw{display:flex;height:8px}
.mini-sw span{flex:1}
.mini-meta{display:flex;gap:8px;padding:10px 16px;font-family:var(--mono);font-size:10.5px;letter-spacing:.04em;color:var(--muted);border-top:1px solid var(--line);text-transform:uppercase}

/* typing */
.typing{display:inline-flex;gap:4px;padding:3px 0}
.typing i{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:bb 1s infinite}
.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}
@keyframes bb{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}

/* chips */
.chips{display:flex;flex-wrap:wrap;gap:8px;padding:4px 20px 0}
.chip{font-size:13px;border:1px solid var(--line-strong);background:var(--card);border-radius:100px;padding:7px 13px;transition:.15s;white-space:nowrap}
.chip:hover{border-color:var(--accent);color:var(--accent)}

/* claim CTA — appears when a brand exists, between chips and composer */
.claim-bar{display:none;align-items:center;gap:14px;padding:12px 20px;background:var(--card);border-top:1px solid var(--line);border-bottom:1px solid var(--line);position:relative}
.claim-bar.show{display:flex}
.claim-bar::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--claim-color,var(--accent))}
.claim-text{flex:1;font-size:13.5px;color:var(--ink);opacity:.88}
.claim-text b{color:var(--ink);font-weight:700}
.claim-btn{flex:none;border:none;background:var(--ink);color:#fff;font-family:var(--body);font-size:13px;font-weight:600;padding:9px 16px;border-radius:100px;cursor:pointer;transition:.15s;white-space:nowrap}
.claim-btn:hover{background:var(--claim-color,var(--accent))}
@media(max-width:640px){.claim-bar{flex-direction:column;align-items:stretch;text-align:center;gap:9px}.claim-btn{padding:11px 16px}}

/* composer */
.composer{padding:14px 20px 18px;border-top:1px solid var(--line);background:rgba(244,246,255,.5)}
.crow{display:flex;gap:10px;align-items:flex-end}
.crow textarea{flex:1;resize:none;border:1px solid var(--line-strong);border-radius:14px;padding:13px 15px;font-family:var(--body);font-size:15px;max-height:140px;outline:none;background:#fff}
.crow textarea:focus{border-color:var(--accent);box-shadow:0 0 0 4px rgba(43,60,255,.12)}
.send{flex:none;width:48px;height:48px;border-radius:14px;border:none;background:var(--grad);color:#fff;font-size:20px;display:flex;align-items:center;justify-content:center}
.send:disabled{opacity:.5}

/* preview panel */
.pv{padding:26px 26px 40px}
.pv-empty{color:var(--muted);font-size:15px;text-align:center;padding:80px 20px}
.pv-empty .big{font-family:var(--display);font-weight:800;font-size:22px;color:var(--ink);margin-bottom:8px}
.hero{border-radius:22px;padding:30px;color:#fff;position:relative;overflow:hidden}
.hero .mono{width:74px;height:74px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:32px;margin-bottom:18px}
.hero .nm{font-weight:800;font-size:40px;line-height:1.04;letter-spacing:-.01em}
.hero .tg{font-size:17px;opacity:.92;margin-top:10px;max-width:34ch}
.hero .arch{position:absolute;top:22px;right:24px;font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;opacity:.8;border:1px solid rgba(255,255,255,.4);border-radius:100px;padding:4px 10px}
.sect{margin-top:22px}
.sect h4{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 10px}
.bio{font-size:15.5px;line-height:1.6}
.pal{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.pal .c{border-radius:12px;border:1px solid var(--line);overflow:hidden;cursor:pointer}
.pal .c .sw{height:54px}
.pal .c .hx{font-family:var(--mono);font-size:10px;padding:5px 6px;text-align:center;letter-spacing:.02em}
.pal .c .nm{font-size:10px;text-align:center;color:var(--muted);padding:0 4px 5px}
.type-row{border:1px solid var(--line);border-radius:14px;padding:16px;background:var(--card)}
.type-row .d{font-size:30px;line-height:1.1}
.type-row .b{font-size:15px;margin-top:8px;color:var(--ink)}
.type-row .meta{font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:10px}
.voice{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
.voice .v{background:rgba(43,60,255,.08);color:var(--accent);border-radius:100px;padding:5px 12px;font-size:13px;font-weight:600}
.dodont{font-size:14px;color:var(--ink)}.dodont b{font-weight:600}
.tags{display:flex;flex-wrap:wrap;gap:7px}
.tags span{font-family:var(--mono);font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:7px;padding:4px 8px}
.export{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px;border-top:1px solid var(--line);padding-top:18px}
.xbtn{font-size:13px;border:1px solid var(--line-strong);background:var(--card);border-radius:10px;padding:9px 13px;font-weight:600}
.xbtn:hover{border-color:var(--ink)}
.xbtn.fill{background:var(--grad);color:#fff;border:none}

.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(16px);background:var(--ink);color:#fff;padding:11px 17px;border-radius:11px;font-size:14px;opacity:0;pointer-events:none;transition:.25s;z-index:50}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
</style>
</head>
<body>
<header class="bar">
  <div class="brand"><span class="dot"></span><b>Brand Studio</b><span>by Brandofme</span></div>
  <div class="api-pill" id="apiPill"><span class="d"></span><span id="apiTxt">engine: local</span></div>
</header>

<div class="wrap">
  <!-- CHAT -->
  <section class="chat">
    <div class="log" id="log"></div>
    <div class="chips" id="chips"></div>
    <div class="composer">
      <div class="crow">
        <textarea id="input" rows="1" placeholder="Type anything — “a calm skincare brand”, “luxury watch called Aurelius”, “fun app for runners”…"></textarea>
        <button class="send" id="send" aria-label="Send">↑</button>
      </div>
    </div>
  </section>

  <!-- LIVE PREVIEW -->
  <aside class="preview">
    <div class="pv" id="pv">
      <div class="pv-empty">
        <div class="big">Your brand appears here</div>
        Describe anything in the chat and a complete brand — name, tagline, palette, type and voice — builds live in this panel. Then refine it by chatting.
      </div>
    </div>
  </aside>
</div>

<div class="toast" id="toast"></div>

<script src="brand-engine.js"></script>
<script>
const $ = s => document.querySelector(s);
const API_BASE = (new URLSearchParams(location.search).get('api') || window.BRAND_API_BASE || '').replace(/\/$/,'');
let current = null, busy = false;

/* load the brand fonts so previews render in the real typefaces */
(function loadFonts(){
  if(!window.BrandEngine) return;
  const l=document.createElement('link'); l.rel='stylesheet'; l.href=BrandEngine.googleFontsHref(); document.head.appendChild(l);
  const p=document.createElement('link'); p.rel='preconnect'; p.href='https://fonts.gstatic.com'; p.crossOrigin=''; document.head.appendChild(p);
})();
if(API_BASE){ $('#apiPill').classList.add('api'); $('#apiTxt').textContent='engine: API'; }

/* ============================================================
 * BRIDGE — wire Conjure to the parent (brandofme.site/index.html)
 * Every brand we produce is broadcast in two ways:
 *   1. window.parent.postMessage(...)  — for the live iframe embed
 *   2. localStorage('bom_studio_brand') — survives reloads + new tabs
 * The parent listens, shows a banner ("Claim your brand on signup"),
 * and pre-fills the account creation form with what we built.
 * ============================================================ */
const IN_FRAME = (function(){ try { return window.parent && window.parent !== window; } catch { return false; } })();
let parentUser = null;   // populated if the parent tells us "you're embedded — here's the signed-in user"

function broadcastBrand(brand, kind){
  if (!brand) return;
  let profile = null, css = '', brief = '';
  try {
    profile = BrandEngine.toProfile(brand);
    css     = BrandEngine.toCSSVars(brand);
    brief   = BrandEngine.toBrief ? BrandEngine.toBrief(brand) : '';
  } catch(_){}
  const payload = {
    type:    'bom:brand',
    kind:    kind || 'update',        // 'new' | 'refine' | 'update'
    brand:   brand,                    // full brand object
    profile: profile,                  // { name, tagline, niche, color, slug } — light shape used by the main site
    css:     css,                      // ready-to-paste :root vars
    brief:   brief,                    // markdown brand brief
    version: brand.version || (BrandEngine && BrandEngine.version),
    ts:      Date.now()
  };
  /* 1. tell the parent (live, in-iframe) */
  if (IN_FRAME) {
    try { window.parent.postMessage(payload, '*'); } catch(_){}
  }
  /* 2. persist so the parent picks it up on next visit (or in a new tab) */
  try { localStorage.setItem('bom_studio_brand', JSON.stringify(payload)); } catch(_){}
  /* 3. expose for debugging */
  try { window.__bomLastBrand = payload; } catch(_){}
}

/* The parent can ask us things, and can tell us about the signed-in user. */
window.addEventListener('message', function(e){
  if (!e.data || typeof e.data !== 'object') return;
  if (e.data.type === 'bom:request-brand') {
    if (current) broadcastBrand(current, 'snapshot');
  }
  if (e.data.type === 'bom:user' && e.data.user) {
    parentUser = e.data.user;
    /* Drop a friendly note that we know who they are */
    try {
      const name = (parentUser.name || '').trim();
      if (name && log && !window.__bomGreeted) {
        window.__bomGreeted = true;
        addMsg('bot','Hey ' + esc(name.split(' ')[0]) + ' \u2014 ready when you are. Want me to build a brand around <b>' + esc(name) + '</b>?', 'note');
      }
    } catch(_){}
  }
  if (e.data.type === 'bom:hello') {
    /* handshake: tell the parent we're alive */
    try { window.parent.postMessage({ type:'bom:ready', version: (BrandEngine && BrandEngine.version) }, '*'); } catch(_){}
  }
});

/* "Use this brand" CTA — either bubble it up to the parent's signup flow,
   or (if standalone) jump straight to /index.html#signup with the brand saved. */
function claimBrand(){
  if (!current) return;
  broadcastBrand(current, 'claim');
  if (IN_FRAME) {
    try { window.parent.postMessage({ type:'bom:claim', brand: current, profile: BrandEngine.toProfile(current) }, '*'); } catch(_){}
    toast('Sent to your Brandofme account \u2192 finish signup on the main page');
  } else {
    /* standalone tab — go to the main site, the bridge listener there picks up the
       saved brand and opens the signup modal. */
    try { localStorage.setItem('bom_studio_brand', JSON.stringify({ type:'bom:brand', kind:'claim', brand: current, profile: BrandEngine.toProfile(current), ts: Date.now() })); } catch(_){}
    location.href = (location.pathname.includes('/frontend/') ? '../index.html' : './index.html') + '#signup';
  }
}

/* On boot, tell the parent we're alive so it can send us the signed-in user (if any). */
if (IN_FRAME) {
  try { window.parent.postMessage({ type:'bom:ready', version: (BrandEngine && BrandEngine.version) }, '*'); } catch(_){}
}

/* ---------- engine calls (API first, local fallback) ---------- */
async function genBrand(input){
  if(API_BASE){ try{ const r=await fetch(API_BASE+'/api/brand/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({input})}); if(r.ok){ const j=await r.json(); return j.brand||j; } }catch(e){} }
  return BrandEngine.generate(input);
}
async function refineBrand(brand,instruction){
  if(API_BASE){ try{ const r=await fetch(API_BASE+'/api/brand/refine',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({brand,instruction})}); if(r.ok){ const j=await r.json(); return j.brand||j; } }catch(e){} }
  return BrandEngine.refine(brand,instruction);
}

/* ---------- chat rendering ---------- */
const log=$('#log');
function esc(s){return String(s==null?'':s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function scroll(){ log.scrollTop=log.scrollHeight; }
function addMsg(who,html,cls){ const m=document.createElement('div'); m.className='msg '+who; m.innerHTML='<div class="ava">'+(who==='me'?'YOU':'b')+'</div><div class="bubble'+(cls?' '+cls:'')+'">'+html+'</div>'; log.appendChild(m); scroll(); return m; }
function addTyping(){ const m=document.createElement('div'); m.className='msg bot'; m.innerHTML='<div class="ava">b</div><div class="bubble"><span class="typing"><i></i><i></i><i></i></span></div>'; log.appendChild(m); scroll(); return m; }

function miniCard(b){
  const p=b.palette;
  return '<div class="mini">'+
    '<div class="mini-top"><div class="mini-mono" style="background:'+p.primary+';color:'+p.onPrimary+';font-family:'+b.fonts.displayStack+'">'+esc(b.monogram)+'</div>'+
    '<div><div class="mini-name" style="font-family:'+b.fonts.displayStack+'">'+esc(b.name)+'</div><div class="mini-tag">'+esc(b.tagline)+'</div></div></div>'+
    '<div class="mini-sw"><span style="background:'+p.primary+'"></span><span style="background:'+p.secondary+'"></span><span style="background:'+p.accent+'"></span><span style="background:'+p.ink+'"></span><span style="background:'+p.paper+'"></span></div>'+
    '<div class="mini-meta"><span>'+esc(b.toneLabel)+'</span><span>·</span><span>'+esc(b.fonts.display)+'</span><span>·</span><span>'+esc(b.niche)+'</span></div></div>';
}

/* ---------- live preview panel ---------- */
function renderPreview(b){
  const p=b.palette;
  const swatch=(hex,name)=>'<div class="c" data-hex="'+hex+'"><div class="sw" style="background:'+hex+'"></div><div class="hx">'+hex.toUpperCase()+'</div><div class="nm">'+name+'</div></div>';
  $('#pv').innerHTML =
    '<div class="hero" style="background:linear-gradient(135deg,'+p.primary+','+p.secondary+');color:'+p.onPrimary+'">'+
      '<div class="arch">'+esc(b.archetype)+'</div>'+
      '<div class="mono" style="background:'+p.accent+';color:'+p.onAccent+';font-family:'+b.fonts.displayStack+'">'+esc(b.monogram)+'</div>'+
      '<div class="nm" style="font-family:'+b.fonts.displayStack+'">'+esc(b.name)+'</div>'+
      '<div class="tg" style="font-family:'+b.fonts.bodyStack+'">'+esc(b.tagline)+'</div>'+
    '</div>'+
    '<div class="sect"><h4>The idea</h4><div class="bio">'+esc(b.bio)+'</div></div>'+
    '<div class="sect"><h4>Palette</h4><div class="pal">'+
      swatch(p.primary,'Primary')+swatch(p.secondary,'Secondary')+swatch(p.accent,'Accent')+swatch(p.ink,'Ink')+swatch(p.paper,'Paper')+
    '</div></div>'+
    '<div class="sect"><h4>Typography</h4><div class="type-row">'+
      '<div class="d" style="font-family:'+b.fonts.displayStack+'">'+esc(b.name)+'</div>'+
      '<div class="b" style="font-family:'+b.fonts.bodyStack+'">The quick brown fox jumps over the lazy dog — 0123456789</div>'+
      '<div class="meta">'+esc(b.fonts.display)+' / '+esc(b.fonts.body)+' · '+esc(b.fonts.pairing)+'</div>'+
    '</div></div>'+
    '<div class="sect"><h4>Voice</h4><div class="voice">'+b.voice.adjectives.map(a=>'<span class="v">'+esc(a)+'</span>').join('')+'</div>'+
      '<div class="dodont"><b>Do</b> '+esc(b.voice.do)+'<br><b>Don\u2019t</b> '+esc(b.voice.dont)+'</div></div>'+
    '<div class="sect"><h4>Tags</h4><div class="tags">'+b.hashtags.map(t=>'<span>'+esc(t)+'</span>').join('')+'</div></div>'+
    '<div class="export">'+
      '<button class="xbtn fill" data-x="kit">Download brand kit</button>'+
      '<button class="xbtn" data-x="css">Copy CSS variables</button>'+
      '<button class="xbtn" data-x="brief">Copy brief</button>'+
      '<button class="xbtn" data-x="json">Copy JSON</button>'+
    '</div>';
  $('#pv').querySelectorAll('.pal .c').forEach(c=>c.addEventListener('click',()=>copy(c.dataset.hex.toUpperCase(),'Hex copied')));
  $('#pv').querySelectorAll('[data-x]').forEach(btn=>btn.addEventListener('click',()=>doExport(btn.dataset.x)));
}

/* ---------- refine chips ---------- */
const STARTERS=['a calm skincare brand','luxury watch called Aurelius','fun app for runners','an AI tool for writers','What is a brand archetype?','Best font for a tech startup?'];
const REFINERS=['Warmer','Cooler','Bolder','More minimal','What\u2019s my tone?','What\u2019s my voice?','Is it accessible?','Similar brands?','Another name','Copy CSS','Surprise me'];
function setChips(arr,refine){
  const c=$('#chips'); c.innerHTML='';
  arr.forEach(txt=>{ const b=document.createElement('button'); b.className='chip'; b.textContent=refine?txt:'“'+txt+'”'; b.addEventListener('click',()=>handle(refine?txt.toLowerCase():txt)); c.appendChild(b); });
}

/* ---------- main handler ---------- */
async function handle(text){
  text=String(text||'').trim(); if(!text||busy) return;
  busy=true; $('#send').disabled=true;
  addMsg('me',esc(text));
  $('#input').value=''; autosize();
  const t=addTyping();
  await new Promise(r=>setTimeout(r,260)); // tiny beat so it feels alive

  /* 1. Let the engine try to answer first (Q&A, refine, generate, reset). */
  const session = { brand: current, ctx: {} };
  let result = null;
  try { result = BrandEngine.respond(session, text); } catch(e){ console.warn(e); }
  if (result && result.handled) {
    t.remove();
    /* refresh current brand if the engine produced one */
    const before = current;
    if (result.brand) current = result.brand;
    else if (session.brand) current = session.brand;
    /* if the brand actually changed (build, refine, rename) — broadcast it */
    if (current && current !== before) {
      const kind = (before && before.meta) ? 'refine' : 'new';
      try { broadcastBrand(current, kind); } catch(_){}
      ensureClaimCTA();
    }

    /* small "action" answers: copy something to clipboard */
    if (result.kind === 'action') {
      const msg=addMsg('bot','');
      msg.querySelector('.bubble').innerHTML = result.reply || 'Done.';
      try {
        if (result.action === 'copyCSS' && current)   navigator.clipboard.writeText(BrandEngine.toCSSVars(current));
        else if (result.action === 'copyBrief' && current) navigator.clipboard.writeText(BrandEngine.toBrief(current));
        else if (result.action === 'copyHTML' && current)  doExport('kit');
        toast('Copied to clipboard');
      } catch(e){ toast('Copy blocked by the browser'); }
      if (result.chips) setChips(result.chips, true);
      busy=false; $('#send').disabled=false; $('#input').focus();
      return;
    }

    /* the engine returned a kit-style reply (kitReply markdown) → render it,
       plus a mini-card and live preview if a brand exists.
       Otherwise it's a plain Q&A answer → render as HTML in the bubble. */
    const msg=addMsg('bot','');
    const bubble = msg.querySelector('.bubble');
    /* The kit-style replies contain markdown like **bold**; the Q&A replies
       already contain HTML tags. Detect: if reply has < and > it's HTML. */
    const isHTMLReply = /<\/?[a-z][\s\S]*?>/i.test(result.reply || '');
    if (isHTMLReply) {
      bubble.innerHTML = result.reply;
    } else {
      bubble.innerHTML = mdToHTML(result.reply || '');
    }
    /* if the engine returned a freshly-built or refined brand, ALSO show its card + preview */
    if (result.brand) {
      bubble.innerHTML += miniCard(result.brand);
      renderPreview(result.brand);
    } else if (current) {
      renderPreview(current); // keep the preview in sync
    }
    /* chips: whatever the engine suggested, or default to the refiner row */
    setChips(result.chips || (current ? REFINERS : STARTERS), !!current);
    busy=false; $('#send').disabled=false; $('#input').focus();
    return;
  }

  /* 2. Engine didn't handle it — fall back to the old build/refine path. */
  let brand=null, note='';
  if(current){
    const refined = await refineBrand(current,text);
    if(refined){ brand=refined; note=refined._note||'Updated your brand.'; }
  }
  if(!brand){ brand=await genBrand(text); note = current?'New brand — starting fresh from that.':''; }

  current=brand;
  t.remove();
  if(note) addMsg('bot',esc(note),'note');
  const msg=addMsg('bot', '');
  msg.querySelector('.bubble').innerHTML = 'Here it is — <b>'+esc(brand.name)+'</b>.'+miniCard(brand);
  renderPreview(brand);
  setChips(REFINERS,true);
  try { broadcastBrand(current, 'new'); } catch(_){}
  ensureClaimCTA();
  busy=false; $('#send').disabled=false; $('#input').focus();
}

/* The "Claim this brand →" button — only appears once a brand exists.
   Inside the iframe it tells the parent to open signup with the brand attached.
   Standalone, it navigates to /index.html#signup with the brand in localStorage. */
function ensureClaimCTA(){
  if (!current) return;
  let bar = document.getElementById('claimBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'claimBar';
    bar.className = 'claim-bar';
    bar.innerHTML = '<span class="claim-text">Like what you see? <b id="claimName"></b> is ready to go live.</span>' +
                    '<button class="claim-btn" id="claimBtn">Claim this brand on Brandofme \u2192</button>';
    const composer = document.querySelector('.composer');
    if (composer && composer.parentNode) composer.parentNode.insertBefore(bar, composer);
    document.getElementById('claimBtn').addEventListener('click', claimBrand);
  }
  document.getElementById('claimName').textContent = '\u201c' + (current.name || 'Your brand') + '\u201d';
  bar.style.setProperty('--claim-color', (current.palette && current.palette.primary) || 'var(--accent)');
  bar.classList.add('show');
}

/* tiny markdown-ish renderer for engine replies that use **bold** and _italic_ */
function mdToHTML(s){
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\b_([^_]+)_\b/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

/* ---------- export ---------- */
function copy(t,label){ navigator.clipboard.writeText(t).then(()=>toast(label||'Copied')).catch(()=>toast('Copy failed')); }
function doExport(kind){
  if(!current) return;
  if(kind==='json') return copy(JSON.stringify(current,null,2),'Brand JSON copied');
  if(kind==='css') return copy(BrandEngine.toCSSVars(current),'CSS variables copied');
  if(kind==='brief') return copy(BrandEngine.toBrief(current),'Brand brief copied');
  if(kind==='kit'){
    const b=current,p=b.palette;
    const html='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(b.name)+' — Brand Kit</title>'+
      '<link href="'+BrandEngine.googleFontsHref()+'" rel="stylesheet"><style>'+BrandEngine.toCSSVars(b)+
      'body{margin:0;font-family:var(--brand-body);background:var(--brand-paper);color:var(--brand-ink)}'+
      '.hero{padding:9vh 8vw;background:linear-gradient(135deg,var(--brand-primary),var(--brand-secondary));color:'+p.onPrimary+'}'+
      '.mono{width:90px;height:90px;border-radius:22px;background:var(--brand-accent);color:'+p.onAccent+';display:flex;align-items:center;justify-content:center;font-family:var(--brand-display);font-weight:800;font-size:40px;margin-bottom:24px}'+
      'h1{font-family:var(--brand-display);font-size:clamp(40px,8vw,76px);margin:0;letter-spacing:-.01em}'+
      '.tg{font-size:clamp(17px,2.4vw,22px);opacity:.92;margin-top:14px}'+
      '.body{padding:8vh 8vw;max-width:820px}.row{display:flex;gap:14px;flex-wrap:wrap;margin:14px 0 40px}'+
      '.sw{width:120px;border-radius:14px;overflow:hidden;border:1px solid rgba(0,0,0,.1)}.sw .b{height:84px}.sw .h{font-family:monospace;font-size:12px;padding:8px;text-align:center}'+
      'h2{font-family:var(--brand-display);font-size:13px;letter-spacing:.12em;text-transform:uppercase;opacity:.6}'+
      '</style></head><body><div class="hero"><div class="mono">'+esc(b.monogram)+'</div><h1>'+esc(b.name)+'</h1><div class="tg">'+esc(b.tagline)+'</div></div>'+
      '<div class="body"><h2>The idea</h2><p style="font-size:18px;line-height:1.6">'+esc(b.bio)+'</p>'+
      '<h2>Palette</h2><div class="row">'+
      [['Primary',p.primary],['Secondary',p.secondary],['Accent',p.accent],['Ink',p.ink],['Paper',p.paper]].map(c=>'<div class="sw"><div class="b" style="background:'+c[1]+'"></div><div class="h">'+c[1].toUpperCase()+'<br>'+c[0]+'</div></div>').join('')+
      '</div><h2>Type</h2><p style="font-family:var(--brand-display);font-size:34px;margin:6px 0">'+esc(b.name)+'</p><p style="font-size:16px">'+esc(b.fonts.display)+' / '+esc(b.fonts.body)+'</p>'+
      '<h2>Voice</h2><p style="font-size:16px">'+esc(b.voice.adjectives.join(', '))+'. '+esc(b.voice.do)+' '+esc(b.voice.dont)+'</p>'+
      '<h2>Tags</h2><p style="font-family:monospace;color:#666">'+esc(b.hashtags.join('  '))+'</p>'+
      '<p style="margin-top:50px;font-family:monospace;font-size:12px;opacity:.5">Generated with Brandofme · Brand Studio</p></div></body></html>';
    const blob=new Blob([html],{type:'text/html'}); const a=document.createElement('a');
    a.href=URL.createObjectURL(blob); a.download=(b.name||'brand').replace(/[^\w]+/g,'-').toLowerCase()+'-brand-kit.html'; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),1000); toast('Downloading brand kit…');
  }
}

/* ---------- composer plumbing ---------- */
const input=$('#input');
function autosize(){ input.style.height='auto'; input.style.height=Math.min(input.scrollHeight,140)+'px'; }
input.addEventListener('input',autosize);
input.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); handle(input.value); } });
$('#send').addEventListener('click',()=>handle(input.value));

let toastT;
function toast(m){ const t=$('#toast'); t.textContent=m; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2400); }

/* ---------- boot ---------- */
addMsg('bot','Hey \u2014 I\u2019m your brand studio. Two things I do:<br><br>\u2022 <b>Build</b> a brand from anything you describe (a vibe, a name, what you do, who it\u2019s for).<br>\u2022 <b>Answer</b> brand questions \u2014 colors, fonts, taglines, archetypes, naming, accessibility, whatever.<br><br>Try a chip below, or just type.');
setChips(STARTERS,false);
input.focus();
</script>
</body>
</html>
