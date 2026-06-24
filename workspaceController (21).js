<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Brandofme — the 2-minute demo</title>
<meta name="description" content="See it for yourself: type your name and watch your whole brand build itself in real time — name, colours, tagline, type and voice.">
<meta property="og:title" content="Brandofme — the 2-minute demo">
<meta property="og:description" content="Type your name. Watch your brand appear.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;800&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Playfair+Display:wght@600;800&family=Space+Grotesk:wght@500;700&family=Fredoka:wght@500;600;700&family=Nunito:wght@400;700&family=Archivo:wght@400;600&family=Archivo+Black&family=Fraunces:opsz,wght@9..144,500;9..144,800&family=Syne:wght@600;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --paper:#F6F7F5;--ink:#0F1217;--accent:#2B3CFF;--accent2:#7A3CFF;
  --card:#FFFFFF;--line:rgba(15,18,23,.12);--line-strong:rgba(15,18,23,.26);--muted:rgba(15,18,23,.55);
  --grad:linear-gradient(120deg,#2B3CFF,#7A3CFF);
  --display:'Unbounded',sans-serif;--body:'Instrument Sans',system-ui,sans-serif;--mono:'IBM Plex Mono',monospace;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:var(--body);color:var(--ink);background:var(--paper);font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased}
a{color:inherit}
button{font-family:inherit;cursor:pointer}
::selection{background:rgba(43,60,255,.18)}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}

/* top bar */
.bar{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;padding:13px 22px;background:rgba(246,247,245,.85);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:9px}
.brand .dot{width:24px;height:24px;border-radius:7px;background:var(--grad)}
.brand b{font-family:var(--display);font-weight:800;font-size:16px;letter-spacing:-.02em}
.pill{font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);border:1px solid rgba(43,60,255,.3);border-radius:100px;padding:4px 9px}
.bar-r{margin-left:auto;display:flex;align-items:center;gap:10px}
.lnk{font-size:14px;color:var(--muted);text-decoration:none}
.lnk:hover{color:var(--ink)}
.btn{display:inline-flex;align-items:center;gap:7px;border-radius:11px;padding:10px 16px;font-weight:600;font-size:14px;text-decoration:none;border:1px solid var(--line-strong);background:var(--card);color:var(--ink);transition:.15s}
.btn:hover{border-color:var(--ink)}
.btn.fill{background:var(--grad);color:#fff;border:none;box-shadow:0 6px 18px rgba(60,60,200,.22)}
.btn.fill:hover{filter:brightness(1.06)}

/* hero */
.wrap{max-width:980px;margin:0 auto;padding:56px 22px 30px}
.eyebrow{font-family:var(--mono);font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
h1{font-family:var(--display);font-weight:800;font-size:clamp(34px,6vw,60px);line-height:1.02;letter-spacing:-.025em;margin:14px 0 0}
.lede{font-size:18px;color:var(--muted);margin-top:16px;max-width:54ch}

/* builder */
.builder{margin-top:30px;display:flex;gap:10px;max-width:560px}
.builder input{flex:1;border:1.5px solid var(--line-strong);border-radius:14px;padding:15px 17px;font-family:var(--display);font-weight:700;font-size:18px;outline:none;background:#fff;color:var(--ink)}
.builder input:focus{border-color:var(--accent);box-shadow:0 0 0 4px rgba(43,60,255,.12)}
.builder .go{flex:none;border:none;border-radius:14px;padding:0 22px;background:var(--grad);color:#fff;font-weight:700;font-size:16px}
.builder .go:disabled{opacity:.6}
.egs{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.eg{font-size:13px;border:1px solid var(--line);background:#fff;border-radius:100px;padding:6px 13px;color:var(--muted);transition:.15s}
.eg:hover{border-color:var(--accent);color:var(--accent)}

/* stage */
.stage{margin-top:30px;min-height:330px;border:1px solid var(--line);border-radius:24px;background:#fff;box-shadow:0 24px 60px rgba(20,24,72,.08);overflow:hidden;position:relative}
.building{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:var(--muted);font-family:var(--mono);font-size:12.5px;letter-spacing:.06em;opacity:0;pointer-events:none;transition:opacity .25s}
.building.on{opacity:1}
.spin{width:30px;height:30px;border-radius:50%;border:3px solid rgba(43,60,255,.2);border-top-color:var(--accent);animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

.bcard{padding:0;opacity:1}
.bcard.hide{opacity:0}
.bhero{padding:30px 30px 26px;color:#fff;position:relative}
.bhero .arch{position:absolute;top:22px;right:24px;font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;opacity:.85;border:1px solid rgba(255,255,255,.4);border-radius:100px;padding:4px 10px}
.bmono{width:66px;height:66px;border-radius:17px;display:flex;align-items:center;justify-content:center;font-family:var(--display);font-weight:800;font-size:28px;margin-bottom:16px}
.bname{font-family:var(--display);font-weight:800;font-size:clamp(28px,5vw,40px);line-height:1.04;letter-spacing:-.01em}
.btag{font-size:17px;opacity:.92;margin-top:9px}
.bgrid{display:grid;grid-template-columns:1fr 1fr;gap:0}
@media(max-width:640px){.bgrid{grid-template-columns:1fr}}
.bsect{padding:20px 24px;border-top:1px solid var(--line)}
.bsect+.bsect{border-left:1px solid var(--line)}
@media(max-width:640px){.bsect+.bsect{border-left:none}}
.bsect h4{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 11px}
.pal{display:flex;gap:7px}
.pal .c{flex:1;text-align:center}
.pal .sw{height:40px;border-radius:9px;border:1px solid var(--line)}
.pal .hx{font-family:var(--mono);font-size:9px;color:var(--muted);margin-top:5px}
.typ .d{font-size:26px;line-height:1.1}
.typ .b{font-size:14px;margin-top:5px}
.typ .m{font-family:var(--mono);font-size:10.5px;color:var(--muted);margin-top:8px}
.voice{display:flex;flex-wrap:wrap;gap:7px}
.voice span{background:rgba(43,60,255,.08);color:var(--accent);border-radius:100px;padding:5px 12px;font-size:12.5px;font-weight:600}
.tags{font-family:var(--mono);font-size:12px;color:var(--muted)}
/* staged reveal */
.rv{opacity:0;transform:translateY(10px);transition:opacity .5s ease,transform .5s ease}
.rv.in{opacity:1;transform:none}

/* feature strip */
.more{max-width:980px;margin:14px auto 0;padding:30px 22px 10px}
.more h2{font-family:var(--display);font-weight:800;font-size:24px;letter-spacing:-.01em}
.frow{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:18px}
@media(max-width:760px){.frow{grid-template-columns:1fr}}
.fc{border:1px solid var(--line);border-radius:16px;padding:18px;background:#fff}
.fc .ic{width:38px;height:38px;border-radius:11px;background:var(--paper);display:flex;align-items:center;justify-content:center;font-size:19px;border:1px solid var(--line)}
.fc h3{font-family:var(--display);font-weight:700;font-size:16px;margin:13px 0 0}
.fc p{font-size:14px;color:var(--muted);margin-top:7px}

/* closing CTA */
.cta-band{max-width:980px;margin:34px auto 60px;padding:40px 28px;border-radius:24px;background:var(--grad);color:#fff;text-align:center;box-shadow:0 30px 70px rgba(60,60,200,.26)}
.cta-band h2{font-family:var(--display);font-weight:800;font-size:clamp(26px,4vw,38px);line-height:1.05;margin:0}
.cta-band p{opacity:.92;margin:12px 0 22px;font-size:16px}
.cta-band .btn{background:#fff;color:var(--ink);border:none;font-size:16px;padding:15px 26px}
.foot{text-align:center;color:var(--muted);font-size:13px;padding:0 22px 50px}
</style>
</head>
<body>
<header class="bar">
  <div class="brand"><span class="dot"></span><b>Brandofme</b></div>
  <span class="pill">Live demo</span>
  <div class="bar-r">
    <a class="lnk" href="../index.html">← Back to site</a>
    <a class="btn fill" href="../index.html#plans">Start free →</a>
  </div>
</header>

<main class="wrap">
  <div class="eyebrow">✦ THE 2-MINUTE DEMO</div>
  <h1>Type your name.<br>Watch your brand appear.</h1>
  <p class="lede">This is the whole idea, live. Enter anything — your name, a vibe, what you do — and the brand engine builds a complete identity in front of you. Try it as many times as you like.</p>

  <div class="builder">
    <input id="seed" value="Ghokkul M" maxlength="40" aria-label="Describe your brand">
    <button class="go" id="build">Build my brand →</button>
  </div>
  <div class="egs" id="egs"></div>

  <div class="stage" id="stage">
    <div class="building" id="building"><span class="spin"></span> building your brand…</div>
    <div class="bcard" id="bcard"></div>
  </div>
</main>

<section class="more">
  <h2>…and that's just the start.</h2>
  <div class="frow">
    <div class="fc"><div class="ic">💬</div><h3>Conjure</h3><p>Keep chatting — “warmer”, “bolder”, “make it luxury”, “new name” — and the brand updates as you talk.</p></div>
    <div class="fc"><div class="ic">🌐</div><h3>Your live page</h3><p>Publish in one click to brandofme.ai/you — a polished page and link-in-bio that's unmistakably yours.</p></div>
    <div class="fc"><div class="ic">✍️</div><h3>Content in your voice</h3><p>Draft posts, captions and a bio in your brand's tone, ready to ship across every platform.</p></div>
  </div>
</section>

<section class="cta-band">
  <h2>Ready to make it yours?</h2>
  <p>Start free for 7 days — no card needed. Your brand, built in minutes.</p>
  <a class="btn" href="../index.html#plans">Get started now →</a>
</section>
<p class="foot">This is an interactive demo of <a href="../index.html">brandofme.ai</a>. Everything you build here is generated live in your browser.</p>

<script>
/* ---------- compact, standalone brand engine (demo) ---------- */
function hash(s){let h=2166136261>>>0;s=String(s||'');for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function mul(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function cl(n,a,b){return Math.max(a,Math.min(b,n));}
function cap(s){s=String(s||'');return s.charAt(0).toUpperCase()+s.slice(1);}
function hsl(h,s,l){h=((h%360)+360)%360;s=cl(s,0,100)/100;l=cl(l,0,100)/100;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let r,g,b;if(h<60)[r,g,b]=[c,x,0];else if(h<120)[r,g,b]=[x,c,0];else if(h<180)[r,g,b]=[0,c,x];else if(h<240)[r,g,b]=[0,x,c];else if(h<300)[r,g,b]=[x,0,c];else[r,g,b]=[c,0,x];const t=v=>('0'+Math.round((v+m)*255).toString(16)).slice(-2);return'#'+t(r)+t(g)+t(b);}
function read(hex){const n=parseInt(hex.slice(1),16);return(0.299*(n>>16&255)+0.587*(n>>8&255)+0.114*(n&255))>150?'#0F1217':'#FFFFFF';}

const TONES={
  minimal:{hue:230,s:14,l:22,so:8,ss:16,sl:24,ah:246,as:86,al:60,lab:'Minimal',arch:'The Minimalist',adj:['clear','calm','precise'],d:'Unbounded',b:'Instrument Sans',ds:"'Unbounded',sans-serif",bs:"'Instrument Sans',sans-serif",pn:'Geometric + humanist'},
  luxury:{hue:345,s:52,l:30,so:12,ss:38,sl:20,ah:42,as:62,al:50,lab:'Luxury',arch:'The Connoisseur',adj:['refined','assured','warm'],d:'Playfair Display',b:'Inter',ds:"'Playfair Display',serif",bs:"'Inter',sans-serif",pn:'High-contrast serif + grotesque'},
  tech:{hue:226,s:84,l:56,so:-18,ss:82,sl:42,ah:188,as:90,al:58,lab:'Modern',arch:'The Innovator',adj:['sharp','optimistic','plain-spoken'],d:'Space Grotesk',b:'Inter',ds:"'Space Grotesk',sans-serif",bs:"'Inter',sans-serif",pn:'Technical + neutral'},
  playful:{hue:350,s:84,l:60,so:180,ss:80,sl:54,comp:1,lab:'Playful',arch:'The Entertainer',adj:['cheeky','bright','human'],d:'Fredoka',b:'Nunito',ds:"'Fredoka',sans-serif",bs:"'Nunito',sans-serif",pn:'Rounded + friendly'},
  bold:{hue:8,s:86,l:50,so:-14,ss:84,sl:38,comp:1,lab:'Bold',arch:'The Challenger',adj:['direct','fearless','energetic'],d:'Archivo Black',b:'Archivo',ds:"'Archivo Black',sans-serif",bs:"'Archivo',sans-serif",pn:'Heavy grotesque + tight body'},
  organic:{hue:96,s:44,l:40,so:14,ss:38,sl:28,ah:30,as:56,al:52,lab:'Organic',arch:'The Nurturer',adj:['honest','grounded','kind'],d:'Fraunces',b:'Instrument Sans',ds:"'Fraunces',serif",bs:"'Instrument Sans',sans-serif",pn:'Soft serif + humanist'},
  creative:{hue:286,s:80,l:58,so:180,ss:78,sl:46,comp:1,lab:'Creative',arch:'The Creator',adj:['expressive','curious','original'],d:'Syne',b:'Inter',ds:"'Syne',sans-serif",bs:"'Inter',sans-serif",pn:'Expressive + neutral'}
};
const TK={luxury:['luxury','premium','elegant','gold','boutique','fashion','jewel','lux','fine'],tech:['tech','ai','app','startup','saas','dev','code','data','digital','software','smart','platform'],playful:['fun','playful','kids','game','candy','toy','party','cute','joy','happy','ice cream'],minimal:['minimal','simple','clean','modern','studio','zen','calm','quiet'],bold:['bold','gym','fitness','sport','energy','athletic','beast','strong','power'],organic:['organic','natural','wellness','eco','plant','vegan','green','skincare','herbal','tea','botanical','farm'],creative:['art','design','creative','music','photo','film','craft','maker','gallery']};
const STOP=new Set('a an the and or for to of in on with my our your me i we make build create want brand company business called named name about into turn please can new help get start idea so just very kind like'.split(' '));
const SUF=['lab','studio','co','works','house','hq','ly','ify','io','kit','club'];
const PRE=['Neo','Nova','Lumen','Ever','True','Wild','Soul'];
const TAG={minimal:['{N}, distilled.','Less, but better.','The essential {n}.'],luxury:['{N}, elevated.','Crafted for the few.','The art of {n}.'],tech:['{N}, reimagined.','Build the future of {n}.','Smarter {n}, shipped.'],playful:['{N} made fun.','Seriously good {n}.','Big {n} energy.'],bold:['No limits. Just {n}.','Own your {n}.','Built for the relentless.'],organic:['{N}, naturally.','Rooted in real {n}.','Honest {n}.'],creative:['{N}, unboxed.','Where ideas become {n}.','Original {n}, always.']};

function detect(t,kw){t=' '+t.toLowerCase()+' ';let best='minimal',bs=0;for(const k in TK){let s=0;for(const w of TK[k])if(t.indexOf(' '+w)>=0||t.indexOf(w+' ')>=0)s+=2;for(const x of kw)if(TK[k].indexOf(x)>=0)s+=1;if(s>bs){bs=s;best=k;}}return best;}
function kws(t){const w=t.toLowerCase().replace(/[^a-z0-9\s'-]/g,' ').split(/\s+/).filter(Boolean),o=[];for(const x of w)if(x.length>=3&&!STOP.has(x)&&o.indexOf(x)<0)o.push(x);return o;}
function explicit(t){let m=t.match(/(?:called|named|name is|call it|name it)\s+["'\u201c]?([A-Za-z0-9][\w'\-]{0,20})/i);if(m)return cap(m[1]);m=t.match(/["'\u201c]([A-Za-z][\w'\- ]{1,20})["'\u201d]/);if(m)return m[1].split(' ').map(cap).join(' ');return null;}
function niche(kw,tone){const c=kw.find(w=>(TK[tone]||[]).indexOf(w)<0);if(c)return c;if(kw.length)return kw[kw.length-1];return tone==='creative'?'ideas':tone==='tech'?'software':'work';}
function synth(t,kw,r){const base=(kw[0]||'Brand').replace(/[^a-z]/gi,'');const s=Math.floor(r()*5);let n;if(s===0)n=cap(base)+cap(SUF[Math.floor(r()*SUF.length)]);else if(s===1&&kw[1])n=cap(base.slice(0,Math.ceil(base.length/2))+kw[1].replace(/[^a-z]/gi,'').slice(0,3));else if(s===2)n=PRE[Math.floor(r()*PRE.length)]+cap(base);else if(s===3)n=cap(base)+['o','a','i'][Math.floor(r()*3)];else n=cap(base);n=n.replace(/[^A-Za-z]/g,'');if(n.length<3)n=cap(base)||'Brand';if(n.length>15)n=n.slice(0,14);return n;}
function mono(n){const p=String(n).trim().split(/\s+/);return(p.length>1?p[0][0]+p[1][0]:n.slice(0,2)).toUpperCase();}
function bareName(t){const w=String(t).trim().split(/\s+/);if(w.length<1||w.length>3)return null;const allTone=[];for(const k in TK)for(const x of TK[k])allTone.push(x);for(const x of w){const lx=x.toLowerCase();if(!/^[a-z][a-z'\u2019\-]*$/i.test(x))return null;if(STOP.has(lx))return null;if(allTone.indexOf(lx)>=0)return null;}return w.map(cap).join(' ');}

function generate(input){
  input=String(input||'').trim()||'a modern personal brand';
  const seed=hash(input.toLowerCase()),r=mul(seed),kw=kws(input),tone=detect(input,kw),T=TONES[tone];
  const name=explicit(input)||bareName(input)||synth(input,kw,r),nz=niche(kw,tone),Nz=cap(nz);
  const h=((T.hue+(seed%24)-12)+360)%360;
  const primary=hsl(h,T.s,T.l),secondary=hsl(h+T.so,T.ss,T.sl),accent=hsl(T.comp?h+180:(T.ah||h),T.as||T.s+8,T.al||cl(T.l+8,30,70)),ink=hsl(h,22,12),paper=hsl(h,24,97);
  const tag=(TAG[tone][Math.floor(r()*TAG[tone].length)]).replace('{N}',Nz).replace('{n}',nz);
  return{name,monogram:mono(name),tone,toneLabel:T.lab,archetype:T.arch,niche:nz,tagline:tag,
    palette:{primary,secondary,accent,ink,paper,onPrimary:read(primary),onAccent:read(accent)},
    fonts:{display:T.d,body:T.b,ds:T.ds,bs:T.bs,pn:T.pn},voice:T.adj,
    tags:['#'+name.replace(/\s/g,'')].concat(kw.slice(0,2).map(w=>'#'+cap(w))).concat(['#'+Nz.replace(/\s/g,'')])};
}

/* ---------- UI ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const EGS=['a calm skincare brand','luxury watch called Aurelius','fun app for runners','an AI tool for writers','bold fitness studio'];
let busy=false;

function renderCard(b){
  const p=b.palette;
  const sw=(hex,nm)=>'<div class="c"><div class="sw" style="background:'+hex+'"></div><div class="hx">'+hex.toUpperCase()+'</div></div>';
  $('#bcard').innerHTML =
    '<div class="bhero rv" style="background:linear-gradient(135deg,'+p.primary+','+p.secondary+');color:'+p.onPrimary+'">'+
      '<div class="arch">'+esc(b.archetype)+'</div>'+
      '<div class="bmono rv" style="background:'+p.accent+';color:'+p.onAccent+';font-family:'+b.fonts.ds+'">'+esc(b.monogram)+'</div>'+
      '<div class="bname rv" style="font-family:'+b.fonts.ds+'">'+esc(b.name)+'</div>'+
      '<div class="btag rv" style="font-family:'+b.fonts.bs+'">'+esc(b.tagline)+'</div>'+
    '</div>'+
    '<div class="bgrid">'+
      '<div class="bsect rv"><h4>Palette</h4><div class="pal">'+sw(p.primary)+sw(p.secondary)+sw(p.accent)+sw(p.ink)+sw(p.paper)+'</div></div>'+
      '<div class="bsect rv typ"><h4>Typography</h4><div class="d" style="font-family:'+b.fonts.ds+'">'+esc(b.name)+'</div><div class="b" style="font-family:'+b.fonts.bs+'">The quick brown fox — 0123456789</div><div class="m">'+esc(b.fonts.display)+' / '+esc(b.fonts.body)+'</div></div>'+
      '<div class="bsect rv"><h4>Voice</h4><div class="voice">'+b.voice.map(v=>'<span>'+esc(v)+'</span>').join('')+'</div></div>'+
      '<div class="bsect rv"><h4>Tags</h4><div class="tags">'+b.tags.map(esc).join('  ')+'</div></div>'+
    '</div>';
  const items=[...$('#bcard').querySelectorAll('.rv')];
  items.forEach((el,i)=>setTimeout(()=>el.classList.add('in'),90+i*110));
}

function build(){
  if(busy) return; busy=true;
  const input=$('#seed').value;
  $('#build').disabled=true;
  $('#bcard').classList.add('hide');
  $('#building').classList.add('on');
  setTimeout(()=>{
    const brand=generate(input);
    $('#building').classList.remove('on');
    $('#bcard').classList.remove('hide');
    renderCard(brand);
    busy=false; $('#build').disabled=false;
  }, 850);
}

$('#build').addEventListener('click',build);
$('#seed').addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); build(); } });
const egbox=$('#egs');
EGS.forEach(t=>{ const b=document.createElement('button'); b.className='eg'; b.textContent='“'+t+'”'; b.addEventListener('click',()=>{ $('#seed').value=t; build(); }); egbox.appendChild(b); });

/* build once on load so the stage is never empty */
build();
</script>
</body>
</html>
