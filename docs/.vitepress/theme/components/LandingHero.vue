<script setup lang="ts">
import type { LandingHero } from '../content/landing.types'
import { linkRel, linkTarget } from '../utils/landingLinks'

defineProps<{
  hero: LandingHero
}>()
</script>

<template>
  <section class="hr-landing-hero" aria-labelledby="landing-title">
    <div class="hr-hero-copy">
      <p class="hr-eyebrow">
        {{ hero.eyebrow }}
      </p>

      <h1 id="landing-title">
        {{ hero.title }}
      </h1>

      <ul class="hr-role-list" aria-label="Professional roles">
        <li v-for="role in hero.roles" :key="role">
          {{ role }}
        </li>
      </ul>

      <p class="hr-hero-summary">
        {{ hero.summary }}
      </p>

      <p class="hr-signature">
        {{ hero.signature }}
      </p>

      <div class="hr-actions" aria-label="Primary actions">
        <a class="hr-action-primary" :href="hero.primaryAction.href">
          {{ hero.primaryAction.label }}
        </a>
        <a
          class="hr-action-secondary"
          :href="hero.secondaryAction.href"
          :target="linkTarget(hero.secondaryAction)"
          :rel="linkRel(hero.secondaryAction)"
        >
          {{ hero.secondaryAction.label }}
        </a>
      </div>
    </div>

    <figure class="hr-hero-photo-wrap">
      <img
        class="hr-hero-photo"
        :src="hero.image.src"
        :alt="hero.image.alt"
        :width="hero.image.width"
        :height="hero.image.height"
        decoding="async"
        fetchpriority="high"
      >
    </figure>
  </section>
</template>
