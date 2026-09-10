# SteamHarbor — Product Foundation

> Brand update: section 9 is superseded for exact identity and the earlier literal-nautical restriction by [ADR-0006](decisions/ADR-0006-definitive-harbor-brand.md). The approved target is an illustrated harbor; [brand guide](brand/brand-guide.md) governs its application. Product/data/UX principles remain in force.

_Status: initial direction · 9 September 2026_

## 1. Product promise

SteamHarbor is an independent, fast, accessible way to understand what is happening across Steam and decide what to play, buy, follow, or investigate.

Its advantage is not less data. It is **clearer paths through the data**:

- a useful answer in seconds for casual visitors;
- progressively deeper history, comparisons, and raw records for power users;
- consistent explanations of every metric, timestamp, estimate, and unavailable value.

A useful product test: a visitor should be able to answer “Is this game active?”, “Is this a good price?”, “How has it changed?”, or “What is worth discovering now?” without first learning the site.

## 2. Reference findings

### What SteamDB does well and should remain functionally available

SteamDB has unusually broad, current coverage: catalog search, live and historical player counts, regional price history, discounts and historical lows, rankings, releases, sale events, patches, metadata, packages, depots, configuration, achievements, related apps, and update history. Its filterable sales and charts pages support serious research, while app pages preserve raw technical depth. SteamHarbor should not discard these capabilities merely to appear simpler.

### Problems SteamHarbor should improve

- **Navigation reflects the database more than user intent.** Top-level labels mix discovery destinations, tools, and technical resources; app pages can expose a long, flat sequence of tabs.
- **The first screen does not consistently answer the first question.** Important signals—current activity, price quality, review health, release state, and freshness—compete with secondary or technical facts.
- **Information density lacks enough hierarchy.** Dense tables are valuable, but labels, links, badges, icons, and numbers often carry similar visual weight.
- **Advanced data arrives too early.** Metadata, packages, depots, configuration, and history are essential for experts but can overwhelm users who only want a game overview.
- **Terminology and confidence need more explanation.** Estimated owners, SteamDB Rating, peaks, price lows, and record-update timestamps need concise definitions and source/freshness cues.
- **Search is a utility, not yet the organizing experience.** SteamHarbor should make search fast, forgiving, keyboard-friendly, grouped by result type, and useful before submission.
- **Tables and filters need clearer state.** Active filters, result counts, reset behavior, saved/shareable queries, numeric alignment, and mobile transformations should be predictable.
- **Responsive behavior should be intentional.** Wide tables and large tab sets cannot simply shrink or overflow; mobile needs prioritized summaries, drawers, compact charts, and selected columns.
- **Accessibility must be explicit.** Do not rely on color or emoji alone; provide semantic structure, visible focus, skip links, chart alternatives, sufficient targets, and reduced-motion behavior.
- **System states need first-class treatment.** Loading, partial data, stale data, no history, restricted data, and request failures must be distinguishable.

This assessment uses current indexed pages from SteamDB because its live site kept the research browser in a Cloudflare verification loop. Assertions about current information architecture and content were cross-checked across its homepage, sales, charts, price-history, app-information, patch, package, and FAQ pages. Responsive criticisms are product requirements and structural inferences, not claims from a completed device audit.

## 3. Primary users and jobs

| User | Main goals | Default depth |
|---|---|---|
| Curious player | Check popularity, reviews, release status, and whether a game is alive | Summary |
| Deal hunter | Judge the current price against history; find meaningful discounts | Summary + price |
| Enthusiast/researcher | Explore trends, peaks, rankings, releases, and compare games | Analytical |
| Developer/journalist/creator | Inspect patches, update timing, metadata, packages, and traceable evidence | Advanced |

The same person may move between modes. Depth should follow the task, not a permanent “basic/expert” setting.

## 4. Initial information architecture

- **Discover**
  - Trending now
  - Rising games
  - New and upcoming
  - Curated data views
- **Charts**
  - Most played
  - Peak records
  - Movers
  - Genre/tag rankings
- **Deals**
  - Current deals
  - Historical lows
  - Price drops
  - Sale calendar
- **Games**
  - Search/browse catalog
  - Game detail
  - Compare (post-MVP)
- **Updates**
  - Recent patches
  - Product changes
- **Personal**
  - Watchlist and alerts (post-MVP)
- **Advanced**
  - Metadata, packages, depots, configuration, raw update history

### Proposed top-level navigation

**Discover · Charts · Deals · Releases · Updates**

Global search remains visually central on desktop and immediately accessible on mobile. “Advanced” belongs inside relevant game pages and a secondary tools menu, not beside primary consumer destinations. Account/watchlist controls remain utilities.

## 5. MVP scope

### In scope

1. Global app search with instant, grouped results and full keyboard support.
2. Homepage with platform pulse, meaningful trending/rising views, deals, releases, and recent notable updates.
3. Game overview with identity, live activity, price context, review signal, release facts, freshness, and outbound Steam link.
4. Player-history view with accessible ranges and a tabular alternative.
5. Price-history view for the visitor’s selected region/currency, current price, historical low, and discount context.
6. Charts/rankings page with sorting and a focused filter set.
7. Deals page with price, discount, review-count/rating, tag, historical-low, and platform filters.
8. Release/upcoming page with useful date and status grouping.
9. Technical data entry point that preserves raw information without dominating the overview.
10. Responsive, keyboard-accessible shell and complete loading, empty, partial, stale, and error states.

### Deferred

Accounts, synchronized Steam library/wishlist, alerts, comparison, publisher/developer hubs, ownership estimates, embeds, calculator, browser extension, community features, and exhaustive technical subpages. Architecture should leave room for them without delaying the core loop.

## 6. Homepage structure

1. **Compact header:** identity, primary navigation, prominent search, theme/account utilities.
2. **Search-led introduction:** one restrained sentence and a real query field; no oversized marketing hero.
3. **Steam pulse:** current platform activity plus a timestamp/source note.
4. **Worth noticing:** explainable rising/trending games, each with the reason it appears (for example, “+42% vs last week”), not a mysterious ranking.
5. **Most played:** compact ranked table with current players, 24-hour peak, movement, and a clear route to full charts.
6. **Deals worth checking:** current price, discount, historical-low relationship, rating confidence, and regional context.
7. **New and upcoming:** release date/status with filters appropriate to the visitor’s region.
8. **Recent signals:** notable patches, record peaks, or large price changes.
9. **Transparent footer:** independence statement, data sources, freshness/status, methodology, accessibility, and legal links.

Modules should be reorderable later, but MVP order prioritizes search, “what is happening,” and purchase decisions.

## 7. Game detail structure

### Persistent identity header

Capsule art, title, developer/publisher, release status/date, platforms, compact tags, Steam link, and future watch action. Avoid decorative banners that push data below the fold.

### Overview (default)

- **Key facts:** players now, 24-hour peak, all-time peak, review sentiment with sample size, current regional price, historical low, latest meaningful update.
- **Plain-language insight strip:** short factual observations such as “activity is 18% above its 30-day average”; never fabricate causal explanations.
- **Activity preview:** player chart with 24h / 7d / 30d / 1y / all controls and latest update time.
- **Price preview:** current price, discount, lowest recorded price/date, and compact history.
- **Reviews and momentum:** rating, volume, recent-vs-overall where available.
- **Release and store facts:** grouped facts, not an undifferentiated key/value dump.
- **Recent updates:** latest patches/record changes.

### Secondary sections

**Activity · Prices · Reviews · Updates · Details · Advanced**

Use a sticky in-page section navigator on desktop and an accessible select/menu on small screens. “Advanced” contains metadata, packages, depots, configuration, achievements, related apps, and raw history. URLs must preserve the selected section, chart range, currency, sort, and filters.

## 8. Interaction principles

1. **Answer first, evidence next, raw data last.**
2. **Progressive disclosure without hidden capability.** Show what deeper data exists and why it is useful.
3. **Explain every derived signal.** Tooltips/help must work with keyboard and touch; methodology must be reachable.
4. **Freshness is part of the value.** Every live or historical module communicates update time and source.
5. **Filter state is visible and shareable.** Active chips, result count, clear-all, sensible defaults, and URL persistence.
6. **Tables stay tables when comparison matters.** Add sorting, sticky headers/identity columns, aligned numerics, density control, pagination/virtualization, and column customization only when justified.
7. **Charts are reading tools.** Clear units, timezone, range controls, restrained series, event annotations, hover/focus values, zoom only when useful, and an equivalent data table/download path.
8. **No color-only meaning.** Pair change, sentiment, discount quality, and status colors with text, shape, or iconography.
9. **Partial truth beats a blank page.** Render available modules independently and explain unavailable/stale sections.
10. **Speed is visible.** Reserve layout space, use skeletons sparingly, cache stable data, and prioritize the first useful answer.

## 9. Visual and design-system direction

SteamHarbor should feel like a **public data atlas for games**: precise, calm, lively, and consumer-friendly—not a maritime costume and not a generic SaaS dashboard.

- Neutral deep-ink and fog surfaces with a distinct **signal teal** for interactive focus and a restrained **beacon amber** for noteworthy events. Red/green are semantic only and always paired with labels.
- Crisp editorial typography: highly legible sans-serif for interface/content and tabular numerals for data. Avoid tiny metadata text.
- Mostly flat surfaces, fine dividers, deliberate whitespace, modest radii, and very limited elevation. Do not turn every section into a floating card.
- A subtle “harbor” idea may appear in language such as signals, routes, and watch, plus a recognizable line/marker motif in charts. Avoid anchors, ships, waves, faux radar, or Steam-like blue gradients.
- Start with tokens for color, typography, spacing, borders, radius, motion, elevation, chart series, focus, and data density.
- Core primitives: links, buttons, inputs/combobox, tabs, disclosure, tooltip/popover, badges, segmented controls, table, pagination, skeleton, empty/error state, toast, dialog/drawer, chart frame, metric definition, and freshness indicator.
- Target WCAG 2.2 AA: semantic landmarks/headings, skip links, logical focus, visible 3:1 focus indicator, 4.5:1 body-text contrast, 44px touch targets where practical, 200% text zoom, reduced motion, and tested screen-reader names/states.

## 10. Desktop and mobile expectations

### Desktop

Use a centered, fluid content frame. Key summaries may use two or three columns, while analytical pages can use full-width tables. Filters may remain in a sticky side panel only when their frequency and count justify it. Preserve keyboard paths and avoid hover-only controls.

### Mobile

Search is a first-class header action. Prioritize one-column summaries, horizontally compact metric pairs, bottom-sheet/drawer filters, explicit active-filter counts, and charts sized for touch. Rankings become curated rows with the most decision-relevant values; users can open a detail view or choose additional columns. Technical key/value data stacks as definition lists. Large tables may scroll only when cross-column comparison is essential, with a sticky first column and an obvious scroll affordance. Navigation, tabs, tooltips, and chart inspection must not depend on hover.

Breakpoints follow content stress rather than device names. Test at 320px width, 200% zoom, keyboard-only desktop, touch, reduced motion, high contrast, slow network, and missing/partial datasets.

## 11. First milestones

### M0 — Foundation and evidence contract

Define data sources, legal/independence language, metric definitions, freshness rules, unavailable/estimated states, URL model, and representative fixtures. Confirm which Steam data can be obtained reliably before UI promises are made.

### M1 — Design system and application shell

Choose the React stack based on data/rendering needs; establish tokens, typography, accessible primitives, responsive header/navigation/search shell, state patterns, Storybook or equivalent component workbench, and automated quality checks.

### M2 — Search and game overview vertical slice

Ship global search and one production-shaped game page using realistic data contracts: summary metrics, activity preview, price context, freshness, responsive behavior, and all non-happy states. This validates the product’s central “answer first” promise.

### M3 — Activity and price histories

Build accessible chart infrastructure, data tables, ranges, region/currency handling, annotations, loading strategy, and shareable state.

### M4 — Discovery surfaces

Add homepage modules, charts/rankings, deals, and releases using shared table/filter/query patterns. Validate casual discovery and power filtering with usability tests.

### M5 — Advanced continuity and production hardening

Expose technical data progressively; add performance budgets, virtualization where measured, analytics/observability, SEO/metadata, accessibility audit, cross-browser QA, and deployment readiness.

## 12. Sources reviewed

- [SteamDB homepage](https://steamdb.info/)
- [SteamDB sales and filters](https://steamdb.info/sales/)
- [SteamDB live charts](https://steamdb.info/charts/)
- [SteamDB game information example](https://steamdb.info/app/730/info/)
- [SteamDB price-history example](https://steamdb.info/app/730/)
- [SteamDB patches example](https://steamdb.info/app/730/patchnotes/)
- [SteamDB FAQ and purpose](https://steamdb.info/faq/)
- [Steam official charts](https://store.steampowered.com/charts/)
- [CoinGecko](https://www.coingecko.com/) — global search, metric summaries, customizable dense tables, quick filters
- [Steam Charts](https://steamcharts.com/) — focused player-history task
- [Backloggd](https://backloggd.com/) — consumer game discovery and collection context

Reference patterns are inputs, not visual templates. SteamHarbor must establish and test its own hierarchy, language, and identity.
