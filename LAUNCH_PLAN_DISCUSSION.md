# RivoPlus — Launch Plan

A summary for us to go through together before the site goes live.

## Where things stand

- The site itself is built: React SPA, 3 languages (Arabic default, English, German), dark mode.
- No backend/database — every order is handled by sending a pre-filled WhatsApp or Telegram message. Someone has to read and respond to those manually.
- Hosting is already set up on Vercel, connected to our GitHub repo. Deploying is basically one click once we're ready.
- Plan for now: launch on the free `*.vercel.app` address, add a paid custom domain later once we know the site is stable.

## Decisions we need to make together

1. **IPTV product image.** The current image for the IPTV product is a placeholder — a stock photo of a "TEST" push-button, not real branding. We need either real artwork or a proper placeholder before this goes live. Who's making/finding this?
2. **Contact details.** The WhatsApp number, Telegram handle, and order email currently in the code — are these the final, correct ones we want customers actually messaging?
3. **Prices.** Someone should double check every price on the site is correct and final before we go live — these are hand-typed into the code, not pulled from anywhere else.
4. **Order handling.** Since there's no automated order system, who's watching WhatsApp/Telegram for incoming orders once people start clicking "Order"? What's our response-time expectation?
5. **Domain timing.** Launch now on the free Vercel address, or wait and buy a custom domain (~$10–15/year) before announcing it publicly?

## The plan, phase by phase

**Phase 0 — Fix before launch**
- Replace the placeholder IPTV image
- Confirm contact info and prices (see decisions above)
- Run through the whole site locally and click every button once more

**Phase 1 — Polish (nice to have, not blocking)**
- Compress a few oversized product images so the site loads faster, especially on phones
- Minor performance cleanup on the homepage bundle

**Phase 2 — Deploy**
- Push to the main branch, which triggers Vercel to build and publish the site automatically
- No extra configuration needed — it's a static site, nothing to set up on a server

**Phase 3 — Test the live site, together**
- Go through the live link on both a phone and a laptop
- Test all 3 languages, especially Arabic (right-to-left layout)
- Actually click "Order" on a product and confirm the WhatsApp/Telegram message that opens is correct
- Try a broken/fake link to make sure the "page not found" screen works

**Phase 4 — After launch**
- Keep making changes on separate branches so we always get a private preview link to check before anything goes live
- Turn on free Vercel traffic analytics so we can see how many people are actually visiting
- Decide whether to add the custom domain now

## Rough order of operations

1. Agree on the 5 decisions above
2. Fix the IPTV image + confirm details (Phase 0)
3. Deploy (Phase 2)
4. Test together on the live link (Phase 3)
5. Announce it / start sharing the link

Nothing here is locked in — this is meant as the starting point for us to talk through and adjust.
