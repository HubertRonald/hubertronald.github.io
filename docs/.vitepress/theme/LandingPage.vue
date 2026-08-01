<script setup lang="ts">
import { computed } from 'vue'
import BuilderJourney from './components/BuilderJourney.vue'
import Capabilities from './components/Capabilities.vue'
import CreativeOrigins from './components/CreativeOrigins.vue'
import EngineeringFoundations from './components/EngineeringFoundations.vue'
import LandingFooter from './components/LandingFooter.vue'
import LandingHeader from './components/LandingHeader.vue'
import LandingHero from './components/LandingHero.vue'
import SelectedWork from './components/SelectedWork.vue'
import { getLandingContent } from './content/landing.content'
import type { LandingLocale } from './content/landing.types'

const props = defineProps<{
  locale: LandingLocale
}>()

const content = computed(() => getLandingContent(props.locale))
</script>

<template>
  <div class="hr-landing" :lang="content.lang">
    <LandingHeader :content="content" />

    <main class="hr-landing-main">
      <LandingHero :hero="content.hero" />
      <SelectedWork :section="content.selectedWork" />
      <Capabilities :section="content.capabilities" />
      <BuilderJourney :section="content.journey" />
      <EngineeringFoundations :section="content.foundations" />
      <CreativeOrigins :section="content.creativeOrigins" />
    </main>

    <LandingFooter :footer="content.footer" />
  </div>
</template>
