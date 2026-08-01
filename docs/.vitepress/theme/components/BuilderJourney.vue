<script setup lang="ts">
import type { LandingContent } from '../content/landing.types'

defineProps<{
  section: LandingContent['journey']
}>()
</script>

<template>
  <section class="hr-landing-section" aria-labelledby="journey-title">
    <p class="hr-eyebrow">
      {{ section.eyebrow }}
    </p>

    <div class="hr-section-heading">
      <h2 id="journey-title">
        {{ section.title }}
      </h2>

      <p v-if="section.description">
        {{ section.description }}
      </p>
    </div>

    <ol class="hr-journey-list">
      <li v-for="step in section.steps" :key="step">
        {{ step }}
      </li>
    </ol>

    <a class="hr-inline-link" :href="section.action.href">
      {{ section.action.label }} →
    </a>
  </section>
</template>
