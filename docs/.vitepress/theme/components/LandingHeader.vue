<script setup lang="ts">
import LandingThemeToggle from './LandingThemeToggle.vue'
import type { LandingContent } from '../content/landing.types'
import { linkRel, linkTarget } from '../utils/landingLinks'

defineProps<{
  content: LandingContent
}>()
</script>

<template>
  <header class="hr-landing-header" aria-label="Landing navigation">
    <a class="hr-landing-brand" href="/" aria-label="Hubert Ronald home">
      {{ content.siteName }}
    </a>

    <nav class="hr-landing-nav" aria-label="Primary">
      <a :href="content.nav.work.href">
        {{ content.nav.work.label }}
      </a>
      <a :href="content.nav.journey.href">
        {{ content.nav.journey.label }}
      </a>
      <a
        :href="content.nav.github.href"
        :target="linkTarget(content.nav.github)"
        :rel="linkRel(content.nav.github)"
      >
        {{ content.nav.github.label }}
      </a>
    </nav>

    <div class="hr-landing-controls">
      <LandingThemeToggle />

      <a
        class="hr-locale-switch"
        :href="content.alternateHref"
        :aria-label="content.locale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'"
      >
        <span>{{ content.locale === 'en' ? 'EN' : 'ES' }}</span>
        <span aria-hidden="true">|</span>
        <strong>{{ content.locale === 'en' ? 'ES' : 'EN' }}</strong>
      </a>
    </div>
  </header>
</template>
