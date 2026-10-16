# SOMA — Autonomous milestone board (development branch)

> Branch: feature/soma-admin-studio-milestones. Reference: EARTHRIN luxury skincare images approved in chat, rebranded to SOMA. The user's local repository currently has merge-conflict markers; **this work is restricted to the GitHub feature branch**.

## Completed implementation (needs visual approval)

- [x] M01: Inspect existing React / Vite / GSAP app and reuse current product, cart, wishlist, checkout and account components.
- [x] M02: Provide browser-local, per-product views / add-to-bag / wishlist action counters with whitelist validation and view deduplication per browser session.
- [x] M03: Build local-only SOMA Studio with Overview, Products, Analytics, Orders placeholder, Settings and local draft editor.
- [x] M04: Protect admin preview behind `import.meta.env.DEV`; do not publish fake auth, sales, inventory or private user data.
- [x] M05: Unify storefront color palette / layout using forest green, ivory and champagne; prioritize calm spacing and legible cards. Set collection hero to existing three-product image.
- [x] M06: Add Node.js regression tests for validated analytics, session deduplication, browser storage failures and demo product editor.
- [x] M07: Repair Search Dialog's accessible control ID; link account preview to local Studio.
- [x] M08: Add Chromium browser QA workflow for key routes, responsive widths, Search Dialog and Admin editor, with screenshots.

## QA and next steps

- [ ] Confirm all workflow jobs pass after the final commit. Check GitHub Actions for Studio QA, Soma CI and browser smoke.
- [ ] Review browser artifacts and compare layout visually against approved skincare reference at 375 and 1440px.
- [ ] Check real mobile touch devices, keyboard focus behaviour, color contrast and performance budgets.
- [ ] Correct user-reported local Git merge conflicts without overwriting unmerged local features. This is a separate local-only task.
- [ ] Align any other local components / assets not yet pushed to the remote repository.
- [ ] Connect real product CMS, stock, customer accounts, real sales, orders and global analytics **only after** selecting and configuring Supabase and an authentication provider.
- [ ] Add secure server-side admin authorization, RLS policies, audit logs, payment/webhook validation and operational monitoring before production launch.
- [ ] Replace conceptual product photos, descriptions and claims with validated commercial assets and copy.

## Current demo behaviour

- `/admin-preview`: only available under Vite development; no real admin authentication.
- Product views are recorded at `/products/:id`, once per product per browser session.
- Cart and wishlist counters count relevant local button interactions; they are **not** purchases or unique customers.
- Product edits and drafts are local-only previews and do **not** appear on live public catalog pages.
- There are no fabricated reviews, revenue numbers or inventory quantities.
- Demo data is stored under browser-local `soma-demo-analytics-v1` and `soma-demo-catalog-v1`. It does not sync across visitors.

## Preview

```bash
npm ci
npm run build
npm run dev
# open http://localhost:5173/admin-preview
```

No GitHub changes in this branch can resolve conflict markers on an independently divergent local machine. Resolve local merge safely before pulling / switching branches.
