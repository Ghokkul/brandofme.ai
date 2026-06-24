BRANDOFME.AI — DASHBOARD + 404  (drop-in for your public_html)
==============================================================

Your current hosting (from the file manager):
    public_html/
      backend/        (leave as-is)
      frontend/       (leave as-is)
      index.html      (your site)

UPLOAD these into public_html, keeping the same names/paths:

    public_html/
      index.html            <- REPLACE your existing file
      404.html              <- NEW
      .htaccess             <- NEW   (if you already have one, merge the lines in)
      dashboard/
        index.html          <- NEW   (the signed-in dashboard, lives at /dashboard/)

Do NOT touch backend/ or frontend/. That's everything for normal (Apache/cPanel) hosting.

WHAT EACH FILE DOES
-------------------
index.html  - same site, plus: when a user signs in, a "Dashboard" link appears in the
              nav and their account is shared (in the browser) with the dashboard.
dashboard/  - the signed-in dashboard. Reachable at  https://YOURSITE/dashboard/
              Shows a time-based greeting, live world-clock timezones, and a cozy line.
404.html    - branded "page not found" that routes visitors back into the site.
.htaccess   - tells Apache to use 404.html for missing pages and gzip the big index.html.

HOW IT CONNECTS (no backend required)
-------------------------------------
1. Visitor signs in on index.html (your existing sign-in).
2. The site saves the signed-in user in the browser and shows the "Dashboard" link.
3. They open /dashboard/ -> it reads that user, so the greeting / avatar / plan are real.
4. Because both pages are on the SAME domain, the sign-in carries over automatically.

IMPORTANT: dashboard/ and 404.html must live INSIDE public_html (same domain as
index.html). On a different domain the shared sign-in will not carry over.

OPTIONAL — IF YOU RUN THE NODE BACKEND
--------------------------------------
The site works fully on static hosting; Node is not required. If you do run the
included server.js, it serves index.html, /dashboard/ and 404.html from public_html
automatically. (Static hosting ignores server.js — that's fine.)

NOTE: the dashboard's brand-kit card + recent activity currently show sample data.
Point them at your real brand model / API when you're ready and they'll go live.
