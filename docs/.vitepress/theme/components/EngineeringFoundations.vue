<script setup lang="ts">
import type { LandingContent } from '../content/landing.types'

defineProps<{
  section: LandingContent['foundations']
}>()
</script>

<template>
  <section class="hr-landing-section" aria-labelledby="foundations-title">
    <p class="hr-eyebrow">
      {{ section.eyebrow }}
    </p>

    <div class="hr-section-heading">
      <h2 id="foundations-title">
        {{ section.title }}
      </h2>

      <p>
        {{ section.description }}
      </p>
    </div>

    <div class="hr-foundation-list">
      <article v-for="item in section.items" :key="item.name">
        <h3>
          {{ item.name }}
        </h3>
        <p>
          {{ item.description }}
        </p>
      </article>
    </div>

    <a class="hr-inline-link" :href="section.action.href">
      {{ section.action.label }} →
    </a>
  </section>
</template>
