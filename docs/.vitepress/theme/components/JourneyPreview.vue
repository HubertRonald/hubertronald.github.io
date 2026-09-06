<script setup lang="ts">
import { computed } from 'vue'
import PortfolioIcon from './PortfolioIcon.vue'
import { homeJourneyCopy, journeyStages } from '../content/portfolio.content'

const props = withDefaults(defineProps<{ locale?: 'en' | 'es' }>(), { locale: 'en' })
const copy = computed(() => homeJourneyCopy[props.locale])

const icons = ['gamepad', 'sigma', 'terminal', 'database', 'cloud', 'ai', 'rocket'] as const
</script>

<template>
  <ol class="hr-journey-preview">
    <li v-for="(stage, index) in journeyStages" :key="stage.id">
      <span class="hr-journey-stage-number">B{{ index + 1 }}</span>
      <span class="hr-journey-stage-icon"><PortfolioIcon :name="icons[index]" :size="23" /></span>
      <strong>{{ copy.stages[index] }}</strong>
    </li>
  </ol>
  <a class="hr-inline-link" href="/journey/">{{ copy.action }} →</a>
</template>
