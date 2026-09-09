# ADR-0005 — Brand exploration and explicit approval gates

Status: Accepted for scope and governance by explicit owner instruction, 2026-09-09. No visual proposal accepted.

## Context

The owner accepted the first product version as a starting point and explicitly clarified that its SH monogram, colors and typography are not an approved brand. The owner requests brand strategy and three logo directions before any future UI redesign.

## Decision

Record brand work under docs/brand and distinguish proposals from approved decisions and pending work. Existing visual foundations in product-foundation section 9 and design-system remain the implementation baseline only; their exact colors, typography and SH implementation are not approved brand assets. This clarification supersedes any interpretation of those documents as final identity approval. Product principles, data policy and accessibility goals remain in force.

Follow these gates: foundations and three directions → owner chooses one direction → refine only that direction → owner explicitly approves exact final logo → develop the brand system and future UI application plan. Direction selection is not final logo approval. No new visual direction, palette or typeface is accepted by this ADR.

Version exact approved files and record paths, versions, hashes and approval scope. Preserve previous records; do not overwrite approved binaries. No application components, styles or layouts change during this task. Deliver through a feature-branch PR. No merge or domain deployment is authorized.

## Consequences

Future agents enter through docs/README.md and docs/brand/README.md. PNG concept boards are review material, not official vector masters. A documentation merge does not substitute for explicit visual approval. A later ADR must record the final approved visual direction and any material changes to the previous implementation baseline.
