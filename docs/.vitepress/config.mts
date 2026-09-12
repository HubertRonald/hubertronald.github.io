import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const siteUrl = 'https://hubertronald.dev'
const defaultOgImage = `${siteUrl}/icons/common/home.svg`

function normalizePagePath(page: string): string {
  if (page === 'index.md') return '/'

  const withoutIndex = page
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')

  return `/${withoutIndex}/`.replace(/\/+/g, '/')
}

function canonicalPathForPage(page: string): string {
  const normalized = normalizePagePath(page)

  if (normalized.startsWith('/versovector/')) {
    return normalized.replace('/versovector/', '/technical-docs/versovector/')
  }

  if (normalized.startsWith('/luasf/')) {
    return normalized.replace('/luasf/', '/technical-docs/luasf/')
  }

  if (normalized.startsWith('/gradientmesh/')) {
    return normalized.replace('/gradientmesh/', '/technical-docs/gradientmesh/')
  }

  if (normalized.startsWith('/relationalstats/')) {
    return normalized.replace('/relationalstats/', '/technical-docs/relationalstats/')
  }

  if (normalized.startsWith('/retainai/')) {
    return normalized.replace('/retainai/', '/technical-docs/retainai/')
  }

  return normalized
}

function canonicalUrlForPage(page: string): string {
  return new URL(canonicalPathForPage(page), siteUrl).href
}

function localeForPage(page: string): string {
  return page === 'es/index.md' || page.startsWith('es/')
    ? 'es_CO'
    : 'en_US'
}

export default withMermaid(
  defineConfig({
    title: 'Hubert Ronald',
    description: 'Evidence systems across data, cloud, ML and AI-native products.',

    // User/organization GitHub Pages site:
    // https://hubertronald.github.io/
    // Keep base as "/" because this is not a project subpath like /repo-name/.
    base: '/',

    cleanUrls: true,
    lastUpdated: true,

    markdown: {
      math: true
    },


    head: [
      ['meta', { name: 'theme-color', content: '#111827' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: 'Hubert Ronald | Technical Portfolio' }],
      [
        'meta',
        {
          property: 'og:description',
          content: 'Data, cloud, AI, NLP, documentation, and creative software engineering portfolio.'
        }
      ]
    ],

    themeConfig: {
      logo: {
        src: '/icons/common/home.svg',
        alt: 'Hubert Ronald'
      },
      /* 
      nav: [
        { text: 'RetainAI', link: '/technical-docs/retainai/' },
        { text: 'RelationalStats', link: '/technical-docs/relationalstats/' },
        { text: 'GradientMesh', link: '/technical-docs/gradientmesh/' },
        { text: 'VersoVector', link: '/technical-docs/versovector/' },
        { text: 'LuaSF', link: '/technical-docs/luasf/' }
      ],
      */
      nav: [
        { text: 'Work', link: '/projects/', activeMatch: '^/projects(/|$)' },
        { text: 'Journey', link: '/journey/', activeMatch: '^/journey(/|$)' },
        {
          text: 'Docs',
          link: '/technical-docs/',
          activeMatch: '^/(technical-docs|retainai|versovector|relationalstats|gradientmesh|luasf)(/|$)'
        }
      ],

      sidebar: {
        '/technical-docs/retainai/': [
          {
            text: 'RetainAI',
            items: [
              { text: 'Overview', link: '/technical-docs/retainai/' },
              { text: 'Project README', link: '/technical-docs/retainai/package' },
              { text: 'Documentation Index', link: '/technical-docs/retainai/reference/docs/' },
              { text: 'Reports', link: '/technical-docs/retainai/reference/reports/' },
              { text: 'Releases', link: '/technical-docs/retainai/releases' }
            ]
          }
        ],

        '/technical-docs/versovector/': [
          {
            text: 'VersoVector',
            items: [
              { text: 'Overview', link: '/technical-docs/versovector/' },
              { text: 'Local Setup', link: '/technical-docs/versovector/setup' },
              { text: 'Dataset', link: '/technical-docs/versovector/data' },
              { text: 'Notebook Guide', link: '/technical-docs/versovector/notebooks' },
              { text: 'Model Topology', link: '/technical-docs/versovector/model-topology' },
              { text: 'Pipeline', link: '/technical-docs/versovector/pipeline' },
              { text: 'Architecture', link: '/technical-docs/versovector/architecture' },
              { text: 'Results Guide', link: '/technical-docs/versovector/results' },
              { text: 'Serving & Demo', link: '/technical-docs/versovector/serving' }
            ]
          }
        ],

        '/technical-docs/relationalstats/': [
          {
            text: 'RelationalStats',
            items: [
              { text: 'Overview', link: '/technical-docs/relationalstats/' },
              { text: 'Package README', link: '/technical-docs/relationalstats/package' },
              { text: 'Documentation Index', link: '/technical-docs/relationalstats/reference/docs/' },

              {
                text: 'Link Prediction',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/technical-docs/relationalstats/reference/docs/linkprediction/' },
                  { text: 'ProxFun Full', link: '/technical-docs/relationalstats/reference/docs/linkprediction/proxfun-full' },
                  { text: 'Metrics', link: '/technical-docs/relationalstats/reference/docs/linkprediction/metrics' },
                  { text: 'Results', link: '/technical-docs/relationalstats/reference/docs/linkprediction/results' },
                  { text: 'Scalability', link: '/technical-docs/relationalstats/reference/docs/linkprediction/scalability' },
                  { text: 'Manual Small-Graph Tests', link: '/technical-docs/relationalstats/reference/docs/linkprediction/manual-small-graph-tests' },
                  { text: 'Internal Refactor', link: '/technical-docs/relationalstats/reference/docs/linkprediction/internal-refactor' },
                  { text: 'Validation Against R', link: '/technical-docs/relationalstats/reference/docs/linkprediction/validation-against-r' }
                ]
              },

              {
                text: 'QAP',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/technical-docs/relationalstats/reference/docs/qap/' },
                  { text: 'Formulas', link: '/technical-docs/relationalstats/reference/docs/qap/formulas' },
                  { text: 'Validation Against R', link: '/technical-docs/relationalstats/reference/docs/qap/validation-against-r' }
                ]
              },

              {
                text: 'ERGM',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/technical-docs/relationalstats/reference/docs/ergm/' },
                  { text: 'Formulas', link: '/technical-docs/relationalstats/reference/docs/ergm/formulas' },
                  { text: 'Terms', link: '/technical-docs/relationalstats/reference/docs/ergm/terms' },
                  { text: 'Goodness of Fit', link: '/technical-docs/relationalstats/reference/docs/ergm/gof' },
                  { text: 'Limitations', link: '/technical-docs/relationalstats/reference/docs/ergm/limitations' },
                  { text: 'Validation Against R', link: '/technical-docs/relationalstats/reference/docs/ergm/validation-against-r' }
                ]
              },

              {
                text: 'STERGM',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/technical-docs/relationalstats/reference/docs/stergm/' },
                  { text: 'Formulas', link: '/technical-docs/relationalstats/reference/docs/stergm/formulas' },
                  { text: 'Temporal Dyads', link: '/technical-docs/relationalstats/reference/docs/stergm/temporal-dyads' },
                  { text: 'Limitations', link: '/technical-docs/relationalstats/reference/docs/stergm/limitations' },
                  { text: 'Validation Against R', link: '/technical-docs/relationalstats/reference/docs/stergm/validation-against-r' }
                ]
              },

              {
                text: 'Methodology',
                collapsed: false,
                items: [
                  { text: 'Equivalence vs Approximation', link: '/technical-docs/relationalstats/reference/docs/methodology/equivalence-vs-approximation' },
                  { text: 'Reproducibility', link: '/technical-docs/relationalstats/reference/docs/methodology/reproducibility' },
                  { text: 'Release Checklist', link: '/technical-docs/relationalstats/reference/docs/methodology/release-checklist' },
                  { text: 'Roadmap', link: '/technical-docs/relationalstats/reference/docs/methodology/roadmap' }
                ]
              },

              {
                text: 'Examples',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/technical-docs/relationalstats/reference/examples/' },
                  { text: 'Link Prediction', link: '/technical-docs/relationalstats/reference/examples/linkprediction/' },
                  { text: 'Experimental ML Workflow', link: '/technical-docs/relationalstats/reference/examples/linkprediction/experimental-ml-workflow' },
                  { text: 'QAP', link: '/technical-docs/relationalstats/reference/examples/qap/' },
                  { text: 'ERGM', link: '/technical-docs/relationalstats/reference/examples/ergm/' },
                  { text: 'STERGM', link: '/technical-docs/relationalstats/reference/examples/stergm/' }
                ]
              },

              { text: 'Notebooks', link: '/technical-docs/relationalstats/reference/notebooks/' },
              { text: 'Releases', link: '/technical-docs/relationalstats/releases' }
            ]
          }
        ],

        '/technical-docs/luasf/': [
          {
            text: 'LuaSF',
            items: [
              { text: 'Overview', link: '/technical-docs/luasf/' },
              { text: 'Getting Started', link: '/technical-docs/luasf/getting-started' },
              { text: 'API Overview', link: '/technical-docs/luasf/api-overview' },
              { text: 'Architecture', link: '/technical-docs/luasf/architecture' },
              { text: 'Examples', link: '/technical-docs/luasf/examples' },
              { text: 'Contributing', link: '/technical-docs/luasf/contributing' },
              { text: 'Releases', link: '/technical-docs/luasf/releases' }
            ]
          }
        ],

        '/technical-docs/gradientmesh/': [
          {
            text: 'GradientMesh',
            items: [
              { text: 'Overview', link: '/technical-docs/gradientmesh/' },
              { text: 'Getting Started', link: '/technical-docs/gradientmesh/getting-started' },
              { text: 'Examples', link: '/technical-docs/gradientmesh/examples' },
              { text: 'How It Works', link: '/technical-docs/gradientmesh/how-it-works' },
              { text: 'API Reference', link: '/technical-docs/gradientmesh/api-reference' },
              { text: 'Architecture', link: '/technical-docs/gradientmesh/architecture' },
              { text: 'Releases', link: '/technical-docs/gradientmesh/releases' }
            ]
          }
        ],

        '/technical-docs/fde-roadmap/': [
          {
            text: 'FDE Roadmap',
            items: [
              { text: 'Atlas Overview', link: '/technical-docs/fde-roadmap/' },
              { text: 'Field Guide', link: '/technical-docs/fde-roadmap/guide' },
              { text: 'Sources & Provenance', link: '/technical-docs/fde-roadmap/reference/sources-and-provenance' },
              { text: 'Visual Rationale', link: '/technical-docs/fde-roadmap/reference/visual-rationale' },
              { text: 'Citation', link: '/technical-docs/fde-roadmap/reference/citation' },
              { text: 'Contributing', link: '/technical-docs/fde-roadmap/reference/contributing' },
              { text: 'Changelog', link: '/technical-docs/fde-roadmap/reference/changelog' }
            ]
          }
        ]
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/HubertRonald' }
      ],

      search: {
        provider: 'local'
      }
    },

    transformHead({ page, pageData, siteConfig }) {
      const canonicalUrl = canonicalUrlForPage(page)
      const description = pageData.description || siteConfig.site.description
      const title = pageData.title || siteConfig.site.title
      const locale = localeForPage(page)
    
      return [
        ['link', { rel: 'canonical', href: canonicalUrl }],
    
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Hubert Ronald' }],
        ['meta', { property: 'og:title', content: title }],
        ['meta', { property: 'og:description', content: description }],
        ['meta', { property: 'og:url', content: canonicalUrl }],
        ['meta', { property: 'og:image', content: defaultOgImage }],
        ['meta', { property: 'og:locale', content: locale }],
    
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: title }],
        ['meta', { name: 'twitter:description', content: description }],
        ['meta', { name: 'twitter:image', content: defaultOgImage }]
      ]
    },
  })
)