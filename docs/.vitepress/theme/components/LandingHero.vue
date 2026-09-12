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
          src="/images/profile/rony-white-shirt-portrait-final.png"
          alt="Portrait of Hubert Ronald"
          width="1536"
          height="1024"
        >
        <svg class="hr-owner-blueprint-traces" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
          <path class="is-primary" d="M4 29V9H24 M76 7H95V24 M96 87V108 M89 118H70 M30 120H9V104" />
          <path class="is-secondary" d="M7 53H23 M18 48V59 M78 44H94 M89 39V50 M42 116H58" />
          <path class="is-construction" d="M10 16H20 M13 12V28 M80 12H91 M90 8V19 M7 96H16 M84 111H95 M94 107V116" />
          <path class="is-hatch" d="M73 119L93 99 M80 120L96 104 M87 120L97 110" />
          <circle cx="18" cy="53" r="0.85" />
          <circle cx="89" cy="44" r="0.85" />
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
