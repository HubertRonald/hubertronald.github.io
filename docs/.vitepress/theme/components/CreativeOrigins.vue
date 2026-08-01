<script setup lang="ts">
import LandingIcon from './LandingIcon.vue'
import type { LandingContent } from '../content/landing.types'
import { linkRel, linkTarget } from '../utils/landingLinks'

defineProps<{
  section: LandingContent['creativeOrigins']
}>()
</script>

<template>
  <section class="hr-landing-section hr-creative-section" aria-labelledby="creative-title">
    <p class="hr-eyebrow">
      {{ section.eyebrow }}
    </p>

    <div class="hr-section-heading">
      <h2 id="creative-title">
        {{ section.title }}
      </h2>
    </div>

    <p v-for="paragraph in section.paragraphs" :key="paragraph">
      {{ paragraph }}
    </p>

    <a
      class="hr-inline-link hr-icon-link"
      :href="section.action.href"
      :target="linkTarget(section.action)"
      :rel="linkRel(section.action)"
    >
      <LandingIcon :src="section.action.icon" />
      <span>{{ section.action.label }} →</span>
    </a>
  </section>
</template>
