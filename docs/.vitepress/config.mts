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
      nav: [
        { text: 'VersoVector', link: '/versovector/' },
        { text: 'LuaSF', link: '/luasf/' },
      ],

      sidebar: {
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
  }),
  {
    mermaid: {
      theme: 'base',
      themeVariables: {
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        primaryColor: '#ffffff',
        primaryTextColor: '#111827',
        primaryBorderColor: '#111827',
        lineColor: '#6b7280',
        secondaryColor: '#f9fafb',
        tertiaryColor: '#f3f4f6',
        clusterBkg: '#f9fafb',
        clusterBorder: '#d1d5db'
      }
    }
  }
)