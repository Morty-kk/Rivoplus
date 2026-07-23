# RivoPlus Deployment Plan

Static SPA (Vite + React + TS), no backend. Deploying to Vercel on the free `*.vercel.app` subdomain, from the existing `Morty-kk/Rivoplus` GitHub repo (already connected to your Vercel account).

---

## Phase 0 — Pre-flight fixes (do these before you deploy)

- [ ] **Replace the IPTV placeholder asset.** `public/products/IPTV_Logo.jpg` and `src/assets/IPTV_Logo.jpg` are currently a stock "TEST" push-button render, not real IPTV branding. Launching with this live looks broken to a customer — swap in real artwork or a proper placeholder before going live.
- [ ] **Verify contact info.** Open `src/config/contact.ts` and confirm `RIVO_WHATSAPP_PHONE`, `RIVO_TELEGRAM_USERNAME`, `RIVO_ORDER_EMAIL` are the real, live numbers/handles you want customers messaging on day one.
- [ ] **Verify prices.** Check `tvPrices`, `musicPrices`, `creativityPrices` in `src/pages/ProductDetails.tsx` match what you actually intend to charge — these are hand-maintained constants, not pulled from anywhere else.
- [ ] **Run the full local check sequence** from the repo root:
  ```bash
  npx tsc --noEmit
  npm run lint
  npm test
  npm run build
  npm run preview
  ```
  Then open the preview URL and click through **every** route and product manually — automated checks won't catch a wrong WhatsApp link or a broken image.

---

## Phase 1 — Performance quick wins (recommended, not blocking)

- [ ] Compress the three oversized product images before launch: `247_pic.png` (921KB), `gaming_pic.png` (866KB), `creativity_pic.png` (864KB). Convert to WebP, target under ~150KB each — these load on the homepage for every visitor.
- [ ] Optional: lazy-load the `/product/:slug` route with `React.lazy` so the homepage bundle doesn't ship product-detail-only code (recharts, extra form logic) to every visitor.

These aren't launch-blockers, but doing them now is cheaper than doing them after a traffic spike makes them visible.

---

## Phase 2 — Deploy to Vercel

1. In the [Vercel dashboard](https://vercel.com/dashboard), confirm the `Rivoplus` project is imported and pointed at `Morty-kk/Rivoplus`.
2. Confirm build settings (Vercel should auto-detect these from `vite.config.ts`, but double-check):
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
3. No environment variables are needed — there's no API/backend to configure.
4. Push to `main` (or click **Deploy** in the dashboard) to trigger the build.
5. `vercel.json` already has the SPA rewrite (`/(.*) → /index.html`) so React Router routes won't 404 on refresh — nothing to configure there.

---

## Phase 3 — Verify the live site

Once deployed to your `*.vercel.app` URL, walk through this checklist on the **live** site (not localhost):

- [ ] `/` loads, loading screen completes, homepage renders fully
- [ ] `/product/:slug` for a few different products — images, prices, and copy all correct
- [ ] `/products` redirects to `/#products`
- [ ] `/cart` redirects to `/#cart`
- [ ] A nonsense path (e.g. `/asdf`) hits the `NotFound` page
- [ ] Language switch across `ar` / `en` / `de` — confirm Arabic renders RTL correctly
- [ ] Dark mode is applied (it's force-enabled, no toggle)
- [ ] Click an **Order** button end-to-end — confirm it opens WhatsApp/Telegram with the correct number/handle and a correctly pre-filled message, for both a single-item order and a cart checkout
- [ ] Test on an actual mobile device, not just a resized browser window
- [ ] Run Lighthouse in Chrome DevTools with mobile + slow-network throttling, given the current unoptimized images

---

## Phase 4 — Post-launch housekeeping

- [ ] Push future changes to a **branch**, not directly to `main` — Vercel auto-generates a preview URL per branch/PR, so you can test before it goes live.
- [ ] When ready for a custom domain: buy one (~$10–15/yr from any registrar), then add it under Project → Settings → Domains in Vercel and follow the DNS instructions shown there.
- [ ] Enable Vercel Analytics (free tier) to see real visitor traffic and Core Web Vitals once live.
- [ ] Decide the fate of `src/pages/ProductsPage.tsx` and `CartPage.tsx` — they exist but aren't wired into the router. Either delete them or intentionally route to them; leaving orphaned pages invites confusion later.

---

## Rollback plan

Vercel keeps every previous deployment. If a deploy breaks something in production, go to the project's **Deployments** tab and use **Promote to Production** (a.k.a. Instant Rollback) on the last known-good deployment — takes effect in seconds, no rebuild needed.
