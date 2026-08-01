# hubertronald.dev

<p align="left">
    <a href="https://nodejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/Node.js-20.x%20local%20%2F%2024.x%20CI-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js 20.x local / 24.x CI" />
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

Live site:

<https://hubertronald.dev/>

---

## What this site contains

- Landing page in English and Spanish.
- Project Atlas.
- Builder Journey.
- Case-study index.
- Historical archive.
- Technical documentation for selected projects:
  - RetainAI
  - VersoVector
  - RelationalStats
  - GradientMesh
  - LuaSF

---

## Target URL structure

```text
https://hubertronald.dev/
  Main landing page in English

https://hubertronald.dev/es/
  Spanish landing page

https://hubertronald.dev/projects/
  Project Atlas: curated map of projects, repositories and technical artifacts

https://hubertronald.dev/journey/
  Builder Journey: narrative path from creative software to AI-native platforms

https://hubertronald.dev/case-studies/
  Case-study index for deeper technical writeups

https://hubertronald.dev/archive/
  Historical archive for creative roots, older artifacts and site history

https://hubertronald.dev/archive/under-construction/
  Archive note for the original under-construction root page

https://hubertronald.dev/legacy/root-under-construction/
  Preserved static snapshot of the original under-construction page

https://hubertronald.dev/retainai/
  RetainAI public documentation

https://hubertronald.dev/versovector/
  VersoVector public documentation

https://hubertronald.dev/relationalstats/
  RelationalStats public documentation

https://hubertronald.dev/gradientmesh/
  GradientMesh creative-coding documentation

https://hubertronald.dev/luasf/
  LuaSF technical documentation

https://liasoft.hubertronald.dev/
  Standalone Liasoft creative archive for indie games and experiments
```

Liasoft is no longer maintained as the main source under `/liasoft/` in this repository. If `/liasoft/` exists in the generated site, it should behave only as a lightweight bridge to:

```text
https://liasoft.hubertronald.dev/
```

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
│   ├── retainai/
│   ├── versovector/
│   ├── relationalstats/
│   ├── gradientmesh/
│   ├── luasf/
│   ├── public/
│   │   ├── icons/
│   │   │   ├── common/
│   │   │   ├── gradientmesh/
│   │   │   ├── luasf/
│   │   │   ├── relationalstats/
│   │   │   ├── retainai/
│   │   │   ├── social/
│   │   │   └── versovector/
│   │   ├── images/
│   │   │   └── profile/
│   │   └── legacy/
│   │       └── root-under-construction/
│   └── .vitepress/
│       ├── config.mts
│       └── theme/
│
├── static-sites/
│   ├── liasoft/
│   └── root-under-construction/
│
├── legacy/
│
├── scripts/
│   ├── copy-static-sites.mjs
│   └── audit/
│
├── package.json
├── package-lock.json
├── .nvmrc
└── README.md
```

---

## Architecture

The site is built with **VitePress**.

The landing uses a custom Vue component with `layout: false`, while technical documentation keeps the default VitePress documentation experience.

```text
docs/
├── index.md
├── es/
├── projects/
├── journey/
├── case-studies/
├── archive/
├── retainai/
├── versovector/
├── relationalstats/
├── gradientmesh/
├── luasf/
└── .vitepress/
```

### Landing pages

The root landing pages are VitePress pages with custom Vue rendering:

```text
docs/index.md
  -> /

docs/es/index.md
  -> /es/
```

Both pages use the same landing component system and language-specific content files.

### Documentation sections

The technical documentation sections keep the default VitePress layout, navigation, sidebar and search behavior.

Current documentation sections:

```text
/retainai/
/versovector/
/relationalstats/
/gradientmesh/
/luasf/
```

### Static bridge

The static copy script may keep a lightweight bridge for older static paths, such as:

```text
static-sites/liasoft/
  -> docs/.vitepress/dist/liasoft/
```

This bridge should not be treated as the canonical Liasoft site. The canonical Liasoft archive is:

```text
https://liasoft.hubertronald.dev/
```

### Historical root

The original under-construction page is preserved as part of the archive:

- Source: `static-sites/root-under-construction/`
- Preserved snapshot: `/legacy/root-under-construction/`
- Archive note: `/archive/under-construction/`

The under-construction page should not overwrite `/` anymore.

---

## Liasoft

Liasoft is now maintained as a standalone creative archive:

<https://liasoft.hubertronald.dev/>

The main site links to Liasoft externally.

Liasoft represents the creative origin layer of this portfolio: indie games, mobile experiments, visual software, browser-friendly builds and old playful technical ideas.

---

## Local development

The local Node.js version is defined by `.nvmrc`.

```bash
nvm use
```

Install dependencies:

```bash
npm ci
```

Run the VitePress development server:

```bash
npm run docs:dev
```

---

## Build

Build the VitePress site and copy intentional static bridges into the generated output:

```bash
npm run docs:build
```

---

## Preview

Preview the built site:

```bash
npm run docs:preview
```

---

## Quality check

Run the landing and launch quality script after building:

```bash
python3 scripts/audit/landing-quality-check.py
```

---

## Clean local preview build

When updating static assets such as icons, images or bridge files, the browser may keep cached versions of files that use the same URL.

To force a clean local build:

```bash
rm -rf docs/.vitepress/dist
rm -rf docs/.vitepress/cache

npm run docs:build
npm run docs:preview
```

If the updated assets still do not appear in the browser, perform a hard refresh:

```text
macOS: Cmd + Shift + R
Windows/Linux: Ctrl + Shift + R
```

This is especially useful after replacing SVG icons under:

```text
docs/public/icons/
```

or profile images under:

```text
docs/public/images/profile/
```

---

## Deployment

The recommended deployment flow uses GitHub Actions.

The workflow validates the site by:

1. installing dependencies;
2. building the VitePress site;
3. copying intentional static bridges;
4. validating the generated output;
5. optionally deploying to GitHub Pages.

Manual deployment should be triggered from GitHub Actions using the deploy input.

Recommended validation flow:

```text
Actions -> Validate and Deploy Site -> Run workflow
deploy: false
```

If validation passes:

```text
Actions -> Validate and Deploy Site -> Run workflow
deploy: true
```

The deployment target is GitHub Pages.

---

## Important safety rules

Do not commit generated VitePress output:

```text
docs/.vitepress/dist/
docs/.vitepress/cache/
```

Do not commit dependencies:

```text
node_modules/
```

Do not reintroduce the original under-construction page as the root page.

Do not use `static-sites/root-under-construction/` to overwrite `/`.

Do not move existing documentation directories without validating routes.

Do not create a local `/kaggle/` route. Kaggle remains an external profile link.

Do not treat Liasoft as RetainAI or as part of the RetainAI product identity.

Do not place heavy static game builds inside VitePress Markdown folders.

Do not delete legacy folders until replacements and redirects are confirmed.

Do not use destructive deployment commands that overwrite the source branch with generated output.

---

## Legacy deployment note

This repository previously used `ghp-import` directly:

```bash
ghp-import -n -p -f _build/html -b master
git config --global http.postBuffer 524288000
```

That approach is now considered legacy for this repository because the source branch should remain source-controlled.

The preferred approach is to keep source files in the production branch and let GitHub Actions deploy only the generated output from:

```text
docs/.vitepress/dist/
```

This avoids overwriting source folders such as:

```text
docs/
static-sites/
legacy/
scripts/
```

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
