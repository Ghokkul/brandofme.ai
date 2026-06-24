<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Studio Pro · Brandofme</title>
<meta name="description" content="Caption editor with live preview. Multi-frame timelines, font modes, accent colors. Export to 1080p. Part of Brandofme.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%237A3CFF'/%3E%3Ctext x='16' y='22' font-family='system-ui' font-size='18' font-weight='800' text-anchor='middle' fill='white'%3EP%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;800&family=Instrument+Sans:wght@400;500;600&family=Inter:wght@400;600;800;900&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{
  /* Studio Pro identity — editorial light theme with violet accent */
  --bg:#FAFAFB;
  --bg2:#FFFFFF;
  --bg3:#F2F3F7;
  --line:rgba(15,18,23,.10);
  --line-strong:rgba(15,18,23,.22);
  --ink:#0F1217;
  --ink2:#1F2330;
  --muted:rgba(15,18,23,.55);
  --muted2:rgba(15,18,23,.35);
  --accent:#7A3CFF;
  --accent2:#C792FF;
  --accent-bg:rgba(122,60,255,.08);
  --display:'Unbounded',sans-serif;
  --body:'Instrument Sans',system-ui,sans-serif;
  --caption:'Inter',sans-serif;
  --mono:'IBM Plex Mono',monospace;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{font-family:var(--body);color:var(--ink);background:var(--bg);font-size:14.5px;line-height:1.5;-webkit-font-smoothing:antialiased;overflow:hidden}
button{font-family:inherit;cursor:pointer}
::selection{background:rgba(122,60,255,.22)}

.app{display:grid;grid-template-rows:56px 1fr 96px;height:100%}

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
.proj-title input{background:transparent;border:none;color:var(--ink);font-family:var(--mono);font-size:11.5px;width:200px;outline:none;border-bottom:1px dashed transparent;padding:2px 0}
.proj-title input:focus{border-bottom-color:var(--accent)}
.proj-title .dot{width:6px;height:6px;border-radius:50%;background:var(--accent)}

.btn{font-family:var(--body);font-size:13px;font-weight:500;padding:7px 13px;border-radius:100px;border:1px solid var(--line-strong);background:var(--bg2);color:var(--ink);cursor:pointer;transition:.18s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn:hover{border-color:var(--accent);color:var(--accent)}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.btn-primary:hover{background:#6928e5;color:#fff;border-color:#6928e5}
.btn-ghost{border-color:transparent;color:var(--muted);background:transparent}
.btn-ghost:hover{color:var(--ink);background:var(--bg3);border-color:transparent}
.btn .ic{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;font-size:14px;line-height:1}
.btn-new .ic{width:16px;height:16px;border-radius:50%;background:var(--ink);color:#fff;font-size:12px;font-weight:400}
.btn-new:hover .ic{background:var(--accent);color:#fff}

.dd{position:relative}
.dd-menu{position:absolute;top:calc(100% + 6px);right:0;min-width:320px;background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:6px;box-shadow:0 18px 50px rgba(15,18,23,.12);display:none;z-index:50}
.dd.open .dd-menu{display:block}
.dd-h{padding:9px 12px 6px;font-family:var(--mono);font-size:10px;color:var(--muted2);text-transform:uppercase;letter-spacing:.08em}
.dd-i{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--ink);transition:.15s}
.dd-i:hover{background:var(--bg3)}
.dd-i small{margin-left:auto;font-family:var(--mono);font-size:10px;color:var(--muted2)}
.dd-i .swatch{width:10px;height:10px;border-radius:3px;flex:none;background:var(--accent)}
.dd-i.empty{color:var(--muted2);font-style:italic;cursor:default}
.dd-i.empty:hover{background:transparent}

/* Editor: scenes-list | preview | controls */
.editor{display:grid;grid-template-columns:260px 1fr 340px;min-height:0}
@media(max-width:1100px){.editor{grid-template-columns:220px 1fr}.rpane{display:none}}
@media(max-width:780px){.editor{grid-template-columns:1fr}.lpane{display:none}}

.lpane,.rpane{background:var(--bg2);overflow-y:auto;padding:18px}
.lpane{border-right:1px solid var(--line)}
.rpane{border-left:1px solid var(--line)}
.lpane h4,.rpane h4{font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin:0 0 10px;font-weight:600}
.lpane h4:not(:first-child),.rpane h4:not(:first-child){margin-top:22px}

/* Left pane: scenes thumbnail list */
.scenes{display:grid;gap:10px}
.scene{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:10px;padding:8px;cursor:pointer;transition:.15s;background:var(--bg2);position:relative}
.scene:hover{border-color:var(--accent)}
.scene.active{border-color:var(--accent);box-shadow:0 0 0 2px rgba(122,60,255,.18)}
.scene-thumb{height:54px;background:linear-gradient(135deg,#1a1f3a,#3a1f5c,#0a0a1f);border-radius:6px;display:flex;align-items:center;justify-content:center;padding:6px;margin-bottom:6px;overflow:hidden}
.scene-thumb-text{font-family:var(--caption);font-weight:800;font-size:9px;color:#fff;text-align:center;line-height:1.15;text-shadow:0 1px 4px rgba(0,0,0,.5)}
.scene-thumb-text .hl{padding:0 3px;border-radius:2px}
.scene-meta{display:flex;justify-content:space-between;align-items:center;font-family:var(--mono);font-size:10px;color:var(--muted)}
.scene-meta .x{cursor:pointer;color:var(--muted2);padding:2px 4px;border-radius:4px}
.scene-meta .x:hover{color:#d83a3a;background:rgba(216,58,58,.08)}

.add-scene{border:1px dashed var(--line-strong);border-radius:10px;padding:14px;text-align:center;cursor:pointer;color:var(--muted);font-size:12.5px;transition:.15s;font-family:var(--body)}
.add-scene:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-bg)}

/* Center preview */
.cpane{display:flex;flex-direction:column;background:var(--bg);min-height:0;padding:28px}
.preview-wrap{flex:1;display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden}
.preview-frame{aspect-ratio:16/9;width:min(100%, 920px);max-height:100%;background-image:linear-gradient(135deg,#1a1f3a,#3a1f5c,#0a0a1f);border-radius:16px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:44px;box-shadow:0 24px 60px rgba(15,18,23,.18),0 0 0 1px var(--line);position:relative;overflow:hidden}
.preview-frame::before{
  content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle at 30% 20%,rgba(255,255,255,.05),transparent 50%);
  pointer-events:none;
}
.preview-frame-num{position:absolute;top:14px;left:18px;font-family:var(--mono);font-size:11px;color:rgba(255,255,255,.45);letter-spacing:.08em;text-transform:uppercase;font-weight:600;z-index:2}
.cap-text{font-family:var(--caption);font-weight:800;color:#fff;text-align:center;padding:0 32px;line-height:1.15;max-width:90%;text-shadow:0 2px 14px rgba(0,0,0,.55);position:relative;z-index:1}
.cap-text .hl{padding:2px 8px;border-radius:5px}

/* Right pane controls */
.field{margin-bottom:14px}
.field label{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;margin-bottom:6px;font-weight:600}
.field input[type="text"],.field textarea{width:100%;background:var(--bg2);border:1px solid var(--line);border-radius:8px;padding:9px 12px;color:var(--ink);font-family:var(--body);font-size:14px;outline:none;transition:.15s;resize:vertical}
.field textarea{min-height:60px}
.field input[type="text"]:focus,.field textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(122,60,255,.15)}
.field input[type="range"]{width:100%;accent-color:var(--accent)}
.field .row{display:flex;justify-content:space-between;font-family:var(--mono);font-size:11px;color:var(--muted)}

.mode-row{display:flex;gap:6px}
.mode-row button{flex:1;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--bg2);font-family:var(--mono);font-size:10.5px;letter-spacing:.04em;cursor:pointer;color:var(--ink);transition:.15s;text-transform:uppercase}
.mode-row button.active{background:var(--ink);color:#fff;border-color:var(--ink)}
.mode-row button:hover:not(.active){border-color:var(--accent);color:var(--accent)}

.color-row{display:flex;gap:6px;flex-wrap:wrap}
.color-row button{width:30px;height:30px;border:2px solid transparent;border-radius:50%;cursor:pointer;padding:0;transition:.15s}
.color-row button.active{border-color:var(--ink);transform:scale(1.1)}
.color-row button:hover:not(.active){transform:scale(1.08)}

.font-pick{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.font-pick button{padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--bg2);cursor:pointer;font-size:13px;text-align:left;transition:.15s}
.font-pick button.active{border-color:var(--accent);background:var(--accent-bg);color:var(--accent)}
.font-pick button small{display:block;font-family:var(--mono);font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-top:2px}

/* Bottom timeline */
.timeline{background:var(--bg2);border-top:1px solid var(--line);display:flex;align-items:center;gap:14px;padding:14px 22px;overflow-x:auto}
.timeline-label{font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;flex:none;padding-right:12px;border-right:1px solid var(--line);font-weight:600}
.timeline-track{display:flex;gap:8px;align-items:center;flex:1;min-width:0;overflow-x:auto;padding-bottom:2px}
.timeline-track::-webkit-scrollbar{height:6px}
.timeline-track::-webkit-scrollbar-thumb{background:var(--line-strong);border-radius:100px}
.tl-frame{flex:none;width:108px;height:62px;border-radius:8px;background:linear-gradient(135deg,#1a1f3a,#3a1f5c);border:2px solid transparent;cursor:pointer;position:relative;transition:.15s;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:4px}
.tl-frame:hover{border-color:var(--line-strong)}
.tl-frame.active{border-color:var(--accent);box-shadow:0 6px 18px rgba(122,60,255,.25)}
.tl-frame-text{font-family:var(--caption);font-weight:800;font-size:8px;color:#fff;text-align:center;line-height:1.1;text-shadow:0 1px 3px rgba(0,0,0,.6);padding:0 4px}
.tl-frame-num{position:absolute;top:3px;left:5px;font-family:var(--mono);font-size:8px;color:rgba(255,255,255,.55);font-weight:600}
.tl-add{flex:none;width:108px;height:62px;border-radius:8px;border:2px dashed var(--line-strong);background:transparent;color:var(--muted);cursor:pointer;font-size:24px;display:flex;align-items:center;justify-content:center;transition:.15s}
.tl-add:hover{border-color:var(--accent);color:var(--accent)}
.tl-actions{display:flex;gap:6px;flex:none}

/* Toast */
.toast{position:fixed;left:50%;bottom:108px;transform:translate(-50%,140%);background:var(--ink);color:#fff;font-size:13px;padding:11px 18px;border-radius:100px;box-shadow:0 12px 40px rgba(15,18,23,.32);z-index:90;transition:transform .3s ease}
.toast.show{transform:translate(-50%,0)}

.auth-banner{display:none;background:linear-gradient(120deg,rgba(122,60,255,.10),rgba(199,146,255,.10));border-bottom:1px solid rgba(122,60,255,.25);padding:10px 22px;font-size:13px;color:var(--ink);align-items:center;justify-content:space-between;gap:12px}
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
      <span class="editor">(studio pro)</span>
    </a>
    <div class="proj-title">
      <span class="dot"></span>
      <input id="projName" value="Untitled captions" maxlength="40" spellcheck="false">
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
    <!-- LEFT: scenes list with thumbnails -->
    <aside class="lpane">
      <h4>Scenes</h4>
      <div class="scenes" id="scenesList"></div>
      <button class="add-scene" id="addSceneBtn" style="margin-top:10px">+ Add scene</button>
    </aside>

    <!-- CENTER: live caption preview -->
    <main class="cpane">
      <div class="preview-wrap">
        <div class="preview-frame">
          <div class="preview-frame-num" id="frameNum">SCENE 01</div>
          <div class="cap-text" id="capText">There&rsquo;s only one <span class="hl">you</span></div>
        </div>
      </div>
    </main>

    <!-- RIGHT: caption controls -->
    <aside class="rpane">
      <h4>Caption text</h4>
      <div class="field">
        <textarea id="caption" maxlength="120">There's only one you</textarea>
      </div>
      <div class="field">
        <label>Highlight word(s)</label>
        <input type="text" id="hlWord" value="you" placeholder="e.g. your name">
      </div>

      <h4>Highlight style</h4>
      <div class="mode-row">
        <button data-mode="none">None</button>
        <button data-mode="font" class="active">Font color</button>
        <button data-mode="bg">Background</button>
      </div>

      <h4 style="margin-top:14px">Highlight color</h4>
      <div class="color-row" id="colorRow">
        <button style="background:#FFD93D" data-color="#FFD93D" class="active"></button>
        <button style="background:#FF6B6B" data-color="#FF6B6B"></button>
        <button style="background:#7CFFB2" data-color="#7CFFB2"></button>
        <button style="background:#4ECDC4" data-color="#4ECDC4"></button>
        <button style="background:#A78BFA" data-color="#A78BFA"></button>
        <button style="background:#FF7BFF" data-color="#FF7BFF"></button>
        <button style="background:#FFFFFF;border:1px solid var(--line)!important" data-color="#FFFFFF"></button>
        <button style="background:#FFB347" data-color="#FFB347"></button>
      </div>

      <h4 style="margin-top:14px">Font</h4>
      <div class="font-pick">
        <button data-font="Inter" class="active" style="font-family:'Inter'">Inter <small>BOLD CLEAN</small></button>
        <button data-font="Unbounded" style="font-family:'Unbounded'">Unbounded <small>DISPLAY</small></button>
      </div>

      <div class="field" style="margin-top:14px">
        <div class="row"><span>Font size</span><span id="sizeDisp">52px</span></div>
        <input type="range" id="size" min="22" max="84" value="52">
      </div>
      <div class="field">
        <div class="row"><span>Letter spacing</span><span id="letterDisp">−1</span></div>
        <input type="range" id="letter" min="-3" max="10" value="-1">
      </div>
      <div class="field">
        <div class="row"><span>Font weight</span><span id="weightDisp">800</span></div>
        <input type="range" id="weight" min="400" max="900" step="100" value="800">
      </div>
    </aside>
  </div>

  <!-- ===== TIMELINE ===== -->
  <div class="timeline">
    <span class="timeline-label">Timeline</span>
    <div class="timeline-track" id="timeline"></div>
    <div class="tl-actions">
      <button class="btn" id="saveBtn"><span class="ic">💾</span> Save</button>
      <button class="btn btn-primary" id="exportBtn"><span class="ic">⬇</span> Export 1080p</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
'use strict';

// ============================================================
// STATE — a project has multiple "scenes" (caption frames)
// ============================================================
const KEY = 'bom_sp_projects';
const CUR_KEY = 'bom_sp_current';
const state = {
  id: null,
  name: 'Untitled captions',
  scenes: [],     // [{ caption, hlWord, mode, color, font, size, letter, weight }]
  activeIdx: 0,
  created: null,
  updated: null,
  dirty: false
};
window.bomMe = null;

// ============================================================
// AUTH (read bom_token from same-origin localStorage)
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

// ============================================================
// SCENE TEMPLATE
// ============================================================
function defaultScene(name){
  const who = (window.bomMe?.profiles?.[0]?.name) || 'you';
  return {
    caption: name ? "There's only one " + name : "There's only one " + who,
    hlWord:  name || who,
    mode:    'font',
    color:   '#FFD93D',
    font:    'Inter',
    size:    52,
    letter:  -1,
    weight:  800
  };
}
function activeScene(){ return state.scenes[state.activeIdx] || defaultScene(); }

// ============================================================
// PROJECT STORAGE
// ============================================================
function loadAll(){ try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
function saveAll(list){ try { localStorage.setItem(KEY, JSON.stringify(list)); } catch(e){ console.warn(e); } }
function newId(){ return 'sp_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7); }

function newProject(skipSave){
  if (state.dirty && !skipSave) saveCurrent();
  state.id = newId();
  state.name = 'Untitled captions';
  state.scenes = [ defaultScene() ];
  state.activeIdx = 0;
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
  const snap = { id: state.id, name: state.name, scenes: state.scenes, created: state.created, updated: state.updated };
  if (idx >= 0) list[idx] = snap;
  else list.unshift(snap);
  saveAll(list);
  localStorage.setItem(CUR_KEY, state.id);
  state.dirty = false;
  paintPrev();
  toast('✓ Project saved');
}
function loadProject(id){
  const p = loadAll().find(x => x.id === id);
  if (!p) return;
  if (state.dirty) saveCurrent();
  state.id = p.id; state.name = p.name;
  state.scenes = p.scenes && p.scenes.length ? p.scenes : [ defaultScene() ];
  state.activeIdx = 0;
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
// SCENE OPS
// ============================================================
function addScene(){
  const last = activeScene();
  state.scenes.push({ ...last, caption: "New caption here" });
  state.activeIdx = state.scenes.length - 1;
  dirty();
  paint();
}
function deleteScene(idx, ev){
  if (ev) ev.stopPropagation();
  if (state.scenes.length === 1){
    state.scenes = [ defaultScene() ];
  } else {
    state.scenes.splice(idx, 1);
    if (state.activeIdx >= state.scenes.length) state.activeIdx = state.scenes.length - 1;
  }
  dirty(); paint();
}
function selectScene(idx){
  if (idx < 0 || idx >= state.scenes.length) return;
  state.activeIdx = idx;
  paint();
}

// ============================================================
// PAINT
// ============================================================
function paint(){
  document.getElementById('projName').value = state.name;
  paintScenes();
  paintTimeline();
  paintActiveScene();
  paintPrev();
}
function paintActiveScene(){
  const s = activeScene();
  document.getElementById('caption').value = s.caption;
  document.getElementById('hlWord').value = s.hlWord;
  document.getElementById('size').value = s.size;
  document.getElementById('sizeDisp').textContent = s.size + 'px';
  document.getElementById('letter').value = s.letter;
  document.getElementById('letterDisp').textContent = s.letter;
  document.getElementById('weight').value = s.weight;
  document.getElementById('weightDisp').textContent = s.weight;
  document.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === s.mode));
  document.querySelectorAll('#colorRow button').forEach(b => b.classList.toggle('active', b.dataset.color === s.color));
  document.querySelectorAll('[data-font]').forEach(b => b.classList.toggle('active', b.dataset.font === s.font));
  document.getElementById('frameNum').textContent = 'SCENE ' + String(state.activeIdx + 1).padStart(2, '0');
  renderPreview();
}
function paintScenes(){
  const wrap = document.getElementById('scenesList');
  wrap.innerHTML = state.scenes.map((s, i) => {
    const cap = escHTML(s.caption);
    const hl  = s.hlWord && s.caption.includes(s.hlWord) ? escHTML(s.hlWord) : '';
    const hlHTML = hl
      ? cap.replace(hl, '<span class="hl" style="background:' + (s.mode === 'bg' ? s.color : 'transparent') + ';color:' + (s.mode === 'font' ? s.color : (s.mode === 'bg' ? '#0F1217' : '#fff')) + '">' + hl + '</span>')
      : cap;
    return '<div class="scene' + (i === state.activeIdx ? ' active' : '') + '" data-scene="' + i + '">' +
           '<div class="scene-thumb"><div class="scene-thumb-text">' + hlHTML + '</div></div>' +
           '<div class="scene-meta"><span>Scene ' + String(i+1).padStart(2,'0') + '</span>' +
           '<span class="x" data-del-scene="' + i + '" title="Delete">×</span></div>' +
           '</div>';
  }).join('');
}
function paintTimeline(){
  const tl = document.getElementById('timeline');
  tl.innerHTML = state.scenes.map((s, i) => {
    const cap = escHTML(s.caption);
    const hl  = s.hlWord && s.caption.includes(s.hlWord) ? escHTML(s.hlWord) : '';
    const hlHTML = hl
      ? cap.replace(hl, '<span class="hl" style="background:' + (s.mode === 'bg' ? s.color : 'transparent') + ';color:' + (s.mode === 'font' ? s.color : (s.mode === 'bg' ? '#0F1217' : '#fff')) + '">' + hl + '</span>')
      : cap;
    return '<div class="tl-frame' + (i === state.activeIdx ? ' active' : '') + '" data-scene="' + i + '">' +
           '<span class="tl-frame-num">' + String(i+1).padStart(2,'0') + '</span>' +
           '<div class="tl-frame-text">' + hlHTML + '</div></div>';
  }).join('') + '<button class="tl-add" id="tlAddBtn" title="Add scene">+</button>';
  document.getElementById('tlAddBtn').addEventListener('click', addScene);
}
function paintPrev(){
  const list = loadAll().sort((a,b) => b.updated - a.updated).slice(0, 10);
  const wrap = document.getElementById('prevList');
  if (!list.length){ wrap.innerHTML = '<div class="dd-i empty">No saved projects yet</div>'; return; }
  wrap.innerHTML = list.map(p => {
    const isCurrent = p.id === state.id;
    const firstColor = p.scenes?.[0]?.color || '#7A3CFF';
    return '<div class="dd-i" data-load="' + p.id + '"' + (isCurrent ? ' style="background:var(--accent-bg)"' : '') + '>' +
           '<span class="swatch" style="background:' + firstColor + '"></span>' +
           '<span>' + escHTML(p.name) + ' · ' + (p.scenes?.length || 0) + ' scenes' + (isCurrent ? ' · <em style="color:var(--accent);font-style:normal">open</em>' : '') + '</span>' +
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
function escHTML(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

// ============================================================
// PREVIEW
// ============================================================
function renderPreview(){
  const s = activeScene();
  const text = document.getElementById('capText');
  text.style.fontSize = s.size + 'px';
  text.style.letterSpacing = s.letter + 'px';
  text.style.fontWeight = s.weight;
  text.style.fontFamily = "'" + s.font + "',sans-serif";
  const cap = s.caption;
  const hl  = s.hlWord;
  let html = escHTML(cap);
  if (hl && cap.indexOf(hl) >= 0){
    const span = '<span class="hl">' + escHTML(hl) + '</span>';
    html = escHTML(cap).replace(escHTML(hl), span);
  }
  text.innerHTML = html;
  const hlEl = text.querySelector('.hl');
  if (hlEl){
    if (s.mode === 'none'){ hlEl.style.background = 'transparent'; hlEl.style.color = '#fff'; hlEl.style.padding = '0'; }
    else if (s.mode === 'font'){ hlEl.style.background = 'transparent'; hlEl.style.color = s.color; hlEl.style.padding = '0'; }
    else { hlEl.style.background = s.color; hlEl.style.color = '#0F1217'; hlEl.style.padding = '2px 8px'; }
  }
}

// ============================================================
// EXPORT — 1920×1080 PNG of the current scene
// ============================================================
function exportPNG(){
  const s = activeScene();
  const c = document.createElement('canvas'); c.width = 1920; c.height = 1080;
  const ctx = c.getContext('2d');
  // gradient bg matching the preview
  const g = ctx.createLinearGradient(0, 0, c.width, c.height);
  g.addColorStop(0, '#1a1f3a'); g.addColorStop(0.5, '#3a1f5c'); g.addColorStop(1, '#0a0a1f');
  ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
  // soft radial glow
  const rg = ctx.createRadialGradient(c.width * 0.3, c.height * 0.2, 0, c.width * 0.3, c.height * 0.2, c.width * 0.5);
  rg.addColorStop(0, 'rgba(255,255,255,0.04)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = rg; ctx.fillRect(0, 0, c.width, c.height);
  // caption
  const size = s.size * 4;
  ctx.font = s.weight + ' ' + size + 'px "' + s.font + '",sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  const cx = c.width / 2, cy = c.height * 0.78;
  if (s.hlWord && s.caption.indexOf(s.hlWord) >= 0){
    const prefix = s.caption.slice(0, s.caption.indexOf(s.hlWord));
    const suffix = s.caption.slice(s.caption.indexOf(s.hlWord) + s.hlWord.length);
    const wPre = ctx.measureText(prefix).width;
    const wHl  = ctx.measureText(s.hlWord).width;
    const wSuf = ctx.measureText(suffix).width;
    const total = wPre + wHl + wSuf;
    let x = cx - total / 2;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff'; ctx.fillText(prefix, x, cy); x += wPre;
    if (s.mode === 'bg'){
      ctx.fillStyle = s.color;
      ctx.fillRect(x - 14, cy - size/2 - 6, wHl + 28, size + 12);
      ctx.fillStyle = '#0F1217';
    } else if (s.mode === 'font'){ ctx.fillStyle = s.color; }
    else { ctx.fillStyle = '#fff'; }
    ctx.fillText(s.hlWord, x, cy); x += wHl;
    ctx.fillStyle = '#fff'; ctx.fillText(suffix, x, cy);
  } else {
    ctx.textAlign = 'center';
    ctx.fillText(s.caption, cx, cy);
  }
  // scene num
  ctx.font = '600 22px "IBM Plex Mono",monospace';
  ctx.fillStyle = 'rgba(255,255,255,.45)';
  ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  ctx.fillText('SCENE ' + String(state.activeIdx + 1).padStart(2,'0'), 60, 60);

  c.toBlob(blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (state.name || 'caption').toLowerCase().replace(/[^a-z0-9]+/g,'-') + '-scene' + String(state.activeIdx+1).padStart(2,'0') + '.png';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('✓ Exported scene ' + (state.activeIdx + 1));
  }, 'image/png');
}
function exportAllScenes(){
  if (state.scenes.length === 1){ exportPNG(); return; }
  // Export each scene as a separate PNG (download multiples)
  const orig = state.activeIdx;
  state.scenes.forEach((_, i) => {
    state.activeIdx = i;
    renderPreview();
    exportPNG();
  });
  state.activeIdx = orig;
  paintActiveScene();
}

// ============================================================
// WIRING
// ============================================================
function dirty(){ state.dirty = true; state.updated = Date.now(); }

document.getElementById('projName').addEventListener('input', e => {
  state.name = e.target.value.trim() || 'Untitled captions';
  dirty();
});
function bindActive(id, prop, transform){
  document.getElementById(id).addEventListener('input', e => {
    state.scenes[state.activeIdx][prop] = transform ? transform(e.target.value) : e.target.value;
    dirty();
    paintActiveScene();
    paintScenes();
    paintTimeline();
  });
}
bindActive('caption', 'caption');
bindActive('hlWord', 'hlWord');
bindActive('size', 'size', v => parseInt(v, 10));
bindActive('letter', 'letter', v => parseInt(v, 10));
bindActive('weight', 'weight', v => parseInt(v, 10));

document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => {
  state.scenes[state.activeIdx].mode = b.dataset.mode;
  dirty(); paintActiveScene(); paintScenes(); paintTimeline();
}));
document.querySelectorAll('#colorRow button').forEach(b => b.addEventListener('click', () => {
  state.scenes[state.activeIdx].color = b.dataset.color;
  dirty(); paintActiveScene(); paintScenes(); paintTimeline();
}));
document.querySelectorAll('[data-font]').forEach(b => b.addEventListener('click', () => {
  state.scenes[state.activeIdx].font = b.dataset.font;
  dirty(); paintActiveScene();
}));

document.getElementById('scenesList').addEventListener('click', e => {
  const del = e.target.closest('[data-del-scene]');
  if (del){ deleteScene(parseInt(del.dataset.delScene, 10), e); return; }
  const sc = e.target.closest('[data-scene]');
  if (sc) selectScene(parseInt(sc.dataset.scene, 10));
});
document.getElementById('timeline').addEventListener('click', e => {
  const sc = e.target.closest('[data-scene]');
  if (sc) selectScene(parseInt(sc.dataset.scene, 10));
});
document.getElementById('addSceneBtn').addEventListener('click', addScene);
document.getElementById('newBtn').addEventListener('click', () => newProject(false));
document.getElementById('saveBtn').addEventListener('click', saveCurrent);
document.getElementById('exportBtn').addEventListener('click', exportPNG);

const prevDD = document.getElementById('prevDD');
document.getElementById('prevBtn').addEventListener('click', () => { paintPrev(); prevDD.classList.toggle('open'); });
document.addEventListener('click', e => { if (!prevDD.contains(e.target)) prevDD.classList.remove('open'); });
document.getElementById('prevList').addEventListener('click', e => {
  const r = e.target.closest('[data-load]');
  if (r){ loadProject(r.dataset.load); prevDD.classList.remove('open'); }
});

let toastT;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 2400);
}

// Boot
(function boot(){
  const lastId = localStorage.getItem(CUR_KEY);
  const last = lastId ? loadAll().find(p => p.id === lastId) : null;
  if (last){
    state.id = last.id; state.name = last.name;
    state.scenes = last.scenes && last.scenes.length ? last.scenes : [ defaultScene() ];
    state.activeIdx = 0;
    state.created = last.created; state.updated = last.updated;
    state.dirty = false;
  } else {
    state.id = newId();
    state.scenes = [ defaultScene() ];
    state.created = state.updated = Date.now();
  }
  paint();
})();
</script>
</body>
</html>
