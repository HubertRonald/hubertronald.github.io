import type { LandingLink } from '../content/landing.types'

export function linkTarget(link: LandingLink): string | undefined {
  return link.external ? '_blank' : undefined
}

export function linkRel(link: LandingLink): string | undefined {
  return link.external ? 'noopener noreferrer' : undefined
}
