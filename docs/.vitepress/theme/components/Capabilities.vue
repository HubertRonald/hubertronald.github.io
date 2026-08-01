<script setup lang="ts">
import LandingIcon from './LandingIcon.vue'
import type { LandingContent } from '../content/landing.types'

defineProps<{
  section: LandingContent['capabilities']
}>()
</script>

<template>
  <section class="hr-landing-section" aria-labelledby="capabilities-title">
    <p class="hr-eyebrow">
      {{ section.eyebrow }}
    </p>

    <div class="hr-section-heading">
      <h2 id="capabilities-title">
        {{ section.title }}
      </h2>

      <p v-if="section.description">
        {{ section.description }}
      </p>
    </div>

    <div class="hr-capability-grid">
      <article
        v-for="item in section.items"
        :key="item.title"
        class="hr-card hr-capability-card"
      >
        <LandingIcon :src="item.icon" />
        <h3>
          {{ item.title }}
        </h3>
        <p>
          {{ item.description }}
        </p>
      </article>
    </div>
  </section>
</template>
