<script setup lang="ts">
import { computed, onMounted } from 'vue'
import HomeFeaturedShowcase from './components/HomeFeaturedShowcase.vue'
import JourneyPreview from './components/JourneyPreview.vue'
import LandingFooter from './components/LandingFooter.vue'
import LandingHeader from './components/LandingHeader.vue'
import LandingHero from './components/LandingHero.vue'
import NextStepLinks from './components/NextStepLinks.vue'
import MobilePortfolioNav from './components/MobilePortfolioNav.vue'
import PortfolioIcon from './components/PortfolioIcon.vue'
import { homeCopy } from './content/portfolio.content'

const props = defineProps<{ locale: 'en' | 'es' }>()
const copy = computed(() => homeCopy[props.locale])

onMounted(() => {
  window.localStorage.setItem('hr-home-locale', props.locale)
})
</script>

<template>
  <div class="hr-portfolio-page hr-home" :lang="copy.lang">
    <LandingHeader :locale="locale" :show-language="true" />
    <main class="hr-shell-wide hr-home-main">
      <LandingHero :copy="copy" :locale="locale" />

      <section class="hr-home-section hr-home-featured" aria-labelledby="home-featured-title">
        <p class="hr-eyebrow">{{ copy.featuredEyebrow }}</p>
        <div class="hr-section-heading hr-section-heading-journey hr-home-featured-heading">
          <h2 id="home-featured-title">{{ copy.featuredTitle }}</h2>
          <p>{{ copy.featuredDescription }}</p>
        </div>
        <HomeFeaturedShowcase :locale="locale" />
      </section>

      <section class="hr-home-section hr-home-next" aria-labelledby="home-next-title">
        <p class="hr-eyebrow">{{ copy.nextEyebrow }}</p>
        <h2 id="home-next-title">{{ copy.nextTitle }}</h2>
        <NextStepLinks :locale="locale" />
      </section>

      <section class="hr-home-section hr-home-journey" aria-labelledby="home-journey-title">
        <p class="hr-eyebrow">{{ copy.journeyEyebrow }}</p>
        <div class="hr-section-heading hr-section-heading-journey">
          <h2 id="home-journey-title">{{ copy.journeyTitle }}</h2>
          <p>{{ copy.journeyDescription }}</p>
        </div>
        <JourneyPreview :locale="locale" />
      </section>

      <section class="hr-home-section hr-creative-gateway" aria-labelledby="home-creative-title">
        <span class="hr-creative-icon" aria-hidden="true"><PortfolioIcon name="creative" :size="28" /></span>
        <div class="hr-creative-copy">
          <p class="hr-eyebrow">{{ copy.creativeEyebrow }}</p>
          <h2 id="home-creative-title">{{ copy.creativeTitle }}</h2>
          <p>{{ copy.creativeBody }}</p>
        </div>
        <a class="hr-inline-link" href="https://liasoft.hubertronald.dev/" target="_blank" rel="noopener noreferrer">{{ copy.creativeAction }} →</a>
      </section>
    </main>
    <LandingFooter :locale="locale" />
    <MobilePortfolioNav active="home" />
  </div>
</template>
