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
