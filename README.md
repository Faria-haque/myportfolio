# The 404 Life — portfolio

A portfolio that loads as a broken website (typed errors, a loader stuck at 99%), then repairs itself into a liquid-glass site.

Built with Next.js 15 (App Router), React 19, GSAP (timeline, ScrollTrigger, SplitText) and Lenis. Fonts (Space Grotesk, JetBrains Mono) are self-hosted with `next/font/local`.

Requires Node 18.18+. (Next.js 16 needs Node 20.9+; upgrade Node before bumping `next`.)

## Commands

```sh
npm install
npm run dev       # http://localhost:3000
npm run build     # every route is prerendered as static HTML
npm run start
```

## Make it yours

- **All copy and content:** `src/data/site.ts` (name, positioning line, projects, changelog, known issues, skills, email).
- **Contact form:** set `formEndpoint` in `site.ts` to a Formspree, Basin, or similar URL. If it's empty, the form opens the visitor's mail client instead.
- **Production URL:** `metadataBase` in `src/app/layout.tsx`.
- **Case study media:** replace the placeholder block in `src/app/work/[slug]/page.tsx`.

## Where things live

| Piece | File |
|---|---|
| Tokens, glass, glitch, cursor, reduced-motion | `src/app/globals.css` |
| Root layout, fonts, pre-paint intro gate | `src/app/layout.tsx` |
| Backdrop (blobs, outlined type) + refraction SVG filter | `src/components/Backdrop.tsx` |
| Crash → stuck loader → repair (single GSAP timeline) | `src/components/Intro.tsx`, `src/scripts/intro.ts` |
| Lenis, scroll reveals, red cursor | `src/components/ClientEffects.tsx`, `src/scripts/scroll.ts`, `src/scripts/cursor.ts` |
| Work cards with hover glitch | `src/components/Work.tsx`, `src/components/ProjectCard.tsx` |
| Sections | `src/components/Hero.tsx`, `About.tsx` (Changelog, Known Issues), `Contact.tsx` |
| Pages | `src/app/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/not-found.tsx` |
| Component styles | `src/styles/components/*.css` |

Only `Intro`, `ClientEffects`, `ProjectCard` and `Contact` are client components; everything else renders on the server.

## Intro behavior

- An inline script in `<head>` decides before first paint whether to play: only on `/`, once per browser session (`sessionStorage["intro-seen"]`), never with `prefers-reduced-motion`, and not when the URL has a `#hash`.
- **Skip intro** button is visible from the first frame; `Esc` also skips.
- Auto-repairs 2.5s after the **Fix it** button appears.
- If the intro script fails to load, an inline failsafe reveals the site after 2.5s.
- Glitch effects shift at most ~2 times per second (under the WCAG 3-flashes limit).
- The intro animates DOM directly with GSAP, then calls back into React to unmount the overlay.

To replay the intro while developing, clear session storage or open a new tab.

## Notes on glass

- Blur lives on each panel's `::before`. Any lingering `opacity`, `filter` or `transform` animation on a panel's ancestors stops `backdrop-filter` from seeing the page behind it, which is why the animations call `clearProps` when they finish.
- The `feDisplacementMap` refraction (`.glass--liquid`) is only enabled in Chromium (`html.liquid`). Safari and Firefox get the plain blur.
- Keep about 4–5 glass panels on screen at once at most, and test on a mid-range phone.

## Deploy

Push to GitHub and import into Vercel (zero config). Netlify also supports Next.js out of the box.
