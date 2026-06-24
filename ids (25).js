<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Video Studio · Brandofme</title>
<meta name="description" content="Type your name. Pick a format. Download a branded video — landscape, portrait, or square. Part of Brandofme.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23d83a3a'/%3E%3Ctext x='16' y='22' font-family='system-ui' font-size='18' font-weight='800' text-anchor='middle' fill='white'%3EV%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;800&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{
  /* Video Studio identity — cinematic dark theme with red accent */
  --bg:#0a0d14;          /* deep cinema black */
  --bg2:#11151f;         /* surface */
  --bg3:#1a1f2c;         /* elevated surface */
  --line:rgba(255,255,255,.08);
  --line-strong:rgba(255,255,255,.16);
  --ink:#fff;
  --muted:rgba(255,255,255,.55);
  --muted2:rgba(255,255,255,.35);
  --accent:#FF4B4B;      /* hero red */
  --accent2:#FF7B5E;     /* coral */
  --accent-bg:rgba(255,75,75,.14);
  --display:'Unbounded',sans-serif;
  --body:'Instrument Sans',system-ui,sans-serif;
  --mono:'IBM Plex Mono',monospace;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{font-family:var(--body);color:var(--ink);background:var(--bg);font-size:14.5px;line-height:1.5;-webkit-font-smoothing:antialiased;overflow:hidden}
button{font-family:inherit;cursor:pointer}
::selection{background:rgba(255,75,75,.32)}

/* ----- Layout ----- */
.app{display:grid;grid-template-rows:56px 1fr;height:100%}

/* Top bar */
.topbar{display:flex;align-items:center;gap:14px;padding:0 18px;background:var(--bg2);border-bottom:1px solid var(--line)}
.brand-mark{display:inline-flex;align-items:baseline;font-family:var(--display);font-weight:800;font-size:15px;letter-spacing:-.01em;text-decoration:none;color:var(--ink);gap:0}
.brand-mark .lo{color:var(--muted);font-family:var(--mono);font-size:11px;font-weight:500;margin-right:8px;border-right:1px solid var(--line-strong);padding-right:8px}
.brand-mark b{font-weight:800}
.brand-mark i{font-style:italic;background:linear-gradient(120deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}
.brand-mark em{font-style:normal;font-family:var(--mono);font-weight:500;font-size:11px;color:var(--muted);margin-left:1px;transform:translateY(-1px)}
.brand-mark .editor{font-family:var(--mono);font-size:12px;color:var(--accent);margin-left:8px;padding-left:8px;border-left:1px solid var(--line-strong);text-transform:lowercase;letter-spacing:.02em}

.topbar-spacer{flex:1}
.proj-title{font-family:var(--mono);font-size:11.5px;color:var(--muted);letter-spacing:.04em;display:flex;align-items:center;gap:6px}
.proj-title input{background:transparent;border:none;color:var(--ink);font-family:var(--mono);font-size:11.5px;width:160px;letter-spacing:.04em;outline:none;border-bottom:1px dashed transparent;padding:2px 0}
.proj-title input:focus{border-bottom-color:var(--accent)}
.proj-title .dot{width:6px;height:6px;border-radius:50%;background:#0a8a3a;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.55}}

.btn{font-family:var(--body);font-size:13px;font-weight:500;padding:7px 13px;border-radius:100px;border:1px solid var(--line-strong);background:transparent;color:var(--ink);cursor:pointer;transition:.18s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn:hover{border-color:var(--accent);color:var(--accent)}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.btn-primary:hover{background:#ff3030;color:#fff;border-color:#ff3030}
.btn-ghost{border-color:transparent;color:var(--muted)}
.btn-ghost:hover{color:var(--ink);background:rgba(255,255,255,.05);border-color:transparent}
.btn .ic{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;font-size:14px;line-height:1}
.btn-new .ic{width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.18);font-size:12px;font-weight:400}
.btn-new:hover .ic{background:#fff;color:var(--accent)}

/* dropdown */
.dd{position:relative}
.dd-menu{position:absolute;top:calc(100% + 6px);right:0;min-width:280px;background:var(--bg3);border:1px solid var(--line-strong);border-radius:12px;padding:6px;box-shadow:0 18px 50px rgba(0,0,0,.5);display:none;z-index:50}
.dd.open .dd-menu{display:block}
.dd-h{padding:9px 12px 6px;font-family:var(--mono);font-size:10px;color:var(--muted2);text-transform:uppercase;letter-spacing:.08em}
.dd-i{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--ink);transition:.15s}
.dd-i:hover{background:rgba(255,255,255,.06)}
.dd-i small{margin-left:auto;font-family:var(--mono);font-size:10px;color:var(--muted2)}
.dd-i .swatch{width:10px;height:10px;border-radius:3px;flex:none;background:var(--accent)}
.dd-i.empty{color:var(--muted2);font-style:italic;cursor:default}
.dd-i.empty:hover{background:transparent}

/* Main editor: 280 sidebar | preview | 320 right */
.editor{display:grid;grid-template-columns:280px 1fr 320px;height:calc(100% - 56px);min-height:0}
@media(max-width:1100px){.editor{grid-template-columns:240px 1fr}.rpane{display:none}}
@media(max-width:760px){.editor{grid-template-columns:1fr}.lpane{display:none}}

.lpane,.rpane{background:var(--bg2);border-right:1px solid var(--line);overflow-y:auto;padding:18px}
.rpane{border-right:none;border-left:1px solid var(--line)}
.lpane h4,.rpane h4{font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin:0 0 10px;font-weight:600}
.lpane h4:not(:first-child){margin-top:22px}

.opts{display:grid;gap:5px}
.opt{padding:9px 12px;border:1px solid var(--line);border-radius:9px;background:transparent;color:var(--ink);text-align:left;font-size:13px;cursor:pointer;transition:.15s;display:flex;align-items:center;gap:9px}
.opt:hover{border-color:var(--accent);background:rgba(255,75,75,.06)}
.opt.active{background:var(--accent);border-color:var(--accent);color:#fff}
.opt .opt-ic{width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:14px;flex:none;opacity:.85}
.opt small{margin-left:auto;font-family:var(--mono);font-size:10px;opacity:.65}

/* Center preview */
.cpane{display:flex;flex-direction:column;background:var(--bg);position:relative;min-height:0}
.preview-wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:32px;position:relative;min-height:0;overflow:hidden}
.preview-frame{background:#000;border-radius:14px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.7),0 0 0 1px var(--line-strong);position:relative;max-width:100%;max-height:100%}
.preview-frame canvas{display:block;max-width:100%;max-height:65vh;height:auto}
.preview-meta{font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;margin-top:14px;text-align:center}

/* Bottom action bar */
.actionbar{display:flex;align-items:center;justify-content:space-between;padding:14px 22px;background:var(--bg2);border-top:1px solid var(--line);gap:12px}
.actionbar-l{display:flex;gap:8px;align-items:center}
.actionbar-r{display:flex;gap:8px;align-items:center}
.status{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.03em}

/* Right pane controls */
.field{margin-bottom:14px}
.field label{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;margin-bottom:6px;font-weight:600}
.field input[type="text"]{width:100%;background:var(--bg3);border:1px solid var(--line);border-radius:8px;padding:9px 12px;color:var(--ink);font-family:var(--body);font-size:14px;outline:none;transition:.15s}
.field input[type="text"]:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(255,75,75,.18)}
.field input[type="color"]{width:42px;height:32px;padding:2px;border:1px solid var(--line);border-radius:8px;background:var(--bg3);cursor:pointer}
.field .field-row{display:flex;gap:8px;align-items:center}
.field code{font-family:var(--mono);font-size:11.5px;color:var(--muted);background:var(--bg3);padding:6px 10px;border-radius:6px;border:1px solid var(--line)}

.info-card{background:var(--bg3);border:1px solid var(--line);border-radius:10px;padding:13px 14px;margin-bottom:14px}
.info-card .ic-row{display:flex;justify-content:space-between;font-family:var(--mono);font-size:11px;padding:3px 0}
.info-card .ic-row span:first-child{color:var(--muted)}
.info-card .ic-row span:last-child{color:var(--ink);font-weight:500}

/* Empty state when no name typed */
.empty-hero{text-align:center;padding:80px 30px}
.empty-hero .eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--accent);text-transform:uppercase;margin-bottom:14px}
.empty-hero h2{font-family:var(--display);font-weight:800;font-size:30px;letter-spacing:-.02em;line-height:1.15;margin:0 0 12px}
.empty-hero p{font-size:14px;color:var(--muted);max-width:380px;margin:0 auto}

/* Toast */
.toast{position:fixed;left:50%;bottom:20px;transform:translate(-50%,140%);background:var(--bg3);color:#fff;font-size:13px;padding:11px 18px;border-radius:100px;border:1px solid var(--line-strong);box-shadow:0 12px 40px rgba(0,0,0,.5);z-index:90;transition:transform .3s ease}
.toast.show{transform:translate(-50%,0)}

/* "Sign in to save" banner */
.auth-banner{display:none;background:linear-gradient(120deg,rgba(255,75,75,.12),rgba(255,123,94,.12));border-bottom:1px solid rgba(255,75,75,.3);padding:10px 22px;font-size:13px;color:var(--ink);align-items:center;justify-content:space-between;gap:12px}
.auth-banner.show{display:flex}
.auth-banner a{color:var(--accent);font-weight:600;text-decoration:none}
.auth-banner a:hover{text-decoration:underline}
</style>
</head>
<body>

<div class="app">
  <!-- ===== TOP BAR ===== -->
  <header class="topbar">
    <a class="brand-mark" href="index.html" title="Back to Brandofme">
      <span class="lo">← back</span>
      <b>brand</b><i>ofme</i><em>.ai</em>
      <span class="editor">(video studio)</span>
    </a>
    <div class="proj-title">
      <span class="dot"></span>
      <input id="projName" value="Untitled video" maxlength="40" spellcheck="false">
    </div>
    <div class="topbar-spacer"></div>

    <div class="dd" id="prevDD">
      <button class="btn" id="prevBtn"><span class="ic">⟲</span> Previous projects <span style="opacity:.5">▾</span></button>
      <div class="dd-menu" id="prevMenu">
        <div class="dd-h">Recent projects</div>
        <div id="prevList"></div>
      </div>
    </div>
    <button class="btn btn-new" id="newBtn"><span class="ic">+</span> New project</button>
    <button class="btn btn-ghost" onclick="window.open('/u/' + (window.bomMe?.slug || 'me'), '_blank')">View live page ↗</button>
  </header>

  <!-- ===== AUTH BANNER ===== -->
  <div class="auth-banner" id="authBanner">
    <span>👋 You're working as a guest — projects only save in this browser. <a href="/#signup">Sign up free</a> to sync across devices.</span>
    <a href="/#signup">Sign up →</a>
  </div>

  <!-- ===== EDITOR ===== -->
  <div class="editor">
    <!-- LEFT: format/mode/theme controls -->
    <aside class="lpane">
      <h4>Format</h4>
      <div class="opts">
        <button class="opt active" data-vs="fmt" data-val="landscape"><span class="opt-ic">▭</span> Landscape <small>16:9</small></button>
        <button class="opt" data-vs="fmt" data-val="portrait"><span class="opt-ic">▯</span> Portrait <small>9:16</small></button>
        <button class="opt" data-vs="fmt" data-val="square"><span class="opt-ic">□</span> Square <small>1:1</small></button>
      </div>

      <h4>Mode</h4>
      <div class="opts">
        <button class="opt active" data-vs="mode" data-val="sting"><span class="opt-ic">⚡</span> Brand sting <small>5s</small></button>
        <button class="opt" data-vs="mode" data-val="about"><span class="opt-ic">🎙</span> About-me <small>12s</small></button>
      </div>

      <h4>Theme</h4>
      <div class="opts">
        <button class="opt active" data-vs="theme" data-val="nebula"><span class="opt-ic">☁</span> Nebula</button>
        <button class="opt" data-vs="theme" data-val="grid"><span class="opt-ic">▦</span> Gridwave</button>
        <button class="opt" data-vs="theme" data-val="particle"><span class="opt-ic">✦</span> Particles</button>
        <button class="opt" data-vs="theme" data-val="aurora"><span class="opt-ic">~</span> Aurora</button>
      </div>

      <h4>Sound</h4>
      <div class="opts">
        <button class="opt active" data-vs="sound" data-val="sigil"><span class="opt-ic">♪</span> Sigil</button>
        <button class="opt" data-vs="sound" data-val="pulse"><span class="opt-ic">♪+</span> Sigil + Pulse</button>
        <button class="opt" data-vs="sound" data-val="muted"><span class="opt-ic">🔇</span> Muted</button>
      </div>
    </aside>

    <!-- CENTER: preview canvas -->
    <main class="cpane">
      <div class="preview-wrap">
        <div class="preview-frame">
          <canvas id="vsCanvas" width="1280" height="720"></canvas>
        </div>
      </div>
      <div class="actionbar">
        <div class="actionbar-l">
          <button class="btn" id="playBtn"><span class="ic">▶</span> Preview</button>
          <span class="status" id="status">Ready</span>
        </div>
        <div class="actionbar-r">
          <button class="btn" id="saveBtn"><span class="ic">💾</span> Save project</button>
          <button class="btn btn-primary" id="exportBtn"><span class="ic">⬇</span> Render & download</button>
        </div>
      </div>
    </main>

    <!-- RIGHT: name + color + project info -->
    <aside class="rpane">
      <h4>Your name</h4>
      <div class="field">
        <input type="text" id="vsName" placeholder="e.g. Ghokkul Muhunthan" maxlength="32" autocomplete="off">
      </div>

      <h4>Accent color</h4>
      <div class="field">
        <div class="field-row">
          <input type="color" id="vsColor" value="#FF4B4B">
          <code id="vsColorHex">#FF4B4B</code>
        </div>
      </div>

      <h4>Project info</h4>
      <div class="info-card">
        <div class="ic-row"><span>Created</span><span id="metaCreated">just now</span></div>
        <div class="ic-row"><span>Last edited</span><span id="metaEdited">just now</span></div>
        <div class="ic-row"><span>Resolution</span><span id="metaRes">1280 × 720</span></div>
        <div class="ic-row"><span>Project ID</span><span id="metaId">—</span></div>
      </div>

      <h4>Tips</h4>
      <p style="font-size:12.5px;color:var(--muted);margin:0;line-height:1.55">
        Press <code style="font-family:var(--mono);background:var(--bg3);padding:1px 5px;border-radius:4px;font-size:11px">▶ Preview</code> to see the animation. <code style="font-family:var(--mono);background:var(--bg3);padding:1px 5px;border-radius:4px;font-size:11px">⬇ Render</code> downloads a 1080p frame. <code style="font-family:var(--mono);background:var(--bg3);padding:1px 5px;border-radius:4px;font-size:11px">💾 Save</code> stores the project so you can come back to it.
      </p>
    </aside>
  </div>
</div>

<div class="toast" id="toast"></div>

<!-- Shared engine (relative path so it works from /video-studio/) -->
<script src="../frontend/brand-engine.js"></script>
<script>
'use strict';

// ============================================================
// STATE
// ============================================================
const KEY = 'bom_vs_projects';   // localStorage key for all projects
const CUR_KEY = 'bom_vs_current'; // currently-open project id
const state = {
  id:       null,
  name:     'Untitled video',
  brandName:'',
  fmt:      'landscape',
  mode:     'sting',
  theme:    'nebula',
  sound:    'sigil',
  color:    '#FF4B4B',
  created:  null,
  updated:  null,
  dirty:    false,
  anim:     null
};

// expose minimal user info if signed in (read from main site's bom_token)
window.bomMe = null;

// ============================================================
// AUTH CHECK — read bom_token from same-origin localStorage
// ============================================================
(async function checkAuth(){
  const token = localStorage.getItem('bom_token');
  if (!token){
    document.getElementById('authBanner').classList.add('show');
    return;
  }
  try {
    const r = await fetch('/api/me', { headers: { Authorization: 'Bearer ' + token } });
    if (!r.ok) throw new Error('401');
    const { user } = await r.json();
    window.bomMe = user;
    const p0 = user.profiles && user.profiles[0];
    if (p0 && p0.color)  { state.color = p0.color; document.getElementById('vsColor').value = p0.color; document.getElementById('vsColorHex').textContent = p0.color; }
    if (p0 && p0.name)   { state.brandName = p0.name; document.getElementById('vsName').value = p0.name; }
    window.bomMe.slug = p0?.slug || user.slug || 'me';
  } catch {
    document.getElementById('authBanner').classList.add('show');
  }
})();

// ============================================================
// PROJECT STORAGE
// ============================================================
function loadAll(){
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
function saveAll(list){
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch(e){ console.warn(e); }
}
function newId(){ return 'vs_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7); }

function newProject(skipPrompt){
  if (state.dirty && !skipPrompt){
    saveCurrent();  // auto-save before switching
  }
  state.id = newId();
  state.name = 'Untitled video';
  state.brandName = (window.bomMe?.profiles?.[0]?.name) || '';
  state.fmt = 'landscape';
  state.mode = 'sting';
  state.theme = 'nebula';
  state.sound = 'sigil';
  state.color = window.bomMe?.profiles?.[0]?.color || '#FF4B4B';
  state.created = Date.now();
  state.updated = Date.now();
  state.dirty = false;
  paint();
  localStorage.setItem(CUR_KEY, state.id);
  toast('✨ New project started');
}
function saveCurrent(){
  if (!state.id) state.id = newId();
  state.updated = Date.now();
  if (!state.created) state.created = state.updated;
  const list = loadAll();
  const idx = list.findIndex(p => p.id === state.id);
  const snapshot = {
    id: state.id, name: state.name, brandName: state.brandName,
    fmt: state.fmt, mode: state.mode, theme: state.theme, sound: state.sound,
    color: state.color, created: state.created, updated: state.updated
  };
  if (idx >= 0) list[idx] = snapshot;
  else list.unshift(snapshot);
  saveAll(list);
  localStorage.setItem(CUR_KEY, state.id);
  state.dirty = false;
  paintMeta();
  paintPrev();
  toast('✓ Project saved');
}
function loadProject(id){
  const list = loadAll();
  const p = list.find(x => x.id === id);
  if (!p) return;
  if (state.dirty) saveCurrent();
  Object.assign(state, p);
  state.dirty = false;
  paint();
  localStorage.setItem(CUR_KEY, id);
  toast('Loaded "' + p.name + '"');
}
function deleteProject(id, ev){
  if (ev) ev.stopPropagation();
  if (!confirm('Delete this project? This cannot be undone.')) return;
  const list = loadAll().filter(p => p.id !== id);
  saveAll(list);
  if (state.id === id) newProject(true);
  paintPrev();
}

// ============================================================
// PAINTING — fill UI from state
// ============================================================
function paint(){
  document.getElementById('projName').value = state.name;
  document.getElementById('vsName').value = state.brandName;
  document.getElementById('vsColor').value = state.color;
  document.getElementById('vsColorHex').textContent = state.color;
  // active options
  document.querySelectorAll('.opt[data-vs]').forEach(b => {
    const k = b.dataset.vs, v = b.dataset.val;
    b.classList.toggle('active', state[k] === v);
  });
  applyFormat();
  drawStatic();
  paintMeta();
}
function paintMeta(){
  document.getElementById('metaCreated').textContent = state.created ? timeAgo(state.created) : 'just now';
  document.getElementById('metaEdited').textContent  = state.updated ? timeAgo(state.updated) : 'just now';
  document.getElementById('metaId').textContent      = state.id ? state.id.slice(3, 12) : '—';
  const c = document.getElementById('vsCanvas');
  document.getElementById('metaRes').textContent = c.width + ' × ' + c.height;
}
function paintPrev(){
  const list = loadAll().sort((a,b) => b.updated - a.updated).slice(0, 10);
  const wrap = document.getElementById('prevList');
  if (!list.length){
    wrap.innerHTML = '<div class="dd-i empty">No saved projects yet</div>';
    return;
  }
  wrap.innerHTML = list.map(p => {
    const isCurrent = p.id === state.id;
    return '<div class="dd-i" data-load="' + p.id + '"' + (isCurrent ? ' style="background:rgba(255,75,75,.08)"' : '') + '>' +
           '<span class="swatch" style="background:' + p.color + '"></span>' +
           '<span>' + escHTML(p.name) + (isCurrent ? ' · <em style="color:var(--accent);font-style:normal">open</em>' : '') + '</span>' +
           '<small>' + timeAgo(p.updated) + '</small>' +
           '<span style="margin-left:6px;opacity:.5;cursor:pointer" onclick="event.stopPropagation();deleteProject(\'' + p.id + '\', event)" title="Delete">×</span>' +
           '</div>';
  }).join('');
}
function timeAgo(ts){
  const d = Date.now() - ts;
  if (d < 60e3)   return 'just now';
  if (d < 3600e3) return Math.floor(d / 60e3) + 'm ago';
  if (d < 864e5)  return Math.floor(d / 3600e3) + 'h ago';
  return Math.floor(d / 864e5) + 'd ago';
}
function escHTML(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

// ============================================================
// CANVAS RENDER
// ============================================================
function applyFormat(){
  const c = document.getElementById('vsCanvas');
  if (state.fmt === 'landscape')      { c.width = 1280; c.height = 720;  }
  else if (state.fmt === 'portrait')  { c.width =  720; c.height = 1280; }
  else                                 { c.width = 1080; c.height = 1080; }
  paintMeta();
}
function drawStatic(){
  const c = document.getElementById('vsCanvas');
  const ctx = c.getContext('2d');
  drawFrame(ctx, c.width, c.height, state.brandName || 'Your Name', state.color, 0.5);
}
function drawFrame(ctx, W, H, name, accent, t){
  // gradient bg by theme
  const g = ctx.createLinearGradient(0, 0, W, H);
  if (state.theme === 'grid'){
    g.addColorStop(0, '#0a0d14'); g.addColorStop(1, mix(accent, '#0a0d14', 0.55));
  } else if (state.theme === 'particle'){
    g.addColorStop(0, mix(accent, '#1a1145', 0.30)); g.addColorStop(1, '#0a0826');
  } else if (state.theme === 'aurora'){
    g.addColorStop(0, mix(accent, '#1a0a3a', 0.40));
    g.addColorStop(0.5, mix(accent, '#0a1f4a', 0.30));
    g.addColorStop(1, '#040a1f');
  } else { // nebula default
    g.addColorStop(0, '#1A1145'); g.addColorStop(0.5, '#2B2270'); g.addColorStop(1, '#0F0826');
  }
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  // theme decoration
  if (state.theme === 'grid'){
    ctx.strokeStyle = withAlpha(accent, 0.18);
    ctx.lineWidth = 1;
    const step = Math.min(W, H) / 18;
    for (let x = 0; x < W; x += step){ ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += step){ ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  } else if (state.theme === 'aurora'){
    // soft waves
    for (let i = 0; i < 3; i++){
      ctx.fillStyle = withAlpha(accent, 0.10 - i * 0.02);
      ctx.beginPath();
      ctx.ellipse(W/2 + Math.sin(t * 2 + i) * W * 0.1, H * (0.3 + i * 0.2), W * 0.8, H * 0.18, 0, 0, Math.PI*2);
      ctx.fill();
    }
  }
  // particles always-on
  for (let i = 0; i < 50; i++){
    const seed = i * 37 + (name.length || 4);
    const x = ((seed * 31) % W);
    const y = ((seed * 17) % H);
    const r = (((seed * 7) % 20) / 10) + 0.4;
    ctx.fillStyle = 'rgba(255,255,255,' + (0.15 + (i%5)/14) + ')';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }

  // central monogram + name composition
  const cx = W/2, cy = H * (state.mode === 'about' ? 0.34 : 0.42);
  // rings
  for (let r = 60; r <= 180; r += 40){
    ctx.strokeStyle = withAlpha(accent, (220 - r) / 280);
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r * Math.min(W, H) / 720, 0, Math.PI*2); ctx.stroke();
  }
  // monogram chip
  const chipR = Math.min(W, H) * 0.08;
  ctx.fillStyle = accent;
  roundRect(ctx, cx - chipR, cy - chipR, chipR * 2, chipR * 2, chipR / 4); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '800 ' + Math.round(chipR * 1.05) + 'px "Unbounded",sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const init = name.split(/\s+/).map(s => s[0] || '').slice(0, 2).join('').toUpperCase() || 'YN';
  ctx.fillText(init, cx, cy + 4);

  // name
  ctx.font = '800 ' + Math.round(Math.min(W, H) * 0.06) + 'px "Unbounded",sans-serif';
  ctx.fillStyle = '#fff';
  ctx.fillText(name, cx, cy + chipR * 2.4);

  // url
  ctx.font = '500 ' + Math.round(Math.min(W, H) * 0.024) + 'px "Instrument Sans",sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,.65)';
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'you';
  ctx.fillText('brandofme.ai/' + slug, cx, cy + chipR * 2.4 + Math.min(W, H) * 0.05);

  // mode label
  ctx.font = '600 ' + Math.round(Math.min(W, H) * 0.018) + 'px "IBM Plex Mono",monospace';
  ctx.fillStyle = withAlpha(accent, 0.95);
  const label = state.mode === 'about' ? '— ABOUT ME —' : '— BRAND STING —';
  ctx.fillText(label, cx, H * 0.91);

  // about-me extra hooks
  if (state.mode === 'about'){
    ctx.font = '500 ' + Math.round(Math.min(W, H) * 0.022) + 'px "Instrument Sans",sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,.78)';
    ctx.fillText('Founder · Builder · Storyteller', cx, H * 0.74);
  }

  // progress bar
  if (t < 1){
    ctx.fillStyle = withAlpha(accent, 1);
    ctx.fillRect(0, H - 6, W * t, 6);
  }
}
function roundRect(ctx, x, y, w, h, r){
  ctx.beginPath(); ctx.moveTo(x+r, y); ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r); ctx.arcTo(x, y+h, x, y, r); ctx.arcTo(x, y, x+w, y, r); ctx.closePath();
}
function withAlpha(hex, a){
  const n = parseInt(hex.slice(1), 16);
  return 'rgba(' + ((n>>16)&255) + ',' + ((n>>8)&255) + ',' + (n&255) + ',' + a + ')';
}
function mix(a, b, t){
  const ax = parseInt(a.slice(1), 16), bx = parseInt(b.slice(1), 16);
  const r = Math.round(((ax>>16)&255) + (((bx>>16)&255) - ((ax>>16)&255)) * t);
  const g = Math.round(((ax>>8)&255)  + (((bx>>8)&255)  - ((ax>>8)&255))  * t);
  const bl= Math.round((ax&255)        + ((bx&255)        - (ax&255))      * t);
  return '#' + ((r<<16)|(g<<8)|bl).toString(16).padStart(6, '0');
}

// ============================================================
// PREVIEW PLAYBACK
// ============================================================
function playPreview(){
  const c = document.getElementById('vsCanvas');
  const ctx = c.getContext('2d');
  const start = performance.now();
  const DUR = state.mode === 'about' ? 12000 : 5000;
  if (state.anim) cancelAnimationFrame(state.anim);
  document.getElementById('status').textContent = '● Playing preview';
  const playBtn = document.getElementById('playBtn');
  playBtn.innerHTML = '<span class="ic">⏸</span> Stop';
  function frame(){
    const t = Math.min(1, (performance.now() - start) / DUR);
    drawFrame(ctx, c.width, c.height, state.brandName || 'Your Name', state.color, t);
    if (t < 1) state.anim = requestAnimationFrame(frame);
    else {
      document.getElementById('status').textContent = '✓ Preview complete';
      playBtn.innerHTML = '<span class="ic">▶</span> Preview';
      state.anim = null;
    }
  }
  frame();
}

// ============================================================
// EXPORT (1080p PNG of final frame)
// ============================================================
function exportRender(){
  const c = document.getElementById('vsCanvas');
  if (!c.toBlob){ toast('Browser does not support export.'); return; }
  // ensure we draw the final state
  drawFrame(c.getContext('2d'), c.width, c.height, state.brandName || 'Your Name', state.color, 1);
  c.toBlob(blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const slug = (state.brandName || 'video').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    a.download = slug + '-' + state.fmt + '-' + state.mode + '.png';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    document.getElementById('status').textContent = '✓ Downloaded ' + a.download;
    toast('⬇ Rendered & downloaded');
  }, 'image/png');
}

// ============================================================
// WIRING
// ============================================================
function dirty(){ state.dirty = true; state.updated = Date.now(); paintMeta(); }

document.getElementById('projName').addEventListener('input', e => {
  state.name = e.target.value.trim() || 'Untitled video';
  dirty();
});
document.getElementById('vsName').addEventListener('input', e => {
  state.brandName = e.target.value;
  drawStatic();
  dirty();
});
document.getElementById('vsColor').addEventListener('input', e => {
  state.color = e.target.value;
  document.getElementById('vsColorHex').textContent = state.color;
  drawStatic();
  dirty();
});
document.querySelectorAll('.opt[data-vs]').forEach(b => {
  b.addEventListener('click', () => {
    const k = b.dataset.vs, v = b.dataset.val;
    document.querySelectorAll('.opt[data-vs="' + k + '"]').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    state[k] = v;
    if (k === 'fmt') applyFormat();
    drawStatic();
    dirty();
  });
});
document.getElementById('newBtn').addEventListener('click', () => newProject(false));
document.getElementById('saveBtn').addEventListener('click', saveCurrent);
document.getElementById('exportBtn').addEventListener('click', exportRender);
document.getElementById('playBtn').addEventListener('click', () => {
  if (state.anim){ cancelAnimationFrame(state.anim); state.anim = null; drawStatic(); document.getElementById('playBtn').innerHTML = '<span class="ic">▶</span> Preview'; }
  else playPreview();
});

// Previous-projects dropdown
const prevDD = document.getElementById('prevDD');
document.getElementById('prevBtn').addEventListener('click', () => {
  paintPrev();
  prevDD.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!prevDD.contains(e.target)) prevDD.classList.remove('open');
});
document.getElementById('prevList').addEventListener('click', e => {
  const r = e.target.closest('[data-load]');
  if (r){ loadProject(r.dataset.load); prevDD.classList.remove('open'); }
});

// Toast
let toastT;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 2400);
}

// Boot — load last-open project, or start fresh
(function boot(){
  const lastId = localStorage.getItem(CUR_KEY);
  const list = loadAll();
  const last = lastId ? list.find(p => p.id === lastId) : null;
  if (last){
    Object.assign(state, last);
    state.dirty = false;
  } else {
    state.id = newId();
    state.created = state.updated = Date.now();
  }
  paint();
  paintPrev();
})();
</script>
</body>
</html>
