<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Brandofme · Workspace</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<style>
:root{
  --paper:#F6F7F5; --ink:#0F1217; --accent:#2B3CFF; --accent-2:#7A3CFF;
  --card:#FFFFFF; --line:rgba(15,18,23,.12); --line-strong:rgba(15,18,23,.26);
  --muted:rgba(15,18,23,.55); --grad:linear-gradient(120deg,#2B3CFF,#7A3CFF);
  --warn:#C8102E; --ok:#0a8a3a;
  --display:'Unbounded',sans-serif; --body:'Instrument Sans',system-ui,sans-serif; --mono:'IBM Plex Mono',monospace;
  --rail:300px; --bar:56px;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{font-family:var(--body);color:var(--ink);background:var(--paper);font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;overflow:hidden}
button{font-family:inherit;cursor:pointer}
::selection{background:rgba(43,60,255,.18)}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}

/* ============ TOP BAR ============ */
.bar{height:var(--bar);display:flex;align-items:center;gap:10px;padding:0 14px;background:var(--card);border-bottom:1px solid var(--line);position:relative;z-index:60}
.bar-l,.bar-r{display:flex;align-items:center;gap:8px}
.bar-r{margin-left:auto}
.iconbtn{width:38px;height:38px;border-radius:10px;border:1px solid transparent;background:transparent;display:flex;align-items:center;justify-content:center;color:var(--ink);transition:background .15s,border-color .15s}
.iconbtn:hover{background:rgba(15,18,23,.05)}
.iconbtn svg{width:20px;height:20px}
.iconbtn.add{background:var(--ink);color:#fff}
.iconbtn.add:hover{background:#000}
.iconbtn.add.on{background:var(--grad)}
.brand{display:flex;align-items:center;gap:9px;padding-left:4px;margin-right:4px}
.brand .dot{width:22px;height:22px;border-radius:7px;background:var(--grad)}
.brand b{font-family:var(--display);font-weight:800;font-size:15px;letter-spacing:-.02em}
.doc-title{font-family:var(--display);font-weight:700;font-size:15px;border:none;background:transparent;color:var(--ink);outline:none;min-width:120px;max-width:38vw;text-align:center;padding:6px 8px;border-radius:8px}
.doc-title:hover,.doc-title:focus{background:rgba(15,18,23,.04)}
.save{font-family:var(--mono);font-size:11px;letter-spacing:.04em;color:var(--muted);display:flex;align-items:center;gap:6px;white-space:nowrap}
.save .ind{width:7px;height:7px;border-radius:50%;background:var(--ok)}
.save.saving .ind{background:#d39a00;animation:pulse 1s infinite}
@keyframes pulse{50%{opacity:.3}}
.btn{display:inline-flex;align-items:center;gap:7px;border-radius:10px;padding:9px 14px;font-weight:600;font-size:14px;border:1px solid var(--line-strong);background:var(--card);color:var(--ink);transition:.15s}
.btn:hover{border-color:var(--ink)}
.btn.fill{background:var(--grad);color:#fff;border:none;box-shadow:0 4px 14px rgba(60,60,200,.22)}
.btn.fill:hover{filter:brightness(1.06)}
.btn.sm{padding:7px 11px;font-size:13px}

/* ============ LAYOUT ============ */
.shell{display:flex;height:calc(100% - var(--bar));position:relative}

/* inserter rail */
.rail{width:var(--rail);flex:none;background:var(--card);border-right:1px solid var(--line);display:flex;flex-direction:column;transform:translateX(calc(-1 * var(--rail)));transition:transform .22s cubic-bezier(.2,.7,.3,1);position:absolute;top:0;bottom:0;left:0;z-index:50}
.rail.open{transform:translateX(0)}
.rail-head{display:flex;align-items:center;border-bottom:1px solid var(--line);padding:0 6px}
.tab{flex:1;text-align:center;padding:14px 4px 12px;font-weight:600;font-size:14px;color:var(--muted);background:transparent;border:none;border-bottom:2px solid transparent;position:relative;top:1px}
.tab.on{color:var(--ink);border-bottom-color:var(--ink)}
.rail-close{margin-left:auto;width:34px;height:34px;border:none;background:transparent;color:var(--muted);font-size:18px;border-radius:8px}
.rail-close:hover{background:rgba(15,18,23,.06);color:var(--ink)}
.rail-body{flex:1;overflow-y:auto;padding:14px}
.search{position:relative;margin-bottom:16px}
.search input{width:100%;padding:13px 14px 13px 40px;border:1px solid var(--line-strong);border-radius:6px;font-family:inherit;font-size:14px;outline:none;background:var(--paper)}
.search input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(43,60,255,.12);background:#fff}
.search svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);width:17px;height:17px;color:var(--muted)}
.cat-label{font-family:var(--mono);font-size:11px;letter-spacing:.12em;color:var(--muted);text-transform:uppercase;margin:18px 2px 12px}
.cat-label:first-child{margin-top:2px}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.tile{display:flex;flex-direction:column;align-items:center;gap:9px;padding:16px 6px 12px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--ink);transition:.12s;text-align:center}
.tile:hover{border-color:var(--line);background:var(--paper);transform:translateY(-1px)}
.tile svg{width:26px;height:26px;stroke:var(--ink);stroke-width:1.5;fill:none}
.tile .glyph{font-size:24px;line-height:26px;height:26px;display:flex;align-items:center;font-family:var(--display);font-weight:700}
.tile span{font-size:12.5px;line-height:1.2}
.empty-cat{color:var(--muted);font-size:13px;padding:8px 2px}
.pattern{border:1px solid var(--line);border-radius:10px;padding:14px;margin-bottom:10px;cursor:pointer;transition:.15s;background:var(--paper)}
.pattern:hover{border-color:var(--accent);box-shadow:0 6px 18px rgba(43,60,255,.1)}
.pattern b{display:block;font-family:var(--display);font-weight:700;font-size:13.5px;margin-bottom:3px}
.pattern small{color:var(--muted);font-size:12.5px}
.media-drop{border:2px dashed var(--line-strong);border-radius:12px;padding:30px 16px;text-align:center;color:var(--muted);font-size:14px;cursor:pointer;transition:.15s}
.media-drop:hover{border-color:var(--accent);color:var(--ink)}

/* canvas */
.canvas-wrap{flex:1;overflow-y:auto;transition:padding-left .22s cubic-bezier(.2,.7,.3,1)}
.shell.rail-open .canvas-wrap{padding-left:var(--rail)}
.canvas{max-width:780px;margin:0 auto;padding:54px 28px 40vh}
.doc-head{margin-bottom:26px}
.doc-head input{width:100%;border:none;background:transparent;outline:none;font-family:var(--display);font-weight:800;font-size:38px;line-height:1.1;letter-spacing:-.02em;color:var(--ink)}
.doc-head input::placeholder{color:rgba(15,18,23,.25)}

/* ============ BLOCKS ============ */
.blk{position:relative;margin:2px 0;border-radius:8px;padding:4px 2px}
.blk.sel{box-shadow:0 0 0 1.5px var(--accent)}
.blk.drag-over{box-shadow:0 -2px 0 0 var(--accent)}
.blk-body{outline:none}
.blk [contenteditable]{outline:none;min-height:1.55em}
.blk [contenteditable]:empty:before{content:attr(data-ph);color:rgba(15,18,23,.3)}
.blk-p{font-size:17px;line-height:1.65}
.blk-h2{font-family:var(--display);font-weight:800;font-size:28px;line-height:1.2;letter-spacing:-.01em;margin:.2em 0}
.blk-h3{font-family:var(--display);font-weight:700;font-size:22px;line-height:1.25;margin:.2em 0}
.blk-h4{font-family:var(--display);font-weight:700;font-size:18px;line-height:1.3;margin:.2em 0}
.blk-list ul,.blk-list ol{margin:.2em 0;padding-left:1.4em}
.blk-list li{margin:.25em 0;font-size:17px}
.blk-quote{border-left:3px solid var(--ink);padding:2px 0 2px 18px}
.blk-quote .q{font-size:20px;line-height:1.5;font-style:italic}
.blk-quote .cite{font-size:13px;color:var(--muted);margin-top:6px;font-style:normal}
.blk-pull{border-top:3px solid var(--accent);border-bottom:3px solid var(--accent);padding:20px 0;text-align:center;margin:8px 0}
.blk-pull .q{font-family:var(--display);font-weight:700;font-size:24px;line-height:1.35}
.blk-pull .cite{font-size:13px;color:var(--muted);margin-top:10px}
.blk-code{background:#0f1217;color:#e8eaf0;border-radius:10px;padding:16px 18px;font-family:var(--mono);font-size:14px;line-height:1.6;white-space:pre-wrap;overflow:auto}
.blk-code .lang{display:block;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7a86b8;margin-bottom:8px;outline:none}
.blk-pre{background:var(--paper);border:1px solid var(--line);border-radius:8px;padding:14px 16px;font-family:var(--mono);font-size:14px;line-height:1.6;white-space:pre-wrap}
.blk-details{border:1px solid var(--line);border-radius:10px;padding:6px 16px;background:var(--card)}
.blk-details summary{font-weight:600;padding:8px 0;cursor:default;outline:none}
.blk-details .body{padding:2px 0 10px;color:var(--ink)}
.blk-math{text-align:center;padding:18px 8px;background:var(--paper);border-radius:10px;font-size:20px;overflow-x:auto}
.blk-math .raw{font-family:var(--mono);font-size:15px;color:var(--ink)}
.blk-math .edit{font-family:var(--mono);font-size:14px;width:100%;border:1px solid var(--line);border-radius:6px;padding:8px 10px;margin-top:10px;outline:none;background:#fff}
.blk-math .edit:focus{border-color:var(--accent)}
.blk-divider{display:flex;align-items:center;justify-content:center;padding:14px 0}
.blk-divider .line{flex:1;height:1px;background:var(--line-strong)}
.blk-divider .o{margin:0 14px;color:var(--muted)}
.blk-img{text-align:center}
.blk-img img{max-width:100%;border-radius:12px;display:block;margin:0 auto}
.blk-img .ph{border:2px dashed var(--line-strong);border-radius:12px;padding:34px;color:var(--muted);cursor:pointer}
.blk-img .cap{font-size:13px;color:var(--muted);margin-top:8px;text-align:center;outline:none}
.blk-btn-wrap{display:flex;justify-content:center;padding:6px 0}
.blk-btn{display:inline-flex;align-items:center;gap:8px;background:var(--grad);color:#fff;border-radius:12px;padding:12px 22px;font-weight:600;outline:none}
.blk-card{border:1px solid var(--line);border-radius:16px;padding:22px;display:flex;gap:16px;align-items:center;background:var(--card)}
.blk-card .ava{width:54px;height:54px;border-radius:14px;flex:none;display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--display);font-weight:800;font-size:22px}
.blk-card .nm{font-family:var(--display);font-weight:800;font-size:19px;outline:none}
.blk-card .tg{color:var(--muted);font-size:14px;outline:none}
.blk-card .pick{display:flex;gap:6px;margin-top:8px}
.blk-card .sw{width:18px;height:18px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px var(--line);cursor:pointer}

/* block toolbar */
.blk-tb{position:absolute;top:-38px;left:0;display:none;gap:1px;background:var(--ink);border-radius:9px;padding:3px;box-shadow:0 8px 22px rgba(0,0,0,.18);z-index:20}
.blk.sel .blk-tb,.blk:hover .blk-tb{display:flex}
.blk-tb button{width:30px;height:30px;border:none;background:transparent;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center}
.blk-tb button:hover{background:rgba(255,255,255,.16)}
.blk-tb button svg{width:16px;height:16px;stroke:#fff;stroke-width:1.7;fill:none}
.blk-tb .grip{cursor:grab}
.blk-tb .sep{width:1px;background:rgba(255,255,255,.18);margin:4px 2px}
.blk-tb .danger:hover{background:rgba(200,16,46,.6)}

/* between-block inserter */
.blk-add{position:absolute;left:50%;bottom:-13px;transform:translateX(-50%);width:24px;height:24px;border-radius:50%;background:var(--accent);color:#fff;border:none;display:none;align-items:center;justify-content:center;font-size:16px;z-index:15;box-shadow:0 3px 8px rgba(43,60,255,.4)}
.blk:hover .blk-add{display:flex}

/* slash + transform menu */
.menu{position:absolute;z-index:80;background:var(--card);border:1px solid var(--line);border-radius:12px;box-shadow:0 14px 40px rgba(0,0,0,.18);padding:6px;width:248px;max-height:320px;overflow-y:auto}
.menu .mi{display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:8px;cursor:pointer}
.menu .mi:hover,.menu .mi.hl{background:var(--paper)}
.menu .mi .ic{width:30px;height:30px;border:1px solid var(--line);border-radius:7px;display:flex;align-items:center;justify-content:center;flex:none}
.menu .mi .ic svg{width:17px;height:17px;stroke:var(--ink);stroke-width:1.5;fill:none}
.menu .mi .ic .glyph{font-family:var(--display);font-weight:700;font-size:15px}
.menu .mi b{font-size:13.5px;font-weight:600}
.menu .mi small{display:block;font-size:11.5px;color:var(--muted)}
.menu .grp{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);padding:8px 10px 4px}

/* inline format toolbar */
.fmt{position:absolute;z-index:90;background:var(--ink);border-radius:9px;padding:3px;display:none;gap:1px;box-shadow:0 8px 22px rgba(0,0,0,.22)}
.fmt button{min-width:32px;height:30px;border:none;background:transparent;color:#fff;border-radius:6px;font-size:14px;padding:0 8px;display:flex;align-items:center;justify-content:center}
.fmt button:hover{background:rgba(255,255,255,.16)}
.fmt button.b{font-weight:800}.fmt button.i{font-style:italic}

/* empty state */
.empty-doc{color:var(--muted);font-size:16px;padding:8px 2px;cursor:text}
.empty-doc kbd{font-family:var(--mono);font-size:12px;background:var(--paper);border:1px solid var(--line);border-bottom-width:2px;border-radius:5px;padding:1px 6px}

/* preview mode */
body.preview .rail,body.preview .blk-tb,body.preview .blk-add,body.preview .doc-head input::placeholder{display:none!important}
body.preview .blk{padding:0}
body.preview .canvas{padding-top:60px}

/* toast */
.toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%) translateY(20px);background:var(--ink);color:#fff;padding:12px 18px;border-radius:12px;font-size:14px;opacity:0;pointer-events:none;transition:.25s;z-index:200;box-shadow:0 10px 30px rgba(0,0,0,.3)}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

/* overlay (export) */
.ov{position:fixed;inset:0;background:rgba(10,12,20,.5);display:none;align-items:center;justify-content:center;z-index:150;padding:20px}
.ov.open{display:flex}
.ov .card{background:var(--card);border-radius:18px;padding:24px;max-width:560px;width:100%;box-shadow:0 30px 80px rgba(0,0,0,.4)}
.ov h3{font-family:var(--display);font-weight:800;margin:0 0 4px;font-size:20px}
.ov p{color:var(--muted);font-size:14px;margin:0 0 16px}
.ov .opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ov .opt{border:1px solid var(--line-strong);border-radius:12px;padding:16px;text-align:left;background:var(--paper);transition:.15s}
.ov .opt:hover{border-color:var(--accent)}
.ov .opt b{display:block;font-weight:700;margin-bottom:3px}
.ov .opt small{color:var(--muted);font-size:12.5px}
.ov .x{float:right;border:none;background:transparent;font-size:20px;color:var(--muted);width:30px;height:30px;border-radius:8px}
.ov .x:hover{background:rgba(15,18,23,.06)}

@media (max-width:720px){
  :root{--rail:84vw}
  .doc-title{max-width:30vw}
  .canvas{padding:34px 18px 40vh}
  .doc-head input{font-size:30px}
  .shell.rail-open .canvas-wrap{padding-left:0}
  .save{display:none}
}
</style>
</head>
<body>

<!-- TOP BAR -->
<header class="bar">
  <div class="bar-l">
    <button class="iconbtn add" id="addBtn" title="Add block (Blocks panel)" aria-label="Add block">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
    </button>
    <div class="brand"><span class="dot"></span><b>Brandofme</b></div>
  </div>
  <input class="doc-title" id="docTitleBar" value="Untitled workspace" aria-label="Document title">
  <div class="bar-r">
    <span class="save" id="saveStat"><span class="ind"></span><span id="saveTxt">Saved</span></span>
    <button class="btn sm" id="previewBtn">Preview</button>
    <button class="btn sm" id="exportBtn">Export</button>
    <button class="btn fill sm" id="publishBtn">Publish</button>
  </div>
</header>

<div class="shell" id="shell">
  <!-- INSERTER RAIL -->
  <aside class="rail" id="rail" aria-label="Block inserter">
    <div class="rail-head">
      <button class="tab on" data-tab="blocks">Blocks</button>
      <button class="tab" data-tab="patterns">Patterns</button>
      <button class="tab" data-tab="media">Media</button>
      <button class="rail-close" id="railClose" aria-label="Close">✕</button>
    </div>
    <div class="rail-body" id="railBody"></div>
  </aside>

  <!-- CANVAS -->
  <div class="canvas-wrap" id="canvasWrap">
    <div class="canvas">
      <div class="doc-head"><input id="docTitle" placeholder="Add title" value=""></div>
      <div id="docBlocks"></div>
    </div>
  </div>
</div>

<!-- floating menus -->
<div class="menu" id="slashMenu" style="display:none"></div>
<div class="fmt" id="fmtBar">
  <button class="b" data-cmd="bold" title="Bold">B</button>
  <button class="i" data-cmd="italic" title="Italic">I</button>
  <button data-cmd="link" title="Link">🔗</button>
</div>

<!-- export overlay -->
<div class="ov" id="exportOv">
  <div class="card">
    <button class="x" id="exportClose">✕</button>
    <h3>Export this workspace</h3>
    <p>Take your blocks anywhere — copy the markup, the Markdown, or download a ready-to-open page.</p>
    <div class="opts">
      <button class="opt" data-exp="html"><b>Copy HTML</b><small>Clean semantic markup for any site</small></button>
      <button class="opt" data-exp="md"><b>Copy Markdown</b><small>Great for docs, READMEs, newsletters</small></button>
      <button class="opt" data-exp="download"><b>Download .html</b><small>A styled standalone page</small></button>
      <button class="opt" data-exp="json"><b>Copy JSON</b><small>The raw block data to re-import</small></button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
/* ============================================================
   Brandofme Workspace — a block editor (Gutenberg-style)
   Self-contained. Autosaves to localStorage per user key.
   ============================================================ */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const uid = ()=> 'b'+Math.random().toString(36).slice(2,9);
const esc = s => String(s==null?'':s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
/* When embedded inside the Brandofme app, the host passes the signed-in user via
   ?u=<email>&name=&niche=&color= so each account gets its own saved workspace. */
const QP = new URLSearchParams(location.search);
const USER_KEY = (QP.get('u')||'guest').trim().toLowerCase();
const STORE_KEY = 'bom_workspace_v1::' + USER_KEY;

/* ---------- icons ---------- */
const SVG = {
  paragraph:'<span class="glyph">¶</span>',
  heading:'<span class="glyph">H</span>',
  list:'<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="3.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="3.5" cy="18" r="1.3" fill="currentColor" stroke="none"/></svg>',
  quote:'<span class="glyph">&#8220;</span>',
  code:'<svg viewBox="0 0 24 24"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/></svg>',
  details:'<svg viewBox="0 0 24 24"><path d="M5 8l3 3-3 3M11 6h9M11 12h9M11 18h9"/></svg>',
  math:'<svg viewBox="0 0 24 24"><path d="M4 13l3 6 4-14h9"/><path d="M14 9l5 5M19 9l-5 5"/></svg>',
  preformatted:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10h4M7 14h7" stroke-dasharray="2 2"/></svg>',
  pullquote:'<svg viewBox="0 0 24 24"><path d="M3 7h18M3 17h18M8 11.5q1-2 3 0M13 11.5q1-2 3 0"/></svg>',
  image:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M21 16l-5-5-7 7"/></svg>',
  divider:'<svg viewBox="0 0 24 24"><path d="M4 12h16"/><circle cx="12" cy="12" r="2"/></svg>',
  button:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4"/></svg>',
  brandcard:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M12 8.5l1 2 2.2.2-1.6 1.5.5 2.1-2.1-1.1-2.1 1.1.5-2.1L8.8 10.7 11 10.5z"/></svg>'
};
function icon(type){ return SVG[type] || SVG.paragraph; }

/* ---------- block catalog ---------- */
const CATALOG = {
  text:[
    {type:'paragraph',name:'Paragraph',desc:'Plain text — the workhorse.'},
    {type:'heading',name:'Heading',desc:'Section title (H2–H4).'},
    {type:'list',name:'List',desc:'Bulleted or numbered.'},
    {type:'quote',name:'Quote',desc:'Highlight a quotation.'},
    {type:'code',name:'Code',desc:'Show code, monospaced.'},
    {type:'details',name:'Details',desc:'Expandable Q&A / FAQ.'},
    {type:'math',name:'Math',desc:'A LaTeX formula.'},
    {type:'preformatted',name:'Preformatted',desc:'Keep spacing & line breaks.'},
    {type:'pullquote',name:'Pullquote',desc:'A bold, centered quote.'},
  ],
  media:[
    {type:'image',name:'Image',desc:'Upload or link a picture.'},
  ],
  design:[
    {type:'divider',name:'Divider',desc:'A visual break.'},
    {type:'button',name:'Button',desc:'A call-to-action link.'},
  ],
  brand:[
    {type:'brandcard',name:'Brand card',desc:'Your name, tagline & color.'},
  ]
};
const CAT_LABEL = {text:'Text',media:'Media',design:'Design',brand:'Brand'};
function metaFor(type){ for(const k in CATALOG){ const m=CATALOG[k].find(b=>b.type===type); if(m) return m; } return CATALOG.text[0]; }

/* ---------- patterns (prebuilt block groups) ---------- */
const PATTERNS = {
  hero:{name:'Hero intro',desc:'Big heading + lead paragraph + button',blocks:()=>[
    {id:uid(),type:'heading',level:2,html:'I help people build a brand that sounds like them.'},
    {id:uid(),type:'paragraph',html:'A one-line promise about who you help and the change you create. Keep it human.'},
    {id:uid(),type:'button',label:'Work with me →',url:'#'},
  ]},
  about:{name:'About section',desc:'Heading + two paragraphs',blocks:()=>[
    {id:uid(),type:'heading',level:3,html:'About'},
    {id:uid(),type:'paragraph',html:'Where you come from and why this work matters to you.'},
    {id:uid(),type:'paragraph',html:'What someone can expect when they work with you or follow along.'},
  ]},
  faq:{name:'FAQ entry',desc:'A collapsible question',blocks:()=>[
    {id:uid(),type:'details',summary:'How does it work?',html:'Answer the question plainly, in a sentence or two.'},
  ]},
  cta:{name:'Closing CTA',desc:'Pullquote + button',blocks:()=>[
    {id:uid(),type:'pullquote',html:'There is only one brand of you.',cite:''},
    {id:uid(),type:'button',label:'Claim your name →',url:'#'},
  ]},
};

/* ---------- default factory ---------- */
function newBlock(type){
  const b = {id:uid(), type};
  switch(type){
    case 'paragraph': b.html=''; break;
    case 'heading': b.level=2; b.html=''; break;
    case 'list': b.ordered=false; b.html='<li></li>'; break;
    case 'quote': b.html=''; b.cite=''; break;
    case 'pullquote': b.html=''; b.cite=''; break;
    case 'code': b.code=''; b.lang='js'; break;
    case 'preformatted': b.text=''; break;
    case 'details': b.summary='Question'; b.html='Answer goes here.'; break;
    case 'math': b.formula='a^2 + b^2 = c^2'; break;
    case 'image': b.src=''; b.alt=''; b.caption=''; break;
    case 'divider': break;
    case 'button': b.label='Click me'; b.url='#'; break;
    case 'brandcard': b.name='Your Name'; b.tagline='Your one-line tagline'; b.color='#2B3CFF'; break;
  }
  return b;
}

/* ---------- state ---------- */
let doc = load() || { title:'', name:'Untitled workspace', blocks:[] };
let selectedId = null;

function load(){ try{ const s=localStorage.getItem(STORE_KEY); return s?JSON.parse(s):null; }catch(e){ return null; } }
let saveTimer=null;
function markSaving(){ const el=$('#saveStat'); el.classList.add('saving'); $('#saveTxt').textContent='Saving…'; }
function save(){
  markSaving();
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(doc)); }catch(e){}
    $('#saveStat').classList.remove('saving'); $('#saveTxt').textContent='Saved';
  },450);
}

/* ============================================================
   RENDER  — build editable DOM for each block
   ============================================================ */
function render(){
  const root=$('#docBlocks'); root.innerHTML='';
  if(!doc.blocks.length){
    const e=document.createElement('div'); e.className='empty-doc';
    e.innerHTML='Start writing, or press <kbd>/</kbd> to choose a block. Tap <b>+</b> top-left to browse everything.';
    e.addEventListener('click',()=>{ addBlock('paragraph'); });
    root.appendChild(e);
    return;
  }
  doc.blocks.forEach(b=> root.appendChild(buildBlock(b)));
}

function buildBlock(b){
  const wrap=document.createElement('div');
  wrap.className='blk'; wrap.dataset.id=b.id; wrap.dataset.type=b.type;
  if(b.id===selectedId) wrap.classList.add('sel');
  wrap.appendChild(toolbar(b));
  const body=document.createElement('div'); body.className='blk-body'; body.appendChild(bodyFor(b));
  wrap.appendChild(body);
  const add=document.createElement('button'); add.className='blk-add'; add.textContent='+'; add.title='Add block below';
  add.addEventListener('click',e=>{ e.stopPropagation(); openSlashAfter(b.id, add); });
  wrap.appendChild(add);
  wrap.addEventListener('mousedown',()=>{ selectedId=b.id; $$('.blk').forEach(x=>x.classList.toggle('sel',x.dataset.id===b.id)); });

  /* drag reorder via grip */
  wrap.addEventListener('dragover',e=>{ e.preventDefault(); wrap.classList.add('drag-over'); });
  wrap.addEventListener('dragleave',()=> wrap.classList.remove('drag-over'));
  wrap.addEventListener('drop',e=>{ e.preventDefault(); wrap.classList.remove('drag-over'); const from=e.dataTransfer.getData('text/bid'); if(from&&from!==b.id) moveBefore(from,b.id); });
  return wrap;
}

function toolbar(b){
  const tb=document.createElement('div'); tb.className='blk-tb';
  const mk=(svg,title,fn,cls='')=>{ const x=document.createElement('button'); x.className=cls; x.title=title; x.innerHTML=svg; x.addEventListener('click',e=>{e.stopPropagation();fn();}); return x; };
  const grip=mk('<svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.4" fill="#fff" stroke="none"/><circle cx="15" cy="6" r="1.4" fill="#fff" stroke="none"/><circle cx="9" cy="12" r="1.4" fill="#fff" stroke="none"/><circle cx="15" cy="12" r="1.4" fill="#fff" stroke="none"/><circle cx="9" cy="18" r="1.4" fill="#fff" stroke="none"/><circle cx="15" cy="18" r="1.4" fill="#fff" stroke="none"/></svg>','Drag to reorder',()=>{},'grip');
  grip.setAttribute('draggable','true');
  grip.addEventListener('dragstart',e=>{ e.dataTransfer.setData('text/bid',b.id); e.dataTransfer.effectAllowed='move'; });
  tb.appendChild(grip);
  tb.appendChild(mk('<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>','Move up',()=>moveDir(b.id,-1)));
  tb.appendChild(mk('<svg viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>','Move down',()=>moveDir(b.id,1)));
  const sep1=document.createElement('span'); sep1.className='sep'; tb.appendChild(sep1);
  /* transform (text blocks) */
  if(['paragraph','heading','list','quote','pullquote'].includes(b.type)){
    tb.appendChild(mk('<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h7"/><path d="M16 14l3 3 3-3"/></svg>','Change block type',()=>openTransform(b.id)));
  }
  /* heading level cycle */
  if(b.type==='heading'){
    tb.appendChild(mk('<svg viewBox="0 0 24 24"><path d="M6 5v14M14 5v14M6 12h8"/><path d="M18 9v6"/></svg>','Heading level',()=>{ b.level=({2:3,3:4,4:2})[b.level||2]; refreshBlock(b.id); save(); }));
  }
  if(b.type==='list'){
    tb.appendChild(mk('<svg viewBox="0 0 24 24"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 5l1.5 1.5M4 11h1.6M3.4 17l1.2 1.2"/></svg>','Bulleted / numbered',()=>{ b.ordered=!b.ordered; refreshBlock(b.id); save(); }));
  }
  tb.appendChild(mk('<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5h10"/></svg>','Duplicate',()=>duplicate(b.id)));
  const sep2=document.createElement('span'); sep2.className='sep'; tb.appendChild(sep2);
  tb.appendChild(mk('<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"/></svg>','Delete',()=>removeBlock(b.id),'danger'));
  return tb;
}

/* editable body per type */
function ce(cls,html,ph,onin){
  const d=document.createElement('div'); d.className=cls; d.contentEditable='true'; d.spellcheck=true;
  if(ph) d.dataset.ph=ph; d.innerHTML=html||'';
  d.addEventListener('input',()=>{ onin(d); save(); });
  d.addEventListener('keydown',e=>handleEditKeys(e,d));
  return d;
}
function bodyFor(b){
  switch(b.type){
    case 'paragraph': return ce('blk-p',b.html,'Type / for a block, or just write…',d=>b.html=d.innerHTML);
    case 'heading': return ce('blk-h'+(b.level||2),b.html,'Heading',d=>b.html=d.innerHTML);
    case 'quote':{ const w=document.createElement('div'); w.className='blk-quote';
      w.appendChild(ce('q',b.html,'Quotation…',d=>b.html=d.innerHTML));
      w.appendChild(ce('cite',b.cite,'— attribution (optional)',d=>b.cite=d.innerHTML)); return w; }
    case 'pullquote':{ const w=document.createElement('div'); w.className='blk-pull';
      w.appendChild(ce('q',b.html,'A statement worth pulling out…',d=>b.html=d.innerHTML));
      w.appendChild(ce('cite',b.cite,'— attribution (optional)',d=>b.cite=d.innerHTML)); return w; }
    case 'list':{ const w=document.createElement('div'); w.className='blk-list';
      const l=document.createElement(b.ordered?'ol':'ul'); l.contentEditable='true'; l.innerHTML=b.html||'<li></li>'; l.dataset.ph='List…';
      l.addEventListener('input',()=>{ b.html=l.innerHTML; save(); });
      l.addEventListener('keydown',e=>handleEditKeys(e,l));
      w.appendChild(l); return w; }
    case 'code':{ const w=document.createElement('div'); w.className='blk-code';
      const lang=document.createElement('div'); lang.className='lang'; lang.contentEditable='true'; lang.textContent=b.lang||'code';
      lang.addEventListener('input',()=>{ b.lang=lang.textContent.trim(); save(); });
      const c=document.createElement('div'); c.contentEditable='true'; c.dataset.ph='// your code'; c.textContent=b.code||'';
      c.style.outline='none'; c.style.whiteSpace='pre-wrap';
      c.addEventListener('input',()=>{ b.code=c.textContent; save(); });
      c.addEventListener('keydown',e=>{ if(e.key==='Tab'){ e.preventDefault(); document.execCommand('insertText',false,'  '); } });
      w.appendChild(lang); w.appendChild(c); return w; }
    case 'preformatted':{ const c=document.createElement('div'); c.className='blk-pre'; c.contentEditable='true'; c.dataset.ph='Preformatted text — spacing preserved'; c.textContent=b.text||'';
      c.addEventListener('input',()=>{ b.text=c.textContent; save(); }); return c; }
    case 'details':{ const w=document.createElement('details'); w.className='blk-details'; w.open=true;
      const s=document.createElement('summary'); s.contentEditable='true'; s.textContent=b.summary||'Question';
      s.addEventListener('input',()=>{ b.summary=s.textContent; save(); });
      s.addEventListener('click',e=>e.preventDefault());
      const bd=ce('body',b.html,'Answer…',d=>b.html=d.innerHTML);
      w.appendChild(s); w.appendChild(bd); return w; }
    case 'math':{ const w=document.createElement('div'); w.className='blk-math';
      const out=document.createElement('div'); out.className='out'; renderMath(out,b.formula);
      const inp=document.createElement('input'); inp.className='edit'; inp.value=b.formula||''; inp.placeholder='LaTeX, e.g. \\frac{a}{b} = c';
      inp.addEventListener('input',()=>{ b.formula=inp.value; renderMath(out,b.formula); save(); });
      w.appendChild(out); w.appendChild(inp); return w; }
    case 'divider':{ const w=document.createElement('div'); w.className='blk-divider'; w.innerHTML='<span class="line"></span><span class="o">✦</span><span class="line"></span>'; return w; }
    case 'image':{ const w=document.createElement('div'); w.className='blk-img';
      const mount=()=>{ w.innerHTML='';
        if(b.src){ const img=document.createElement('img'); img.src=b.src; img.alt=b.alt||''; w.appendChild(img);
          const cap=document.createElement('div'); cap.className='cap'; cap.contentEditable='true'; cap.dataset.ph='Add a caption…'; cap.textContent=b.caption||'';
          cap.addEventListener('input',()=>{ b.caption=cap.textContent; save(); }); w.appendChild(cap);
        } else {
          const ph=document.createElement('div'); ph.className='ph'; ph.textContent='Click to upload an image, or paste an image URL';
          ph.addEventListener('click',()=>pickImage(b,mount)); w.appendChild(ph);
        }
      }; mount(); return w; }
    case 'button':{ const w=document.createElement('div'); w.className='blk-btn-wrap';
      const a=document.createElement('span'); a.className='blk-btn'; a.contentEditable='true'; a.textContent=b.label||'Button';
      a.addEventListener('input',()=>{ b.label=a.textContent; save(); });
      a.addEventListener('blur',()=>{ const u=prompt('Link URL for this button:', b.url||'#'); if(u!=null){ b.url=u; save(); } });
      a.title='Type the label · click away to set the link';
      w.appendChild(a); return w; }
    case 'brandcard':{ const w=document.createElement('div'); w.className='blk-card';
      const ava=document.createElement('div'); ava.className='ava'; ava.style.background=b.color||'#2B3CFF'; ava.textContent=(b.name||'Y').trim()[0]||'Y';
      const col=document.createElement('div'); col.style.flex='1';
      const nm=document.createElement('div'); nm.className='nm'; nm.contentEditable='true'; nm.textContent=b.name||'';
      nm.addEventListener('input',()=>{ b.name=nm.textContent; ava.textContent=(b.name||'Y').trim()[0]||'Y'; save(); });
      const tg=document.createElement('div'); tg.className='tg'; tg.contentEditable='true'; tg.dataset.ph='Tagline'; tg.textContent=b.tagline||'';
      tg.addEventListener('input',()=>{ b.tagline=tg.textContent; save(); });
      const pick=document.createElement('div'); pick.className='pick';
      ['#2B3CFF','#7A3CFF','#0a8a3a','#C8102E','#E8820C','#0F1217'].forEach(c=>{ const s=document.createElement('span'); s.className='sw'; s.style.background=c; s.addEventListener('click',()=>{ b.color=c; ava.style.background=c; save(); }); pick.appendChild(s); });
      col.appendChild(nm); col.appendChild(tg); col.appendChild(pick);
      w.appendChild(ava); w.appendChild(col); return w; }
  }
  return ce('blk-p',b.html||'','',d=>b.html=d.innerHTML);
}

function renderMath(el,formula){
  el.classList.add('out');
  if(window.katex){ try{ katex.render(formula||'',el,{throwOnError:false,displayMode:true}); return; }catch(e){} }
  el.innerHTML='<span class="raw">'+esc(formula||'')+'</span>';
}

/* refresh a single block in place (after structural change to that block) */
function refreshBlock(id){
  const b=doc.blocks.find(x=>x.id===id); if(!b) return;
  const wrap=$('.blk[data-id="'+id+'"]'); if(!wrap) return;
  wrap.dataset.type=b.type;
  const body=wrap.querySelector('.blk-body'); body.innerHTML=''; body.appendChild(bodyFor(b));
  /* rebuild toolbar too (type-specific buttons) */
  const old=wrap.querySelector('.blk-tb'); old.replaceWith(toolbar(b));
}

/* ============================================================
   BLOCK OPERATIONS
   ============================================================ */
function indexOf(id){ return doc.blocks.findIndex(b=>b.id===id); }
function addBlock(type, afterId){
  const b=newBlock(type);
  if(afterId){ const i=indexOf(afterId); doc.blocks.splice(i+1,0,b); }
  else doc.blocks.push(b);
  selectedId=b.id; render(); save(); focusBlock(b.id);
  return b;
}
function insertBlocks(blocks, afterId){
  let i = afterId? indexOf(afterId)+1 : doc.blocks.length;
  doc.blocks.splice(i,0,...blocks);
  selectedId=blocks[blocks.length-1].id; render(); save();
}
function removeBlock(id){
  const i=indexOf(id); if(i<0) return;
  const prev=doc.blocks[i-1];
  doc.blocks.splice(i,1);
  selectedId = prev? prev.id : (doc.blocks[i]?doc.blocks[i].id:null);
  render(); save(); if(selectedId) focusBlock(selectedId);
}
function duplicate(id){
  const i=indexOf(id); if(i<0) return;
  const copy=JSON.parse(JSON.stringify(doc.blocks[i])); copy.id=uid();
  doc.blocks.splice(i+1,0,copy); selectedId=copy.id; render(); save();
}
function moveDir(id,dir){
  const i=indexOf(id); const j=i+dir;
  if(i<0||j<0||j>=doc.blocks.length) return;
  [doc.blocks[i],doc.blocks[j]]=[doc.blocks[j],doc.blocks[i]];
  render(); save(); $('.blk[data-id="'+id+'"]')?.scrollIntoView({block:'nearest'});
}
function moveBefore(fromId,beforeId){
  const fi=indexOf(fromId); if(fi<0) return;
  const [m]=doc.blocks.splice(fi,1);
  const bi=indexOf(beforeId);
  doc.blocks.splice(bi<0?doc.blocks.length:bi,0,m);
  render(); save();
}
function transform(id,type){
  const b=doc.blocks.find(x=>x.id===id); if(!b) return;
  const text=plainText(b);
  const nb=newBlock(type); nb.id=b.id;
  if('html' in nb) nb.html = type==='list' ? '<li>'+esc(text)+'</li>' : esc(text);
  if(type==='heading') nb.level=2;
  doc.blocks[indexOf(id)]=nb;
  refreshBlock(id); save(); focusBlock(id);
}
function plainText(b){
  const tmp=document.createElement('div'); tmp.innerHTML=b.html||''; let t=tmp.textContent||'';
  if(!t && b.text) t=b.text; if(!t && b.code) t=b.code; return t.trim();
}

/* focus the first editable in a block */
function focusBlock(id){
  setTimeout(()=>{ const w=$('.blk[data-id="'+id+'"]'); if(!w) return;
    const ed=w.querySelector('[contenteditable="true"],input.edit'); if(ed){ ed.focus();
      if(ed.isContentEditable){ const r=document.createRange(); r.selectNodeContents(ed); r.collapse(false); const s=getSelection(); s.removeAllRanges(); s.addRange(r); } }
  },10);
}

/* Enter at end of paragraph -> new paragraph; Backspace on empty -> delete & merge focus */
function handleEditKeys(e,el){
  const id=el.closest('.blk')?.dataset.id; const b=doc.blocks.find(x=>x.id===id);
  if(!b) return;
  if(e.key==='/' && el.textContent.trim()===''){ e.preventDefault(); openSlashAt(el); return; }
  if(e.key==='Enter' && !e.shiftKey && (b.type==='paragraph'||b.type==='heading')){
    e.preventDefault(); addBlock('paragraph', id);
  }
  if(e.key==='Backspace' && el.textContent===''&&(b.type==='paragraph')&&doc.blocks.length>1){
    const i=indexOf(id); if(i>0){ e.preventDefault(); removeBlock(id); }
  }
}

/* ============================================================
   SLASH MENU  &  TRANSFORM MENU
   ============================================================ */
const slashMenu=$('#slashMenu'); let slashCtx=null, slashItems=[], slashHL=0;
function flatCatalog(){ const out=[]; for(const k in CATALOG){ CATALOG[k].forEach(m=>out.push({...m,cat:k})); } return out; }
function openSlashAt(el){ const r=el.getBoundingClientRect(); slashCtx={mode:'replace',el}; showSlash(r.left, r.bottom+6, ''); }
function openSlashAfter(id,anchor){ const r=anchor.getBoundingClientRect(); slashCtx={mode:'after',id}; showSlash(r.left-110, r.bottom+8, ''); }
function showSlash(x,y,filter){
  slashHL=0; renderSlash(filter);
  slashMenu.style.left=Math.max(12,Math.min(x,innerWidth-260))+'px';
  slashMenu.style.top=Math.min(y,innerHeight-340)+'px';
  slashMenu.style.display='block';
  document.addEventListener('keydown',slashNav,true);
  setTimeout(()=>document.addEventListener('click',closeSlashOutside),0);
}
function renderSlash(filter){
  const f=(filter||'').toLowerCase();
  slashItems=flatCatalog().filter(m=> !f || m.name.toLowerCase().includes(f) || m.type.includes(f) || m.cat.includes(f));
  let html=''; let lastCat='';
  slashItems.forEach((m,i)=>{ if(m.cat!==lastCat){ html+='<div class="grp">'+CAT_LABEL[m.cat]+'</div>'; lastCat=m.cat; }
    html+='<div class="mi'+(i===slashHL?' hl':'')+'" data-i="'+i+'"><span class="ic">'+icon(m.type)+'</span><div><b>'+m.name+'</b><small>'+esc(m.desc)+'</small></div></div>'; });
  if(!slashItems.length) html='<div class="grp">No blocks match</div>';
  slashMenu.innerHTML=html;
  $$('.mi',slashMenu).forEach(mi=> mi.addEventListener('mousedown',e=>{ e.preventDefault(); chooseSlash(+mi.dataset.i); }));
}
function slashNav(e){
  if(slashMenu.style.display==='none') return;
  if(e.key==='ArrowDown'){ e.preventDefault(); slashHL=Math.min(slashHL+1,slashItems.length-1); renderSlash(curFilter()); }
  else if(e.key==='ArrowUp'){ e.preventDefault(); slashHL=Math.max(slashHL-1,0); renderSlash(curFilter()); }
  else if(e.key==='Enter'){ e.preventDefault(); chooseSlash(slashHL); }
  else if(e.key==='Escape'){ closeSlash(); }
  else if(e.key==='Backspace' && slashCtx?.mode==='replace'){ setTimeout(()=>{ const t=slashCtx.el.textContent; if(!t.startsWith('/')) closeSlash(); else renderSlash(t.slice(1)); },0); }
  else if(slashCtx?.mode==='replace' && e.key.length===1){ setTimeout(()=>renderSlash(curFilter()),0); }
}
function curFilter(){ if(slashCtx?.mode==='replace'){ const t=slashCtx.el.textContent; return t.startsWith('/')?t.slice(1):''; } return ''; }
function chooseSlash(i){ const m=slashItems[i]; if(!m){ closeSlash(); return; }
  if(slashCtx.mode==='replace'){ const id=slashCtx.el.closest('.blk').dataset.id; slashCtx.el.textContent=''; transform(id,m.type); }
  else { addBlock(m.type, slashCtx.id); }
  closeSlash();
}
function closeSlash(){ slashMenu.style.display='none'; document.removeEventListener('keydown',slashNav,true); document.removeEventListener('click',closeSlashOutside); slashCtx=null; }
function closeSlashOutside(e){ if(!slashMenu.contains(e.target)) closeSlash(); }

/* transform menu reuses slash UI but only text types */
function openTransform(id){
  const w=$('.blk[data-id="'+id+'"]'); const r=w.getBoundingClientRect();
  slashCtx={mode:'transform',id}; const types=['paragraph','heading','list','quote','pullquote','code'];
  slashItems=flatCatalog().filter(m=>types.includes(m.type)); slashHL=0;
  let html='<div class="grp">Turn into</div>';
  slashItems.forEach((m,i)=> html+='<div class="mi'+(i===0?' hl':'')+'" data-i="'+i+'"><span class="ic">'+icon(m.type)+'</span><div><b>'+m.name+'</b></div></div>');
  slashMenu.innerHTML=html;
  $$('.mi',slashMenu).forEach(mi=> mi.addEventListener('mousedown',e=>{ e.preventDefault(); transform(id,slashItems[+mi.dataset.i].type); closeSlash(); }));
  slashMenu.style.left=Math.min(r.left,innerWidth-260)+'px'; slashMenu.style.top=(r.top+6)+'px'; slashMenu.style.display='block';
  document.addEventListener('keydown',slashNav,true);
  setTimeout(()=>document.addEventListener('click',closeSlashOutside),0);
}

/* ============================================================
   INSERTER RAIL  (Blocks / Patterns / Media)
   ============================================================ */
let railTab='blocks';
function openRail(tab){ railTab=tab||railTab; $('#shell').classList.add('rail-open'); $('#rail').classList.add('open'); $('#addBtn').classList.add('on');
  $$('.tab').forEach(t=>t.classList.toggle('on',t.dataset.tab===railTab)); renderRail(''); }
function closeRail(){ $('#shell').classList.remove('rail-open'); $('#rail').classList.remove('open'); $('#addBtn').classList.remove('on'); }
function toggleRail(){ $('#rail').classList.contains('open')?closeRail():openRail('blocks'); }
function renderRail(filter){
  const body=$('#railBody'); const f=(filter||'').toLowerCase();
  if(railTab==='blocks'){
    let html='<div class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg><input id="railSearch" placeholder="Search" value="'+esc(filter||'')+'"></div>';
    let any=false;
    for(const cat in CATALOG){
      const items=CATALOG[cat].filter(m=>!f||m.name.toLowerCase().includes(f)||m.type.includes(f));
      if(!items.length) continue; any=true;
      html+='<div class="cat-label">'+CAT_LABEL[cat]+'</div><div class="tiles">';
      items.forEach(m=> html+='<button class="tile" data-type="'+m.type+'" title="'+esc(m.desc)+'">'+icon(m.type)+'<span>'+m.name+'</span></button>');
      html+='</div>';
    }
    if(!any) html+='<div class="empty-cat">No blocks match “'+esc(filter)+'”.</div>';
    body.innerHTML=html;
    const si=$('#railSearch'); si.addEventListener('input',()=>renderRail(si.value)); si.focus();
    $$('.tile',body).forEach(t=> t.addEventListener('click',()=>{ addBlock(t.dataset.type, selectedId); }));
  } else if(railTab==='patterns'){
    let html='';
    for(const k in PATTERNS){ const p=PATTERNS[k]; html+='<div class="pattern" data-p="'+k+'"><b>'+p.name+'</b><small>'+esc(p.desc)+'</small></div>'; }
    body.innerHTML=html;
    $$('.pattern',body).forEach(el=> el.addEventListener('click',()=>{ insertBlocks(PATTERNS[el.dataset.p].blocks(), selectedId); toast('Pattern added'); }));
  } else {
    body.innerHTML='<div class="media-drop" id="mediaDrop">Click to upload an image<br><small>or drop a file here</small></div><div class="cat-label">From the web</div><div class="search" style="margin-top:0"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18"/></svg><input id="mediaUrl" placeholder="Paste an image URL, press Enter"></div>';
    const drop=$('#mediaDrop'); drop.addEventListener('click',()=>uploadImage(src=>{ const b=newBlock('image'); b.src=src; insertBlocks([b],selectedId); }));
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.style.borderColor='var(--accent)';});
    drop.addEventListener('drop',e=>{ e.preventDefault(); const fl=e.dataTransfer.files[0]; if(fl) readFile(fl,src=>{ const b=newBlock('image'); b.src=src; insertBlocks([b],selectedId); }); });
    const u=$('#mediaUrl'); u.addEventListener('keydown',e=>{ if(e.key==='Enter'&&u.value.trim()){ const b=newBlock('image'); b.src=u.value.trim(); insertBlocks([b],selectedId); u.value=''; } });
  }
}

/* ---------- image helpers ---------- */
function readFile(file,cb){ if(!/^image\//.test(file.type)){ toast('Please choose an image'); return; } if(file.size>5*1024*1024){ toast('Image must be under 5MB'); return; } const r=new FileReader(); r.onload=()=>cb(r.result); r.readAsDataURL(file); }
function uploadImage(cb){ const i=document.createElement('input'); i.type='file'; i.accept='image/*'; i.onchange=()=>{ if(i.files[0]) readFile(i.files[0],cb); }; i.click(); }
function pickImage(b,mount){
  const choose=confirm('OK = upload a file · Cancel = paste an image URL');
  if(choose){ uploadImage(src=>{ b.src=src; mount(); save(); }); }
  else { const u=prompt('Image URL:'); if(u){ b.src=u.trim(); mount(); save(); } }
}

/* ============================================================
   INLINE FORMAT TOOLBAR (bold / italic / link)
   ============================================================ */
const fmt=$('#fmtBar');
document.addEventListener('selectionchange',()=>{
  const s=getSelection();
  if(!s.rangeCount||s.isCollapsed){ fmt.style.display='none'; return; }
  const node=s.anchorNode; const ed=node&&(node.nodeType===1?node:node.parentElement)?.closest('[contenteditable="true"]');
  if(!ed||!ed.closest('.blk-body')||ed.classList.contains('lang')){ fmt.style.display='none'; return; }
  const r=s.getRangeAt(0).getBoundingClientRect();
  fmt.style.display='flex';
  fmt.style.left=Math.max(8,r.left+r.width/2-50)+'px';
  fmt.style.top=(r.top-42+scrollY)+'px';
});
fmt.addEventListener('mousedown',e=>{ e.preventDefault(); const cmd=e.target.closest('button')?.dataset.cmd; if(!cmd) return;
  if(cmd==='link'){ const url=prompt('Link URL:','https://'); if(url) document.execCommand('createLink',false,url); }
  else document.execCommand(cmd,false,null);
  $$('.blk-body [contenteditable="true"]').forEach(el=> el.dispatchEvent(new Event('input')));
});

/* ============================================================
   EXPORT
   ============================================================ */
function blockHTML(b){
  switch(b.type){
    case 'paragraph': return '<p>'+(b.html||'')+'</p>';
    case 'heading': return '<h'+(b.level||2)+'>'+(b.html||'')+'</h'+(b.level||2)+'>';
    case 'list': return (b.ordered?'<ol>':'<ul>')+(b.html||'')+(b.ordered?'</ol>':'</ul>');
    case 'quote': return '<blockquote><p>'+(b.html||'')+'</p>'+(b.cite?'<cite>'+b.cite+'</cite>':'')+'</blockquote>';
    case 'pullquote': return '<figure class="pullquote"><p>'+(b.html||'')+'</p>'+(b.cite?'<cite>'+b.cite+'</cite>':'')+'</figure>';
    case 'code': return '<pre><code class="language-'+esc(b.lang||'')+'">'+esc(b.code||'')+'</code></pre>';
    case 'preformatted': return '<pre>'+esc(b.text||'')+'</pre>';
    case 'details': return '<details><summary>'+esc(b.summary||'')+'</summary><div>'+(b.html||'')+'</div></details>';
    case 'math': return '<p class="math">$$'+esc(b.formula||'')+'$$</p>';
    case 'divider': return '<hr>';
    case 'image': return b.src?'<figure><img src="'+esc(b.src)+'" alt="'+esc(b.alt||'')+'">'+(b.caption?'<figcaption>'+esc(b.caption)+'</figcaption>':'')+'</figure>':'';
    case 'button': return '<p><a class="button" href="'+esc(b.url||'#')+'">'+esc(b.label||'')+'</a></p>';
    case 'brandcard': return '<div class="brand-card"><span class="ava" style="background:'+esc(b.color||'#2B3CFF')+'">'+esc((b.name||'Y')[0])+'</span><div><strong>'+esc(b.name||'')+'</strong><div>'+esc(b.tagline||'')+'</div></div></div>';
  }
  return '';
}
function htmlText(plain){ const d=document.createElement('div'); d.innerHTML=plain; return d.textContent||''; }
function blockMD(b){
  switch(b.type){
    case 'paragraph': return htmlText(b.html);
    case 'heading': return '#'.repeat(b.level||2)+' '+htmlText(b.html);
    case 'list':{ const d=document.createElement(b.ordered?'ol':'ul'); d.innerHTML=b.html||''; return [...d.children].map((li,i)=> (b.ordered?(i+1)+'. ':'- ')+li.textContent).join('\n'); }
    case 'quote': return '> '+htmlText(b.html)+(b.cite?'\n> — '+htmlText(b.cite):'');
    case 'pullquote': return '> **'+htmlText(b.html)+'**';
    case 'code': return '```'+(b.lang||'')+'\n'+(b.code||'')+'\n```';
    case 'preformatted': return '```\n'+(b.text||'')+'\n```';
    case 'details': return '**'+(b.summary||'')+'**\n\n'+htmlText(b.html);
    case 'math': return '$$'+(b.formula||'')+'$$';
    case 'divider': return '---';
    case 'image': return b.src?'!['+(b.alt||'')+']('+b.src+')'+(b.caption?'\n*'+b.caption+'*':''):'';
    case 'button': return '['+(b.label||'')+']('+(b.url||'#')+')';
    case 'brandcard': return '**'+(b.name||'')+'** — '+(b.tagline||'');
  }
  return '';
}
function toHTML(){ return doc.blocks.map(blockHTML).filter(Boolean).join('\n'); }
function toMD(){ return doc.blocks.map(blockMD).filter(Boolean).join('\n\n'); }
function standalonePage(){
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<title>'+esc(doc.name||'Workspace')+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800&family=Instrument+Sans:wght@400;600&display=swap" rel="stylesheet">'+
  '<style>body{font-family:Instrument Sans,system-ui,sans-serif;max-width:720px;margin:0 auto;padding:60px 22px;color:#0F1217;line-height:1.65;font-size:17px}'+
  'h1,h2,h3,h4{font-family:Unbounded,sans-serif;line-height:1.2}h1{font-size:40px}'+
  'blockquote{border-left:3px solid #0F1217;padding-left:18px;font-style:italic;font-size:20px}'+
  '.pullquote{border-top:3px solid #2B3CFF;border-bottom:3px solid #2B3CFF;text-align:center;padding:22px 0;font-family:Unbounded;font-weight:700;font-size:24px}'+
  'pre{background:#0f1217;color:#e8eaf0;padding:16px;border-radius:10px;overflow:auto;font-family:ui-monospace,monospace}'+
  'img{max-width:100%;border-radius:12px}figure{margin:0}figcaption{color:#666;font-size:13px;text-align:center;margin-top:8px}'+
  'details{border:1px solid #ddd;border-radius:10px;padding:8px 16px;margin:10px 0}'+
  'a.button{display:inline-block;background:linear-gradient(120deg,#2B3CFF,#7A3CFF);color:#fff;padding:12px 22px;border-radius:12px;text-decoration:none;font-weight:600}'+
  '.brand-card{border:1px solid #ddd;border-radius:16px;padding:22px;display:flex;gap:16px;align-items:center}.brand-card .ava{width:54px;height:54px;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff;font-family:Unbounded;font-weight:800;font-size:22px}'+
  'hr{border:none;border-top:1px solid #ddd;margin:28px 0}</style></head><body>'+
  (doc.name?'<h1>'+esc(doc.name)+'</h1>':'')+toHTML()+'</body></html>';
}
function copyText(t,label){ navigator.clipboard.writeText(t).then(()=>toast(label+' copied to clipboard')).catch(()=>toast('Copy failed — select & copy manually')); }
function downloadFile(name,content,mime){ const blob=new Blob([content],{type:mime}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000); }

/* ============================================================
   WIRING
   ============================================================ */
$('#addBtn').addEventListener('click',toggleRail);
$('#railClose').addEventListener('click',closeRail);
$$('.tab').forEach(t=> t.addEventListener('click',()=>{ railTab=t.dataset.tab; openRail(railTab); }));

$('#docTitle').value=doc.name==='Untitled workspace'?'':(doc.name||'');
$('#docTitleBar').value=doc.name||'Untitled workspace';
function syncTitle(v){ doc.name=v||'Untitled workspace'; $('#docTitle').value=v; $('#docTitleBar').value=doc.name; save(); }
$('#docTitle').addEventListener('input',e=>syncTitle(e.target.value));
$('#docTitleBar').addEventListener('input',e=>syncTitle(e.target.value));

let previewing=false;
$('#previewBtn').addEventListener('click',()=>{ previewing=!previewing; document.body.classList.toggle('preview',previewing);
  $('#previewBtn').textContent=previewing?'Edit':'Preview'; if(previewing) closeRail();
  $$('.blk [contenteditable]').forEach(e=>e.contentEditable=String(!previewing));
});
$('#publishBtn').addEventListener('click',()=>{ save(); toast('✓ Published — your workspace is live (demo). Connect a backend to push it to /u/you.'); });

/* export overlay */
$('#exportBtn').addEventListener('click',()=>$('#exportOv').classList.add('open'));
$('#exportClose').addEventListener('click',()=>$('#exportOv').classList.remove('open'));
$('#exportOv').addEventListener('click',e=>{ if(e.target===$('#exportOv')) $('#exportOv').classList.remove('open'); });
$$('#exportOv .opt').forEach(o=> o.addEventListener('click',()=>{ const k=o.dataset.exp;
  if(k==='html') copyText(toHTML(),'HTML');
  else if(k==='md') copyText(toMD(),'Markdown');
  else if(k==='json') copyText(JSON.stringify(doc,null,2),'JSON');
  else if(k==='download'){ downloadFile((doc.name||'workspace').replace(/[^\w]+/g,'-').toLowerCase()+'.html', standalonePage(),'text/html'); toast('Downloading page…'); }
  $('#exportOv').classList.remove('open');
}));

/* keyboard: Cmd/Ctrl+S save, Esc closes menus */
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key==='s'){ e.preventDefault(); save(); toast('Saved'); }
  if(e.key==='Escape'){ closeRail(); $('#exportOv').classList.remove('open'); }
});

/* toast */
let toastT=null;
function toast(msg){ const t=$('#toast'); t.innerHTML=msg; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2600); }

/* ---------- seed a friendly first-run document ---------- */
if(!doc.blocks.length){
  const pName  = (QP.get('name')||'').trim();
  const pNiche = (QP.get('niche')||'').trim();
  const pColor = (QP.get('color')||'#2B3CFF').trim();
  doc.name = doc.name || (pName ? (pName.split(' ')[0]+'’s workspace') : 'My brand workspace');
  doc.blocks=[
    {id:uid(),type:'heading',level:2,html:'Welcome'+(pName?', '+esc(pName.split(' ')[0]):'')+' ✦'},
    {id:uid(),type:'paragraph',html:'This is your workspace — a block editor where every line is a block you can move, change, or restyle. Hover a block for its toolbar, or press <strong>/</strong> on an empty line to insert anything.'},
    {id:uid(),type:'list',ordered:false,html:'<li>Click <strong>+</strong> (top-left) to browse all blocks, patterns and media</li><li>Drag the handle to reorder</li><li>Hit <strong>Export</strong> to copy HTML / Markdown or download a page</li>'},
    {id:uid(),type:'brandcard',name:pName||'Your Name',tagline:pNiche||'One line about what you do',color:pColor},
  ];
  save();
}
$('#docTitle').value=doc.name==='Untitled workspace'?'':doc.name;
$('#docTitleBar').value=doc.name;
render();
</script>
</body>
</html>
