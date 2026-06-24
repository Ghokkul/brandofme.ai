# Brandofme.ai — robots.txt
# Let search engines crawl everything except the API.

User-agent: *
Allow: /
Disallow: /api/
Disallow: /*?*token=
Disallow: /*?*u=

# Be friendly to image and link previews
User-agent: Googlebot-Image
Allow: /

Sitemap: https://brandofme.ai/sitemap.xml
