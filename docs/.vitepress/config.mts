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
        { text: 'RetainAI', link: '/retainai/' },
        { text: 'RelationalStats', link: '/relationalstats/' },
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
        '/retainai/': [
          {
            text: 'RetainAI',
            items: [
              { text: 'Overview', link: '/retainai/' },
              { text: 'Project README', link: '/retainai/package' },
              { text: 'Documentation Index', link: '/retainai/reference/docs/' },
              { text: 'Reports', link: '/retainai/reference/reports/' },
              { text: 'Releases', link: '/retainai/releases' }
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

        '/relationalstats/': [
          {
            text: 'RelationalStats',
            items: [
              { text: 'Overview', link: '/relationalstats/' },
              { text: 'Package README', link: '/relationalstats/package' },
              { text: 'Documentation Index', link: '/relationalstats/reference/docs/' },

              {
                text: 'Link Prediction',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/relationalstats/reference/docs/linkprediction/' },
                  { text: 'ProxFun Full', link: '/relationalstats/reference/docs/linkprediction/proxfun-full' },
                  { text: 'Metrics', link: '/relationalstats/reference/docs/linkprediction/metrics' },
                  { text: 'Results', link: '/relationalstats/reference/docs/linkprediction/results' },
                  { text: 'Scalability', link: '/relationalstats/reference/docs/linkprediction/scalability' },
                  { text: 'Manual Small-Graph Tests', link: '/relationalstats/reference/docs/linkprediction/manual-small-graph-tests' },
                  { text: 'Internal Refactor', link: '/relationalstats/reference/docs/linkprediction/internal-refactor' },
                  { text: 'Validation Against R', link: '/relationalstats/reference/docs/linkprediction/validation-against-r' }
                ]
              },

              {
                text: 'QAP',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/relationalstats/reference/docs/qap/' },
                  { text: 'Formulas', link: '/relationalstats/reference/docs/qap/formulas' },
                  { text: 'Validation Against R', link: '/relationalstats/reference/docs/qap/validation-against-r' }
                ]
              },

              {
                text: 'ERGM',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/relationalstats/reference/docs/ergm/' },
                  { text: 'Formulas', link: '/relationalstats/reference/docs/ergm/formulas' },
                  { text: 'Terms', link: '/relationalstats/reference/docs/ergm/terms' },
                  { text: 'Goodness of Fit', link: '/relationalstats/reference/docs/ergm/gof' },
                  { text: 'Limitations', link: '/relationalstats/reference/docs/ergm/limitations' },
                  { text: 'Validation Against R', link: '/relationalstats/reference/docs/ergm/validation-against-r' }
                ]
              },

              {
                text: 'STERGM',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/relationalstats/reference/docs/stergm/' },
                  { text: 'Formulas', link: '/relationalstats/reference/docs/stergm/formulas' },
                  { text: 'Temporal Dyads', link: '/relationalstats/reference/docs/stergm/temporal-dyads' },
                  { text: 'Limitations', link: '/relationalstats/reference/docs/stergm/limitations' },
                  { text: 'Validation Against R', link: '/relationalstats/reference/docs/stergm/validation-against-r' }
                ]
              },

              {
                text: 'Methodology',
                collapsed: false,
                items: [
                  { text: 'Equivalence vs Approximation', link: '/relationalstats/reference/docs/methodology/equivalence-vs-approximation' },
                  { text: 'Reproducibility', link: '/relationalstats/reference/docs/methodology/reproducibility' },
                  { text: 'Release Checklist', link: '/relationalstats/reference/docs/methodology/release-checklist' },
                  { text: 'Roadmap', link: '/relationalstats/reference/docs/methodology/roadmap' }
                ]
              },

              {
                text: 'Examples',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/relationalstats/reference/examples/' },
                  { text: 'Link Prediction', link: '/relationalstats/reference/examples/linkprediction/' },
                  { text: 'Experimental ML Workflow', link: '/relationalstats/reference/examples/linkprediction/experimental-ml-workflow' },
                  { text: 'QAP', link: '/relationalstats/reference/examples/qap/' },
                  { text: 'ERGM', link: '/relationalstats/reference/examples/ergm/' },
                  { text: 'STERGM', link: '/relationalstats/reference/examples/stergm/' }
                ]
              },

              { text: 'Notebooks', link: '/relationalstats/reference/notebooks/' },
              { text: 'Releases', link: '/relationalstats/releases' }
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