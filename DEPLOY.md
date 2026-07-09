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

## Behind Cloudflare (this is our setup)

`pixldev.be` is proxied by Cloudflare (orange cloud), so the origin (the VPS)
must NOT rely on Let's Encrypt HTTP/TLS-ALPN challenges — Cloudflare blocks them,
which is what produces a **525** error and a certless `:443`.

Use a **Cloudflare Origin Certificate** with the existing system Caddy:

1. Run the app, bound to localhost only:
   ```bash
   docker run -d --name pixldev --restart unless-stopped -p 127.0.0.1:3000:3000 pixldev
   curl -I http://127.0.0.1:3000     # expect 200
   ```
2. Cloudflare dashboard → **SSL/TLS → Origin Server → Create Certificate**
   (hostnames `pixldev.be, *.pixldev.be`). Save on the VPS:
   `/etc/caddy/pixldev.crt` and `/etc/caddy/pixldev.key`.
   Then **SSL/TLS → Overview → Full (strict)**.
3. Caddyfile site block (`/etc/caddy/Caddyfile`), then `systemctl reload caddy`:
   ```
   pixldev.be, www.pixldev.be {
       tls /etc/caddy/pixldev.crt /etc/caddy/pixldev.key
       reverse_proxy 127.0.0.1:3000
   }
   ```
4. `curl -I https://pixldev.be` → 200.

Quick fallback (less secure): Cloudflare SSL mode → **Flexible**, and serve the
site over plain HTTP in Caddy (`http://pixldev.be { reverse_proxy 127.0.0.1:3000 }`).
Fixes 525 with no origin cert, but Cloudflare↔VPS traffic is unencrypted.

## Notes

- CI/CD: point a GitHub webhook or a cron `git pull && docker build && docker restart` at the VPS. (No auto-deploy is configured in the repo.)
- **Disconnect Netlify** in the Netlify dashboard so pushes to GitHub no longer trigger a Netlify build (removing `netlify.toml` alone does not unlink a connected site).
- Dynamic routes served by the Node server: `/og` (OG images), `/feed.xml`, `/sitemap.xml`. Everything else is prerendered.
