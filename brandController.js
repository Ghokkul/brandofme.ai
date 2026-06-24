# Copy to .env and fill in. Everything has a safe default so the server runs as-is.

PORT=8080
# Secret used to sign session + reset tokens. MUST be set in production.
JWT_SECRET=change-me-to-a-long-random-string
# Where the JSON database file lives (default ./data). Swap to Postgres later (see src/db).
DATA_DIR=./data
# Allowed browser origin for CORS (your frontend URL). Use * only for local dev.
CLIENT_ORIGIN=*
# Public base URL used when building links (reset emails, published pages).
PUBLIC_BASE_URL=http://localhost:8080
# Free-trial length in days.
TRIAL_DAYS=7

# --- Social sign-in ---
# In production, set provider client IDs and verify real ID tokens in src/services/oauth.js.
# For local dev this lets "Continue with Google/Outlook/..." trust the posted email.
ALLOW_SIMULATED_SOCIAL=true
GOOGLE_CLIENT_ID=
MICROSOFT_CLIENT_ID=
APPLE_CLIENT_ID=

# --- Billing (Stripe) ---
# Leave blank to run in simulated mode (no real charges). See src/services/billing.js.
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PRICE_MONTHLY=2900
PRICE_YEARLY=26100

# --- Email ---
# Leave blank to log emails to the console. Plug a provider in src/services/email.js.
EMAIL_FROM=hello@brandofme.ai
SMTP_URL=
