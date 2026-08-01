import type { LandingContent, LandingLocale } from './landing.types'
import { landingEn } from './landing.en'
import { landingEs } from './landing.es'

export const landingContentByLocale: Record<LandingLocale, LandingContent> = {
  en: landingEn,
  es: landingEs
}

export function getLandingContent(locale: LandingLocale): LandingContent {
  return landingContentByLocale[locale] ?? landingEn
}
