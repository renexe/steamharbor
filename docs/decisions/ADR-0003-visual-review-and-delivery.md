# ADR-0003 — Reviewable visual increments and honest preview data

Status: Accepted · 2026-09-09

## Decision

Following the owner's instruction, deliver subsequent visual changes on a feature branch and open a PR against `main`. The owner approves the merge and builds/publishes the domain. Agents must not merge, push changes directly to `main`, or deploy without a new explicit request.

The current visual increment is a fixture-backed design preview, not a completed production MVP. Every page must disclose this. Disable indexing until a separate production-readiness decision. No decorative chart may be presented as historical evidence, no unavailable metric may silently become zero, and every navigation target must contain meaningful content.

Register component rules in `docs/design-system.md`. These rules implement the existing product direction; exact appearance remains subject to owner review. A merged preview does not establish provider validity or certify accessibility.

## Consequences

- Retain the existing Next.js stack; no new scaffold or hosting choice.
- Remove the invented release assigned a real-looking AppID; release discovery has an explicit not-connected state until verified catalog records exist.
- Preserve Charts, Deals, Releases and Updates as discoverable destinations, while clearly stating which lack integrations.
- Validate code with lint, typecheck, tests and production build. Track visual, device and assistive-technology review separately; never report them as completed from a successful build alone.
- Current fixture schema/evidence timestamps are test inputs, not proof of observation or the final provider contract. Data foundation remains authoritative.
