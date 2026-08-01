import type { LandingContent } from './landing.types'
import { landingIcons } from './landing.icons'

export const landingEn: LandingContent = {
  locale: 'en',
  lang: 'en',
  alternateHref: '/es/',

  siteName: 'Hubert Ronald',

  nav: {
    work: {
      label: 'Work',
      href: '/projects/'
    },
    journey: {
      label: 'Journey',
      href: '/journey/'
    },
    github: {
      label: 'GitHub',
      href: 'https://github.com/HubertRonald',
      external: true
    }
  },

  hero: {
    eyebrow: "Hi there! I'm Rony.",
    title: 'I design and build reliable data platforms, cloud-native systems and AI products.',
    roles: [
      'Data & Cloud Architect',
      'Data/ML Platform Engineer',
      'AI-native Builder'
    ],
    summary: 'From creative software and applied mathematics to cloud data platforms and AI-native systems.',
    signature: 'logic meets creativity 💾🎸🌻',
    primaryAction: {
      label: 'Explore my work',
      href: '/projects/'
    },
    secondaryAction: {
      label: 'GitHub',
      href: 'https://github.com/HubertRonald',
      external: true
    },
    image: {
      src: '/images/profile/rony-white-shirt-green-bg.jpg',
      alt: 'Hubert Ronald smiling, wearing glasses and a white shirt.',
      width: 1536,
      height: 1024
    }
  },

  selectedWork: {
    eyebrow: 'Selected Work',
    title: 'Projects with architecture, product thinking and technical depth.',
    description: 'A small selection of work that connects AI products, classical ML/NLP, and production-oriented data engineering.',
    items: [
      {
        name: 'RetainAI',
        category: 'AI-native product',
        description: 'AI-native decision-intelligence platform for retention signals, customer insight and product-oriented analysis.',
        href: '/retainai/'
      },
      {
        name: 'VersoVector',
        category: 'ML/NLP research project',
        description: 'Classical machine learning and NLP applied to poetic language, semantic structure and emotional patterns.',
        href: '/versovector/'
      },
      {
        name: 'Data & Cloud Engineering',
        category: 'Architecture practice',
        description: 'Production-oriented cloud and data architecture across pipelines, platforms and operational systems.',
        href: '/case-studies/'
      }
    ]
  },

  capabilities: {
    eyebrow: 'What I Build',
    title: 'Systems that connect data, cloud and AI into working products.',
    items: [
      {
        icon: landingIcons.aiProducts,
        title: 'AI Products & Platforms',
        description: 'Product-oriented AI systems that combine user value, architecture and pragmatic delivery.'
      },
      {
        icon: landingIcons.dataCloud,
        title: 'Data & Cloud Architecture',
        description: 'Reliable cloud-native data platforms, pipelines and services designed for real operational constraints.'
      },
      {
        icon: landingIcons.mlNlp,
        title: 'ML / NLP Engineering',
        description: 'Applied machine learning and language-oriented systems with reproducible development workflows.'
      },
      {
        icon: landingIcons.developerEnablement,
        title: 'Developer Enablement',
        description: 'Documentation, tooling, environments and practices that make technical work easier to reproduce and extend.'
      }
    ]
  },

  journey: {
    eyebrow: 'Builder Journey',
    title: 'A path from creative software to AI-native platforms.',
    steps: [
      'Creative Software',
      'Applied Math & Simulation',
      'Reproducible Environments',
      'Distributed Data Systems',
      'Cloud Architecture',
      'ML/NLP & AI-native Platforms'
    ],
    action: {
      label: 'Explore the full journey',
      href: '/journey/'
    }
  },

  foundations: {
    eyebrow: 'Engineering Foundations',
    title: 'Earlier work that shaped the current platform mindset.',
    description: 'These projects show foundations in applied analytics, reproducible environments, machine learning and software experimentation.',
    items: [
      {
        name: 'AppMarkowitz',
        description: 'Portfolio optimization and applied analytics foundations.'
      },
      {
        name: 'MIAD-ANS-ENV',
        description: 'Reproducible analytical environments and academic engineering practice.'
      },
      {
        name: 'GenderMovieClassification',
        description: 'Supervised learning practice for text and classification workflows.'
      },
      {
        name: 'Legacy Big Data Lab',
        description: 'Distributed data processing experiments and early big data practice.'
      }
    ],
    action: {
      label: 'Explore the Project Atlas',
      href: '/projects/'
    }
  },

  creativeOrigins: {
    eyebrow: 'Creative Origins',
    title: 'Before data platforms and AI systems, there were games and visual experiments.',
    paragraphs: [
      'Before data platforms and AI systems, I explored software through indie games, mobile applications, visual experiments and creative coding.',
      'Liasoft preserves that early builder journey.'
    ],
    action: {
      label: 'Visit the Liasoft archive',
      href: 'https://liasoft.hubertronald.dev/',
      external: true
    }
  },

  footer: {
    title: 'Hubert Ronald',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/HubertRonald',
        external: true,
        icon: landingIcons.github
      },
      {
        label: 'Kaggle',
        href: 'https://www.kaggle.com/hubertronald/competitions',
        external: true,
        icon: landingIcons.kaggle
      },
      {
        label: 'Stack Overflow',
        href: 'https://es.stackoverflow.com/users/88852/hubertronald',
        external: true,
        icon: landingIcons.stackOverflow
      },
      {
        label: 'Liasoft',
        href: 'https://liasoft.hubertronald.dev/',
        external: true,
        icon: landingIcons.liasoft
      },
      {
        label: 'itch.io',
        href: 'https://liasoft.itch.io/',
        external: true,
        icon: landingIcons.itch
      }
    ],
    closing: 'logic meets creativity 💾🎸🌻'
  }
}
