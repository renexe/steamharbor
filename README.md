# SteamHarbor

SteamHarbor is an independent, accessible platform for exploring Steam game data. It is not affiliated with Valve or Steam.

## Start here

Read the [canonical documentation index](docs/README.md) before changing product direction, data contracts, architecture, or visual foundations.

## Local development

Requires Node.js 24 LTS and npm 11.

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

The current vertical slice uses deterministic fixtures. External Steam providers are intentionally not connected yet.
