# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server on http://localhost:8080
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
npx tsc --noEmit  # type check
npm run lint       # eslint
npm test           # vitest (single run)
npm run test:watch # vitest watch mode
```

Run a single test file:
```bash
npx vitest run src/test/example.test.ts
```

## Architecture

Pure static SPA — no backend, no API, no auth. All orders flow through WhatsApp/Telegram deep links. Deployed to Vercel; `vercel.json` rewrites all routes to `index.html` for React Router.

### Data flow

**Products** are defined entirely in `src/pages/index-content.ts` as a typed `Product[]` array. This is the single source of truth for slugs, titles, descriptions, images, badges, and categories. To add or change a product, edit only this file.

**Prices** are NOT in `index-content.ts`. They are hardcoded as `useMemo` constants directly inside `src/pages/ProductDetails.tsx` — `tvPrices`, `musicPrices`, `creativityPrices`. Edit those constants to change pricing.

**Ordering** works by building a pre-filled WhatsApp/Telegram message string. `src/lib/orderMessage.ts:buildOrderMessage` constructs the message per product type (stream/music/creativity). `src/lib/productSelection.ts:buildCartItem` builds a cart item, and `buildCartCheckoutMessage` constructs a multi-item checkout message.

**Cart** is React context (`src/lib/cart.tsx`) backed by `localStorage` under key `rivo-plus-cart`. No server state.

**Contact info** lives solely in `src/config/contact.ts` — `RIVO_WHATSAPP_PHONE`, `RIVO_TELEGRAM_USERNAME`, `RIVO_ORDER_EMAIL`. Always import from there; never hardcode phone numbers or usernames inline.

### Routing

| Path | Component | Notes |
|---|---|---|
| `/` | `Index` | Full landing page with all sections |
| `/product/:slug` | `ProductDetails` | Slug must match a `product.slug` in `index-content.ts` |
| `/products` | redirect | → `/#products` |
| `/cart` | redirect | → `/#cart` |

Routes only render after the `LoadingScreen` completes (`loaded` state in `App.tsx`). If a route appears to not render, check this gate first.

`ProductsPage.tsx` and `CartPage.tsx` exist in `src/pages/` but are not wired into the router — they are orphaned.

### Internationalisation

Three languages: `"ar" | "en" | "de"` (type `Language`). Arabic is the default and is RTL. Language is persisted in `localStorage` under key `"language"`. Every user-facing string is a `Record<Language, string>`. Never hardcode display strings — add them to the relevant `i18n` or `copy` object.

Language changes are broadcast via a `CustomEvent("rivo-language-change", { detail: language })` on `window`, dispatched from `Navigation.tsx` and `Index.tsx`. Any new page or component that must react to language changes needs to listen for this event — see `ProductDetails.tsx:76` for the pattern.

Images often have Arabic variants: default image + optional `*_ar` sibling (e.g. `adobe_pic.png` / `adobe_pic_ar.png`). Use `getImageForLanguage(language, defaultImage, arabicImage?)` from `src/lib/getImageForLanguage.ts` to select the correct one.

### Global wrappers (App.tsx, top to bottom)

1. `QueryClientProvider` — TanStack Query (not heavily used yet)
2. `TooltipProvider` — Radix tooltip context
3. `CartProvider` — localStorage cart context
4. `WallpaperEngine` — animated canvas always rendered behind content
5. `LoadingScreen` — shown once on first mount, then hidden via `onDone` callback
6. `ScrollToHash` — syncs React Router navigation to `#hash` anchors
7. Dark mode is force-enabled via `document.documentElement.classList.add("dark")` in a `useEffect` — do not add a theme toggle

### TypeScript config

Lenient: `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`. Path alias `@/` maps to `src/`.

### UI

shadcn/ui components live in `src/components/ui/` — treat them as read-only primitives. Custom business components go directly in `src/components/`. Tailwind CSS with dark-mode class strategy. Framer Motion used for animations.

### URL safety

`src/lib/utils.ts` exports `isSafeUrl(url: string): boolean`. Use it before rendering any string as an `href` or `img src` that originates from external data (localStorage, props, URL params). Allowed schemes: `/`, `https://`, `http://`, `mailto:`, `data:image/`.
