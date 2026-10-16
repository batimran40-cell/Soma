# SOMA Organic — Milestones and verification

Design source of truth: approved EARTHRIN luxury skincare screenshots, rebranded as **SOMA**. Preserve forest green, warm cream, gold, restrained editorial type and uncluttered framed layouts.

## M01 — Existing project audit (completed)
- Reused established React 19 + Vite + GSAP + custom CSS repository rather than replacing working code.
- Located existing homepage, products collection, product details, cart, checkout preview, wishlist and product assets.
- Confirmed actual catalog currently includes four SKU concepts (Vitamin C serum, face wash, face cream, toner). Do not misrepresent them as three different serums.

## M02 — Visual consistency and three-product hero (implemented, unverified in browser)
- Homepage hero displays the existing `/images/product-trio.webp` composed image.
- Added a shaded, responsive image layer and consistent premium interface treatment.
- Homepage featured products displays three catalog items; collection still shows all existing products.

## M03 — Search dialog (implemented, unverified in browser)
- Global accessible modal with ESC, backdrop close, keyboard focus containment, relevant matches, suggestions and clear product links.
- Existing collection supports a `?q=` search query.

## M04 — Account experience (implemented as preview, unverified in browser)
- Added `/account` responsive account overview with tabs, saved favourites and recently viewed items.
- No production authentication or order records exist; explicitly labelled demo rather than faking customer data.

## M05 — Catalog, details, wishlist and cart (existing implementations; full regression pending)
- Collection: existing category, search, sorting and product card flows.
- Product details: existing details, images, cart and wishlist.
- Wishlist: existing client-side persistence and recently viewed.
- Bag and checkout: existing in-browser cart and checkout preview.

## M06 — Automated tests and responsive QA (not complete)
- CI workflow runs npm ci and npm run build on branch updates.
- Still required: validate actual rendered routes and interactions at 320, 375, 768, 1024, 1440 and 1920 px; inspect contrast, overflow, navigation, touch controls, modal focus and reduced-motion behaviour.
- Run a real browser smoke test for home, collection, details, wishlist, cart, account and search.
- CI success does not imply UI similarity or complete functionality.

## M07 — Secure production commerce integration (blocked by missing requirements)
- Real authentication provider, accounts database, validated product prices, inventory, shipping policy, checkout/payment provider, order storage, emails, privacy/terms, product claims and verified imagery are not yet supplied.
- Do not ship fake pricing, reviews, medical efficacy statistics or real-looking demo purchase confirmations.
- Keep production checkout disabled until the backend is connected and security tested.

## Local validation
```bash
npm ci
npm run build
npm run dev
```

Note: This branch was updated through GitHub integration. The agent environment cannot currently clone the repository or run the app locally, so compilation, visual QA and browser smoke tests remain unverified.
