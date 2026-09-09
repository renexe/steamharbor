# ADR-0001: Application stack

- Status: Accepted
- Date: 2026-09-09

## Context

SteamHarbor needs indexable game pages, fast server-rendered first views, interactive search and charts, server-only provider credentials, route-level loading/error isolation, and a shared TypeScript model.

## Decision

Use Next.js 16 App Router with React 19.2 and strict TypeScript. Prefer Server Components for page composition and data reads; use Client Components only for interaction. Use route handlers/server modules for provider boundaries. Use plain token-driven CSS initially, Zod at untrusted data boundaries, ESLint, TypeScript checks, and Vitest.

Do not introduce a global client state library, component framework, chart library, ORM, or database before a measured need. Do not enable experimental framework features by default.

## Consequences

- The product can combine SEO-friendly pages and secure server integrations in one deployable application.
- Interactive bundles remain deliberate and small.
- Hosting remains portable to any supported Node.js runtime.
- Provider ingestion and long-term time-series storage will require a separate decision once operational requirements are proven.

## References

- https://nextjs.org/blog/next-16-3-ai-improvements
- https://nextjs.org/blog/next-16
- https://react.dev/blog/2025/10/01/react-19-2
