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
              { text: 'Public Repository Strategy', link: '/versovector/public-repo-strategy' },
              { text: 'Product Vision', link: '/versovector/product-vision' },
              { text: 'Architecture', link: '/versovector/architecture' },
              { text: 'Analytical Pipeline', link: '/versovector/analytical-pipeline' },
              { text: 'MLOps & Serving', link: '/versovector/mlops-serving' },
              { text: 'Notebooks & Results', link: '/versovector/notebooks-and-results' },
              { text: 'Demo Roadmap', link: '/versovector/demo-roadmap' },
              { text: 'Responsible Content', link: '/versovector/responsible-content' }
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
  })
)