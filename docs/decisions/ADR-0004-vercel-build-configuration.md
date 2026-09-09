# ADR-0004 — Vercel build configuration

Status: Accepted · 2026-09-09

## Context

The owner is deploying through Vercel. The reported pipeline completes the build and then fails with `No Output Directory named "public" found`. The repository uses `next build`, has no static export or custom `distDir`, and previously had no Vercel configuration. The error indicates a mismatch between the deployment's expected output and the Next.js application; dashboard settings were not inspected.

## Decision

Keep `vercel.json` at the repository root with `framework: "nextjs"`, `buildCommand: "npm run build"`, and `outputDirectory: ".next"`. Explicit values override the corresponding Vercel dashboard settings, including an inherited `public` output override. The Next.js preset must remain enabled so Vercel handles framework routes and server functionality.

This implements the existing stack for the owner's selected host; it does not change application architecture or authorize agents to merge or publish. Do not create an empty `public` directory to silence this error, copy build artifacts into it, or enable static export as a workaround. If `distDir` changes later, update this configuration in the same PR.

## Deployment handoff

Merge the fix and deploy that new commit; retrying an old failed deployment will not include it. Vercel Root Directory must be the repository root where `package.json` and `vercel.json` live. No environment secrets are needed for the current fixture preview. Confirm the resulting deployment serves `/` and `/games/730`.

A successful local `next build` confirms `.next` is generated, but is not proof of a successful Vercel deployment. The actual pipeline remains the final verification gate.

## Sources

- [Vercel framework override](https://vercel.com/docs/project-configuration/vercel-json#framework)
- [Vercel output directory override](https://vercel.com/docs/project-configuration/vercel-json#outputdirectory)
- Next.js bundled documentation: `01-app/03-api-reference/05-config/01-next-config-js/distDir.md`.
