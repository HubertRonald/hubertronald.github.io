export type LandingLocale = 'en' | 'es'

export interface LandingLink {
  label: string
  href: string
  external?: boolean
  icon?: string
}

export interface LandingImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface LandingHero {
  eyebrow: string
  title: string
  roles: string[]
  summary: string
  signature: string
  primaryAction: LandingLink
  secondaryAction: LandingLink
  image: LandingImage
}

export interface LandingWorkItem {
  icon?: string
  name: string
  category: string
  description: string
  href: string
  external?: boolean
}

export interface LandingCapability {
  icon?: string
  title: string
  description: string
}

export interface LandingFoundation {
  name: string
  description: string
}

export interface LandingContent {
  locale: LandingLocale
  lang: string
  alternateHref: string

  siteName: string

  nav: {
    work: LandingLink
    journey: LandingLink
    github: LandingLink
  }

  hero: LandingHero

  selectedWork: {
    eyebrow: string
    title: string
    description: string
    items: LandingWorkItem[]
  }

  capabilities: {
    eyebrow: string
    title: string
    description?: string
    items: LandingCapability[]
  }

  journey: {
    eyebrow: string
    title: string
    description?: string
    steps: string[]
    action: LandingLink
  }

  foundations: {
    eyebrow: string
    title: string
    description: string
    items: LandingFoundation[]
    action: LandingLink
  }

  creativeOrigins: {
    eyebrow: string
    title: string
    paragraphs: string[]
    action: LandingLink
  }

  footer: {
    title: string
    links: LandingLink[]
    closing: string
  }
}
