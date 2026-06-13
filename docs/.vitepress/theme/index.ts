import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

const theme: Theme = {
  extends: DefaultTheme,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)

    if (typeof window === 'undefined') {
      return
    }

    window.addEventListener(
      'click',
      (event) => {
        const target = event.target as HTMLElement | null

        if (!target) {
          return
        }

        const anchor = target.closest('a') as HTMLAnchorElement | null

        if (!anchor) {
          return
        }

        const isSiteTitleLink = Boolean(anchor.closest('.VPNavBarTitle'))

        if (!isSiteTitleLink) {
          return
        }

        const url = new URL(anchor.href, window.location.href)

        const pointsToRoot =
          url.origin === window.location.origin &&
          url.pathname === '/'

        if (!pointsToRoot) {
          return
        }

        event.preventDefault()
        event.stopImmediatePropagation()

        window.location.assign('/')
      },
      true
    )
  }
}

export default theme