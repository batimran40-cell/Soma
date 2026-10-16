# SOMA Organic — React + Vite Homepage

A complete responsive homepage inspired by the approved SOMA botanical skincare reference design. Built with React, Vite, plain CSS and GSAP ScrollTrigger. Includes nine sections, animated reveals, mobile navigation, product gallery, shopping bag demo, search affordance and a newsletter demo form.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically http://localhost:5173).

Production build:

```bash
npm run build
npm run preview
```

## Important notes

- `public/images/` contains the bundled original Soma visual concepts and crops, so the page loads with visuals immediately.
- Product images are **visual mockups**, not manufacturing-ready packaging. Replace with your verified physical product photos before launching.
- No product prices, fake customer reviews, unverified certifications or production checkout are published.
- The bag works in-memory for demos; integrate a real commerce backend and payment service before taking orders.
- Newsletter validates email but is only a demo. Connect an email service to save subscribers.
- Google Fonts need an internet connection; system font fallbacks are included.
- GSAP honors reduced-motion preferences and cleans up triggers on component unmount.


## Premium homepage additions

Editorial botanical feature, three-card ingredient gallery, and visual ritual story are implemented in `src/components/Sections.jsx`. All CSS font-size declarations use `rem` units (including responsive clamps). Product photography is in `public/images/`. Newsletter and cart are frontend demonstrations, not live commerce.


## SOMA Studio — local development preview (2026-10)

A premium visual pass and local-only admin prototype are implemented on the `feature/soma-admin-studio-milestones` branch.

- Visit `http://localhost:5173/admin-preview` while `npm run dev` is running. The Studio route is not available in production builds.
- Product views are counted **once per product per browser session**, only for this browser. Add-to-bag and wishlist counts represent local interactions, **not sales**.
- Studio includes Overview, Products, Analytics, Orders placeholder, Settings, and a local product draft/edit flow. Catalog edits do not publish to storefront.
- The homepage and collection hero use `/images/product-trio.webp`, which is a concept artwork. Verify packaging and product catalog before production.
- `node --test tests/admin-*.test.mjs` validates browser storage and local admin business logic.
- `docs/SOMA_DEVELOPMENT_PLAN.md` contains the milestone checklist. `docs/SOMA_SECURITY_ANALYTICS.md` documents security limitations and future Supabase integration.

Real orders, customer sign-in, privileged admin permissions, payments, inventory, and global analytics remain **unimplemented** until a backend and security policies are integrated.

