---
title: Landing V1 Audit
description: Repository audit before implementing the Hubert Ronald landing page.
---

# Landing V1 Audit

This document records the repository state before implementing the first full landing page for `hubertronald.dev`.

The goal of this audit is to avoid replacing existing configuration blindly and to preserve the current documentation routes while preparing the landing V1.

## Scope

The landing V1 will be implemented inside the existing VitePress repository.

It must not break:

- `/gradientmesh/`
- `/relationalstats/`
- `/retainai/`
- `/versovector/`
- `/luasf/`

## Repository structure to inspect

The audit should review:

- `package.json`
- `docs/index.md`
- `docs/.vitepress/config.mts`
- `docs/.vitepress/theme/index.ts`
- `docs/.vitepress/theme/custom.css`
- `docs/`
- `scripts/copy-static-sites.mjs`
- `.github/workflows/`
- `static-sites/root-under-construction/`

## Current static root

`static-sites/root-under-construction/` should be preserved as the original under-construction version of the site.

It should not be deleted as part of the landing V1 work. If the new landing replaces it, the old page should be treated as a small historical archive.

## Liasoft status

Liasoft has moved to a standalone site:

<https://liasoft.hubertronald.dev/>

The main portfolio should link to Liasoft as an external creative archive rather than serving the old embedded `/liasoft/` site as the main source.

## Audit checklist

- [x] Confirm current package scripts.
- [x] Confirm VitePress build command.
- [x] Confirm whether `static:copy` runs after VitxPress build.
- [x] Confirm whether `root-under-construction` still ovexrides `/`.
- [x] Confirm current VitePress config.
- [x] Confirm current theme registration.
- [x] Confirm current CSS structure.
- [x] Confirm existing project docs routes.
- [x] Confirm current GitHub Pages workflow.
- [x] Run build successfully before implementing changes.

## Build result

Record the result here after running:

```bash
npm run docs:build
```

Result:

```text
TODO
```

## Notes

Add findings from the audit here before starting implementation.

