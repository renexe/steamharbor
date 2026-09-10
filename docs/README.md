# SteamHarbor canonical index

This is the entry point and source-of-truth registry for every agent and contributor. Read it before making product, UX, data, or architecture decisions.

## Canonical hierarchy

When sources conflict, use this order:

1. The newest **Accepted** ADR that explicitly changes an earlier decision.
2. Documents marked **Canonical** in the registry below.
3. Current implementation and automated tests for behavior not covered by canonical documentation.
4. Proposals, issues, and external references.

An implementation discrepancy does not silently replace documented canon. Resolve it by changing the implementation or accepting a superseding ADR.

## Registry

| Area | Canonical source | Status | Last reviewed |
|---|---|---|---|
| Product, users, IA, MVP, UX and visual direction | [product-foundation.md](product-foundation.md) | Canonical | 2026-09-09 |
| Data sources, metrics, evidence and availability | [data-foundation.md](data-foundation.md) | Canonical | 2026-09-09 |
| Frontend architecture and stack | [ADR-0001](decisions/ADR-0001-application-stack.md) | Accepted | 2026-09-09 |
| Canon governance | [ADR-0002](decisions/ADR-0002-canonical-documentation.md) | Accepted | 2026-09-09 |
| Review and delivery policy | [ADR-0003](decisions/ADR-0003-visual-review-and-delivery.md) | Accepted | 2026-09-09 |
| Vercel build and output configuration | [ADR-0004](decisions/ADR-0004-vercel-build-configuration.md) | Accepted | 2026-09-09 |
| Design tokens and component specifications | [design-system.md](design-system.md) | Canonical implementation baseline; visual review pending | 2026-09-09 |
| Brand approval scope and gates | [ADR-0005](decisions/ADR-0005-brand-approval-gates.md) | Accepted governance; advanced by ADR-0006 | 2026-09-09 |
| Brand index and approval records | [brand/README.md](brand/README.md) | Canonical entry point; definitive v02 approved | 2026-09-09 |
| Definitive illustrated harbor identity | [ADR-0006](decisions/ADR-0006-definitive-harbor-brand.md) | Accepted owner approval | 2026-09-09 |
| Brand strategy | [brand/branding.md](brand/branding.md) | Canonical documentation | 2026-09-09 |
| Approved v02 extracted signatures | [ADR-0007](decisions/ADR-0007-approved-v02-extractions.md) | Accepted owner approval | 2026-09-09 |
| Brand extraction provenance and production status | [V02-R01](brand/production/v02-r01/README.md) | Canonical production record | 2026-09-09 |
| Consolidated brand delivery | [ADR-0008](decisions/ADR-0008-consolidated-brand-delivery.md) | Accepted owner instruction | 2026-09-09 |
| Brand usage and production guide | [brand/brand-guide.md](brand/brand-guide.md) | Canonical; initial technical specs labeled | 2026-09-09 |
| Brand-integrated application shell baseline | [ADR-0009](decisions/ADR-0009-brand-integrated-shell-baseline.md) | Proposed implementation baseline for visual review | 2026-09-09 |

The definitive V02 harbor identity remains the active brand authority. The old application `SH` monogram is not an approved SteamHarbor identity. Interface tokens, responsive behavior, and component treatment are implementation decisions governed separately from the immutable approved brand binaries.

## Change rule

- Small clarifications that do not alter intent may update a canonical foundation directly.
- A material change to scope, hierarchy, metrics, source policy, stack, accessibility target, or visual direction requires a new ADR.
- ADRs are append-only historical records. Superseded ADRs remain in the repository and link to their replacement.
- New canonical documents must be registered here in the same commit.
- Research notes and visual proposals are not canonical unless promoted through this registry.

## Current delivery state

- M0 product and data foundations: complete.
- M1 application foundation: fixture-backed shell and homepage implemented; definitive brand integration is proposed through ADR-0009 and remains subject to owner visual review.
- Current slice: canonical V02 brand signature in the shell, responsive primary navigation, keyboard global search, explicitly labeled fixture coverage, desktop/mobile activity ranking, honest unavailable integration states, and the existing game overview route carried onto the shared token baseline.
- Provider integration, authentication, live Steam statistics, pricing, price history, watchlists, and global rankings: not implemented.
- Next planned major phase after approval of this baseline: **Game Overview vertical slice** using the finalized shell and design system.
