<script setup lang="ts">
import LandingThemeToggle from './LandingThemeToggle.vue'
import PortfolioIcon from './PortfolioIcon.vue'

withDefaults(defineProps<{
  locale?: 'en' | 'es'
  active?: 'work' | 'journey' | 'docs' | null
  showLanguage?: boolean
}>(), {
  locale: 'en',
  active: null,
  showLanguage: false
})
</script>

<template>
  <header class="hr-portfolio-header">
    <div class="hr-shell-wide hr-header-inner">
      <a class="hr-portfolio-brand" href="/" aria-label="Hubert Ronald home">Hubert Ronald</a>

      <nav class="hr-portfolio-nav" aria-label="Primary">
        <a href="/projects/" :aria-current="active === 'work' ? 'page' : undefined">Work</a>
        <a href="/journey/" :aria-current="active === 'journey' ? 'page' : undefined">Journey</a>
        <a href="/technical-docs/" :aria-current="active === 'docs' ? 'page' : undefined">Docs</a>
      </nav>

      <div class="hr-header-utilities">
        <a class="hr-github-link" href="https://github.com/HubertRonald" target="_blank" rel="noopener noreferrer">
          <PortfolioIcon name="github" :size="17" />
          <span>GitHub</span>
        </a>
        <LandingThemeToggle />
        <a
          v-if="showLanguage"
          class="hr-locale-switch"
          :href="locale === 'en' ? '/es/' : '/'"
          :aria-label="locale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'"
        >
          <span :class="{ 'is-current': locale === 'en' }">EN</span>
          <span aria-hidden="true">/</span>
          <span :class="{ 'is-current': locale === 'es' }">ES</span>
        </a>
      </div>
    </div>
  </header>
</template>
