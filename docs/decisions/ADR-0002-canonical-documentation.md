# ADR-0002: Canonical documentation governance

- Status: Accepted
- Date: 2026-09-09

## Context

Multiple agents will work on SteamHarbor. Unindexed documents and implicit decisions create drift and make stale ideas appear authoritative.

## Decision

Use `docs/README.md` as the canonical registry. Product and data foundations describe current truth. Material changes require append-only Architecture Decision Records in `docs/decisions/`. Every new canonical source must be registered with status and review date.

The precedence order is: superseding accepted ADR, registered canonical foundation, tested implementation for unspecified behavior, then proposals and external references.

## Consequences

Agents have one required starting point, decision history remains auditable, and implementation cannot silently redefine product canon.
