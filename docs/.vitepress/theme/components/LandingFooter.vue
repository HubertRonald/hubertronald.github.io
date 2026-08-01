<script setup lang="ts">
import LandingIcon from './LandingIcon.vue'
import type { LandingContent } from '../content/landing.types'
import { linkRel, linkTarget } from '../utils/landingLinks'

defineProps<{
  footer: LandingContent['footer']
}>()
</script>

<template>
  <footer class="hr-landing-footer">
    <p class="hr-footer-title">
      {{ footer.title }}
    </p>

    <nav aria-label="Footer">
      <a
        v-for="link in footer.links"
        :key="link.label"
        class="hr-footer-link"
        :href="link.href"
        :target="linkTarget(link)"
        :rel="linkRel(link)"
      >
        <LandingIcon :src="link.icon" />
        <span>{{ link.label }}</span>
      </a>
    </nav>

    <p class="hr-footer-closing">
      {{ footer.closing }}
    </p>
  </footer>
</template>
