import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import LandingPage from './LandingPage.vue'
import ProjectAtlasPage from './components/ProjectAtlasPage.vue'
import JourneyPage from './components/JourneyPage.vue'
import CaseStudiesPage from './components/CaseStudiesPage.vue'
import ArchivePage from './components/ArchivePage.vue'
import SiteHistoryPage from './components/SiteHistoryPage.vue'
import AtlasProjectProfile from './components/AtlasProjectProfile.vue'
import PortfolioThemeLayout from './components/PortfolioThemeLayout.vue'
import TechnicalDocsPage from './components/TechnicalDocsPage.vue'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: PortfolioThemeLayout,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('LandingPage', LandingPage)
    ctx.app.component('ProjectAtlasPage', ProjectAtlasPage)
    ctx.app.component('JourneyPage', JourneyPage)
    ctx.app.component('CaseStudiesPage', CaseStudiesPage)
    ctx.app.component('ArchivePage', ArchivePage)
    ctx.app.component('SiteHistoryPage', SiteHistoryPage)
    ctx.app.component('AtlasProjectProfile', AtlasProjectProfile)
    ctx.app.component('TechnicalDocsPage', TechnicalDocsPage)

    if (typeof window !== 'undefined') {
      window.addEventListener('click', (event) => {
        const target = event.target as HTMLElement | null
        const anchor = target?.closest('a') as HTMLAnchorElement | null
        if (!anchor) return

        const url = new URL(anchor.href, window.location.href)
        const isHomeBrand =
          url.origin === window.location.origin &&
          url.pathname === '/' &&
          Boolean(anchor.closest('.VPNavBarTitle, .hr-portfolio-brand'))

        if (isHomeBrand && window.localStorage.getItem('hr-home-locale') === 'es') {
          event.preventDefault()
          window.location.assign('/es/')
        }
      }, true)
    }
  }
}

export default theme
