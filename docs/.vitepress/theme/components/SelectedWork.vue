<script setup lang="ts">
import LandingIcon from './LandingIcon.vue'
import type { LandingContent } from '../content/landing.types'
import { linkRel, linkTarget } from '../utils/landingLinks'

defineProps<{
  section: LandingContent['selectedWork']
}>()
</script>

<template>
  <section class="hr-landing-section" aria-labelledby="selected-work-title">
    <p class="hr-eyebrow">
      {{ section.eyebrow }}
    </p>

    <div class="hr-section-heading">
      <h2 id="selected-work-title">
        {{ section.title }}
      </h2>

      <p>
        {{ section.description }}
      </p>
    </div>

    <div class="hr-work-grid">
      <article
        v-for="item in section.items"
        :key="item.name"
        class="hr-card hr-work-card"
      >
        <LandingIcon :src="item.icon" />
        <p class="hr-item-category">
          {{ item.category }}
        </p>
        <h3>
          <a
            :href="item.href"
            :target="linkTarget(item)"
            :rel="linkRel(item)"
          >
            {{ item.name }}
          </a>
        </h3>
        <p>
          {{ item.description }}
        </p>
      </article>
    </div>
  </section>
</template>
