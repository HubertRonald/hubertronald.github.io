import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Hubert Ronald',
    description: 'Personal technical portfolio, documentation, and creative software hub.',

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
      logo: '/icons/common/home.svg',
      /* 
      nav: [
        { text: 'RetainAI', link: '/retainai/' },
        { text: 'RelationalStats', link: '/relationalstats/' },
        { text: 'GradientMesh', link: '/gradientmesh/' },
        { text: 'VersoVector', link: '/versovector/' },
        { text: 'LuaSF', link: '/luasf/' }
      ],
      */

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

        '/versovector/': [
          {
            text: 'VersoVector',
            items: [
              { text: 'Overview', link: '/versovector/' },
              { text: 'Local Setup', link: '/versovector/setup' },
              { text: 'Dataset', link: '/versovector/data' },
              { text: 'Notebook Guide', link: '/versovector/notebooks' },
              { text: 'Model Topology', link: '/versovector/model-topology' },
              { text: 'Pipeline', link: '/versovector/pipeline' },
              { text: 'Architecture', link: '/versovector/architecture' },
              { text: 'Results Guide', link: '/versovector/results' },
              { text: 'Serving & Demo', link: '/versovector/serving' }
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

        '/luasf/': [
          {
            text: 'LuaSF',
            items: [
              { text: 'Overview', link: '/luasf/' },
              { text: 'Getting Started', link: '/luasf/getting-started' },
              { text: 'API Overview', link: '/luasf/api-overview' },
              { text: 'Architecture', link: '/luasf/architecture' },
              { text: 'Examples', link: '/luasf/examples' },
              { text: 'Contributing', link: '/luasf/contributing' },
              { text: 'Releases', link: '/luasf/releases' }
            ]
          }
        ],

        '/gradientmesh/': [
          {
            text: 'GradientMesh',
            items: [
              { text: 'Overview', link: '/gradientmesh/' },
              { text: 'Getting Started', link: '/gradientmesh/getting-started' },
              { text: 'Examples', link: '/gradientmesh/examples' },
              { text: 'How It Works', link: '/gradientmesh/how-it-works' },
              { text: 'API Reference', link: '/gradientmesh/api-reference' },
              { text: 'Architecture', link: '/gradientmesh/architecture' },
              { text: 'Releases', link: '/gradientmesh/releases' }
            ]
          }
        ]
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/HubertRonald' }
      ],

      footer: {
        message: 'Built with VitePress and deployed with GitHub Pages.',
        copyright: 'Copyright © Hubert Ronald'
      },

      search: {
        provider: 'local'
      }
    }
  })
)