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
| Design tokens and component specifications | [design-system.md](design-system.md) | Canonical baseline; visual review pending | 2026-09-09 |
| Brand approval scope and gates | [ADR-0005](decisions/ADR-0005-brand-approval-gates.md) | Accepted governance; advanced by ADR-0006 | 2026-09-09 |
| Brand index and approval records | [brand/README.md](brand/README.md) | Canonical entry point; definitive v02 approved | 2026-09-09 |
| Definitive illustrated harbor identity | [ADR-0006](decisions/ADR-0006-definitive-harbor-brand.md) | Accepted owner approval | 2026-09-09 |
| Brand strategy | [brand/branding.md](brand/branding.md) | Canonical documentation | 2026-09-09 |
| Brand usage and production guide | [brand/brand-guide.md](brand/brand-guide.md) | Canonical; initial technical specs labeled | 2026-09-09 |

The owner explicitly clarified that the first product version does not approve the SH monogram, palette or typography as the brand. See ADR-0005. The final v02 harbor logo with gaming containers is now explicitly approved under ADR-0006. Application redesign remains outside this documentation task.

## Change rule

- Small clarifications that do not alter intent may update a canonical foundation directly.
- A material change to scope, hierarchy, metrics, source policy, stack, accessibility target, or visual direction requires a new ADR.
- ADRs are append-only historical records. Superseded ADRs remain in the repository and link to their replacement.
- New canonical documents must be registered here in the same commit.
- Research notes are not canonical unless promoted through this registry.

## Current delivery state

- M0 product and data foundations: complete.
- M1 application foundation: fixture-backed visual slice implemented; visual and accessibility acceptance pending.
- Current slice: homepage, keyboard search, game overview, initial schemas and explicit unconnected-data states. See [visual-review-v1.md](visual-review-v1.md) for review routes and limitations (noncanonical delivery note).
- Provider integration, authentication, pricing, price history, and global rankings: not implemented.
