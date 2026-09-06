<script setup lang="ts">
import PortfolioIcon from './PortfolioIcon.vue'
import { featuredPresentation, portfolioProjects, portfolioRoles } from '../content/portfolio.content'

withDefaults(defineProps<{ locale?: 'en' | 'es'; headingLevel?: 'h2' | 'h3' }>(), {
  locale: 'en',
  headingLevel: 'h3'
})

const featuredIcons = {
  VersoVector: 'vector',
  'MIAD-RAG-RealEstate': 'layers',
  RetainAI: 'release'
} as const

const items = portfolioRoles.featured.map((id) => ({
  project: portfolioProjects[id],
  presentation: featuredPresentation[id as keyof typeof featuredPresentation],
  icon: featuredIcons[id as keyof typeof featuredIcons]
}))

function ctaHref(id: string, cta: string) {
  if (id === 'MIAD-RAG-RealEstate' && cta === 'Project Profile') return '/projects/miad-rag-real-estate/'
  return portfolioProjects[id].documentation || portfolioProjects[id].repository || '#'
}

const featuredBadge = (index: number) => 'F' + String(index + 1)
</script>

<template>
  <div class="hr-featured-stack hr-atlas-featured-stack">
    <article
      v-for="(item, index) in items"
      :key="item.project.id"
      class="hr-featured-item hr-atlas-featured-card"
      :class="`is-${item.presentation.variant}`"
    >
      <header class="hr-atlas-featured-header">
        <div class="hr-featured-index" aria-hidden="true">{{ featuredBadge(index) }}</div>
        <span class="hr-atlas-featured-icon" aria-hidden="true"><PortfolioIcon :name="item.icon" :size="21" /></span>
        <p class="hr-item-family">{{ item.presentation.family }}</p>
        <span v-if="item.project.releaseScope" class="hr-atlas-release-chip">{{ item.project.releaseScope }}</span>
      </header>

      <component :is="headingLevel" class="hr-featured-title">{{ item.project.name }}</component>
      <p class="hr-featured-tagline" :title="item.project.tagline">{{ item.project.tagline }}</p>

      <section v-if="item.project.id === 'VersoVector'" class="hr-atlas-proof-panel is-dossier" aria-label="VersoVector technical dossier">
        <p class="hr-atlas-proof-label">System evidence</p>
        <div class="hr-atlas-mini-flow" aria-label="VersoVector evidence path">
          <span><PortfolioIcon name="layers" :size="15" />Train</span>
          <i aria-hidden="true">→</i>
          <span>Package</span>
          <i aria-hidden="true">→</i>
          <span>Infer</span>
        </div>
        <div class="hr-atlas-evidence-grid" aria-label="Verified VersoVector evidence">
          <span v-for="evidence in item.project.evidence.slice(0, 4)" :key="evidence">{{ evidence }}</span>
        </div>
      </section>

      <section v-else-if="item.project.id === 'MIAD-RAG-RealEstate'" class="hr-atlas-proof-panel is-architecture" aria-label="MIAD-RAG architecture evidence">
        <p class="hr-atlas-proof-label">Architecture evidence</p>
        <div class="hr-atlas-mini-stack">
          <div><strong>Application</strong><small>FastAPI · Streamlit</small></div>
          <div><strong>RAG service</strong><small>FAISS · Gemini</small></div>
          <div><strong>Cloud modernization</strong><small>BigQuery · Cloud Run</small></div>
        </div>
        <div class="hr-atlas-boundary-row" aria-label="Contribution boundary">
          <span>Team outcome</span>
          <span>Individual 2026 modernization</span>
        </div>
      </section>

      <section v-else class="hr-atlas-proof-panel is-release" aria-label="RetainAI release evidence">
        <p class="hr-atlas-proof-label">Release scope</p>
        <div class="hr-atlas-release-summary">
          <span>Frozen release</span>
          <strong>{{ item.project.releaseScope }}</strong>
          <small>Later roadmap work stays outside Atlas.</small>
        </div>
        <div class="hr-atlas-evidence-grid is-release-grid" aria-label="Verified RetainAI evidence">
          <span v-for="evidence in item.project.evidence.slice(0, 4)" :key="evidence">{{ evidence }}</span>
        </div>
      </section>

      <div class="hr-link-row">
        <a :href="ctaHref(item.project.id, item.presentation.cta)">
          <PortfolioIcon :name="item.presentation.cta === 'Project Profile' ? 'layers' : 'book'" :size="15" />
          {{ item.presentation.cta }}
        </a>
        <a :href="item.project.repository || '#'" target="_blank" rel="noopener noreferrer">
          <PortfolioIcon name="github" :size="15" />
          Repository
        </a>
      </div>
    </article>
  </div>
</template>
