# pixldev.be — SEO / GEO scorecard (2026-07-09)

_Format from `feen/docs/seo/01-landing-audit.md`. Thresholds from `pixl-seo/config/seo_rules.yaml`. Baseline to beat: the Feen landing scored 5.5/10 (C−) with two fatal bugs (client-side i18n on one URL, `new Date()` in the sitemap). **pixldev avoids both.**_

## Scorecard

| Area | Grade | Notes |
|---|---|---|
| Crawl / robots | **A** | `robots.txt` with AI-crawler allowlist (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…), disallows `/pitch` `/invest`. Sitemap referenced. |
| i18n / hreflang | **A** | Real `app/[lang]/` routing (not client-side). `hreflang` en/fr/nl + x-default on every page. This is the exact bug that gave Feen an **F**; here it's an A. |
| Sitemap | **A** | Static `SITE_UPDATED` date (comment forbids `new Date()`), one entry per locale with alternates. The other Feen bug, avoided. |
| Schema (structured data) | **A** | Organization (VAT, contactPoint, sameAs, areaServed), WebSite, BlogPosting, BreadcrumbList, FAQPage, SoftwareApplication per product, Person, ImageObject. Broad, valid. |
| GEO / llms.txt | **A−** | `llms.txt` with brand disambiguation ("not the image editor"), honest product statuses, links to brand.md. Room: profession/comparison depth like `feen-landing`'s mature version. |
| OG / social | **A** | Dynamic `/og` cards 1200×630, real logo + hero image + per-product accent, `og:locale` en_BE/fr_BE/nl_BE. Blog OG uses the post illustration. |
| Meta titles | **B+** | Mostly 30–45 chars. A few punchy short ones (`The Baton Pattern`, `SEO Is a Graph Now`) below 30 — a deliberate voice choice; Google rewrites short titles anyway. Optional: decouple a richer `<title>` from the H1 later. |
| Meta descriptions | **A−** | Mostly 120–160. Trimmed 3 EN over-length (no-consumer 176→~150, the-company 168→~150, tech-stack 171→~150). TODO: check FR/NL description lengths. |
| Content quality | **A** | 13 posts in an authentic first-person voice, 0 em-dashes, one honest constraint each; FAQ + FAQPage on live products; unique, no "what is AI" filler. |
| Performance | **A−** | Static/SSG, images optimized to 120–290 KB, `next build` clean. No full Lighthouse run this pass. |

**Composite: ~9.0 / 10 (A−).** Up from the Feen 5.5 baseline, and it does not repeat either Feen fatal bug.

## Fixes applied this pass

- Trimmed 3 EN meta descriptions over 160 chars.
- (Content) 13 posts rewritten in-voice, em-dashes removed sitewide, per-post illustrations wired, FAQ schema on products.

## Remaining opportunities (not blocking)

- **P1** — Check + trim FR/NL descriptions to ≤160 (only EN done this pass).
- **P1** — Google Search Console + Bing verification: env vars ready (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`); paste tokens in Netlify after deploy, submit `sitemap.xml`.
- **P2** — Enrich `llms.txt` toward the mature `feen-landing` version (profession pages, comparison blocks) for stronger GEO.
- **P2** — Optional richer `<title>` decoupled from the short H1 on the punchiest posts, if you want the keyword real estate.
- **P2** — Add `Article`/`ItemList` on the blog index; consider `HowTo`/`TechArticle` where a post is a real procedure.

## Site health (Phase 2.4)

- `next build`: clean (0 errors). All routes prerender (SSG). `/og` and `/feed.xml` dynamic by design.
- Images: all optimized, no >300 KB assets.
- 404: branded page present. Internal links locale-aware. No broken image paths (all posts have a generated hero).
