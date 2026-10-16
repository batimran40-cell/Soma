# SOMA security and analytics readiness

## Scope
This branch implements a **local demo**, not a secure production administration backend. Frontend-only role restrictions cannot protect private data. No privileged customer data or keys are created.

## Current safeguards
1. The admin interface route exists only when Vite runs in development mode (`import.meta.env.DEV`).
2. Product IDs and allowed event fields are whitelisted; malicious, malformed and unknown IDs are rejected.
3. Browser analytics numbers are validated as non-negative, bounded safe integers. Unknown keys are ignored.
4. View counts are deduplicated by browser session and product ID. Browser storage errors do not crash the UI.
5. Admin catalog editing is limited to known image assets, short text lengths, known IDs or generated draft IDs and enumerated statuses.
6. React handles text rendering. No arbitrary HTML or uploaded executables are accepted.
7. No payment collection, order processing, password storage or server credentials are implemented.

## Remaining risks and limitations
- An individual user can modify browser-local counts. **Never use demo metrics for company reporting or revenue decisions**.
- A view is local to that one browser; visits from other browsers/devices are not aggregated. No bot protection or global deduplication exists.
- Local admin UI is not a substitute for authentication or authorization. A real dashboard must use server-side roles, row-level security and audit trails.
- Product images, reviews and product efficacy copy must be checked against approved product information before publication.
- Production checkout, customer records, subscriptions and orders require a purpose-built backend and compliance review.
- The existing SPA may contain unrelated weaknesses outside the scope of this branch; a full production penetration test has not occurred.
- Running a dev server bound to `0.0.0.0` may expose the **demo** UI to users on the same network; restrict host/firewall when sharing devices.

## Supabase integration checklist (future, not executed)
- Use external authentication (e.g. Clerk or Supabase Auth) and validated access tokens for requests.
- Define `products`, `admin_memberships`, `product_events`, `orders`, `inventory_movements`, `admin_audit_log` with a migration and rollback plan.
- Deny write access by default; RLS on user-specific data; privileged admin actions behind server-side authorization.
- Keep Supabase service-role credentials on the server only. Never expose them through `VITE_*` variables.
- Implement server-side analytics ingestion with request validation, rate limiting, privacy-aware deduplication and fraud/bot controls.
- Validate stock and amounts server-side when creating checkout sessions; verify provider webhooks cryptographically and idempotently.
- Separate test and production projects, rotate secrets where needed, redact logs, and review retention/consent requirements.
- Add scoped admin audit events for create/update/archive, imports, price changes and role updates.
- Enable backups, point-in-time recovery where available, and test recovery periodically.

## Testing
`tests/admin-analytics.test.mjs`, `tests/admin-catalog.test.mjs`: domain logic and malformed state.
`tests/browser-smoke.mjs`: browser route checks, runtime errors, horizontal overflow, search and draft editor.
GitHub Actions workflows: `soma-studio-qa.yml` and `soma-browser-qa.yml`.

Always inspect the final GitHub Actions result before treating tests as passed. Browser smoke tests do not prove exact design parity, security compliance, accessibility or real checkout functionality.
