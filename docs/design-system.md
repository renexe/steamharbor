# SteamHarbor component foundation

> Brand update: this document describes the current implementation baseline. Exact identity, target palette and brand typography now route to [ADR-0006](decisions/ADR-0006-definitive-harbor-brand.md) and the [brand guide](brand/brand-guide.md). Existing CSS is not the target brand canon; no UI migration occurred in this documentation change.

Status: Canonical implementation baseline under ADR-0003. Exact visual treatment is pending owner review of the PR. Product and data foundations still govern scope and semantics.

## Visual language

A compact game atlas: flat ink surfaces, fog typography, restrained teal signals and amber evidence warnings. No Steam-blue imitation, glass dashboard tiles, oversized marketing hero or decorative chart lines. Game identity and comparable numbers carry the page.

| Role | Initial token / rule |
|---|---|
| Canvas / surface | `#071311` / `#0b1c19` |
| Primary / secondary text | `#f2f6f3` / `#cbd8d2` |
| Metadata | `#8fa49b`; verify contrast on each actual surface |
| Signal / warning / focus | `#55e6ba` / `#ffc45b` / 3px amber outline |
| Dividers | `#28433b`; do not rely on these alone for input boundaries |
| Layout | 1180px maximum; 24px desktop and 16px narrow gutters |
| Type | System sans; 16px body, 14px control labels, 12px minimum metadata; tabular numerals |
| Surfaces | Modest radii (up to 12px), thin rules; color never the only state cue |

## Components and behavior

- Header: persistent brand, labeled search and five navigation destinations. On narrow screens, stack search under brand; horizontally scroll navigation rather than remove it. No fake keyboard shortcut hint.
- Search: title/exact AppID matching within the sample catalog; listbox semantics; arrows select, Enter opens, Escape closes. Preserve visible focus. Announce result count and explain empty coverage. A broader result page, fuzzy matching and shortcut are later work.
- Homepage: compact introduction → sample status → ranked table → release availability → evidence explanation → price/update availability. Useful data precedes longer explanation.
- Ranking: native table with row/column headers, game links and right-aligned counts. Local horizontal scroll preserves all columns on small screens, not page-wide overflow. No hidden mobile column labels.
- Game: identity → section navigation → summary → history availability → reviews → evidence → updates and catalog details. Unknown and unavailable are not zero; zero reviews must not create a NaN percentage.
- Charts: render only dated samples, with units, coverage, range interaction and a textual/table equivalent. Until then show an honest empty state, not inert chart controls.
- States: fixture banner on all routes. Unconnected sources explain the missing capability; search-empty explains catalog scope. Future errors retain stale data with timestamp and retry only when actionable. Loading states must preserve layout and announce progress without fake values.
- Mobile: normal-flow global header; game section navigation may stick at the top. Targets at least 44px where practical; long titles wrap. Validate at 320px, 768px and 1440px, at 200% zoom and with reduced motion before claiming visual acceptance.

## Validation boundary

WCAG 2.2 AA remains the target, not a certification. Automated component tests do not establish screen-reader compatibility, contrast compliance, touch usability or absence of visual clipping. Owner/device review is required before production acceptance.
