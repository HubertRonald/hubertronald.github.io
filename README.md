# hubertronald.dev

<p align="left">
    <a href="https://nodejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js 20.x" />
    </a>
    <a href="https://www.npmjs.com/" target="_blank">
        <img src="https://img.shields.io/badge/npm-package%20scripts-CB3837?style=flat-square&logo=npm&logoColor=white" alt="npm scripts" />
    </a>
    <a href="https://vitepress.dev/" target="_blank">
        <img src="https://img.shields.io/badge/VitePress-documentation-646CFF?style=flat-square&logo=vite&logoColor=white" alt="VitePress" />
    </a>
    <a href="https://pages.github.com/" target="_blank">
        <img src="https://img.shields.io/badge/GitHub%20Pages-hosting-222222?style=flat-square&logo=github&logoColor=white" alt="GitHub Pages" />
    </a>
    <a href="https://github.com/features/actions" target="_blank">
        <img src="https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="GitHub Actions" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="https://img.shields.io/badge/JavaScript-tooling-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
        <img src="https://img.shields.io/badge/HTML5-static%20sites-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">
        <img src="https://img.shields.io/badge/CSS3-styling-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    </a>
    <a href="https://www.markdownguide.org/" target="_blank">
        <img src="https://img.shields.io/badge/Markdown-content-000000?style=flat-square&logo=markdown&logoColor=white" alt="Markdown" />
    </a>
</p>

Source repository for the public technical portfolio and documentation hub of **Hubert Ronald**.

**Data & Cloud Architect · Data/ML Platform Engineer · AI-native Builder**

> I build evidence systems that turn complexity into clarity and action.

Live site:

<https://hubertronald.dev/>

---

## What this site contains

- English and Spanish landing pages.
- **Project Atlas**, a curated map of projects, repositories and technical artifacts.
- **Builder Journey**, connecting creative software roots with data, cloud and AI-native engineering.
- Case studies and historical archive material.
- A canonical **Technical Docs** hub for selected projects and technical field guides.
- A standalone bridge to **Liasoft**, the creative archive at `liasoft.hubertronald.dev`.

Current Technical Docs publications:

- VersoVector
- LuaSF
- GradientMesh
- RelationalStats
- RetainAI
- FDE Roadmap

---

## Public URL model

```text
https://hubertronald.dev/
  Main landing page

https://hubertronald.dev/es/
  Spanish landing page

https://hubertronald.dev/projects/
  Project Atlas / Work

https://hubertronald.dev/journey/
  Builder Journey

https://hubertronald.dev/case-studies/
  Case-study index

https://hubertronald.dev/archive/
  Historical archive

https://hubertronald.dev/technical-docs/
  Canonical Technical Docs hub

https://hubertronald.dev/technical-docs/versovector/
  VersoVector documentation

https://hubertronald.dev/technical-docs/luasf/
  LuaSF documentation

https://hubertronald.dev/technical-docs/gradientmesh/
  GradientMesh documentation

https://hubertronald.dev/technical-docs/relationalstats/
  RelationalStats documentation

https://hubertronald.dev/technical-docs/retainai/
  RetainAI documentation

https://hubertronald.dev/technical-docs/fde-roadmap/
  Forward-deployed engineering field guide

https://liasoft.hubertronald.dev/
  Standalone Liasoft creative archive
```

The following root-level project routes remain as compatibility surfaces and are **not** the canonical documentation roots:

```text
/versovector/
/luasf/
/gradientmesh/
/relationalstats/
/retainai/
```

New documentation should use the canonical `/technical-docs/...` namespace.

---

## Repository structure

```text
.
├── docs/
│   ├── index.md
│   ├── es/
│   ├── projects/
│   ├── journey/
│   ├── case-studies/
│   ├── archive/
│   ├── technical-docs/
│   │   ├── index.md
│   │   ├── versovector/
│   │   ├── luasf/
│   │   ├── gradientmesh/
│   │   ├── relationalstats/
│   │   ├── retainai/
│   │   └── fde-roadmap/
│   ├── versovector/          # compatibility route
│   ├── luasf/                # compatibility route
│   ├── gradientmesh/         # compatibility route
│   ├── relationalstats/      # compatibility route
│   ├── retainai/             # compatibility route
│   ├── public/
│   │   ├── icons/
│   │   └── images/
│   │       └── profile/
│   └── .vitepress/
│       ├── config.mts
│       └── theme/
│
├── static-sites/
│   ├── liasoft/
│   └── root-under-construction/
│
├── legacy/
│   └── under-construction-template/
│
├── scripts/
│   ├── audit/
│   ├── technical-docs/
│   └── copy-static-sites.mjs
│
├── technical_docs_source_locks/
│   ├── README.md
│   └── fde-roadmap.json
├── technical_docs_source_lock.schema.json
├── technical_docs_source_registry.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
├── package-lock.json
├── .nvmrc
└── README.md
```

---

## Architecture

The main site is built with **VitePress**.

The public landing experience uses custom Vue components and a dedicated editorial visual system, while Technical Docs retain documentation-oriented navigation, sidebar and content behavior.

### Landing

```text
docs/index.md
  -> /

docs/es/index.md
  -> /es/
```

Both landing routes share the same component system with language-specific content.

### Technical Docs

Canonical documentation lives under:

```text
docs/technical-docs/
  -> /technical-docs/
```

The current publication set is:

```text
/technical-docs/versovector/
/technical-docs/luasf/
/technical-docs/gradientmesh/
/technical-docs/relationalstats/
/technical-docs/retainai/
/technical-docs/fde-roadmap/
```

Technical Docs lifecycle and provenance are governed by:

```text
technical_docs_source_registry.json
technical_docs_source_lock.schema.json
technical_docs_source_locks/
scripts/technical-docs/
```

The registry defines publication and source behavior. Provenance locks are materialized only where required by the registered source policy.

### Compatibility routes

The older project roots remain only for compatibility:

```text
/versovector/
/luasf/
/gradientmesh/
/relationalstats/
/retainai/
```

They must not become the canonical source of future documentation.

### Static sites

`npm run docs:build` builds VitePress and then runs the static-copy stage.

Current intentional static sources include:

```text
static-sites/liasoft/
static-sites/root-under-construction/
```

Heavy local application exports under:

```text
static-apps/liasoft/games/
```

are intentionally kept outside Git.

---

## Liasoft

Liasoft is maintained as a standalone creative archive:

<https://liasoft.hubertronald.dev/>

The main portfolio links to it externally.

`static-sites/liasoft/` provides only the lightweight bridge used by this repository and should not be treated as the canonical Liasoft application source.

---

## Historical under-construction source

The original under-construction material is intentionally separated from the active landing.

Current retained sources are:

```text
static-sites/root-under-construction/
legacy/under-construction-template/
```

The root `/` must remain the active portfolio landing and must not be overwritten by the historical template.

---

## Local development

Node.js is defined by the repository `.nvmrc`.

```bash
nvm use
npm ci
```

Run the development server:

```bash
npm run docs:dev
```

---

## Build

Build VitePress and copy intentional static sites into the generated output:

```bash
npm run docs:build
```

`docs:build` already includes the static-copy stage:

```text
vitepress build docs
  -> npm run static:copy
```

Generated output lives under:

```text
docs/.vitepress/dist/
```

and must not be committed.

---

## Validation

Run the landing quality gate:

```bash
python3 scripts/audit/landing-quality-check.py
```

Run the current Technical Docs integration gate after building:

```bash
npm run technical-docs:validate-rtd6 -- --require-build
```

Check patch whitespace and malformed diff output:

```bash
git diff --check
```

A release candidate should pass all three checks after a clean build.

---

## Clean local preview

When changing assets, navigation, static bridges or generated documentation, rebuild from a clean output directory:

```bash
rm -rf docs/.vitepress/dist
rm -rf docs/.vitepress/cache

npm run docs:build
npm run docs:preview
```

If an updated asset still appears stale in the browser, perform a hard refresh:

```text
macOS: Cmd + Shift + R
Windows/Linux: Ctrl + Shift + R
```

---

## Deployment

Deployment is handled by:

```text
.github/workflows/deploy.yml
```

The workflow uses the Node.js version declared by `.nvmrc`.

For pull requests and pushes targeting `master`, relevant source changes trigger validation. The workflow:

```text
checkout
  ↓
Node from .nvmrc
  ↓
npm ci
  ↓
npm run docs:build
  ↓
generated-output checks
  ↓
landing-quality-check.py
  ↓
technical-docs:validate-rtd6 -- --require-build
```

A normal push does **not** deploy the site automatically.

GitHub Pages deployment remains an explicit manual action through `workflow_dispatch`.

Validation-only run:

```text
Actions
  -> Validate and Deploy Site
  -> Run workflow
  -> deploy: false
```

Validated deployment:

```text
Actions
  -> Validate and Deploy Site
  -> Run workflow
  -> deploy: true
```

The deployment artifact is:

```text
docs/.vitepress/dist/
```

---

## Repository safety rules

Do not commit generated VitePress output:

```text
docs/.vitepress/dist/
docs/.vitepress/cache/
```

Do not commit dependencies:

```text
node_modules/
```

Do not reintroduce the historical under-construction page as `/`.

Do not move canonical Technical Docs back to root-level project routes.

Do not modify Technical Docs provenance declarations without validating the registry and applicable locks.

Do not create a local `/kaggle/` route; Kaggle remains an external profile link.

Do not treat Liasoft as part of the RetainAI product identity.

Do not commit heavyweight local game exports under `static-apps/liasoft/games/`.

Do not use destructive deployment commands that overwrite the source branch with generated output.

---

## Legacy deployment note

This repository previously used direct `ghp-import` deployment:

```bash
ghp-import -n -p -f _build/html -b master
git config --global http.postBuffer 524288000
```

That process is retained only as historical context.

The current model keeps source code in Git and publishes the generated `docs/.vitepress/dist/` artifact through GitHub Actions and GitHub Pages.

---

## Related projects

- [RetainAI](https://github.com/HubertRonald/RetainAI)
- [VersoVector](https://github.com/HubertRonald/VersoVector)
- [RelationalStats](https://github.com/HubertRonald/relationalstats)
- [LuaSF](https://github.com/HubertRonald/LuaSF)
- [GradientMesh](https://github.com/HubertRonald/GradientMesh)
- [Liasoft](https://liasoft.hubertronald.dev/)

---

## Author

**Hubert Ronald**

GitHub: [HubertRonald](https://github.com/HubertRonald)

---

## License

This repository uses the MIT License for the source code of the GitHub Pages site, unless otherwise noted.

Project names, personal branding, written content, logos, screenshots, third-party assets, datasets, external project documentation and generated artifacts may be subject to separate rights or licenses unless explicitly stated otherwise.

See [LICENSE](./LICENSE) for details.
