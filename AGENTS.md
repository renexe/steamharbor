# SteamHarbor agent entry point

Before changing product behavior, UX, data contracts, architecture, or visual foundations, read `docs/README.md` and every canonical source it routes to for the area being changed.

Do not treat external references, research notes, fixture values, or undocumented implementation details as canon. Material changes require an ADR and an update to the canonical registry in the same commit.

Current provider integrations are intentionally mocked. Never add SteamDB scraping or expose a Steam API key to client code.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
