<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>BrandOfMe — Your whole brand, in one word</title>
<meta name="description" content="Describe what you're building in a sentence. BrandOfMe distills it into a name you can own — yours for $10." />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#17132B;
    --ink-soft:#3A3357;
    --indigo:#4B3BCB;
    --indigo-deep:#2A1F73;
    --signal:#FF6B57;
    --gold:#FFB23E;
    --paper:#F6F4FB;
    --card:#FFFFFF;
    --mist:#6E6790;
    --line:rgba(23,19,43,0.10);
    --line-strong:rgba(23,19,43,0.16);
    --shadow:0 18px 50px -22px rgba(42,31,115,0.45);
    --shadow-sm:0 8px 24px -14px rgba(42,31,115,0.40);
    --r:18px;
    --maxw:1080px;
  }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{
    margin:0;
    background:var(--paper);
    color:var(--ink);
    font-family:"Hanken Grotesk",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    font-size:17px;
    line-height:1.55;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  a{color:inherit}
  .wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px}
  .mono{font-family:"JetBrains Mono",ui-monospace,monospace}
  .eyebrow{
    font-family:"JetBrains Mono",monospace;
    font-size:12px;letter-spacing:.22em;text-transform:uppercase;
    color:var(--indigo);font-weight:500;
  }

  /* ---------- nav ---------- */
  .nav{
    position:sticky;top:0;z-index:40;
    background:rgba(246,244,251,.82);
    backdrop-filter:saturate(140%) blur(10px);
    border-bottom:1px solid var(--line);
  }
  .nav-in{display:flex;align-items:center;justify-content:space-between;height:64px}
  .brand{display:flex;align-items:center;gap:10px;font-family:"Bricolage Grotesque";font-weight:800;font-size:20px;letter-spacing:-.02em}
  .brand .dot{width:11px;height:11px;border-radius:50%;background:var(--signal);box-shadow:0 0 0 4px rgba(255,107,87,.18)}
  .brand small{font-weight:400;color:var(--mist);font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase}
  .nav-cta{display:flex;align-items:center;gap:14px}
  .price-pill{font-family:"JetBrains Mono",monospace;font-size:13px;color:var(--ink-soft);display:inline-flex;align-items:center;gap:6px}
  .price-pill b{color:var(--ink);font-weight:600}

  .btn{
    appearance:none;border:0;cursor:pointer;font-family:inherit;font-weight:700;
    border-radius:999px;padding:12px 22px;font-size:15px;line-height:1;
    background:var(--signal);color:var(--ink);
    transition:transform .15s ease, box-shadow .2s ease, background .2s ease;
    box-shadow:0 6px 18px -8px rgba(255,107,87,.7);
  }
  .btn:hover{transform:translateY(-2px);box-shadow:0 12px 26px -10px rgba(255,107,87,.8)}
  .btn:active{transform:translateY(0)}
  .btn.small{padding:10px 16px;font-size:14px}
  .btn.ghost{background:transparent;color:var(--ink);box-shadow:none;border:1px solid var(--line-strong)}
  .btn.ghost:hover{background:#fff;box-shadow:var(--shadow-sm)}
  .btn.indigo{background:var(--indigo);color:#fff;box-shadow:0 8px 22px -10px rgba(75,59,203,.8)}
  .btn:disabled{opacity:.45;cursor:not-allowed;transform:none;box-shadow:none}
  :focus-visible{outline:3px solid var(--indigo);outline-offset:2px;border-radius:6px}

  /* ---------- hero / engine ---------- */
  .hero{padding:64px 0 28px;position:relative}
  .hero h1{
    font-family:"Bricolage Grotesque";font-weight:800;letter-spacing:-.03em;line-height:.98;
    font-size:clamp(40px,8vw,82px);margin:14px 0 10px;
  }
  .hero h1 .em{color:var(--indigo)}
  .hero p.lede{font-size:clamp(17px,2.4vw,21px);color:var(--ink-soft);max-width:620px;margin:0 0 4px}
  .hero p.lede b{color:var(--ink);font-weight:600}

  .engine{
    margin-top:30px;background:var(--card);border:1px solid var(--line);
    border-radius:24px;box-shadow:var(--shadow);padding:24px;
  }
  .engine label.fieldlbl{display:block;font-size:13px;font-weight:600;color:var(--ink-soft);margin:0 0 8px}
  .ta-wrap{position:relative}
  textarea#desc{
    width:100%;min-height:96px;resize:vertical;border-radius:14px;
    border:1.5px solid var(--line-strong);background:#FbFaFe;
    padding:16px 16px 14px;font-family:inherit;font-size:18px;color:var(--ink);
    line-height:1.45;transition:border-color .2s ease, box-shadow .2s ease;
  }
  textarea#desc::placeholder{color:#9b95b4}
  textarea#desc:focus{border-color:var(--indigo);box-shadow:0 0 0 4px rgba(75,59,203,.12);background:#fff}

  .chips{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 4px;min-height:30px;align-items:center}
  .chips .lbl{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--mist);margin-right:2px}
  .chip{
    font-family:"JetBrains Mono",monospace;font-size:12.5px;
    background:rgba(75,59,203,.08);color:var(--indigo-deep);
    border:1px solid rgba(75,59,203,.18);border-radius:999px;padding:5px 11px;
    transition:transform .35s cubic-bezier(.2,.7,.2,1), opacity .35s ease;
  }
  .chip.converge{transform:translateY(40px) scale(.4);opacity:0}

  .engine-actions{display:flex;align-items:center;gap:14px;margin-top:18px;flex-wrap:wrap}
  .engine-actions .hint{font-size:13px;color:var(--mist);margin-left:auto}
  .spark{display:inline-block;margin-right:8px;transform:translateY(1px)}

  /* ---------- results ---------- */
  .results{margin:30px 0 10px;display:none}
  .results.show{display:block}
  .results-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:14px}
  .results-head .eyebrow{margin-bottom:2px}
  .results-head h2{font-family:"Bricolage Grotesque";font-weight:700;font-size:22px;margin:2px 0 0;letter-spacing:-.01em}

  .layout{display:grid;grid-template-columns:1.15fr 1fr;gap:18px}
  .featured{
    background:linear-gradient(160deg,#fff, #FbFaFe 70%);
    border:1px solid var(--line);border-radius:22px;padding:30px 28px;box-shadow:var(--shadow);
    position:relative;overflow:hidden;display:flex;flex-direction:column;
  }
  .featured::after{
    content:"";position:absolute;inset:-40% -10% auto auto;width:280px;height:280px;
    background:radial-gradient(circle, rgba(255,107,87,.16), transparent 62%);pointer-events:none;
  }
  .featured .tag{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--signal);font-weight:500}
  .bigname{
    font-family:"Bricolage Grotesque";font-weight:800;letter-spacing:-.03em;color:var(--indigo);
    font-size:clamp(44px,9vw,76px);line-height:1;margin:10px 0 6px;word-break:break-word;
  }
  .bigname .ring{position:relative}
  .featured .meta{color:var(--mist);font-size:14px;margin-bottom:auto}
  .buybar{display:flex;align-items:center;gap:14px;margin-top:22px;flex-wrap:wrap}
  .pricetag{display:flex;align-items:baseline;gap:6px}
  .pricetag .amt{font-family:"Bricolage Grotesque";font-weight:800;font-size:34px;color:var(--ink);letter-spacing:-.02em}
  .pricetag .cur{font-family:"JetBrains Mono",monospace;color:var(--mist);font-size:13px}
  .pricetag .star{color:var(--gold)}

  .alts{display:flex;flex-direction:column}
  .alts .eyebrow{margin-bottom:10px}
  .alt-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .alt{
    text-align:left;cursor:pointer;background:#fff;border:1.5px solid var(--line);
    border-radius:14px;padding:14px 14px;transition:border-color .15s ease, transform .15s ease, box-shadow .15s ease;
    font-family:inherit;
  }
  .alt:hover{transform:translateY(-2px);border-color:var(--indigo);box-shadow:var(--shadow-sm)}
  .alt.active{border-color:var(--signal);box-shadow:0 0 0 3px rgba(255,107,87,.18)}
  .alt .nm{font-family:"Bricolage Grotesque";font-weight:700;font-size:22px;letter-spacing:-.01em;color:var(--ink)}
  .alt .sub{font-size:12px;color:var(--mist);margin-top:2px}
  .alts .more{margin-top:12px;align-self:flex-start}

  /* distill animation */
  @keyframes pop{0%{transform:scale(.62);opacity:0;filter:blur(6px)}60%{transform:scale(1.04);opacity:1;filter:blur(0)}100%{transform:scale(1)}}
  .bigname.animate{animation:pop .6s cubic-bezier(.2,.8,.2,1) both}
  @keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(255,107,87,0)}50%{box-shadow:0 0 0 10px rgba(255,107,87,.12)}}
  .featured.animate{animation:glow 1.2s ease 1}

  /* ---------- how it works ---------- */
  .how{background:var(--ink);color:#EDEAFB;margin-top:60px;padding:64px 0}
  .how .eyebrow{color:var(--signal)}
  .how h2{font-family:"Bricolage Grotesque";font-weight:700;font-size:clamp(26px,4vw,36px);letter-spacing:-.02em;margin:8px 0 30px;color:#fff}
  .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
  .step{border-top:1px solid rgba(255,255,255,.16);padding-top:16px}
  .step .no{font-family:"JetBrains Mono",monospace;color:var(--signal);font-size:14px;letter-spacing:.1em}
  .step h3{font-family:"Bricolage Grotesque";font-weight:700;font-size:20px;margin:8px 0 6px;color:#fff}
  .step p{color:#B9B3D9;font-size:15px;margin:0}

  /* ---------- value strip ---------- */
  .value{padding:56px 0 8px}
  .value .eyebrow{color:var(--indigo)}
  .value h2{font-family:"Bricolage Grotesque";font-weight:700;font-size:clamp(24px,4vw,32px);letter-spacing:-.02em;margin:8px 0 6px}
  .value p.sub{color:var(--ink-soft);max-width:640px;margin:0 0 24px}
  .kit-list{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .kit-item{background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm)}
  .kit-item .ic{font-size:20px}
  .kit-item h4{font-family:"Bricolage Grotesque";font-weight:700;font-size:16px;margin:8px 0 4px}
  .kit-item p{font-size:13.5px;color:var(--mist);margin:0;line-height:1.45}

  /* ---------- footer ---------- */
  footer{padding:48px 0 64px;border-top:1px solid var(--line);margin-top:56px;color:var(--mist);font-size:14px}
  footer .frow{display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;align-items:center}
  footer code{background:rgba(75,59,203,.08);color:var(--indigo-deep);padding:2px 7px;border-radius:6px;font-family:"JetBrains Mono",monospace;font-size:12.5px}

  /* ---------- sticky mobile buy ---------- */
  .stickybuy{
    position:fixed;left:0;right:0;bottom:0;z-index:35;display:none;
    background:rgba(255,255,255,.92);backdrop-filter:blur(10px);
    border-top:1px solid var(--line-strong);padding:12px 18px;
    align-items:center;justify-content:space-between;gap:12px;box-shadow:0 -10px 30px -20px rgba(42,31,115,.5);
  }
  .stickybuy .sn{font-family:"Bricolage Grotesque";font-weight:700;font-size:18px}
  .stickybuy .sn small{display:block;font-family:"Hanken Grotesk";font-weight:500;font-size:11px;color:var(--mist)}

  /* ---------- modal ---------- */
  .overlay{position:fixed;inset:0;background:rgba(23,19,43,.55);backdrop-filter:blur(4px);z-index:60;display:none;align-items:center;justify-content:center;padding:20px}
  .overlay.show{display:flex}
  .modal{background:#fff;border-radius:22px;max-width:440px;width:100%;box-shadow:0 40px 90px -30px rgba(23,19,43,.6);overflow:hidden;animation:rise .25s ease both}
  @keyframes rise{from{transform:translateY(16px);opacity:0}to{transform:none;opacity:1}}
  .modal .mhead{padding:22px 24px 0}
  .modal .demo-banner{margin:0 24px;margin-top:16px;background:rgba(255,178,62,.14);border:1px solid rgba(255,178,62,.4);color:#7a5400;border-radius:12px;padding:10px 12px;font-size:13px;line-height:1.4}
  .modal h3{font-family:"Bricolage Grotesque";font-weight:800;font-size:24px;letter-spacing:-.02em;margin:6px 0 2px}
  .modal .order{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid var(--line)}
  .modal .order .nm{font-family:"Bricolage Grotesque";font-weight:700;font-size:22px;color:var(--indigo)}
  .mbody{padding:18px 24px 6px}
  .field{margin-bottom:14px}
  .field label{display:block;font-size:13px;font-weight:600;color:var(--ink-soft);margin-bottom:6px}
  .field input{width:100%;border:1.5px solid var(--line-strong);border-radius:12px;padding:12px 14px;font-family:inherit;font-size:16px;background:#FbFaFe}
  .field input:focus{border-color:var(--indigo);box-shadow:0 0 0 4px rgba(75,59,203,.12);background:#fff;outline:none}
  .mfoot{padding:6px 24px 24px;display:flex;gap:10px;align-items:center}
  .mfoot .btn{flex:1;justify-content:center;text-align:center}
  .mclose{position:absolute;top:14px;right:16px;background:none;border:0;font-size:24px;line-height:1;color:var(--mist);cursor:pointer}
  .modal-wrap{position:relative}

  /* success kit */
  .kit-out{padding:6px 24px 24px}
  .kit-card{display:flex;gap:14px;align-items:center;background:#FbFaFe;border:1px solid var(--line);border-radius:14px;padding:14px;margin-bottom:14px}
  .kit-card .mono-svg{flex:0 0 auto}
  .kit-card .kc-name{font-family:"Bricolage Grotesque";font-weight:800;font-size:26px;letter-spacing:-.02em;color:var(--ink);line-height:1}
  .kit-card .kc-tag{font-size:13.5px;color:var(--mist);margin-top:4px}
  .palette{display:flex;gap:8px;margin:6px 0 14px}
  .sw{flex:1;height:46px;border-radius:10px;border:1px solid var(--line);position:relative}
  .sw span{position:absolute;bottom:4px;left:0;right:0;text-align:center;font-family:"JetBrains Mono",monospace;font-size:9.5px;color:rgba(255,255,255,.92);text-shadow:0 1px 2px rgba(0,0,0,.4)}
  .domains{font-family:"JetBrains Mono",monospace;font-size:13px;color:var(--ink-soft);line-height:1.7;margin:0 0 6px}
  .domains b{color:var(--ink)}

  @media (max-width:860px){
    .layout{grid-template-columns:1fr}
    .steps{grid-template-columns:1fr;gap:10px}
    .kit-list{grid-template-columns:1fr 1fr}
    .nav .price-pill{display:none}
    .stickybuy.show{display:flex}
  }
  @media (max-width:520px){
    body{font-size:16px}
    .engine{padding:18px}
    .alt-grid{grid-template-columns:1fr 1fr}
    .kit-list{grid-template-columns:1fr}
  }
  @media (prefers-reduced-motion: reduce){
    *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  }
</style>
</head>
<body>

<header class="nav">
  <div class="wrap nav-in">
    <div class="brand"><span class="dot"></span>BrandOfMe&nbsp;<small>naming engine</small></div>
    <div class="nav-cta">
      <span class="price-pill"><span class="star" style="color:var(--gold)">★</span> Each name <b>$10</b></span>
      <button class="btn small" onclick="document.getElementById('desc').focus()">Make a name</button>
    </div>
  </div>
</header>

<main>
  <!-- HERO + ENGINE -->
  <section class="hero">
    <div class="wrap">
      <span class="eyebrow">Say it in a sentence → own it in a word</span>
      <h1>One word.<br><span class="em">Your whole brand.</span></h1>
      <p class="lede">Tell us what you're building in plain language. The engine distills it into short, ownable names you can actually use — and the one you love is <b>yours for $10</b>, delivered as a starter brand kit.</p>

      <div class="engine" id="engine">
        <label class="fieldlbl" for="desc">Describe your brand in a sentence</label>
        <div class="ta-wrap">
          <textarea id="desc" placeholder="e.g. A calming subscription that delivers easy-care houseplants to busy people"></textarea>
        </div>

        <div class="chips" id="chips" aria-live="polite">
          <span class="lbl">reading:</span>
        </div>

        <div class="engine-actions">
          <button class="btn" id="distillBtn"><span class="spark">✦</span>Distill my name</button>
          <button class="btn ghost small" id="surpriseBtn">Surprise me</button>
          <span class="hint" id="liveHint"></span>
        </div>
      </div>

      <!-- RESULTS -->
      <section class="results" id="results" aria-live="polite">
        <div class="results-head">
          <div>
            <span class="eyebrow">Distilled from your description</span>
            <h2>Pick the one that feels like you</h2>
          </div>
          <button class="btn ghost small" id="shuffleBtn">↻ More names</button>
        </div>

        <div class="layout">
          <div class="featured" id="featured">
            <span class="tag">Top pick</span>
            <div class="bigname" id="bigName"><span class="ring">—</span></div>
            <div class="meta" id="featMeta">Your strongest, most brandable option.</div>
            <div class="buybar">
              <div class="pricetag"><span class="star" style="color:var(--gold)">★</span><span class="amt">$10</span><span class="cur">USD · one-time</span></div>
              <button class="btn" id="buyFeatured">Get this name →</button>
            </div>
          </div>

          <div class="alts">
            <span class="eyebrow">Alternates · tap to feature</span>
            <div class="alt-grid" id="altGrid"></div>
            <button class="btn ghost small more" id="moreInline" style="display:none"></button>
          </div>
        </div>
      </section>
    </div>
  </section>

  <!-- VALUE -->
  <section class="value">
    <div class="wrap">
      <span class="eyebrow">What your $10 unlocks</span>
      <h2>Not just a name — a head start</h2>
      <p class="sub">A name on its own is a string of letters. Every purchase comes as a tiny brand kit so you can start using it the same afternoon.</p>
      <div class="kit-list">
        <div class="kit-item"><div class="ic">🔤</div><h4>The name</h4><p>Your chosen one-word brand, free for you to use commercially.</p></div>
        <div class="kit-item"><div class="ic">✶</div><h4>A logomark</h4><p>An instant monogram badge built from your name and palette.</p></div>
        <div class="kit-item"><div class="ic">🎨</div><h4>Color palette</h4><p>Four coordinated colors with hex codes, ready for your site.</p></div>
        <div class="kit-item"><div class="ic">🌐</div><h4>Domain ideas</h4><p>Matching domain suggestions to check and grab next.</p></div>
      </div>
    </div>
  </section>

  <!-- HOW -->
  <section class="how">
    <div class="wrap">
      <span class="eyebrow">How it works</span>
      <h2>Three steps from sentence to signature</h2>
      <div class="steps">
        <div class="step"><div class="no">01</div><h3>Describe it</h3><p>Write one honest sentence about what you make and who it's for. No keywords or jargon needed.</p></div>
        <div class="step"><div class="no">02</div><h3>Distill it</h3><p>The engine pulls the meaning out of your sentence and coins short, pronounceable, ownable names.</p></div>
        <div class="step"><div class="no">03</div><h3>Own it</h3><p>Love one? It's $10. You get the name plus a starter kit you can download and use right away.</p></div>
      </div>
    </div>
  </section>

  <footer>
    <div class="wrap frow">
      <div>© <span id="yr"></span> BrandOfMe — names distilled, not borrowed.</div>
      <div>Drop-in store file · set your live checkout in <code>STORE.checkoutUrl</code></div>
    </div>
  </footer>
</main>

<!-- sticky mobile buy -->
<div class="stickybuy" id="stickybuy">
  <div class="sn" id="stickyName">—<small>your top pick · $10</small></div>
  <button class="btn small" id="stickyBuy">Get it →</button>
</div>

<!-- CHECKOUT MODAL -->
<div class="overlay" id="overlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
  <div class="modal modal-wrap">
    <button class="mclose" id="mClose" aria-label="Close">×</button>

    <!-- step: checkout -->
    <div id="checkoutView">
      <div class="mhead"><span class="eyebrow">Checkout</span><h3 id="modalTitle">You're claiming this name</h3></div>
      <div class="demo-banner" id="demoBanner">Demo mode — no card is collected and no payment is taken. Add your Stripe or PayPal link to <b>STORE.checkoutUrl</b> to sell for real.</div>
      <div class="order"><span>Your name</span><span class="nm" id="orderName">—</span></div>
      <div class="mbody">
        <div class="field"><label for="buyerName">Your name</label><input id="buyerName" type="text" placeholder="Alex Rivera" autocomplete="name"></div>
        <div class="field"><label for="buyerEmail">Email (where we send the kit)</label><input id="buyerEmail" type="email" placeholder="you@email.com" autocomplete="email"></div>
      </div>
      <div class="mfoot">
        <button class="btn" id="payBtn">Complete order · $10</button>
      </div>
    </div>

    <!-- step: success / kit -->
    <div id="successView" style="display:none">
      <div class="mhead"><span class="eyebrow" style="color:var(--signal)">Order complete</span><h3>Your brand kit is ready 🎉</h3></div>
      <div class="kit-out">
        <div class="kit-card">
          <div class="mono-svg" id="kitMono"></div>
          <div>
            <div class="kc-name" id="kitName">—</div>
            <div class="kc-tag" id="kitTag">—</div>
          </div>
        </div>
        <div class="palette" id="kitPalette"></div>
        <p class="domains" id="kitDomains"></p>
        <div class="mfoot" style="padding-left:0;padding-right:0">
          <button class="btn indigo" id="downloadKit">Download kit</button>
          <button class="btn ghost" id="doneBtn">Done</button>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
/* =========================================================================
   STORE CONFIG  — flip this to a real, paid store in 10 seconds.
   Paste a Stripe Payment Link or PayPal hosted-button URL below and the
   "Get this name" buttons will send buyers to real checkout instead of the
   built-in demo. Both work from static hosting (your public_html) with no
   server. Leave it blank to keep demo mode for testing.
   ========================================================================= */
const STORE = {
  price: 10,
  currency: 'USD',
  checkoutUrl: ''   // e.g. 'https://buy.stripe.com/your_link'
};

/* ---------- the naming engine ("AI" word distiller) ---------- */
const STOP = new Set("a an and the of for to in on with into your you our we my me is are be it that this who what makes making make help helping helps app apps platform service services product products company brand brands business people users user customers easy simple just like new best all from at by as or so very really thing things stuff get gets give gives use using used powered ai based around about over under up down out".split(/\s+/));

const VOWEL_END = ['a','o','i','io','ia','eo','us','ora','ova','elle','ique','ora','ana','aro','eo','oa'];
const SUFFIX    = ['ly','ify','io','lab','kit','wave','loop','nest','root','works','wise','flow','core','peak','grove','field','craft','forge','spark','mint','ster','able','ic','en'];
const PREFIX    = ['neo','lumi','evo','nova','vivi','zen','sol','luna','meta','veri','flux','echo','aero','iso'];
const VOWELS = 'aeiou';

function rand(a){ return a[Math.floor(Math.random()*a.length)] }
function cap(w){ return w ? w[0].toUpperCase()+w.slice(1) : w }
function isVowel(c){ return VOWELS.includes(c) }

function keywords(text){
  const raw = (text||'').toLowerCase().match(/[a-z]+/g) || [];
  const seen = new Set(); const out = [];
  for(const w of raw){
    if(w.length < 3 || STOP.has(w) || seen.has(w)) continue;
    seen.add(w); out.push(w);
  }
  // light de-pluralise so "plants" -> "plant"
  return out.map(w => w.length>4 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0,-1) : w).slice(0,8);
}

function clean(s){
  if(!s) return '';
  s = s.toLowerCase().replace(/[^a-z]/g,'');
  s = s.replace(/(.)\1{2,}/g,'$1$1');            // collapse 3+ repeats
  return s;
}
function consonants(w){ return (w||'').split('').filter(c=>!isVowel(c)) }
function vowelCount(w){ return (w.match(/[aeiou]/g)||[]).length }
function maxConsRun(w){
  let run=0,max=0; for(const c of w){ if(!isVowel(c)){run++;max=Math.max(max,run)} else run=0 } return max;
}
function pronounceable(w){
  if(w.length<4 || w.length>11) return false;
  if(vowelCount(w)<1) return false;
  if(maxConsRun(w)>2) return false;
  if(/(.)\1\1/.test(w)) return false;
  return true;
}

/* generation strategies — each takes keyword(s), returns a coined word */
function genStem(w){ let s=w.replace(/[aeiou]+$/,''); if(s.length<3)s=w; return s+rand(VOWEL_END) }
function genSuffix(w){ let b=w.replace(/e$/,''); return b+rand(SUFFIX) }
function genPrefix(w){ let p=rand(PREFIX); let b=w; if(isVowel(p[p.length-1])&&isVowel(b[0])) b=b.slice(1); return p+b }
function genBlend(a,b){
  const ah=a.slice(0,Math.ceil(a.length/2));
  const bt=b.slice(Math.floor(b.length/2));
  return ah+bt;
}
function genCoin(w){
  const c=consonants(w); if(c.length<2) return genStem(w);
  const n=Math.min(3, Math.max(2, c.length));
  let out='';
  for(let i=0;i<n;i++){ out+=c[i]; out+=rand(['a','e','i','o','u','a','o']); }
  if(Math.random()<.4) out=out.replace(/[aeiou]$/, ''); // sometimes hard ending
  return out;
}

function brandScore(w){
  let s=0;
  if(w.length>=5 && w.length<=8) s+=3; else s+=1;
  if(isVowel(w[w.length-1])) s+=2;
  s -= Math.max(0,maxConsRun(w)-1);
  if(/[xz]/.test(w)) s+=0.4;            // a little zing
  if(/(.)\1/.test(w)) s-=0.5;
  s += vowelCount(w)/w.length*2;        // vowel balance
  s += Math.random()*1.4;               // jitter -> fresh ranking each run
  return s;
}

function generateNames(text, count=7){
  let ks = keywords(text);
  if(ks.length===0) ks = ['make','spark','studio','craft'];
  const pool = new Set();
  const push = c => { c=clean(c); if(pronounceable(c)) pool.add(c) };

  // single-keyword coinings
  for(const k of ks){
    push(genStem(k)); push(genSuffix(k)); push(genPrefix(k));
    push(genCoin(k)); push(genStem(k)); push(genSuffix(k));
  }
  // blends across keyword pairs
  for(let i=0;i<ks.length;i++)
    for(let j=0;j<ks.length;j++)
      if(i!==j) push(genBlend(ks[i],ks[j]));

  // top up if thin
  let guard=0;
  while(pool.size<count*2 && guard++<60){
    const k=rand(ks); push(genCoin(k)); push(genStem(k)); push(genSuffix(k));
  }

  const ranked = [...pool]
    .map(w=>({w:cap(w), score:brandScore(w)}))
    .sort((a,b)=>b.score-a.score);

  // de-dupe near-identical heads to keep variety
  const out=[]; const heads=new Set();
  for(const r of ranked){
    const h=r.w.slice(0,3).toLowerCase();
    if(heads.has(h) && out.length>3) continue;
    heads.add(h); out.push(r.w);
    if(out.length>=count) break;
  }
  while(out.length<count) out.push(cap(clean(genCoin(rand(ks)))||'Brandly'));
  return {names: out, keywords: ks};
}

/* ---------- taglines / palette / monogram (the $10 kit) ---------- */
function makeTagline(name, ks){
  const k1=ks[0]?cap(ks[0]):'Made'; const k2=ks[1]||ks[0]||'simply';
  const t=[
    `${name} — ${k1.toLowerCase()}, made simple.`,
    `Where ${ks[0]||'ideas'} meets ${k2}.`,
    `${name}. ${k1} for everyone.`,
    `Less noise. More ${ks[0]||'magic'}.`,
    `${name} — ${ks[0]||'work'} that feels effortless.`
  ];
  return t[Math.floor(Math.random()*t.length)];
}
function hashStr(s){ let h=0; for(let i=0;i<s.length;i++){ h=(h*31+s.charCodeAt(i))>>>0 } return h }
function hslHex(h,s,l){
  s/=100;l/=100; const k=n=>(n+h/30)%12; const a=s*Math.min(l,1-l);
  const f=n=>{ const x=l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1))); return Math.round(255*x).toString(16).padStart(2,'0') };
  return '#'+f(0)+f(8)+f(4);
}
function palette(name){
  const base=hashStr(name)%360;
  return [
    hslHex(base,68,56),
    hslHex((base+28)%360,62,48),
    hslHex((base+200)%360,30,22),
    hslHex((base+24)%360,40,92)
  ];
}
function monogramSVG(name, colors, size=56){
  const letters = name.replace(/[^A-Za-z]/g,'').slice(0,2).toUpperCase() || 'B';
  const single = letters.slice(0,1);
  const shape = hashStr(name)%3;
  let bg='';
  if(shape===0) bg=`<rect x="2" y="2" width="${size-4}" height="${size-4}" rx="14" fill="${colors[0]}"/>`;
  else if(shape===1) bg=`<circle cx="${size/2}" cy="${size/2}" r="${size/2-2}" fill="${colors[0]}"/>`;
  else { const c=size/2,r=size/2-2; let pts=''; for(let i=0;i<6;i++){const a=Math.PI/180*(60*i-90);pts+=`${(c+r*Math.cos(a)).toFixed(1)},${(c+r*Math.sin(a)).toFixed(1)} `} bg=`<polygon points="${pts}" fill="${colors[0]}"/>`; }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${bg}<text x="50%" y="52%" dy=".06em" text-anchor="middle" dominant-baseline="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="${size*0.46}" fill="#fff">${single}</text></svg>`;
}
function domainIdeas(name){
  const n=name.toLowerCase().replace(/[^a-z0-9]/g,'');
  return [`${n}.com`,`${n}.co`,`${n}.io`,`get${n}.com`,`${n}app.com`];
}

/* ---------- UI wiring ---------- */
const $ = id => document.getElementById(id);
let current = { names: [], keywords: [], selected: '' };
const fmtPrice = () => '$'+STORE.price;

document.querySelectorAll('.btn').forEach(b=>{ if(/\$10/.test(b.textContent)) b.textContent=b.textContent.replace('$10',fmtPrice()); });
$('yr').textContent = new Date().getFullYear();

/* live keyword chips as the user types */
let liveTimer;
$('desc').addEventListener('input', ()=>{
  clearTimeout(liveTimer);
  liveTimer = setTimeout(updateChips, 220);
});
function updateChips(){
  const ks = keywords($('desc').value);
  const box = $('chips');
  box.innerHTML = '<span class="lbl">reading:</span>';
  if(ks.length===0){ $('liveHint').textContent=''; return; }
  ks.slice(0,6).forEach(k=>{
    const c=document.createElement('span'); c.className='chip'; c.textContent=k; box.appendChild(c);
  });
  // tiny live preview so it feels alive while typing
  const preview = generateNames($('desc').value, 1).names[0];
  $('liveHint').textContent = preview ? `e.g. “${preview}” — hit distill for more` : '';
}

/* distill animation + render */
function converge(then){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chips=[...document.querySelectorAll('#chips .chip')];
  if(reduce || chips.length===0){ then(); return; }
  chips.forEach((c,i)=> setTimeout(()=> c.classList.add('converge'), i*55));
  setTimeout(then, chips.length*55 + 220);
}

function distill(){
  const text=$('desc').value.trim();
  if(!text){ $('desc').focus(); $('desc').placeholder='Tell me what you\u2019re building first \u2014 even a few words works!'; return; }
  converge(()=>{
    const res = generateNames(text, 7);
    current.names = res.names; current.keywords = res.keywords;
    renderResults();
    select(res.names[0], true);
    $('results').classList.add('show');
    requestAnimationFrame(()=> $('results').scrollIntoView({behavior:'smooth',block:'start'}));
    updateChips(); // restore chips
  });
}

function renderResults(){
  const grid=$('altGrid'); grid.innerHTML='';
  current.names.forEach(nm=>{
    const b=document.createElement('button'); b.className='alt'; b.dataset.name=nm;
    b.innerHTML=`<div class="nm">${nm}</div><div class="sub">tap to feature</div>`;
    b.addEventListener('click',()=>select(nm,true));
    grid.appendChild(b);
  });
}

function select(name, animate){
  current.selected = name;
  const big=$('bigName'); big.innerHTML=`<span class="ring">${name}</span>`;
  $('featMeta').textContent = `Distilled from: ${current.keywords.slice(0,4).join(', ') || 'your idea'}.`;
  if(animate){
    big.classList.remove('animate'); $('featured').classList.remove('animate');
    void big.offsetWidth; big.classList.add('animate'); $('featured').classList.add('animate');
  }
  document.querySelectorAll('.alt').forEach(a=> a.classList.toggle('active', a.dataset.name===name));
  $('stickyName').innerHTML = `${name}<small>your top pick · ${fmtPrice()}</small>`;
}

$('distillBtn').addEventListener('click', distill);
$('shuffleBtn').addEventListener('click', ()=>{
  const text=$('desc').value.trim(); if(!text){distill();return;}
  const res=generateNames(text,7); current.names=res.names; current.keywords=res.keywords;
  renderResults(); select(res.names[0], true);
});
$('surpriseBtn').addEventListener('click', ()=>{
  const ideas=[
    'A cozy coffee subscription for people who work from home',
    'A bold streetwear label inspired by skate culture',
    'A calm meditation app for busy parents',
    'A fast healthy meal delivery for gym-goers',
    'A handmade ceramics studio with earthy minimal pieces',
    'A smart budgeting tool for freelancers'
  ];
  $('desc').value = ideas[Math.floor(Math.random()*ideas.length)];
  updateChips(); distill();
});

/* ---------- checkout ---------- */
function openCheckout(){
  if(!current.selected){ distill(); return; }
  if(STORE.checkoutUrl){
    // real payment: send to hosted checkout, pass chosen name for reference
    const u=new URL(STORE.checkoutUrl);
    u.searchParams.set('client_reference_id', current.selected);
    window.location.href = u.toString();
    return;
  }
  $('orderName').textContent = current.selected;
  $('checkoutView').style.display='block';
  $('successView').style.display='none';
  $('overlay').classList.add('show');
  setTimeout(()=>$('buyerName').focus(),60);
}
function closeModal(){ $('overlay').classList.remove('show'); }

$('buyFeatured').addEventListener('click', openCheckout);
$('stickyBuy').addEventListener('click', openCheckout);
$('mClose').addEventListener('click', closeModal);
$('overlay').addEventListener('click', e=>{ if(e.target===$('overlay')) closeModal(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
$('doneBtn').addEventListener('click', closeModal);

let lastKit=null;
$('payBtn').addEventListener('click', ()=>{
  const name=current.selected;
  const colors=palette(name);
  const tag=makeTagline(name,current.keywords);
  const doms=domainIdeas(name);
  lastKit={name,colors,tag,doms,buyer:$('buyerName').value.trim(),email:$('buyerEmail').value.trim()};

  $('kitMono').innerHTML = monogramSVG(name,colors,56);
  $('kitName').textContent = name;
  $('kitTag').textContent = tag;
  const pal=$('kitPalette'); pal.innerHTML='';
  colors.forEach(c=>{ const d=document.createElement('div'); d.className='sw'; d.style.background=c; d.innerHTML=`<span>${c}</span>`; pal.appendChild(d); });
  $('kitDomains').innerHTML = '<b>Domains to check:</b> '+doms.join(' · ');

  $('checkoutView').style.display='none';
  $('successView').style.display='block';
});

/* download a self-contained brand-kit file */
$('downloadKit').addEventListener('click', ()=>{
  if(!lastKit) return;
  const k=lastKit;
  const sw=k.colors.map(c=>`<div style="flex:1;height:64px;border-radius:10px;background:${c};position:relative"><span style="position:absolute;bottom:6px;left:0;right:0;text-align:center;font:600 11px monospace;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4)">${c}</span></div>`).join('');
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>${k.name} — Brand Kit</title>
  <style>body{font-family:system-ui,sans-serif;max-width:640px;margin:40px auto;padding:0 20px;color:#17132B}
  h1{font-size:48px;margin:.2em 0;letter-spacing:-.02em}.tag{color:#6E6790;font-size:18px}
  .row{display:flex;gap:10px;margin:18px 0}.lab{font:600 12px/1 monospace;letter-spacing:.15em;text-transform:uppercase;color:#4B3BCB;margin-top:28px}
  ul{line-height:1.9;font-family:monospace}</style></head><body>
  <div style="display:flex;align-items:center;gap:16px">${monogramSVG(k.name,k.colors,72)}<div><h1>${k.name}</h1><div class="tag">${k.tag}</div></div></div>
  <div class="lab">Palette</div><div class="row">${sw}</div>
  <div class="lab">Domains to check</div><ul>${k.doms.map(d=>`<li>${d}</li>`).join('')}</ul>
  <div class="lab">Owner</div><p>${k.buyer||'—'} · ${k.email||'—'}</p>
  <p style="color:#9b95b4;font-size:13px;margin-top:40px">Generated by BrandOfMe on ${new Date().toLocaleDateString()}. This name is yours to use. Check domain and trademark availability before launching.</p>
  </body></html>`;
  const blob=new Blob([html],{type:'text/html'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`${k.name.toLowerCase()}-brand-kit.html`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);
});

// init
updateChips();
</script>
</body>
</html>
