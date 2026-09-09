# ADR-0006 — Definitive illustrated harbor brand

Status: Accepted for the owner's explicit visual decision and requested documentation · 2026-09-09.

## Context and evidence

After rejecting A/B/C, the owner approved a lighthouse/controller as historical v01, then requested an illustrated harbor pivot. The owner liked the harbor world, requested a logo and future theme based on it, and replaced the small house with shipping containers bearing controller marks. The final message states: “ficou ótimo, vamos manter essa como definitiva.” It then requests professional branding and brand-guide documentation canonized in the repository.

## Decision

The definitive visual identity is the illustrated open harbor, steam tugboat and two gaming-marked containers shown in `docs/brand/approved/v02/steamharbor-v02-approved-board.png`. Preserve this exact binary and the lettering shown; its SHA-256 and dimensions are in `docs/brand/assets-manifest.json`. The large main composition governs geometry; smaller presentations require reconciliation in production. The approval-state footer printed on the board is historical, not the current approval state.

The v01 controller/lighthouse remains historically approved but superseded. Initial A/B/C were rejected. The house-bearing detailed harbor illustration is a theme reference only, not an alternate logo. No logo regeneration, replacement or silent simplification is authorized.

Register `branding.md` and `brand-guide.md` as official documentation. Their distinction between explicit approval, preservation rules and initial technical specifications is binding: new HEX values, type families, size thresholds and animation timings are authored specifications, not individually owner-approved visual proofs. Editable vectors, transparent exports and favicon remain pending production. No approval of a PNG board establishes pixel equivalence of generated variants or a font license.

## Supersession

This ADR advances ADR-0005 beyond its final-logo gate and replaces the pending-logo state. It supersedes the exact visual direction in product-foundation section 9 and design-system's previous colors/typography as the target identity. In particular, the earlier prohibition on literal harbor imagery is superseded for brand artwork by the owner's explicit harbor pivot. Clarity, independence, accessible interaction, useful data visualization and the existing data policy remain canonical. The current CSS remains an implementation baseline awaiting separate migration, not the brand authority.

## Delivery

Documentation and approved reference files only. Feature-branch PR to main; no merge, deployment, component/style edits or new UI implementation. This definitive documentation supersedes the pending-direction exploration PR #3. After owner merge, main becomes the durable shared entry point; before merge, the delivery branch contains the updated canon.
