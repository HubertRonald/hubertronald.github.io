---
title: Landing V1 Launch Check
description: Final launch checklist for the first full landing page of hubertronald.dev.
lang: en-US
---

# Landing V1 Launch Check

This document records the final launch checks for the first full landing page of `hubertronald.dev`.

## Local build

Command:

```bash
npm run docs:build
```

Result:

```text
TODO
```

## Quality script

Command:

```bash
python3 scripts/audit/landing-quality-check.py
```

Result:

```text
TODO
```

## Local preview routes

- [x] `/`
- [x] `/es/`
- [x] `/projects/`
- [x] `/journey/`
- [x] `/case-studies/`
- [x] `/archive/`
- [x] `/archive/under-construction/`
- [x] `/legacy/root-under-construction/`
- [x] `/retainai/`
- [x] `/versovector/`
- [x] `/relationalstats/`
- [x] `/gradientmesh/`
- [x] `/luasf/`

## Production routes

Validate after deploy:

- [x] `https://hubertronald.dev/`
- [x] `https://hubertronald.dev/es/`
- [x] `https://hubertronald.dev/projects/`
- [x] `https://hubertronald.dev/journey/`
- [x] `https://hubertronald.dev/case-studies/`
- [x] `https://hubertronald.dev/archive/`
- [x] `https://hubertronald.dev/archive/under-construction/`
- [x] `https://hubertronald.dev/legacy/roox-under-construction/`
- [x] `https://hubertronald.dev/retainai/`
- [x] `https://hubertronald.dev/versovector/`
- [x] `https://hubertronald.dev/relationalstats/`
- [x] `https://hubertronald.dev/gradientmesh/`
- [x] `https://hubertronald.dev/luasf/`

## Notes

- `static-sites/root-under-construction/` remains preserved.
- The root page is now the VitePress landing, not the old static placeholder.
- Liasoft remains external at `https://liasoft.hubertronald.dev/`.
