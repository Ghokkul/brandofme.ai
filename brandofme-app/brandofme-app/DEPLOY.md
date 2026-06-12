# Deploying Brandofme.ai to Hostinger

One Node.js app serves everything: the website, the API, and the public brand pages.
Requires **Node 22+** (the database uses Node's built-in SQLite).

---

## Option A — Hostinger Node.js hosting (easiest)

Hostinger supports Node.js apps on its web/cloud plans (Business: up to 5 apps,
Cloud Startup: up to 10) and via managed Node.js hosting, deployable by file
upload or GitHub.

1. **hPanel → Websites → Add Website → Node.js application** (or open your
   existing site and look for the Node.js / Web App option).
2. **Deploy the code** — either:
   - **GitHub (recommended):** push this folder to a repo and connect it.
     New commits redeploy automatically.
   - **Upload:** zip this folder (without `node_modules/` and `data/`) and upload it.
3. **Configure the app:**
   - Node version: **22**
   - Install command: `npm install`
   - Start command: `npm start`  ← already includes the `--experimental-sqlite` flag
   - Entry point (if asked): `src/server.js`
4. **Environment variables** (hPanel → your app → Environment variables):
   ```
   JWT_SECRET   = <long random string — required>
   PORT         = <whatever Hostinger assigns, often set automatically>
   APP_URL      = https://yourdomain.com
   DB_PATH      = /home/<your-user>/brandofme-data/brandofme.db   ← see note below
   ANTHROPIC_API_KEY = <optional — real AI drafts>
   ```
5. **Point your domain** at the app and enable the free SSL in hPanel.
6. Visit your domain — the landing page, trial signup, and workspace all run
   from this one app. Brand pages are live at `yourdomain.com/u/<slug>`.

> **Important — database persistence:** SQLite stores everything in one file.
> Set `DB_PATH` to a directory **outside the deploy folder** so redeploys don't
> wipe user accounts. If your plan doesn't allow that, or once you have real
> customers, switch the data layer to Hostinger's bundled MySQL (the schema in
> `src/db.js` ports over directly) or use Option B.

---

## Option B — Hostinger VPS (full control, best for production)

1. Buy any Hostinger VPS, choose **Ubuntu 24.04** (plain or with the Node.js template).
2. SSH in, then:
   ```bash
   # Node 22 via NodeSource
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx
   sudo npm i -g pm2

   # the app
   git clone <your-repo> /var/www/brandofme && cd /var/www/brandofme
   npm install
   cp .env.example .env && nano .env     # set JWT_SECRET, APP_URL, keys

   pm2 start npm --name brandofme -- start
   pm2 save && pm2 startup               # survive reboots
   ```
3. **Nginx reverse proxy** — `/etc/nginx/sites-available/brandofme`:
   ```nginx
   server {
     server_name yourdomain.com;
     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```
   ```bash
   sudo ln -s /etc/nginx/sites-available/brandofme /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com        # free HTTPS
   ```
4. Point the domain's A record at the VPS IP in hPanel → DNS.

---

## Going from demo billing to real money

Out of the box, plan buttons use **demo checkout** (instant activation, no charge).
To charge real subscriptions:

1. In Stripe: create three recurring Prices — $19, $67, $199/month.
2. Set env vars: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_BASIC`, `STRIPE_PRICE_PLUS`,
   `STRIPE_PRICE_PRO`, `STRIPE_WEBHOOK_SECRET`.
3. Add a Stripe webhook → `https://yourdomain.com/api/billing/webhook`
   for `checkout.session.completed` and `customer.subscription.deleted`.
4. **Before launch:** add webhook signature verification in
   `src/routes/billing.js` (marked with a NOTE) and rate limiting
   (`npm i express-rate-limit`) on `/api/auth/*` and `/api/drafts`.

The frontend already handles both modes automatically — when Stripe keys are
present, plan buttons redirect to real Stripe Checkout.

## Smoke test after deploy

```bash
curl https://yourdomain.com/api/health          # {"ok":true}
# then in the browser: start a trial, generate a draft, open /u/<your-slug>
```
