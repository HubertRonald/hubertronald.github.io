<script setup lang="ts">
import PortfolioIcon from './PortfolioIcon.vue'

withDefaults(defineProps<{ locale?: 'en' | 'es' }>(), { locale: 'en' })
</script>

<template>
  <nav class="hr-next-step-links" aria-label="Next steps">
    <a href="/projects/">
      <span class="hr-next-step-icon"><PortfolioIcon name="work" :size="28" /></span>
      <span class="hr-next-step-copy">
        <strong>Work</strong>
        <small>{{ locale === 'es' ? 'Explora proyectos, evidencia técnica y límites de alcance.' : 'Explore projects, technical evidence, and scope boundaries.' }}</small>
      </span>
      <span class="hr-next-step-arrow" aria-hidden="true">→</span>
    </a>
    <a href="/journey/">
      <span class="hr-next-step-icon"><PortfolioIcon name="journey" :size="28" /></span>
      <span class="hr-next-step-copy">
        <strong>Journey</strong>
        <small>{{ locale === 'es' ? 'Sigue el recorrido, los métodos y la evolución detrás del trabajo.' : 'Follow the thinking, methods, and evolution behind the work.' }}</small>
      </span>
      <span class="hr-next-step-arrow" aria-hidden="true">→</span>
    </a>
  </nav>
</template>
