# ADR-0009 — Brand-integrated application shell baseline

Status: Proposed implementation baseline for owner visual review · 2026-09-09.

## Context

PR #6 merged the definitive SteamHarbor V02 harbor identity and its approved production derivatives into `main`, while the running application still used the pre-brand dark theme and an unapproved `SH` monogram. The existing shell and homepage behavior remain useful, but their visual system is no longer the target identity.

Brand authority remains with [ADR-0006](ADR-0006-definitive-harbor-brand.md), [ADR-0007](ADR-0007-approved-v02-extractions.md), the canonical [brand guide](../brand/brand-guide.md), and the V02-R01/V02-R02 production records. The static theme-v01 boards are implementation references, not pixel specifications.

## Proposed decision

Adopt the following implementation baseline for the application shell and homepage:

- Replace the `SH` header mark with the approved V02 horizontal signature. Copy the already-approved binary into `public/brand` without changing the canonical source file.
- Use the V02-R02 horizontal reverse derivative when the operating system requests a dark color scheme. Do not introduce a favicon from the historical reduction tests.
- Translate the canonical brand palette into semantic light and dark interface tokens: ivory/petroleum as primary surfaces and text, copper/amber for selective emphasis, and teal for supporting interactive/data accents. Keep success, warning, and danger as separate semantic concepts.
- Load Inter for interface/body/data and Fraunces selectively for editorial/display headings. Do not reconstruct the approved logo lettering with either font.
- Keep page composition server-rendered; global search remains the existing focused client interaction. Do not introduce a UI framework, global client state, or unrelated dependency.
- Retain all five primary destinations. Use full desktop navigation and a native `details`/`summary` disclosure when width no longer supports the desktop layout. Search remains first-class at every width.
- Keep the fixture/demo-data notice visible across routes while fixture data is present.
- Preserve the desktop ranking as a semantic table. At mobile widths, replace the wide presentation with an ordered game list containing explicit labels for the same decision-relevant metrics instead of shrinking or globally scrolling the desktop table.
- Keep release, price, and update modules honest about unavailable integrations. Do not add decorative charts or invented values.

## Accessibility and responsive consequences

The implementation retains a skip link, landmarks, table semantics, search combobox/listbox behavior, visible 3px focus, approximately 44px targets where practical, tabular numeric alignment, reduced-motion handling, and no color-only state meaning.

The CSS baseline responds to content stress at approximately 1040px, 880px, 700px, and 390px. The narrowest layout is designed to remain usable at 320px without page-wide horizontal scrolling. Local overflow remains permitted only when comparison actually requires it.

This establishes a WCAG 2.2 AA target, not an accessibility certification. Browser/device, screen-reader, zoom, and visual review are still required for production acceptance.

## Performance consequences

The shell adds no runtime UI dependency. Approved PNG derivatives use explicit intrinsic dimensions through `next/image`. Supporting fonts use `next/font`, avoiding a runtime external stylesheet request. Only the search interaction requires client-side JavaScript in the shell.

## Scope boundary

This decision covers canonical brand integration, shared semantic tokens, typography, application shell, search presentation, homepage hierarchy, mobile ranking transformation, and shell-level styling continuity for the existing game page.

It does **not** add Steam providers, live statistics, backend infrastructure, prices, charts backed by new data, authentication, watchlists, a new favicon, or a full game-detail redesign. The next planned major phase remains the **Game Overview vertical slice** using this shell and design-system baseline.

## Canon and review state

ADR-0006, ADR-0007, and ADR-0008 remain historical brand authority and are not rewritten by this decision. If this PR is merged after owner visual review, the implementation becomes the current shared UI baseline. Merge does not by itself claim full device/accessibility certification, nor does it promote the theme-v01 static boards to pixel-perfect canon.
