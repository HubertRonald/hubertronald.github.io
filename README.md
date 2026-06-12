# GitHub Pages

<p align="left">
    <a href="https://nodejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js 24.x" />
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
    <a href="https://itch.io/" target="_blank">
        <img src="https://img.shields.io/badge/itch.io-indie%20games-FA5C5C?style=flat-square&logo=itchdotio&logoColor=white" alt="itch.io" />
    </a>
</p>

This repository powers the personal GitHub Pages site for **Hubert Ronald**.

Public site:

```text
https://hubertronald.github.io/
```

The site is designed as a hybrid portfolio and documentation hub. It combines:

* a personal technical landing page;
* VitePress-based documentation sections;
* standalone static websites;
* static game/app builds;
* legacy archived content.

---

## Target URL structure

```text
https://hubertronald.github.io/
  Personal hub / technical portfolio / landing page

https://hubertronald.github.io/luasf/
  LuaSF technical documentation

https://hubertronald.github.io/versovector/
  VersoVector product and technical documentation

https://hubertronald.github.io/liasoft/
  LiaSoft standalone static website for indie games, apps, demos, itch.io, and Google Play links

https://hubertronald.github.io/liasoft/games/SuperWariBrosWebPlayer/
  Static browser game build
```

---

## Repository structure

```text
.
├── docs/
│   ├── index.md
│   ├── luasf/
│   ├── versovector/
│   └── .vitepress/
│
├── static-sites/
│   ├── liasoft/
│   └── root-under-construction/
│
├── static-apps/
│   └── liasoft/
│       └── games/
│
├── legacy/
│   ├── EdaSalary/
│   ├── MyPage/
│   ├── SuperWariBrosWebPlayer/
│   └── under-construction-template/
│
├── scripts/
│   └── copy-static-sites.mjs
│
├── package.json
├── package-lock.json
├── .nvmrc
└── README.md
```

---

## Architecture

This repository intentionally uses a hybrid architecture.

### VitePress-managed sections

VitePress owns the root documentation and portfolio shell:

```text
/
 /luasf/
 /versovector/
```

These sections are built from Markdown and VitePress configuration.

### Standalone static sites

LiaSoft is not treated as documentation.

It is a standalone HTML/CSS/JavaScript website copied into the final deployment output:

```text
static-sites/liasoft/
  -> docs/.vitepress/dist/liasoft/
```

### Static apps and games

Static games and app builds are copied into the final deployment output without being converted to Markdown:

```text
static-apps/liasoft/games/SuperWariBrosWebPlayer/
  -> docs/.vitepress/dist/liasoft/games/SuperWariBrosWebPlayer/
```

### Legacy archive

Older projects and historical static folders are preserved under:

```text
legacy/
```

These files are kept for reference and migration safety.

---

## Local development

Install dependencies:

```bash
npm ci
```

Run the VitePress development server:

```bash
npm run docs:dev
```

Build the VitePress site:

```bash
npm run docs:build
```

Copy standalone static sites and apps into the generated output:

```bash
node scripts/copy-static-sites.mjs
```

Preview the built site:

```bash
npm run docs:preview
```

---

## Deployment

The recommended deployment flow uses GitHub Actions.

The workflow validates the site by:

1. installing dependencies;
2. building the VitePress site;
3. copying standalone static sites and apps;
4. validating the generated output;
5. optionally deploying to GitHub Pages.

Manual deployment should be triggered from GitHub Actions using the deploy input.

Recommended flow:

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

## Legacy deployment note

This repository previously used `ghp-import` directly:

```bash
ghp-import -n -p -f _build/html -b master
git config --global http.postBuffer 524288000
```

That approach is now considered legacy for this repository because `master` is used as the source branch.

The preferred approach is to keep source files in `master` and let GitHub Actions deploy only the generated output from:

```text
docs/.vitepress/dist/
```

This avoids overwriting source folders such as:

```text
docs/
static-sites/
static-apps/
legacy/
scripts/
```

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

Do not convert LiaSoft into Markdown documentation.

Do not place static game builds inside VitePress Markdown folders.

Do not delete legacy folders until replacements and redirects are confirmed.

Do not use destructive deployment commands that overwrite the source branch with generated output.

---

## Future custom domain strategy

The site may later move from:

```text
https://hubertronald.github.io/
```

to:

```text
https://hubertronald.dev/
```

Potential future structure:

```text
https://hubertronald.dev/
https://hubertronald.dev/luasf/
https://hubertronald.dev/versovector/
https://hubertronald.dev/liasoft/
```

Product-specific subdomains may be used later when a project grows enough to justify an independent identity:

```text
https://versovector.hubertronald.dev/
https://api.versovector.hubertronald.dev/
https://liasoft.hubertronald.dev/
```

---

## Related projects

* [LuaSF](https://github.com/HubertRonald/LuaSF)
* [VersoVector](https://github.com/HubertRonald/VersoVector)
* [LiaSoft on itch.io](https://github.com/HubertRonald/liasoft)

---

## Author

**Hubert Ronald**

GitHub: [HubertRonald](https://github.com/HubertRonald)
