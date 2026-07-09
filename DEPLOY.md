# Deploy (self-hosted VPS)

The site runs as a standard Next.js Node server (`output: "standalone"`). No Netlify.

## Option A — Docker (recommended)

```bash
docker build -t pixldev .
docker run -d --name pixldev --restart unless-stopped -p 3000:3000 pixldev
```

The app listens on `0.0.0.0:3000`. Put a reverse proxy (nginx or Caddy) in front for TLS on `pixldev.be`.

Caddy (simplest, auto-TLS) — `/etc/caddy/Caddyfile`:

```
pixldev.be, www.pixldev.be {
    reverse_proxy 127.0.0.1:3000
}
```

## Option B — no Docker

```bash
npm install
npm run build            # runs blog:build, then next build → .next/standalone
node .next/standalone/server.js   # serves on PORT (default 3000)
```

Copy `public/` and `.next/static/` next to `server.js` if you move the standalone folder. Run under pm2/systemd, e.g.:

```bash
pm2 start .next/standalone/server.js --name pixldev
```

## Env vars

All optional — the site works with none:

- `NEXT_PUBLIC_GA_ID` — GA4 id. Defaults to `G-XEWJM1DYS1` (already wired).
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` — **not needed**; Google Search Console is verified at the domain (DNS) level.
- `PORT` (default 3000), `HOSTNAME` (default 0.0.0.0).

## Notes

- CI/CD: point a GitHub webhook or a cron `git pull && docker build && docker restart` at the VPS. (No auto-deploy is configured in the repo.)
- **Disconnect Netlify** in the Netlify dashboard so pushes to GitHub no longer trigger a Netlify build (removing `netlify.toml` alone does not unlink a connected site).
- Dynamic routes served by the Node server: `/og` (OG images), `/feed.xml`, `/sitemap.xml`. Everything else is prerendered.
