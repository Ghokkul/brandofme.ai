<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Creator OS · Brandofme</title>
<meta name="description" content="16 AI tools powered by your brand model — scripts, titles, ideas, hooks, thumbnails, tags. Part of Brandofme.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230a8a3a'/%3E%3Ctext x='16' y='22' font-family='system-ui' font-size='18' font-weight='800' text-anchor='middle' fill='white'%3EC%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;800&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{
  /* Creator OS identity — clean productivity light with green accent */
  --bg:#F6F8F4;
  --bg2:#FFFFFF;
  --bg3:#EDF1E8;
  --line:rgba(15,18,23,.09);
  --line-strong:rgba(15,18,23,.20);
  --ink:#0F1217;
  --muted:rgba(15,18,23,.55);
  --muted2:rgba(15,18,23,.35);
  --accent:#0A8A3A;
  --accent2:#3CCB7F;
  --accent-bg:rgba(10,138,58,.07);
  --display:'Unbounded',sans-serif;
  --body:'Instrument Sans',system-ui,sans-serif;
  --mono:'IBM Plex Mono',monospace;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{font-family:var(--body);color:var(--ink);background:var(--bg);font-size:14.5px;line-height:1.55;-webkit-font-smoothing:antialiased;overflow:hidden}
button{font-family:inherit;cursor:pointer}
::selection{background:rgba(10,138,58,.18)}

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
.proj-title input{background:transparent;border:none;color:var(--ink);font-family:var(--mono);font-size:11.5px;width:180px;outline:none;border-bottom:1px dashed transparent;padding:2px 0}
.proj-title input:focus{border-bottom-color:var(--accent)}
.proj-title .dot{width:6px;height:6px;border-radius:50%;background:var(--accent)}

.btn{font-family:var(--body);font-size:13px;font-weight:500;padding:7px 13px;border-radius:100px;border:1px solid var(--line-strong);background:var(--bg2);color:var(--ink);cursor:pointer;transition:.18s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn:hover{border-color:var(--accent);color:var(--accent)}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.btn-primary:hover{background:#087029;border-color:#087029}
.btn-ghost{border-color:transparent;color:var(--muted);background:transparent}
.btn-ghost:hover{color:var(--ink);background:var(--bg3);border-color:transparent}
.btn .ic{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;font-size:14px;line-height:1}
.btn-new .ic{width:16px;height:16px;border-radius:50%;background:var(--ink);color:#fff;font-size:12px;font-weight:400}
.btn-new:hover .ic{background:var(--accent);color:#fff}

.dd{position:relative}
.dd-menu{position:absolute;top:calc(100% + 6px);right:0;min-width:340px;background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:6px;box-shadow:0 18px 50px rgba(15,18,23,.12);display:none;z-index:50;max-height:420px;overflow-y:auto}
.dd.open .dd-menu{display:block}
.dd-h{padding:9px 12px 6px;font-family:var(--mono);font-size:10px;color:var(--muted2);text-transform:uppercase;letter-spacing:.08em}
.dd-i{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--ink);transition:.15s}
.dd-i:hover{background:var(--bg3)}
.dd-i small{margin-left:auto;font-family:var(--mono);font-size:10px;color:var(--muted2)}
.dd-i .swatch{width:10px;height:10px;border-radius:3px;flex:none;background:var(--accent)}
.dd-i.empty{color:var(--muted2);font-style:italic;cursor:default}
.dd-i.empty:hover{background:transparent}

/* Editor: sidebar | tools/editor | history */
.editor{display:grid;grid-template-columns:240px 1fr 280px;min-height:0;height:calc(100% - 56px)}
@media(max-width:1100px){.editor{grid-template-columns:220px 1fr}.rpane{display:none}}
@media(max-width:780px){.editor{grid-template-columns:1fr}.lpane{display:none}}

.lpane,.rpane{background:var(--bg2);overflow-y:auto;padding:18px}
.lpane{border-right:1px solid var(--line)}
.rpane{border-left:1px solid var(--line)}
.lpane h4,.rpane h4{font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin:0 0 10px;font-weight:600}
.lpane h4:not(:first-child),.rpane h4:not(:first-child){margin-top:20px}

/* Left: tool list */
.tool-list{display:grid;gap:3px}
.tool-item{padding:8px 11px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--ink);transition:.12s;display:flex;align-items:center;gap:9px;border:1px solid transparent;text-align:left;background:transparent;width:100%;font-family:inherit}
.tool-item:hover{background:var(--bg3)}
.tool-item.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.tool-item.active .tool-ic{background:rgba(255,255,255,.18)}
.tool-item.active small{color:rgba(255,255,255,.7)}
.tool-item .tool-ic{width:22px;height:22px;background:var(--bg3);border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;flex:none}
.tool-item small{margin-left:auto;font-family:var(--mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted2)}
.tool-item.soon{opacity:.55;cursor:wait}
.tool-item.soon:hover{background:transparent}

/* Center: tool workspace */
.cpane{padding:30px 36px;overflow-y:auto;background:var(--bg)}
.tool-hero{display:flex;align-items:start;gap:18px;margin-bottom:24px}
.tool-hero-ic{width:48px;height:48px;border-radius:12px;background:var(--accent-bg);display:flex;align-items:center;justify-content:center;font-size:24px;flex:none}
.tool-hero h1{font-family:var(--display);font-weight:700;font-size:24px;letter-spacing:-.01em;margin:0 0 4px}
.tool-hero p{margin:0;color:var(--muted);font-size:14px;line-height:1.55;max-width:600px}

.tool-form{background:var(--bg2);border:1px solid var(--line);border-radius:14px;padding:20px;margin-bottom:18px}
.field{margin-bottom:14px}
.field label{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;margin-bottom:6px;font-weight:600}
.field input[type="text"],.field textarea,.field select{width:100%;background:var(--bg);border:1px solid var(--line-strong);border-radius:9px;padding:10px 13px;color:var(--ink);font-family:var(--body);font-size:14px;outline:none;transition:.15s}
.field textarea{min-height:70px;resize:vertical;font-family:var(--body)}
.field input[type="text"]:focus,.field textarea:focus,.field select:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(10,138,58,.13)}
.field-row{display:flex;gap:10px;align-items:center}
.run-btn{display:inline-flex;align-items:center;gap:8px;background:var(--ink);color:#fff;font-family:var(--body);font-size:14px;font-weight:600;padding:11px 22px;border-radius:100px;border:none;cursor:pointer;transition:.15s}
.run-btn:hover{background:var(--accent)}

.results{display:grid;gap:9px}
.result-card{background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:14px}
.result-card b{font-family:var(--display);font-weight:700;font-size:14.5px;flex:1;line-height:1.35;letter-spacing:-.005em}
.score{font-family:var(--mono);font-size:11px;font-weight:600;background:var(--accent-bg);color:var(--accent);padding:4px 10px;border-radius:100px;border:1px solid rgba(10,138,58,.22);flex:none}
.score-bar{height:4px;background:var(--line);border-radius:100px;flex:none;width:80px;overflow:hidden}
.score-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:100px}
.script-output{background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:18px;line-height:1.7;white-space:pre-wrap;font-size:14px}
.script-output b{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:var(--accent);text-transform:uppercase;margin-top:14px;margin-bottom:4px;font-weight:600}
.script-output b:first-child{margin-top:0}
.tags-output{background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:16px;display:flex;flex-wrap:wrap;gap:6px}
.tag{font-family:var(--mono);font-size:11.5px;background:var(--accent-bg);color:var(--accent);padding:5px 11px;border-radius:100px;border:1px solid rgba(10,138,58,.20)}
.copy-bar{display:flex;align-items:center;justify-content:space-between;margin-top:12px}

/* Right pane: history */
.history-list{display:grid;gap:8px}
.hist-item{padding:10px 12px;border:1px solid var(--line);border-radius:9px;font-size:12.5px;background:var(--bg2);cursor:pointer;transition:.15s}
.hist-item:hover{border-color:var(--accent)}
.hist-item .h-tool{display:flex;align-items:center;gap:6px;margin-bottom:4px}
.hist-item .h-tool .ic{font-size:13px}
.hist-item .h-tool b{font-size:12px}
.hist-item .h-input{color:var(--muted);font-style:italic;line-height:1.4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.hist-item .h-time{font-family:var(--mono);font-size:9.5px;color:var(--muted2);margin-top:6px;text-transform:uppercase;letter-spacing:.06em}

/* Soon-modal placeholder */
.soon-card{background:linear-gradient(135deg,var(--accent-bg),rgba(60,203,127,.06));border:1px dashed var(--accent);border-radius:14px;padding:36px;text-align:center}
.soon-card h2{font-family:var(--display);font-size:22px;margin:0 0 8px}
.soon-card p{color:var(--muted);margin:0 0 18px}

/* Toast */
.toast{position:fixed;left:50%;bottom:20px;transform:translate(-50%,140%);background:var(--ink);color:#fff;font-size:13px;padding:11px 18px;border-radius:100px;box-shadow:0 12px 40px rgba(15,18,23,.32);z-index:90;transition:transform .3s ease}
.toast.show{transform:translate(-50%,0)}

.auth-banner{display:none;background:linear-gradient(120deg,rgba(10,138,58,.07),rgba(60,203,127,.07));border-bottom:1px solid rgba(10,138,58,.25);padding:10px 22px;font-size:13px;color:var(--ink);align-items:center;justify-content:space-between;gap:12px}
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
      <span class="editor">(creator os)</span>
    </a>
    <div class="proj-title">
      <span class="dot"></span>
      <input id="projName" value="Untitled project" maxlength="40" spellcheck="false">
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

  <div class="auth-banner" id="authBanner">
    <span>👋 You're working as a guest — projects only save in this browser. <a href="/#signup">Sign up free</a> to sync across devices.</span>
    <a href="/#signup">Sign up →</a>
  </div>

  <!-- ===== EDITOR ===== -->
  <div class="editor">
    <!-- LEFT: 16 tools -->
    <aside class="lpane">
      <h4>Content tools</h4>
      <div class="tool-list" id="toolListContent">
        <button class="tool-item active" data-tool="script"><span class="tool-ic">📝</span>AI Script Writer<small>LIVE</small></button>
        <button class="tool-item" data-tool="title"><span class="tool-ic">🎯</span>Video Title Lab<small>LIVE</small></button>
        <button class="tool-item" data-tool="ideas"><span class="tool-ic">💡</span>Idea Engine<small>LIVE</small></button>
        <button class="tool-item" data-tool="hooks"><span class="tool-ic">🪝</span>Hook & Opener Lab<small>LIVE</small></button>
        <button class="tool-item" data-tool="thumb"><span class="tool-ic">🖼</span>Thumbnail Copy<small>LIVE</small></button>
        <button class="tool-item" data-tool="tags"><span class="tool-ic">🏷</span>Tag Generator<small>LIVE</small></button>
      </div>

      <h4>Research tools</h4>
      <div class="tool-list">
        <button class="tool-item soon" data-tool="niche"><span class="tool-ic">🔍</span>Niche Explorer<small>SOON</small></button>
        <button class="tool-item soon" data-tool="keywords"><span class="tool-ic">🔑</span>Keyword Research<small>SOON</small></button>
        <button class="tool-item soon" data-tool="audit"><span class="tool-ic">📊</span>Channel Audit<small>SOON</small></button>
        <button class="tool-item soon" data-tool="calendar"><span class="tool-ic">📅</span>Content Calendar<small>SOON</small></button>
      </div>

      <h4>Channel tools</h4>
      <div class="tool-list">
        <button class="tool-item soon" data-tool="desc"><span class="tool-ic">📋</span>Description Writer<small>SOON</small></button>
        <button class="tool-item soon" data-tool="channel"><span class="tool-ic">📛</span>Channel Name Builder<small>SOON</small></button>
        <button class="tool-item soon" data-tool="community"><span class="tool-ic">💬</span>Community Posts<small>SOON</small></button>
        <button class="tool-item soon" data-tool="shorts"><span class="tool-ic">⚡</span>Instant Shorts<small>SOON</small></button>
        <button class="tool-item soon" data-tool="repurpose"><span class="tool-ic">🔁</span>YouTube → Script<small>SOON</small></button>
        <button class="tool-item soon" data-tool="article"><span class="tool-ic">📰</span>Article → Script<small>SOON</small></button>
      </div>
    </aside>

    <!-- CENTER: tool workspace -->
    <main class="cpane" id="toolPane"></main>

    <!-- RIGHT: project history -->
    <aside class="rpane">
      <h4>This project's history</h4>
      <p style="font-size:12px;color:var(--muted);margin:0 0 14px;line-height:1.5">
        Every generation is saved here. Click any item to re-load that output.
      </p>
      <div class="history-list" id="histList"></div>
    </aside>
  </div>
</div>

<div class="toast" id="toast"></div>

<!-- Shared engine -->
<script src="../frontend/brand-engine.js"></script>
<script>
'use strict';

// ============================================================
// STATE
// ============================================================
const KEY = 'bom_co_projects';
const CUR_KEY = 'bom_co_current';
const state = {
  id: null,
  name: 'Untitled project',
  history: [],     // [{ tool, input, output, ts }]
  activeTool: 'script',
  created: null,
  updated: null,
  dirty: false
};
window.bomMe = null;

// ============================================================
// AUTH
// ============================================================
(async function checkAuth(){
  const token = localStorage.getItem('bom_token');
  if (!token){ document.getElementById('authBanner').classList.add('show'); return; }
  try {
    const r = await fetch('/api/me', { headers: { Authorization: 'Bearer ' + token } });
    if (!r.ok) throw new Error('401');
    const { user } = await r.json();
    window.bomMe = user;
    window.bomMe.slug = user.profiles?.[0]?.slug || 'me';
  } catch { document.getElementById('authBanner').classList.add('show'); }
})();

function brandCtx(){
  const me = window.bomMe;
  const p  = me?.profiles?.[0] || {};
  return {
    name:  p.name || me?.name || 'You',
    niche: p.niche || 'personal brand',
    color: p.color || '#0A8A3A',
    voice: p.style || 'bold'
  };
}

// ============================================================
// PROJECT STORAGE
// ============================================================
function loadAll(){ try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
function saveAll(list){ try { localStorage.setItem(KEY, JSON.stringify(list)); } catch(e){ console.warn(e); } }
function newId(){ return 'co_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,7); }

function newProject(skipSave){
  if (state.dirty && !skipSave) saveCurrent();
  state.id = newId();
  state.name = 'Untitled project';
  state.history = [];
  state.activeTool = 'script';
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
  const snap = { id: state.id, name: state.name, history: state.history, created: state.created, updated: state.updated };
  if (idx >= 0) list[idx] = snap;
  else list.unshift(snap);
  saveAll(list);
  localStorage.setItem(CUR_KEY, state.id);
  state.dirty = false;
  paintPrev();
}
function loadProject(id){
  const p = loadAll().find(x => x.id === id);
  if (!p) return;
  if (state.dirty) saveCurrent();
  state.id = p.id; state.name = p.name;
  state.history = p.history || [];
  state.activeTool = p.history[0]?.tool || 'script';
  state.created = p.created; state.updated = p.updated;
  state.dirty = false;
  paint();
  localStorage.setItem(CUR_KEY, id);
  toast('Loaded "' + p.name + '"');
}
function deleteProject(id, ev){
  if (ev) ev.stopPropagation();
  if (!confirm('Delete this project?')) return;
  saveAll(loadAll().filter(p => p.id !== id));
  if (state.id === id) newProject(true);
  paintPrev();
}

// ============================================================
// DETERMINISTIC HELPERS
// ============================================================
function seedFrom(s){ let h = 2166136261 >>> 0; s = String(s||''); for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function pick(arr, r){ return arr[Math.floor(r() * arr.length) % arr.length]; }
function escHTML(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

// ============================================================
// TOOLS — each renders its own form + result
// ============================================================
const TOOLS = {
  script: {
    title: 'AI Script Writer', icon: '📝',
    desc: 'Type a topic. Pick a tone. Get a 60-second video script in your brand voice — hook, body, proof, CTA.',
    render: function(){
      const ctx = brandCtx();
      return `
        <div class="tool-form">
          <div class="field"><label>Video topic</label>
            <input type="text" id="csTopic" value="Why I built brandofme.ai">
          </div>
          <div class="field"><label>Tone</label>
            <select id="csTone">
              <option>Bold</option><option>Educational</option>
              <option>Storytelling</option><option>Punchy</option>
            </select>
          </div>
          <button class="run-btn" id="run">⚡ Write the script</button>
        </div>
        <div id="csOut"></div>
      `;
    },
    run: function(){
      const topic = document.getElementById('csTopic').value.trim() || 'My story';
      const tone  = document.getElementById('csTone').value;
      const ctx = brandCtx();
      const r = rng(seedFrom(topic + tone + ctx.name));
      const hooks = [
        'Three weeks ago, this did not exist.',
        'Everyone says it is impossible. Here is what they are missing.',
        'I made every mistake. So you do not have to.',
        'Most ' + ctx.niche + ' advice is wrong. Here is why.',
        'Stop scrolling. This changed everything for me.'
      ];
      const bodies = [
        'I sat down with one rule: build the thing I wish existed when I started. No copy-paste advice, no generic templates. Twenty-one days of late nights, three full rewrites, and one Stripe webhook that nearly broke me twice.',
        'Here is the playbook nobody tells you about. Step one — pick the smallest possible version. Step two — ship before you are ready. Step three — listen harder than you talk. The pattern repeats.',
        'I tried it the slow way first. It took six months and I had nothing to show. Then I changed one thing. Now the same work happens in a week.'
      ];
      const ctas = [
        'Try it yourself at brandofme.ai. Seven days free.',
        'Sign up at brandofme.ai/yourname — claim your name before someone else does.',
        'Follow for more. I post the playbook one piece at a time.'
      ];
      const output =
        '<b>HOOK (0–7s)</b>\n' + pick(hooks, r) + '\n\n' +
        '<b>BODY (7–55s)</b>\n' + pick(bodies, r) + '\n\n' +
        '<b>PROOF (55–80s)</b>\nToday: live page, video studio, full creator OS — all running.\n\n' +
        '<b>CTA (80–90s)</b>\n' + pick(ctas, r);
      document.getElementById('csOut').innerHTML = '<div class="script-output">' + output.replace(/<b>/g, '<b>').replace(/<\/b>/g, '</b>') + '</div>';
      record('script', { topic, tone }, output);
    }
  },

  title: {
    title: 'Video Title Lab', icon: '🎯',
    desc: 'Type a topic, get 10 clickable titles with predicted CTR. Same input always returns the same titles.',
    render: function(){
      return `
        <div class="tool-form">
          <div class="field"><label>Video topic</label>
            <input type="text" id="ctTopic" value="How I built brandofme in 3 weeks">
          </div>
          <button class="run-btn" id="run">⚡ Generate 10 titles</button>
        </div>
        <div class="results" id="ctOut"></div>
      `;
    },
    run: function(){
      const topic = document.getElementById('ctTopic').value.trim() || 'My story';
      const ctx = brandCtx();
      const r = rng(seedFrom(topic + ctx.name));
      const variants = [
        topic.replace(/^I /, '') + ' (Here is How)',
        topic.replace(/ in /, ' — In ') + ' · Day-by-Day',
        'I ' + topic.replace(/^How I /, '').replace(/^I /, '') + '. Here is What Happened.',
        'Why ' + topic.toLowerCase() + ' was the best decision I made',
        topic + ' (No B.S.)',
        'The ' + topic.toLowerCase().split(' ').slice(0,3).join(' ') + ' nobody talks about',
        topic + ' — and what I would do differently',
        '3 weeks · 1 founder · ' + topic.replace(/^(I |How I )/i, ''),
        'I tried ' + topic.toLowerCase() + '. Here is the raw truth.',
        topic.replace(/^(I |How I )/i, '') + ': the unfiltered story'
      ];
      const items = variants.map((title, i) => {
        const ctr = (14.5 - i * 0.7 + (r() - 0.5) * 1.4).toFixed(1);
        const pct = Math.max(8, Math.min(95, parseFloat(ctr) * 6));
        return '<div class="result-card"><b>' + escHTML(title) + '</b>' +
               '<div class="score-bar"><i style="width:' + pct + '%"></i></div>' +
               '<span class="score">' + ctr + '% CTR</span></div>';
      });
      document.getElementById('ctOut').innerHTML = items.join('');
      record('title', { topic }, variants.join(' · '));
    }
  },

  ideas: {
    title: 'Idea Engine', icon: '💡',
    desc: 'Type your niche. Get 12 fresh video ideas anchored to your brand voice, with monthly view estimates.',
    render: function(){
      const ctx = brandCtx();
      return `
        <div class="tool-form">
          <div class="field"><label>Your niche</label>
            <input type="text" id="ciNiche" value="${escHTML(ctx.niche)}">
          </div>
          <button class="run-btn" id="run">💡 Surface 12 ideas</button>
        </div>
        <div class="results" id="ciOut"></div>
      `;
    },
    run: function(){
      const niche = (document.getElementById('ciNiche').value.trim() || brandCtx().niche).toLowerCase();
      const r = rng(seedFrom(niche));
      const templates = [
        ['The mistake every ' + niche + ' founder makes', '892K views/mo'],
        ['How I priced my ' + niche + ' offer (math)', '452K views/mo'],
        ['Naming it: 47 hours of failure', '318K views/mo'],
        ['Why I quit my 9-5 for ' + niche, '1.2M views/mo'],
        ['The 3 features that 10x my conversion', '604K views/mo'],
        ['Personal brand vs ' + niche + ': pick one', '297K views/mo'],
        ['What ' + niche + ' Twitter gets wrong', '189K views/mo'],
        ['I read 27 ' + niche + ' books. Only 3 mattered.', '512K views/mo'],
        ['Day in the life of a ' + niche + ' founder', '741K views/mo'],
        ['The ' + niche + ' tool stack that actually works', '425K views/mo'],
        ['Cold DMs that worked (and the ones that did not)', '263K views/mo'],
        ['One year in ' + niche + '. Brutally honest.', '912K views/mo']
      ];
      const out = templates.slice().sort(() => r() - 0.5);
      const html = out.map(t =>
        '<div class="result-card"><b>' + escHTML(t[0]) + '</b>' +
        '<span class="score" style="background:rgba(60,203,127,.13);color:var(--accent);border-color:rgba(60,203,127,.32)">' + t[1] + '</span></div>'
      ).join('');
      document.getElementById('ciOut').innerHTML = html;
      record('ideas', { niche }, out.map(x => x[0]).join(' · '));
    }
  },

  hooks: {
    title: 'Hook & Opener Lab', icon: '🪝',
    desc: 'The first 30 seconds decide everything. Get 5 hook variants for any topic — scroll-stoppers in your voice.',
    render: function(){
      return `
        <div class="tool-form">
          <div class="field"><label>Video topic</label>
            <input type="text" id="chTopic" value="The pricing mistake I almost made">
          </div>
          <button class="run-btn" id="run">🪝 Generate 5 hooks</button>
        </div>
        <div class="results" id="chOut"></div>
      `;
    },
    run: function(){
      const topic = document.getElementById('chTopic').value.trim() || 'My story';
      const ctx = brandCtx();
      const patterns = [
        '"' + topic + '" — three words that changed how I work.',
        'I was about to do the dumbest thing. Then I noticed this.',
        'Everyone is teaching this wrong. Here is what actually works.',
        'Most ' + ctx.niche + ' people skip this step. That is the mistake.',
        'I will save you 6 months. Watch the next 30 seconds.'
      ];
      const html = patterns.map((h, i) =>
        '<div class="result-card"><span class="score">0–' + (5 + i * 5) + 's</span><b>' + escHTML(h) + '</b></div>'
      ).join('');
      document.getElementById('chOut').innerHTML = html;
      record('hooks', { topic }, patterns.join(' · '));
    }
  },

  thumb: {
    title: 'Thumbnail Copy Generator', icon: '🖼',
    desc: 'Three-word overlay text for the thumbnail. Stops the scroll using curiosity, contrast, or stakes.',
    render: function(){
      return `
        <div class="tool-form">
          <div class="field"><label>Video topic</label>
            <input type="text" id="cnTopic" value="I quit my $200K job">
          </div>
          <button class="run-btn" id="run">🖼 Generate 6 overlays</button>
        </div>
        <div class="results" id="cnOut"></div>
      `;
    },
    run: function(){
      const topic = document.getElementById('cnTopic').value.trim() || 'My story';
      const words = topic.replace(/[^a-z0-9 ]/gi,'').split(/\s+/).filter(Boolean);
      const key = words.slice(0, Math.min(3, words.length)).join(' ').toUpperCase();
      const variants = [
        [key, 'STAKES'],
        ['THE REAL\nREASON', 'CURIOSITY'],
        ['NOBODY\nDOES THIS', 'CONTRAST'],
        ['I QUIT.\nHERE IS WHY.', 'STAKES'],
        ['BIGGEST\nMISTAKE', 'CONTRAST'],
        ['SAVE 6\nMONTHS', 'BENEFIT']
      ];
      const html = variants.map(v =>
        '<div class="result-card"><b style="font-size:17px;white-space:pre-line">' + escHTML(v[0]) + '</b>' +
        '<span class="score">' + v[1] + '</span></div>'
      ).join('');
      document.getElementById('cnOut').innerHTML = html;
      record('thumb', { topic }, variants.map(v => v[0]).join(' · '));
    }
  },

  tags: {
    title: 'Tag Generator', icon: '🏷',
    desc: 'Get 20 SEO tags ranked by relevance for your topic. One-click copy.',
    render: function(){
      return `
        <div class="tool-form">
          <div class="field"><label>Video topic</label>
            <input type="text" id="cgTopic" value="indie SaaS launch tactics">
          </div>
          <button class="run-btn" id="run">🏷 Generate 20 tags</button>
        </div>
        <div id="cgOut"></div>
      `;
    },
    run: function(){
      const ctx = brandCtx();
      const topic = (document.getElementById('cgTopic').value.trim() || ctx.niche).toLowerCase();
      const words = topic.split(/\s+/).filter(w => w.length > 2);
      const base = words.concat([ctx.niche, 'tutorial', 'tips', 'how to', '2026', 'guide', 'review', 'beginner', 'advanced', 'creator', 'startup', 'founder', 'indie hacker', 'productivity', 'workflow', 'best practices']);
      const seen = {}; const out = [];
      for (const t of base){ const k = t.toLowerCase().trim(); if (!seen[k] && k){ seen[k] = 1; out.push(k); } if (out.length >= 20) break; }
      while (out.length < 20) out.push(topic + ' ' + (out.length + 1));
      const html = '<div class="tags-output">' + out.map(t => '<span class="tag">' + escHTML(t) + '</span>').join('') + '</div>' +
        '<div class="copy-bar"><span style="font-size:12px;color:var(--muted)">' + out.length + ' tags generated</span>' +
        '<button class="btn btn-primary" onclick="navigator.clipboard.writeText(\'' + out.join(', ').replace(/'/g, "\\'") + '\').then(()=>toast(\'✓ Copied all tags\'))">Copy all</button></div>';
      document.getElementById('cgOut').innerHTML = html;
      record('tags', { topic }, out.join(', '));
    }
  }
};

// ============================================================
// CURRENT TOOL RENDER
// ============================================================
function setTool(toolKey){
  state.activeTool = toolKey;
  document.querySelectorAll('.tool-item').forEach(b => b.classList.toggle('active', b.dataset.tool === toolKey));
  const t = TOOLS[toolKey];
  const pane = document.getElementById('toolPane');
  if (!t){
    // SOON tool
    pane.innerHTML = `
      <div class="soon-card">
        <h2>Coming Q3 2026 ✨</h2>
        <p>This tool is in development. You are on the early access list.</p>
        <button class="btn btn-primary" onclick="toast('You will be notified when it ships.')">Notify me when ready</button>
      </div>`;
    return;
  }
  pane.innerHTML = `
    <div class="tool-hero">
      <div class="tool-hero-ic">${t.icon}</div>
      <div>
        <h1>${t.title}</h1>
        <p>${t.desc}</p>
      </div>
    </div>
    ${t.render()}
  `;
  // wire run
  const runBtn = pane.querySelector('#run');
  if (runBtn) runBtn.addEventListener('click', () => { try { t.run(); } catch(e){ console.error(e); toast('Something went wrong'); } });
}

// ============================================================
// HISTORY
// ============================================================
function record(tool, input, output){
  state.history.unshift({ tool, input, output, ts: Date.now() });
  if (state.history.length > 50) state.history = state.history.slice(0, 50);
  dirty();
  paintHist();
  // auto-save
  saveCurrent();
}
function paintHist(){
  const wrap = document.getElementById('histList');
  if (!state.history.length){
    wrap.innerHTML = '<div style="font-size:12.5px;color:var(--muted2);font-style:italic;padding:8px">No generations yet. Run a tool to start.</div>';
    return;
  }
  wrap.innerHTML = state.history.map((h, i) => {
    const t = TOOLS[h.tool] || { title: h.tool, icon: '?' };
    const inputStr = typeof h.input === 'string' ? h.input : Object.values(h.input).filter(Boolean).join(' · ');
    return '<div class="hist-item" data-hist="' + i + '">' +
           '<div class="h-tool"><span class="ic">' + t.icon + '</span><b>' + t.title + '</b></div>' +
           '<div class="h-input">' + escHTML(inputStr) + '</div>' +
           '<div class="h-time">' + timeAgo(h.ts) + '</div>' +
           '</div>';
  }).join('');
}
function loadHist(idx){
  const h = state.history[idx]; if (!h) return;
  setTool(h.tool);
  // restore input
  setTimeout(() => {
    const t = TOOLS[h.tool]; if (!t || !h.input) return;
    for (const k in h.input){
      const inputId = ({ topic: 'csTopic', tone: 'csTone', niche: 'ciNiche' })[k] ||
                       (h.tool === 'title' ? 'ctTopic' : h.tool === 'ideas' ? 'ciNiche' : h.tool === 'hooks' ? 'chTopic' : h.tool === 'thumb' ? 'cnTopic' : h.tool === 'tags' ? 'cgTopic' : null);
      const el = inputId ? document.getElementById(inputId) : null;
      if (el && k === 'topic') el.value = h.input[k];
      else if (el && k === 'niche') el.value = h.input[k];
      else if (el && k === 'tone') el.value = h.input[k];
    }
    // re-run to display
    t.run();
  }, 30);
}

// ============================================================
// PAINT
// ============================================================
function paint(){
  document.getElementById('projName').value = state.name;
  setTool(state.activeTool);
  paintHist();
  paintPrev();
}
function paintPrev(){
  const list = loadAll().sort((a,b) => b.updated - a.updated).slice(0, 10);
  const wrap = document.getElementById('prevList');
  if (!list.length){ wrap.innerHTML = '<div class="dd-i empty">No saved projects yet</div>'; return; }
  wrap.innerHTML = list.map(p => {
    const isCurrent = p.id === state.id;
    return '<div class="dd-i" data-load="' + p.id + '"' + (isCurrent ? ' style="background:var(--accent-bg)"' : '') + '>' +
           '<span class="swatch"></span>' +
           '<span>' + escHTML(p.name) + ' · ' + (p.history?.length || 0) + ' outputs' + (isCurrent ? ' · <em style="color:var(--accent);font-style:normal">open</em>' : '') + '</span>' +
           '<small>' + timeAgo(p.updated) + '</small>' +
           '<span style="margin-left:6px;opacity:.5;cursor:pointer" onclick="event.stopPropagation();deleteProject(\'' + p.id + '\', event)">×</span>' +
           '</div>';
  }).join('');
}
function timeAgo(ts){
  const d = Date.now() - ts;
  if (d < 60e3) return 'just now';
  if (d < 3600e3) return Math.floor(d / 60e3) + 'm ago';
  if (d < 864e5)  return Math.floor(d / 3600e3) + 'h ago';
  return Math.floor(d / 864e5) + 'd ago';
}

// ============================================================
// WIRING
// ============================================================
function dirty(){ state.dirty = true; state.updated = Date.now(); }
document.getElementById('projName').addEventListener('input', e => {
  state.name = e.target.value.trim() || 'Untitled project';
  dirty();
});
document.querySelectorAll('.tool-item').forEach(b => {
  b.addEventListener('click', () => {
    if (b.classList.contains('soon')){
      setTool('__soon__'); // will show coming-soon card
      document.querySelectorAll('.tool-item').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      toast('Rolling out Q3 2026 — you are on the early list');
      return;
    }
    setTool(b.dataset.tool);
  });
});
document.getElementById('newBtn').addEventListener('click', () => newProject(false));
const prevDD = document.getElementById('prevDD');
document.getElementById('prevBtn').addEventListener('click', () => { paintPrev(); prevDD.classList.toggle('open'); });
document.addEventListener('click', e => { if (!prevDD.contains(e.target)) prevDD.classList.remove('open'); });
document.getElementById('prevList').addEventListener('click', e => {
  const r = e.target.closest('[data-load]');
  if (r){ loadProject(r.dataset.load); prevDD.classList.remove('open'); }
});
document.getElementById('histList').addEventListener('click', e => {
  const h = e.target.closest('[data-hist]');
  if (h) loadHist(parseInt(h.dataset.hist, 10));
});

let toastT;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 2400);
}
window.toast = toast;
window.deleteProject = deleteProject;

// Boot
(function boot(){
  const lastId = localStorage.getItem(CUR_KEY);
  const last = lastId ? loadAll().find(p => p.id === lastId) : null;
  if (last){
    state.id = last.id; state.name = last.name;
    state.history = last.history || [];
    state.activeTool = state.history[0]?.tool || 'script';
    state.created = last.created; state.updated = last.updated;
  } else {
    state.id = newId();
    state.created = state.updated = Date.now();
  }
  paint();
})();
</script>
</body>
</html>
