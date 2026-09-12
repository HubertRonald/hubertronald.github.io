<script setup lang="ts">
import { computed } from 'vue'
import PortfolioIcon from './PortfolioIcon.vue'
import { portfolioFooterCopy } from '../content/portfolio.content'

const props = withDefaults(defineProps<{ locale?: 'en' | 'es' }>(), { locale: 'en' })
const copy = computed(() => portfolioFooterCopy[props.locale])
</script>

<template>
  <footer class="hr-portfolio-footer">
    <div class="hr-shell-wide hr-footer-grid">
      <div class="hr-footer-intro">
        <p class="hr-footer-kicker">Hubert Ronald</p>
        <p class="hr-footer-note">
          {{ locale === 'es' ? 'Sistemas de evidencia para problemas operativos reales y personas reales.' : 'Evidence systems for real operational problems and real people.' }}
        </p>
      </div>

      <nav class="hr-footer-column" aria-label="Portfolio navigation">
        <span>{{ copy.navigation }}</span>
        <a href="/projects/">Work</a>
        <a href="/journey/">Journey</a>
        <a href="/technical-docs/">Docs</a>
      </nav>

      <nav class="hr-footer-column" aria-label="Portfolio resources">
        <span>{{ copy.resources }}</span>
        <a href="/case-studies/">{{ copy.caseStudies }}</a>
        <a href="/archive/">{{ copy.archive }}</a>
      </nav>

      <nav class="hr-footer-column hr-footer-profiles" aria-label="Profiles">
        <span>{{ copy.profiles }}</span>
        <a href="https://github.com/HubertRonald" target="_blank" rel="noopener noreferrer"><PortfolioIcon name="github" :size="15" />GitHub</a>
        <a href="https://www.kaggle.com/hubertronald" target="_blank" rel="noopener noreferrer"><PortfolioIcon name="kaggle" :size="15" />Kaggle</a>
        <a href="https://es.stackoverflow.com/users/88852/hubertronald" target="_blank" rel="noopener noreferrer"><PortfolioIcon name="stackoverflow" :size="15" />Stack Overflow</a>
      </nav>

      <nav class="hr-footer-column hr-footer-sites" aria-label="Sites">
        <span>{{ copy.sites }}</span>
        <a href="https://retainai.hubertronald.dev/" target="_blank" rel="noopener noreferrer"><PortfolioIcon name="site" :size="15" />RetainAI</a>
        <a href="https://liasoft.hubertronald.dev/" target="_blank" rel="noopener noreferrer"><PortfolioIcon name="site" :size="15" />Liasoft</a>
        <a href="https://liasoft.itch.io/" target="_blank" rel="noopener noreferrer"><PortfolioIcon name="gift" :size="15" />{{ copy.liasoftItch }}</a>
      </nav>

      <div class="hr-footer-principles">
        <PortfolioIcon name="journey" :size="22" />
        <p>{{ locale === 'es' ? 'Evidencia primero. Pensamiento sistémico. Construido con usuarios. Impacto medible.' : 'Evidence first. Systems thinking. Built with users. Measurable impact.' }}</p>
      </div>
    </div>

    <div class="hr-shell-wide hr-footer-bottom">
      <span>© 2026 Hubert Ronald</span>
      <span>{{ copy.bottom }}</span>
    </div>
  </footer>
</template>
