# Visual review v1 — handoff

Status: Delivery note, not product canon · 2026-09-09

Branch: `feat/visual-review-v1` → `main`. Owner merges and publishes; this change does neither.

## Review routes

- `/`: compact discovery, sample ranking, meaningful not-connected destinations.
- `/games/730` and `/games/570`: summary, history empty state, reviews, evidence and details.
- `/games/999999999`: not-found recovery.
- Search `Dota`, `730` and a missing title; try arrows, Enter and Escape.

All values are fixtures. No live Steam provider, price history, authentication, full-catalog rankings or real update feed is included. The fictional release previously mapped to AppID 2246340 was removed rather than propagated as catalog truth.

## Build / release

Use the existing Node/Next deployment pipeline: `npm ci`, `npm run build`, then `npm start` on the hosting-assigned port (Next honors `PORT`). This is not a static export. No domain, host configuration or secrets were changed. Preview remains `noindex`; remove only through a production-readiness change after sources and accessibility are validated.

## Checks

Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` before opening the PR. Record actual results in its description. Browser screenshots, mobile device checks and screen-reader review have not been performed in this delivery.

## Next milestone

Owner visual review and responsive/accessibility acceptance, then a server-side provider adapter with provenance and availability normalization, tested against the canonical data foundation. Historical charts follow collected time series and coverage gates; do not connect price displays until a legitimate regional price source is approved.
