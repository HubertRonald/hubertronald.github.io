<script setup lang="ts">
import { computed } from 'vue'
import PortfolioIcon from './PortfolioIcon.vue'

const props = withDefaults(defineProps<{
  locale?: 'en' | 'es'
  copy: {
    greeting: string
    title: string
    identity: string
    summary: string
    principles: string
    deliveryLabel: string
    deliverySteps: readonly string[]
    primaryAction: string
  }
}>(), {
  locale: 'en'
})

const rail = computed(() => props.locale === 'es'
  ? [
      { label: 'Foco', icon: 'ai' as const, lines: ['AI Systems', 'Data & ML Platforms'] },
      { label: 'Práctica', icon: 'cloud' as const, lines: ['Data & Cloud Architecture', 'Platform Engineering'] },
      { label: 'Estilo de trabajo', icon: 'work' as const, lines: ['Forward-deployed', 'Evidence-driven', 'End-to-end'] }
    ]
  : [
      { label: 'Focus', icon: 'ai' as const, lines: ['AI Systems', 'Data & ML Platforms'] },
      { label: 'Practice', icon: 'cloud' as const, lines: ['Data & Cloud Architecture', 'Platform Engineering'] },
      { label: 'Operating style', icon: 'work' as const, lines: ['Forward-deployed', 'Evidence-driven', 'End-to-end'] }
    ])
</script>

<template>
  <section class="hr-human-hero" aria-labelledby="landing-title">
    <div class="hr-hero-copy">
      <p class="hr-eyebrow">{{ copy.greeting }}</p>
      <p class="hr-professional-identity">{{ copy.identity }}</p>
      <h1 id="landing-title">{{ copy.title }}</h1>
      <p class="hr-hero-summary">{{ copy.summary }}</p>
      <p class="hr-operating-principles">{{ copy.principles }}</p>
      <div class="hr-delivery-trace" :aria-label="copy.deliveryLabel">
        <span class="hr-delivery-trace-label"><PortfolioIcon name="work" :size="15" />{{ copy.deliveryLabel }}</span>
        <ol>
          <li v-for="(step, index) in copy.deliverySteps" :key="step">
            <span>{{ step }}</span><i v-if="index < copy.deliverySteps.length - 1" aria-hidden="true">→</i>
          </li>
        </ol>
      </div>
      <div class="hr-actions">
        <a class="hr-action-primary" href="/projects/"><PortfolioIcon name="work" :size="17" />{{ copy.primaryAction }}</a>
        <a class="hr-action-secondary" href="/journey/"><PortfolioIcon name="journey" :size="17" />Builder Journey</a>
      </div>
    </div>

    <figure class="hr-owner-portrait">
      <div class="hr-owner-portrait-frame">
        <img
          src="/images/profile/rony-white-shirt-green-bg.jpg"
          alt="Portrait of Hubert Ronald"
          width="1536"
          height="1024"
        >
        <svg class="hr-owner-blueprint-traces" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
          <path class="is-primary" d="M3 31V8H27 M72 6H95V23 M96 88V108 M88 119H69 M31 120H9V104" />
          <path class="is-secondary" d="M7 78C14 73 17 64 18 53 M82 17C87 26 89 35 90 45 M13 113C26 108 39 109 51 114" />
          <path class="is-construction" d="M8 15H22 M11 12V29 M79 11H91 M90 8V18 M8 96H17 M84 112H95" />
          <path class="is-hatch" d="M70 119L93 96 M76 121L96 101 M82 121L97 106 M88 120L97 111" />
          <circle cx="18" cy="53" r="1.1" />
          <circle cx="90" cy="45" r="1.1" />
        </svg>
      </div>
      <figcaption>Hubert Ronald</figcaption>
    </figure>

    <aside class="hr-hero-rail" :aria-label="locale === 'es' ? 'Contexto profesional' : 'Professional context'">
      <div v-for="item in rail" :key="item.label" class="hr-hero-rail-group">
        <p><PortfolioIcon :name="item.icon" :size="14" />{{ item.label }}</p>
        <span v-for="line in item.lines" :key="line">{{ line }}</span>
      </div>
    </aside>
  </section>
</template>
