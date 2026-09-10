# ADR-0010 — Game Overview vertical slice

Status: Proposed implementation baseline for owner visual review · 2026-09-09.

## Context

The owner merged PR #7, making the brand-integrated shell and homepage from ADR-0009 the shared application baseline. The game route still carried the older first-pass hierarchy: identity, a four-metric row, disconnected activity placeholder, reviews, raw availability, updates, and details. It proved the data contract but did not yet implement the product foundation’s dedicated Game Overview structure.

The data foundation remains binding. This phase may use only the existing deterministic fixtures and evidence/availability fields. It must not invent regional prices, historical timelines, causal explanations, live Steam values, or provider integrations.

## Proposed decision

Adopt the following fixture-backed Game Overview baseline:

- Keep a compact identity header with release state, title, description, developer/publisher context, tags, stable catalog facts, and an explicit outbound Steam store link derived from AppID.
- Put decision-relevant answers first: Players now, 24h peak, all-time peak, positive review percentage with sample size, and price availability. Fixture-only historical peak values are labeled as fixture references rather than presented as verified production history.
- Display the exact evidence observation time whenever a current activity/review snapshot exists. Missing values remain “Unavailable” or an explicit availability state; they never become zero.
- Follow the secondary task order **Activity · Reviews · Prices · Updates · Details · Advanced** after Overview. Desktop uses a sticky in-page navigator; at the mobile stress point it becomes a native `details`/`summary` “Jump to section” menu without client JavaScript.
- Activity shows the useful current snapshot and explicit evidence, but no chart, average, momentum, percentage-change claim, or time-range controls while no dated timeline exists.
- Reviews keep Steam’s fixture label, calculated positive percentage, positive/negative counts, total sample size, and observation time together.
- Prices remain a gated availability module. `source_pending`, `not_applicable`, provider-error, and similar reasons receive plain-language copy; no guessed regional price, discount, or historical-low claim is rendered.
- Updates remain explicitly unconnected and explain that missing update data is not evidence that a game has no updates.
- Stable catalog/store facts live in Details rather than competing with live signals.
- Raw availability and evidence metadata are progressively disclosed in Advanced. Capability is discoverable, but raw delivery state does not dominate the overview.

## Visual and component consequences

The page continues the accepted shell tokens and typography. It uses open sections, rules, definition lists, and a small number of contained state/evidence surfaces rather than a dashboard of floating cards. Fraunces remains reserved for display headings; Inter remains UI/data text.

Page-specific styling lives in a CSS module so the game hierarchy can evolve without expanding the global shell stylesheet. The route remains a Server Component and adds no runtime dependency or client-side state.

The placeholder game artwork remains intentionally abstract because no approved media source is connected. This phase does not introduce Steam capsule assets or imply that fixture initials are official artwork.

## Accessibility and responsive consequences

- The game page keeps one H1 and labeled H2 sections, breadcrumb navigation, semantic definition lists, explicit section landmarks, external-link accessible naming, and the shell skip link.
- The desktop section navigator remains keyboard accessible; mobile navigation uses native disclosure semantics and 44px-class link targets.
- Information never depends on color alone. Availability badges include text; freshness and evidence are expressed in words and timestamps.
- At 700px and below, the wide section navigator becomes the disclosure menu and multi-column facts/metrics reflow intentionally. At 390px and below, comparison groups become one column.
- 320px remains a hard no-page-wide-overflow target.

Automated/browser checks support this target but do not constitute screen-reader or full WCAG certification.

## Validation evidence for the proposal

The implementation was exercised with Node 22 on GitHub Actions using `npm ci`, repository lint excluding the known pre-existing `tools/brand/render_favicon.cjs` blocker, TypeScript, Vitest, production build, and headless Chrome.

Browser QA covered Counter-Strike 2 at 320, 390, 768, 1024, and 1440px in light mode, 1440px dark mode, and Dota 2 at 390px. Assertions verified no page-wide horizontal overflow, the correct desktop/mobile section-navigation switch, presence of the required overview/activity/price states, and the outbound Steam link. Screenshots were visually reviewed before this ADR was written.

## Scope boundary

This phase does **not** add providers, API routes, live statistics, historical collections, approved regional pricing, price history, real game artwork, authentication, watchlists, chart infrastructure, or new global product areas. It also does not broaden the fixture catalog beyond the two existing sample games.

The next logical product step after owner approval is to expand representative fixture/state coverage (upcoming, stale, partial, empty, source failure, and similar conditions) and prove that these same modules degrade independently before provider integration.
