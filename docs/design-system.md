# SteamHarbor component foundation

Status: **Canonical implementation baseline.** The approved brand identity is governed by [ADR-0006](decisions/ADR-0006-definitive-harbor-brand.md), [ADR-0007](decisions/ADR-0007-approved-v02-extractions.md), and the [brand guide](brand/brand-guide.md). The brand-integrated shell and homepage implementation is proposed for owner visual review under [ADR-0009](decisions/ADR-0009-brand-integrated-shell-baseline.md).

Product and data foundations continue to govern scope, semantics, evidence, and unavailable states. Brand artwork and interface tokens are related but not interchangeable: UI implementation must not modify the approved logo to fit a component.

## Visual language

SteamHarbor is a calm consumer data platform for games. The illustrated harbor identity may be prominent in brand moments, while search, tables, metrics, and evidence surfaces remain visually quiet. Hierarchy comes from typography, spacing, alignment, and dividers before elevation or decoration.

Do not use the retired `SH` monogram, rebuild the wordmark with a font, create a provisional favicon from logo reductions, imitate Steam branding, or introduce a literal nautical UI language. Avoid glassmorphism, glow, decorative charts, excessive gradients, and layouts composed only of rounded cards.

## Semantic tokens

Brand colors provide the visual family; semantic states remain independent tokens and must include text or other non-color meaning.

| Role | Light baseline | Dark baseline | Use |
|---|---|---|---|
| Canvas | Ivory `#F7F3EA` | Deep petroleum `#0D3038` | Page background |
| Surface | Warm white `#FFFDF8` | Petroleum `#123D47` | Header, input, popover, contained surfaces |
| Subtle surface | `#F1ECE2` | `#173F48` | Fixture notice, quiet emphasis |
| Primary text | Petroleum `#123D47` | Ivory `#F7F3EA` | Body, headings, data |
| Muted text | Support gray `#53666B` | `#C3CFCC` | Secondary copy and metadata |
| Border | `#D7D2C8` | `#315A63` | Dividers and boundaries |
| Brand action | Copper `#B64F2B` | Amber `#F0B45A` | Selective links and emphasis |
| Supporting teal | `#087F8C` | `#58C0C4` | Search/icon/data accent; validate text contrast per surface |
| Focus | Teal `#087F8C` | Amber `#F0B45A` | 3px visible focus outline |
| Success / warning / danger | Separate semantic tokens | Separate semantic tokens | Never infer state from brand copper/amber alone |

Use modest radii for controls and contained surfaces. Tables and page sections should normally use open layouts and rules instead of a card wrapper.

## Typography and numeric data

- The logo lettering remains the approved raster asset.
- Inter is the UI, controls, body, and data family. The application loads it as a variable font through `next/font` with a system fallback.
- Fraunces is reserved for editorial/display headings; it is not used for every label, control, or number.
- Body baseline is 16px with comfortable line height. Metadata should normally remain 12–14px and must retain sufficient contrast.
- Comparable numbers use tabular numerals and right alignment. Do not compress numeric columns to gain density.

The SIL OFL provenance for Inter and Fraunces is recorded in the canonical brand guide. No logo lettering is reconstructed from either family.

## Application shell

- Header identity uses the approved V02 horizontal signature exposed as `/public/brand/steamharbor-horizontal.png` without editing the canonical source binary.
- Dark system preference uses the technically repaired V02-R02 horizontal reverse derivative. This is a presentation switch, not a logo redesign.
- Desktop keeps brand, five primary destinations, and global search in the first navigation level.
- Below the navigation stress point, destinations move into a native `details`/`summary` disclosure and search receives its own row. Mobile navigation must still include every primary destination.
- Search remains a first-class action on all widths.
- The header returns to normal document flow on narrow screens to avoid consuming excessive mobile viewport height.
- A fixture notice appears on every route while demo data remains in use.
- Skip navigation and a transparent independence statement remain part of the shell.
- Light/dark appearance currently follows `prefers-color-scheme`; there is no persistent manual theme preference in this phase.

## Global search

Preserve the existing behavior contract while styling it through shared tokens:

- search fixture games by title substring or exact AppID;
- expose combobox/listbox semantics and an accessible result count;
- Arrow Up/Down changes active option; Enter navigates; Escape dismisses;
- opening, empty, and selected-result states retain visible focus and clear sample-catalog wording;
- result rows remain large enough for touch and keyboard use;
- do not imply the full Steam catalog has been searched.

A broader result page, fuzzy search, grouped result types, and keyboard shortcuts remain later work.

## Homepage baseline

The homepage implements the product rule **answer first, evidence next, raw data last** in this order:

1. compact search-led introduction;
2. explicit fixture coverage summary;
3. useful player-activity ranking;
4. honest upcoming-release unavailable state;
5. evidence explanation;
6. price and update integrations shown as unavailable rather than filled with invented values.

There is no oversized marketing hero and no decorative chart. Fixtures are always described as sample/demo data, never live Steam statistics.

### Ranking transformation

- Desktop/laptop: native table with column headers, row headers, game links, and right-aligned tabular metrics. Local horizontal overflow is allowed only if needed.
- Mobile below the comparison stress point: an ordered list replaces the wide table. Each game exposes the same decision-relevant `Players now` and `24h peak` labels in a definition list; values are not hidden behind unlabeled columns.

## Existing game route

This phase applies the shell, tokens, typography, responsive spacing, and shared surface treatment to the existing game page without redesigning its product hierarchy. The dedicated **Game Overview vertical slice** remains the next planned major product phase.

## Accessibility and responsive baseline

Target WCAG 2.2 AA where practical; this is a target, not certification.

- semantic header, navigation, main, footer, headings, tables, definition lists, and ordered rankings;
- visible 3px focus treatment and a working skip link;
- 44px interactive targets where practical;
- text/state meaning never depends on color alone;
- reduced-motion media query removes smooth scrolling and functional transition duration;
- breakpoints respond to content stress at approximately 1040, 880, 700, and 390px;
- 320px must not create page-wide horizontal scrolling; comparison overflow is local only;
- 200% zoom must preserve navigation/search access and content order;
- mobile navigation must be keyboard/touch operable without hover.

Automated checks do not establish screen-reader compatibility, device usability, contrast across every rendered pixel, or visual acceptance. Browser/device review remains required before production acceptance.

## Performance and implementation rules

- Server Components remain the default; global search is the only shell interaction requiring client JavaScript.
- Use plain token-driven CSS; do not add a UI framework or state library for this baseline.
- Use `next/image` for approved logo derivatives with explicit intrinsic dimensions.
- Use `next/font` for the supporting UI fonts instead of runtime stylesheet requests.
- Do not load the large approved presentation board as the application header logo.
- Keep unavailable modules static and honest instead of introducing chart or data dependencies before sources exist.

## Validation boundary

Relevant code changes should run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` in an environment with dependencies available. Visual review should cover at least 320px, approximately 390px, tablet, laptop, 1440px desktop, 200% zoom, keyboard-only navigation, reduced motion, and both system color schemes. Report automated validation separately from visual/accessibility acceptance.
