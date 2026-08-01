import type { LandingContent } from './landing.types'

export const landingEs: LandingContent = {
  locale: 'es',
  lang: 'es',
  alternateHref: '/',

  siteName: 'Hubert Ronald',

  nav: {
    work: {
      label: 'Trabajo',
      href: '/projects/'
    },
    journey: {
      label: 'Trayectoria',
      href: '/journey/'
    },
    github: {
      label: 'GitHub',
      href: 'https://github.com/HubertRonald',
      external: true
    }
  },

  hero: {
    eyebrow: '¡Hola! Soy Rony.',
    title: 'Diseño y construyo plataformas de datos confiables, sistemas cloud-native y productos de inteligencia artificial.',
    roles: [
      'Data & Cloud Architect',
      'Data/ML Platform Engineer',
      'AI-native Builder'
    ],
    summary: 'Del software creativo y las matemáticas aplicadas a las plataformas cloud de datos y los sistemas AI-native.',
    signature: 'logic meets creativity 💾🎸🌻',
    primaryAction: {
      label: 'Explorar mi trabajo',
      href: '/projects/'
    },
    secondaryAction: {
      label: 'GitHub',
      href: 'https://github.com/HubertRonald',
      external: true
    }
  },

  selectedWork: {
    eyebrow: 'Trabajo seleccionado',
    title: 'Proyectos con arquitectura, criterio de producto y profundidad técnica.',
    description: 'Una selección breve de trabajos que conectan productos de IA, ML/NLP clásico e ingeniería de datos orientada a producción.',
    items: [
      {
        name: 'RetainAI',
        category: 'Producto AI-native',
        description: 'Plataforma AI-native de inteligencia de decisión para señales de retención, análisis de clientes y criterio de producto.',
        href: '/retainai/'
      },
      {
        name: 'VersoVector',
        category: 'Proyecto ML/NLP',
        description: 'Machine learning clásico y NLP aplicados al lenguaje poético, estructura semántica y patrones emocionales.',
        href: '/versovector/'
      },
      {
        name: 'Data & Cloud Engineering',
        category: 'Práctica de arquitectura',
        description: 'Arquitectura cloud y de datos orientada a producción: pipelines, plataformas y sistemas operacionales.',
        href: '/case-studies/'
      }
    ]
  },

  capabilities: {
    eyebrow: 'Lo que construyo',
    title: 'Sistemas que conectan datos, cloud e IA en productos funcionales.',
    items: [
      {
        title: 'AI Products & Platforms',
        description: 'Sistemas de IA con visión de producto, arquitectura y entrega pragmática.'
      },
      {
        title: 'Data & Cloud Architecture',
        description: 'Plataformas, pipelines y servicios cloud-native diseñados para restricciones operacionales reales.'
      },
      {
        title: 'ML / NLP Engineering',
        description: 'Machine learning aplicado y sistemas orientados a lenguaje con flujos reproducibles.'
      },
      {
        title: 'Developer Enablement',
        description: 'Documentación, tooling, ambientes y prácticas que facilitan reproducir y extender el trabajo técnico.'
      }
    ]
  },

  journey: {
    eyebrow: 'Builder Journey',
    title: 'Un camino desde el software creativo hasta plataformas AI-native.',
    steps: [
      'Creative Software',
      'Applied Math & Simulation',
      'Reproducible Environments',
      'Distributed Data Systems',
      'Cloud Architecture',
      'ML/NLP & AI-native Platforms'
    ],
    action: {
      label: 'Explorar la trayectoria completa',
      href: '/journey/'
    }
  },

  foundations: {
    eyebrow: 'Fundamentos de ingeniería',
    title: 'Trabajos previos que formaron el criterio actual de plataforma.',
    description: 'Estos proyectos muestran bases en analítica aplicada, ambientes reproducibles, machine learning y experimentación de software.',
    items: [
      {
        name: 'AppMarkowitz',
        description: 'Optimización de portafolios y fundamentos de analítica aplicada.'
      },
      {
        name: 'MIAD-ANS-ENV',
        description: 'Ambientes analíticos reproducibles y práctica académica de ingeniería.'
      },
      {
        name: 'GenderMovieClassification',
        description: 'Práctica de aprendizaje supervisado para texto y clasificación.'
      },
      {
        name: 'Legacy Big Data Lab',
        description: 'Experimentos de procesamiento distribuido y práctica temprana de big data.'
      }
    ],
    action: {
      label: 'Explorar el Project Atlas',
      href: '/projects/'
    }
  },

  creativeOrigins: {
    eyebrow: 'Orígenes creativos',
    title: 'Antes de las plataformas de datos y los sistemas de IA, hubo juegos y experimentos visuales.',
    paragraphs: [
      'Antes de las plataformas de datos y los sistemas de IA, exploré el software mediante juegos indie, aplicaciones móviles, experimentos visuales y creative coding.',
      'Liasoft preserva esa etapa temprana del camino como builder.'
    ],
    action: {
      label: 'Visitar el archivo de Liasoft',
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
        external: true
      },
      {
        label: 'Kaggle',
        href: 'https://www.kaggle.com/hubertronald/competitions',
        external: true
      },
      {
        label: 'Stack Overflow',
        href: 'https://es.stackoverflow.com/users/88852/hubertronald',
        external: true
      },
      {
        label: 'Liasoft',
        href: 'https://liasoft.hubertronald.dev/',
        external: true
      },
      {
        label: 'itch.io',
        href: 'https://liasoft.itch.io/',
        external: true
      }
    ],
    closing: 'logic meets creativity 💾🎸🌻'
  }
}
