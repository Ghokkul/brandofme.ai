<!--
  brandofme.ai — "Built live" features section
  Drop-in block for the middle of the homepage.
  Everything is scoped under .bom-live so it won't collide with your existing CSS.
  To embed: copy the <style> block + the <section class="bom-live"> block.
-->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>brandofme.ai — Built live</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

<style>
/* ============================================================
   SCOPED SECTION — all selectors live under .bom-live
   ============================================================ */
.bom-live{
  --bom-blue:#2B3CFF;
  --bom-violet:#6B4BFF;
  --bom-ink:#0A0E27;
  --bom-muted:#5A6178;
  --bom-line:#E7E9F4;
  --bom-card:#F5F6FB;
  --bom-card-2:#EEF0FF;
  --bom-white:#FFFFFF;
  --bom-radius:18px;

  font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  color:var(--bom-ink);
  background:
    radial-gradient(1100px 460px at 50% -8%, rgba(43,60,255,0.06), transparent 70%),
    #FBFBFF;
  padding:84px 24px 96px;
  box-sizing:border-box;
}
.bom-live *,
.bom-live *::before,
.bom-live *::after{box-sizing:border-box;}

.bom-live .bom-wrap{max-width:1180px;margin:0 auto;}

/* ---------- header ---------- */
.bom-live .bom-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  font-family:'Space Grotesk',sans-serif;
  font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
  color:var(--bom-blue);
  margin:0 0 18px;
}
.bom-live .bom-eyebrow::before{
  content:"";width:7px;height:7px;border-radius:50%;
  background:var(--bom-blue);
  box-shadow:0 0 0 4px rgba(43,60,255,.16);
  animation:bom-pulse 1.8s ease-in-out infinite;
}
.bom-live .bom-title{
  font-family:'Space Grotesk',sans-serif;
  font-weight:700;
  font-size:clamp(30px,4.4vw,52px);
  line-height:1.04;
  letter-spacing:-.02em;
  margin:0 0 18px;
  max-width:16ch;
}
.bom-live .bom-title em{font-style:normal;color:var(--bom-blue);}
.bom-live .bom-sub{
  font-size:clamp(15px,1.6vw,18px);
  color:var(--bom-muted);
  max-width:54ch;line-height:1.55;margin:0;
}

/* ---------- grid ---------- */
.bom-live .bom-grid{
  display:grid;
  grid-template-columns:1.18fr 1fr 1fr;
  gap:22px;
  margin-top:50px;
}
.bom-live .bom-card{
  background:var(--bom-white);
  border:1px solid var(--bom-line);
  border-radius:24px;
  padding:14px 14px 26px;
  transition:transform .35s ease, box-shadow .35s ease, border-color .35s ease;
}
.bom-live .bom-card:hover{
  transform:translateY(-4px);
  border-color:rgba(43,60,255,.28);
  box-shadow:0 22px 50px -28px rgba(43,60,255,.45);
}
.bom-live .bom-stage{
  position:relative;
  height:300px;
  border-radius:16px;
  background:linear-gradient(160deg,#F4F5FB 0%,#EBEDF8 100%);
  overflow:hidden;
}
.bom-live .bom-card-body{padding:22px 12px 0;}
.bom-live .bom-card h3{
  font-family:'Space Grotesk',sans-serif;
  font-weight:600;font-size:21px;letter-spacing:-.01em;
  margin:0 0 10px;
}
.bom-live .bom-card p{
  font-size:14.5px;line-height:1.6;color:var(--bom-muted);margin:0;
}
.bom-live .bom-tag{
  display:inline-block;
  font-family:'Space Grotesk',sans-serif;
  font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;
  color:var(--bom-blue);
  background:var(--bom-card-2);
  padding:5px 10px;border-radius:999px;
  margin-bottom:14px;
}

/* ============================================================
   CARD 1 — live brand build
   ============================================================ */
.bom-live .bom-browser{
  position:absolute;inset:18px;
  background:var(--bom-white);
  border-radius:14px;
  box-shadow:0 18px 40px -22px rgba(10,14,39,.5);
  display:flex;flex-direction:column;
  overflow:hidden;
}
.bom-live .bom-bar{
  height:34px;display:flex;align-items:center;gap:6px;
  padding:0 12px;border-bottom:1px solid var(--bom-line);
  flex:0 0 auto;
}
.bom-live .bom-dot{width:9px;height:9px;border-radius:50%;background:#D7DAEA;}
.bom-live .bom-urlpill{
  margin-left:8px;flex:1;height:18px;border-radius:6px;
  background:#F1F2F8;display:flex;align-items:center;padding:0 8px;
  font-size:10px;color:#9AA0BC;font-weight:500;
}
.bom-live .bom-urlpill b{color:var(--bom-blue);font-weight:600;}
.bom-live .bom-screen{flex:1;position:relative;padding:16px;}

/* typed name input */
.bom-live .bom-input{
  height:38px;border:1.5px solid var(--bom-line);border-radius:10px;
  display:flex;align-items:center;padding:0 12px;
  font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;
  color:var(--bom-ink);
  animation:bom-input-focus 8s ease-in-out infinite;
}
.bom-live .bom-typed{
  white-space:nowrap;overflow:hidden;
  border-right:2px solid var(--bom-blue);
  width:0;
  animation:bom-type 8s steps(7,end) infinite, bom-caret .7s step-end infinite;
}
.bom-live .bom-placeholder{color:#B6BBD2;font-weight:500;}

/* build output area */
.bom-live .bom-out{margin-top:14px;position:relative;height:150px;}

.bom-live .bom-buildlabel{
  position:absolute;top:0;left:0;
  display:flex;align-items:center;gap:7px;
  font-size:11px;font-weight:600;color:var(--bom-blue);
  font-family:'Space Grotesk',sans-serif;letter-spacing:.02em;
  opacity:0;
  animation:bom-flash 8s ease-in-out infinite;
}
.bom-live .bom-buildlabel .bom-spin{
  width:12px;height:12px;border-radius:50%;
  border:2px solid rgba(43,60,255,.25);border-top-color:var(--bom-blue);
  animation:bom-spin 1s linear infinite;
}

.bom-live .bom-kit{
  position:absolute;top:24px;left:0;right:0;
  display:flex;gap:14px;align-items:flex-start;
}
/* monogram */
.bom-live .bom-mono{
  width:60px;height:60px;border-radius:16px;flex:0 0 auto;
  background:linear-gradient(135deg,var(--bom-blue),var(--bom-violet));
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:24px;
  box-shadow:0 12px 26px -10px rgba(43,60,255,.7);
  transform:scale(0) rotate(-12deg);opacity:0;
  animation:bom-pop 8s cubic-bezier(.2,1.4,.4,1) infinite;
  animation-delay:.0s;
}
.bom-live .bom-kit-right{flex:1;}
/* swatches */
.bom-live .bom-swatches{display:flex;gap:7px;margin-bottom:12px;}
.bom-live .bom-sw{
  width:26px;height:26px;border-radius:8px;
  transform:translateY(10px) scale(.5);opacity:0;
  animation:bom-sw 8s ease-out infinite;
}
.bom-live .bom-sw:nth-child(1){background:#2B3CFF;animation-delay:.0s;}
.bom-live .bom-sw:nth-child(2){background:#6B4BFF;animation-delay:.0s;}
.bom-live .bom-sw:nth-child(3){background:#0A0E27;animation-delay:.0s;}
.bom-live .bom-sw:nth-child(4){background:#FF8A5B;animation-delay:.0s;}
.bom-live .bom-sw:nth-child(5){background:#EEF0FF;border:1px solid var(--bom-line);animation-delay:.0s;}
/* tagline lines writing in */
.bom-live .bom-lines{display:flex;flex-direction:column;gap:8px;}
.bom-live .bom-ln{
  height:9px;border-radius:5px;background:#E4E7F4;
  transform-origin:left;transform:scaleX(0);
  animation:bom-line 8s ease-out infinite;
}
.bom-live .bom-ln.a{width:88%;}
.bom-live .bom-ln.b{width:64%;}
.bom-live .bom-ln.c{width:74%;background:var(--bom-card-2);}

/* floating "ready" chip */
.bom-live .bom-ready{
  position:absolute;right:14px;bottom:12px;
  display:flex;align-items:center;gap:6px;
  background:var(--bom-ink);color:#fff;
  font-size:11px;font-weight:600;font-family:'Space Grotesk',sans-serif;
  padding:7px 11px;border-radius:999px;
  opacity:0;transform:translateY(8px);
  animation:bom-ready 8s ease-out infinite;
}
.bom-live .bom-ready .bom-check{
  width:14px;height:14px;border-radius:50%;background:#34D399;
  display:flex;align-items:center;justify-content:center;
  font-size:9px;color:#062b1c;
}

/* ============================================================
   CARD 2 — drafts in your voice
   ============================================================ */
.bom-live .bom-panel{
  position:absolute;inset:20px;
  background:var(--bom-white);border-radius:14px;
  box-shadow:0 16px 36px -24px rgba(10,14,39,.45);
  padding:18px;display:flex;flex-direction:column;gap:12px;
}
.bom-live .bom-voice-head{display:flex;align-items:center;gap:10px;}
.bom-live .bom-avatar{
  width:34px;height:34px;border-radius:10px;
  background:linear-gradient(135deg,var(--bom-blue),var(--bom-violet));
  color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;
  display:flex;align-items:center;justify-content:center;
}
.bom-live .bom-voice-meta b{font-family:'Space Grotesk',sans-serif;font-size:13px;display:block;}
.bom-live .bom-voice-meta span{font-size:11px;color:var(--bom-muted);}
.bom-live .bom-draft{
  background:#F7F8FC;border:1px solid var(--bom-line);border-radius:12px;
  padding:13px;flex:1;display:flex;flex-direction:column;gap:9px;
  position:relative;
}
.bom-live .bom-write{
  height:8px;border-radius:5px;background:#E4E7F4;
  transform-origin:left;transform:scaleX(0);
  animation:bom-write 6s ease-out infinite;
}
.bom-live .bom-write.w1{width:92%;animation-delay:.2s;}
.bom-live .bom-write.w2{width:80%;animation-delay:.7s;}
.bom-live .bom-write.w3{width:88%;animation-delay:1.2s;}
.bom-live .bom-write.w4{width:55%;background:var(--bom-card-2);animation-delay:1.7s;}
.bom-live .bom-pen{
  position:absolute;width:7px;height:7px;border-radius:50%;
  background:var(--bom-blue);box-shadow:0 0 0 4px rgba(43,60,255,.18);
  left:13px;top:13px;
  animation:bom-pen 6s ease-in-out infinite;
}
.bom-live .bom-chips{display:flex;gap:6px;flex-wrap:wrap;}
.bom-live .bom-chip{
  font-size:10px;font-weight:600;color:var(--bom-muted);
  background:#EEF0F7;border-radius:999px;padding:4px 9px;
  font-family:'Space Grotesk',sans-serif;
}
.bom-live .bom-chip.on{color:#fff;background:var(--bom-blue);}

/* ============================================================
   CARD 3 — your live page stacking
   ============================================================ */
.bom-live .bom-phone{
  position:absolute;top:18px;left:50%;transform:translateX(-50%);
  width:172px;height:264px;border-radius:24px;
  background:var(--bom-white);
  border:6px solid var(--bom-ink);
  box-shadow:0 22px 44px -22px rgba(10,14,39,.55);
  overflow:hidden;padding:14px 12px;
}
.bom-live .bom-phone-url{
  font-size:9px;color:var(--bom-muted);text-align:center;margin-bottom:10px;
}
.bom-live .bom-phone-url b{color:var(--bom-blue);}
.bom-live .bom-pavatar{
  width:46px;height:46px;border-radius:50%;margin:0 auto 8px;
  background:linear-gradient(135deg,var(--bom-blue),var(--bom-violet));
  transform:scale(0);animation:bom-pop2 7s ease-out infinite;animation-delay:.1s;
}
.bom-live .bom-pname{
  height:11px;width:64%;margin:0 auto 6px;border-radius:5px;background:var(--bom-ink);
  transform:scaleX(0);transform-origin:center;
  animation:bom-grow 7s ease-out infinite;animation-delay:.5s;
}
.bom-live .bom-pbio{
  height:7px;width:80%;margin:0 auto 16px;border-radius:5px;background:#D9DCEC;
  transform:scaleX(0);transform-origin:center;
  animation:bom-grow 7s ease-out infinite;animation-delay:.8s;
}
.bom-live .bom-plink{
  height:30px;border-radius:9px;margin-bottom:8px;
  background:#F1F2F8;border:1px solid var(--bom-line);
  opacity:0;transform:translateY(12px);
  animation:bom-link 7s ease-out infinite;
}
.bom-live .bom-plink:nth-of-type(1){animation-delay:1.2s;}
.bom-live .bom-plink:nth-of-type(2){animation-delay:1.5s;}
.bom-live .bom-plink:nth-of-type(3){animation-delay:1.8s;background:var(--bom-blue);border-color:var(--bom-blue);}

/* floating url pill (like the reference) */
.bom-live .bom-floaturl{
  position:absolute;left:14px;bottom:14px;
  display:flex;align-items:center;gap:7px;
  background:var(--bom-white);border:1px solid var(--bom-line);
  border-radius:999px;padding:7px 12px;
  box-shadow:0 12px 26px -16px rgba(10,14,39,.4);
  font-size:11px;font-weight:500;color:var(--bom-muted);
  animation:bom-float 4s ease-in-out infinite;
}
.bom-live .bom-floaturl b{color:var(--bom-blue);font-weight:600;}
.bom-live .bom-floaturl .bom-fav{
  width:16px;height:16px;border-radius:5px;
  background:linear-gradient(135deg,var(--bom-blue),var(--bom-violet));
}

/* ---------- footer cta ---------- */
.bom-live .bom-foot{
  display:flex;align-items:center;justify-content:space-between;gap:20px;
  flex-wrap:wrap;
  margin-top:46px;padding-top:30px;border-top:1px solid var(--bom-line);
}
.bom-live .bom-foot p{margin:0;font-size:14.5px;color:var(--bom-muted);}
.bom-live .bom-foot b{color:var(--bom-ink);}
.bom-live .bom-cta{
  display:inline-flex;align-items:center;gap:9px;
  background:var(--bom-blue);color:#fff;text-decoration:none;
  font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;
  padding:14px 22px;border-radius:12px;
  box-shadow:0 16px 30px -14px rgba(43,60,255,.6);
  transition:transform .25s ease, box-shadow .25s ease;
}
.bom-live .bom-cta:hover{transform:translateY(-2px);box-shadow:0 20px 38px -14px rgba(43,60,255,.7);}
.bom-live .bom-cta .bom-arr{transition:transform .25s ease;}
.bom-live .bom-cta:hover .bom-arr{transform:translateX(4px);}

/* ============================================================
   KEYFRAMES
   ============================================================ */
@keyframes bom-pulse{0%,100%{box-shadow:0 0 0 4px rgba(43,60,255,.16);}50%{box-shadow:0 0 0 7px rgba(43,60,255,.05);}}
@keyframes bom-spin{to{transform:rotate(360deg);}}
@keyframes bom-caret{50%{border-color:transparent;}}

/* card1 name typing — type, hold, then reset */
@keyframes bom-type{
  0%{width:0;}
  22%{width:6.6ch;}
  82%{width:6.6ch;}
  90%,100%{width:0;}
}
@keyframes bom-input-focus{
  0%,90%{border-color:var(--bom-line);}
  4%,86%{border-color:var(--bom-blue);box-shadow:0 0 0 3px rgba(43,60,255,.12);}
}
@keyframes bom-flash{
  0%,24%{opacity:0;}
  28%,40%{opacity:1;}
  46%,100%{opacity:0;}
}
@keyframes bom-pop{
  0%,40%{transform:scale(0) rotate(-12deg);opacity:0;}
  48%{transform:scale(1.12) rotate(3deg);opacity:1;}
  54%,86%{transform:scale(1) rotate(0);opacity:1;}
  94%,100%{transform:scale(.6) rotate(-8deg);opacity:0;}
}
@keyframes bom-sw{
  0%,46%{transform:translateY(10px) scale(.5);opacity:0;}
  56%,86%{transform:translateY(0) scale(1);opacity:1;}
  94%,100%{transform:translateY(6px) scale(.6);opacity:0;}
}
@keyframes bom-line{
  0%,58%{transform:scaleX(0);}
  70%,86%{transform:scaleX(1);}
  94%,100%{transform:scaleX(0);}
}
@keyframes bom-ready{
  0%,74%{opacity:0;transform:translateY(8px);}
  80%,90%{opacity:1;transform:translateY(0);}
  96%,100%{opacity:0;transform:translateY(8px);}
}

/* card2 writing */
@keyframes bom-write{
  0%{transform:scaleX(0);}
  30%,82%{transform:scaleX(1);}
  92%,100%{transform:scaleX(0);}
}
@keyframes bom-pen{
  0%{left:13px;top:13px;}
  25%{left:84%;top:13px;}
  26%{left:13px;top:25px;}
  50%{left:74%;top:25px;}
  51%{left:13px;top:37px;}
  75%{left:82%;top:37px;}
  76%,100%{left:13px;top:49px;opacity:.4;}
}

/* card3 page assembling */
@keyframes bom-pop2{0%{transform:scale(0);}14%{transform:scale(1.1);}22%,100%{transform:scale(1);}}
@keyframes bom-grow{0%{transform:scaleX(0);}18%,100%{transform:scaleX(1);}}
@keyframes bom-link{0%{opacity:0;transform:translateY(12px);}100%{opacity:1;transform:translateY(0);}}
@keyframes bom-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}

/* ---------- responsive ---------- */
@media (max-width:920px){
  .bom-live .bom-grid{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto;}
  .bom-live .bom-stage{height:280px;}
}
@media (max-width:520px){
  .bom-live{padding:60px 18px 70px;}
}

/* ---------- accessibility ---------- */
@media (prefers-reduced-motion:reduce){
  .bom-live *{animation:none !important;transition:none !important;}
  .bom-live .bom-typed{width:6.6ch;border-right:none;}
  .bom-live .bom-mono,.bom-live .bom-sw,.bom-live .bom-pavatar{opacity:1 !important;transform:none !important;}
  .bom-live .bom-ln,.bom-live .bom-write,.bom-live .bom-pname,.bom-live .bom-pbio{transform:scaleX(1) !important;}
  .bom-live .bom-plink,.bom-live .bom-ready,.bom-live .bom-buildlabel{opacity:1 !important;transform:none !important;}
}
</style>
</head>

<body style="margin:0;background:#FBFBFF;">

<!-- ===================== SECTION START ===================== -->
<section class="bom-live">
  <div class="bom-wrap">

    <p class="bom-eyebrow">Watch it build</p>
    <h2 class="bom-title">Your brand, <em>assembled live</em> from your name.</h2>
    <p class="bom-sub">
      Type your name once. The engine designs your identity kit, writes in your voice,
      and ships a live page at brandofme.ai/you — you watch every piece snap into place.
    </p>

    <div class="bom-grid">

      <!-- ============ CARD 1 — LIVE BUILD ============ -->
      <article class="bom-card">
        <div class="bom-stage">
          <div class="bom-browser">
            <div class="bom-bar">
              <span class="bom-dot"></span><span class="bom-dot"></span><span class="bom-dot"></span>
              <div class="bom-urlpill">brandofme.ai/<b>build</b></div>
            </div>
            <div class="bom-screen">
              <div class="bom-input">
                <span class="bom-typed">Ghokkul</span>
              </div>

              <div class="bom-out">
                <div class="bom-buildlabel"><span class="bom-spin"></span>Building your brand…</div>

                <div class="bom-kit">
                  <div class="bom-mono">G</div>
                  <div class="bom-kit-right">
                    <div class="bom-swatches">
                      <span class="bom-sw"></span><span class="bom-sw"></span>
                      <span class="bom-sw"></span><span class="bom-sw"></span>
                      <span class="bom-sw"></span>
                    </div>
                    <div class="bom-lines">
                      <span class="bom-ln a"></span>
                      <span class="bom-ln b"></span>
                      <span class="bom-ln c"></span>
                    </div>
                  </div>
                </div>

                <div class="bom-ready"><span class="bom-check">✓</span>Brand ready</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bom-card-body">
          <span class="bom-tag">The Engine</span>
          <h3>AI Brand Builder</h3>
          <p>Type your name and the engine builds your full brand model in seconds — logo mark, color system, voice, and tagline, generated and arranged in front of you.</p>
        </div>
      </article>

      <!-- ============ CARD 2 — VOICE / DRAFTS ============ -->
      <article class="bom-card">
        <div class="bom-stage">
          <div class="bom-panel">
            <div class="bom-voice-head">
              <div class="bom-avatar">G</div>
              <div class="bom-voice-meta">
                <b>Drafting as Ghokkul</b>
                <span>matched to your tone</span>
              </div>
            </div>
            <div class="bom-draft">
              <div class="bom-pen"></div>
              <span class="bom-write w1"></span>
              <span class="bom-write w2"></span>
              <span class="bom-write w3"></span>
              <span class="bom-write w4"></span>
            </div>
            <div class="bom-chips">
              <span class="bom-chip on">Confident</span>
              <span class="bom-chip">Warm</span>
              <span class="bom-chip">Concise</span>
            </div>
          </div>
        </div>

        <div class="bom-card-body">
          <span class="bom-tag">Creator OS</span>
          <h3>Drafts in your voice</h3>
          <p>Posts, bios, video titles and scripts written the way you'd write them. The model learns your tone once and keeps every draft on-brand.</p>
        </div>
      </article>

      <!-- ============ CARD 3 — LIVE PAGE ============ -->
      <article class="bom-card">
        <div class="bom-stage">
          <div class="bom-phone">
            <div class="bom-phone-url">brandofme.ai/<b>ghokkul</b></div>
            <div class="bom-pavatar"></div>
            <div class="bom-pname"></div>
            <div class="bom-pbio"></div>
            <div class="bom-plink"></div>
            <div class="bom-plink"></div>
            <div class="bom-plink"></div>
          </div>
          <div class="bom-floaturl">
            <span class="bom-fav"></span>brandofme.ai/<b>you</b>
          </div>
        </div>

        <div class="bom-card-body">
          <span class="bom-tag">Link in bio</span>
          <h3>Your live brand page</h3>
          <p>Every piece ships to a real page at brandofme.ai/you — avatar, bio, and links stack in automatically and update the moment your brand changes.</p>
        </div>
      </article>

    </div>

    <div class="bom-foot">
      <p><b>One name in. A whole brand out.</b> &nbsp;7-day free trial — no card required.</p>
      <a class="bom-cta" href="#trial">Build mine free <span class="bom-arr">→</span></a>
    </div>

  </div>
</section>
<!-- ===================== SECTION END ===================== -->

</body>
</html>
