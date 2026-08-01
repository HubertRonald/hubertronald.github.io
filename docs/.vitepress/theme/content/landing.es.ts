import type { LandingContent } from './landing.types'
import { landingIcons } from './landing.icons'

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
    },
    image: {
      src: '/images/profile/rony-white-shirt-green-bg.jpg',
      alt: 'Hubert Ronald sonriendo, con gafas y camisa blanca.',
      width: 1536,
      height: 1024
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
        description: 'Plataforma de inteligencia de decisión que explora señales de retención, análisis de clientes y arquitectura de IA con criterio de producto.',
        href: '/retainai/',
        icon: landingIcons.aiProducts
      },
      {
        name: 'VersoVector',
        category: 'Proyecto ML/NLP',
        description: 'Machine learning clásico y NLP aplicados al lenguaje poético, estructura semántica y patrones emocionales.',
        href: '/versovector/',
        icon: landingIcons.mlNlp
      },
      {
        name: 'Data & Cloud Engineering',
        category: 'Práctica de arquitectura',
        description: 'Arquitectura cloud y de datos orientada a producción: pipelines, plataformas y sistemas operacionales.',
        href: '/case-studies/',
        icon: landingIcons.dataCloud
      }
    ]
  },

  capabilities: {
    eyebrow: 'Lo que construyo',
    title: 'Sistemas que conectan datos, cloud e IA en productos funcionales.',
    description: 'El hilo conductor no es una lista de tecnologías. Es la capacidad de convertir piezas técnicas complejas en sistemas usables y confiables.',
    items: [
      {
        icon: landingIcons.aiProducts,
        title: 'AI Products & Platforms',
        description: 'Sistemas de IA con visión de producto, arquitectura y entrega pragmática.'
      },
      {
        icon: landingIcons.dataCloud,
        title: 'Data & Cloud Architecture',
        description: 'Plataformas, pipelines y servicios cloud-native diseñados para restricciones operacionales reales.'
      },
      {
        icon: landingIcons.mlNlp,
        title: 'ML / NLP Engineering',
        description: 'Machine learning aplicado y sistemas orientados a lenguaje con flujos reproducibles.'
      },
      {
        icon: landingIcons.developerEnablement,
        title: 'Developer Enablement',
        description: 'Documentación, tooling, ambientes y prácticas que facilitan reproducir y extender el trabajo técnico.'
      }
    ]
  },

  journey: {
    eyebrow: 'Builder Journey',
    title: 'Un camino desde el software creativo hasta plataformas AI-native.',
    description: 'El trabajo fue evolucionando paso a paso: de experimentos lúdicos de software a sistemas de datos, arquitectura cloud y pensamiento de producto AI-native.',
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
      'Liasoft preserva esa etapa temprana del camino como builder: un pequeño archivo de juegos, prototipos e ideas técnicas lúdicas.'
    ],
    action: {
      label: 'Visitar el archivo de Liasoft',
      href: 'https://liasoft.hubertronald.dev/',
      external: true,
      icon: landingIcons.liasoft
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
