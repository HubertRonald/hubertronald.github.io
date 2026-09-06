<script setup lang="ts">
import { computed } from 'vue'
import PortfolioIcon from './PortfolioIcon.vue'
import { featuredPresentation, homeFeaturedCopy, portfolioProjects, portfolioRoles } from '../content/portfolio.content'

const props = withDefaults(defineProps<{ locale?: 'en' | 'es'; headingLevel?: 'h2' | 'h3' }>(), {
  locale: 'en',
  headingLevel: 'h3'
})

const localized = computed(() => homeFeaturedCopy[props.locale])
const items = computed(() => portfolioRoles.featured.map((id) => ({
  project: portfolioProjects[id],
  presentation: featuredPresentation[id as keyof typeof featuredPresentation],
  copy: homeFeaturedCopy[props.locale].projects[id as keyof typeof homeFeaturedCopy.en.projects]
})))

function ctaLabel(cta: string) {
  if (cta === 'Technical Docs') return localized.value.common.technicalDocs
  if (cta === 'Project Profile') return localized.value.common.projectProfile
  return cta
}

const iconFor = {
  VersoVector: 'vector',
  'MIAD-RAG-RealEstate': 'layers',
  RetainAI: 'release'
} as const

function ctaHref(id: string, cta: string) {
  if (id === 'MIAD-RAG-RealEstate' && cta === 'Project Profile') return '/projects/miad-rag-real-estate/'
  return portfolioProjects[id].documentation || portfolioProjects[id].repository || '#'
}

const featuredBadge = (index: number) => 'F' + String(index + 1)
</script>

<template>
  <div class="hr-home-featured-grid">
    <article
      v-for="(item, index) in items"
      :key="item.project.id"
      class="hr-home-featured-item"
      :class="`is-${item.presentation.variant}`"
    >
      <header class="hr-home-featured-header">
        <span class="hr-home-featured-index">{{ featuredBadge(index) }}</span>
        <span class="hr-home-featured-icon" aria-hidden="true">
          <PortfolioIcon :name="iconFor[item.project.id as keyof typeof iconFor]" :size="21" />
        </span>
        <span class="hr-home-featured-type">{{ item.copy.family }}</span>
        <span v-if="item.project.releaseScope" class="hr-home-release-badge">{{ item.project.releaseScope }}</span>
      </header>

      <div class="hr-home-featured-copy">
        <component :is="headingLevel" class="hr-home-featured-title">{{ item.project.name }}</component>
        <p class="hr-home-featured-tagline">{{ item.copy.tagline }}</p>

        <template v-if="item.project.id === 'VersoVector'">
          <div class="hr-home-vv-layout">
            <div class="hr-home-vv-facts" aria-label="Verified evidence summary">
              <div v-for="(evidence, evidenceIndex) in item.copy.facts" :key="evidence">
                <span>0{{ evidenceIndex + 1 }}</span>
                <p>{{ evidence }}</p>
              </div>
            </div>
            <div class="hr-home-vv-flow" aria-label="Evidence path">
              <p>{{ item.copy.evidencePath }}</p>
              <div class="hr-home-flow-row">
                <span>{{ item.copy.flow[0] }}</span>
                <i aria-hidden="true">↓</i>
                <span>{{ item.copy.flow[1] }}</span>
                <i aria-hidden="true">↓</i>
                <span>{{ item.copy.flow[2] }}</span>
              </div>
              <div class="hr-home-flow-terminal">
                <PortfolioIcon name="terminal" :size="18" />
                <span>{{ item.copy.terminal }}</span>
              </div>
            </div>
          </div>
          <p class="hr-home-scope-note">{{ item.copy.status }}</p>
        </template>

        <template v-else-if="item.project.id === 'MIAD-RAG-RealEstate'">
          <div class="hr-home-rag-architecture" aria-label="Architecture evidence overview">
            <p>{{ item.copy.architectureTitle }}</p>
            <div class="hr-home-rag-layer is-application">
              <span>{{ item.copy.application }}</span>
              <small>FastAPI · Streamlit</small>
            </div>
            <div class="hr-home-rag-layer is-service">
              <span>{{ item.copy.ragService }}</span>
              <small>FAISS retrieval · Gemini generation</small>
            </div>
            <div class="hr-home-rag-layer is-cloud">
              <span>{{ item.copy.cloudModernization }}</span>
              <small>BigQuery · Cloud Storage · Cloud Run</small>
            </div>
            <div class="hr-home-rag-controls">
              <PortfolioIcon name="cloud" :size="15" />
              <span>{{ item.copy.deliveryControls }}</span>
              <small>Terraform · IAM · CI/CD</small>
            </div>
          </div>
          <div class="hr-home-contribution-boundary" aria-label="Contribution boundary">
            <div><span>{{ item.copy.teamLabel }}</span><p>{{ item.copy.teamText }}</p></div>
            <div><span>{{ item.copy.individualLabel }}</span><p>{{ item.copy.individualText }}</p></div>
          </div>
        </template>

        <template v-else>
          <div class="hr-home-release-scope-head">
            <span>{{ item.copy.releaseScope }}</span>
            <strong>{{ item.project.releaseScope }}</strong>
          </div>
          <p class="hr-home-scope-note">
            {{ item.copy.scopeNote }}
          </p>
          <ul class="hr-home-release-evidence" aria-label="Release-scoped evidence">
            <li v-for="evidence in item.copy.evidence" :key="evidence">
              <PortfolioIcon name="release" :size="15" />
              <span>{{ evidence }}</span>
            </li>
          </ul>
          <div class="hr-home-out-of-scope">
            <span>{{ item.copy.notClaimed }}</span>
            <ul>
              <li v-for="itemNotSupported in item.copy.notSupported" :key="itemNotSupported">{{ itemNotSupported }}</li>
            </ul>
          </div>
        </template>

        <div class="hr-home-link-row">
          <a :href="ctaHref(item.project.id, item.presentation.cta)">
            <PortfolioIcon :name="item.presentation.cta === 'Project Profile' ? 'layers' : 'book'" :size="15" />
            {{ ctaLabel(item.presentation.cta) }}
          </a>
          <a :href="item.project.repository || '#'" target="_blank" rel="noopener noreferrer">
            <PortfolioIcon name="github" :size="15" />
            {{ localized.common.repository }}
          </a>
        </div>
      </div>
    </article>
  </div>
</template>
