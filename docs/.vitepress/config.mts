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
              { text: 'Overview', link: '/versovector/' }
            ]
          }
        ],

        '/luasf/': [
          {
            text: 'LuaSF',
            items: [
              { text: 'Overview', link: '/luasf/' },
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