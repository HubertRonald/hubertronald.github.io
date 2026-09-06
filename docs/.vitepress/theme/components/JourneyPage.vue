<script setup lang="ts">
import LandingHeader from './LandingHeader.vue'
import LandingFooter from './LandingFooter.vue'
import MobilePortfolioNav from './MobilePortfolioNav.vue'
import PortfolioIcon from './PortfolioIcon.vue'
import { journeyStages, portfolioProjects } from '../content/portfolio.content'

const project = (id: string) => portfolioProjects[id]

type PortfolioIconName =
  | 'home' | 'work' | 'journey' | 'creative' | 'gamepad' | 'gift' | 'sigma' | 'terminal'
  | 'database' | 'cloud' | 'ai' | 'rocket' | 'vector' | 'layers' | 'release' | 'users'
  | 'clock' | 'archive' | 'book' | 'github' | 'kaggle' | 'stackoverflow' | 'site'

const stagePresentation = [
  { badge: 'B1', icon: 'gamepad', brief: 'Early interactive software, mobile experiments and computational graphics.' },
  { badge: 'B2', icon: 'sigma', brief: 'Quantitative modeling, simulation and statistical analysis.' },
  { badge: 'B3', icon: 'terminal', brief: 'Reproducible infrastructure and local-to-cloud developer workflows.' },
  { badge: 'B4', icon: 'database', brief: 'Distributed data processing and scalable analytics.' },
  { badge: 'B5', icon: 'cloud', brief: 'Cloud-native data architecture and retrieval-augmented systems.' },
  { badge: 'B6', icon: 'ai', brief: 'Machine learning, NLP models and operationalization.' },
  { badge: 'B7', icon: 'rocket', brief: 'AI-native products and developer enablement platforms.' }
] as const

const projectIcons: Record<string, PortfolioIconName> = {
  'liasoft-site': 'creative',
  GradientMesh: 'creative',
  GiderosScalesTest: 'gamepad',
  Clock_Ellipse: 'clock',
  LuaSF: 'sigma',
  AppMarkowitz: 'sigma',
  relationalstats: 'vector',
  ModeloMarkowitz: 'sigma',
  clcR: 'users',
  'MIAD-ANS-ENV': 'terminal',
  'AI-CLI-Cloud': 'cloud',
  PostgreSQLPgAdmin: 'database',
  SparkWork: 'database',
  TemplateDockerDjango: 'terminal',
  LegacyBigDataLab: 'database',
  'MIAD-RAG-RealEstate': 'cloud',
  HackDayIAMindsInsuranceCarrier: 'release',
  VersoVector: 'vector',
  GenderMovieClassification: 'ai',
  VehiclePricePrediction: 'ai',
  'MIAD-DSA-2515-M35-MLflow': 'layers',
  RetainAI: 'release'
}

const projectIcon = (id: string) => projectIcons[id] || 'work'

function projectHref(id: string) {
  if (id === 'MIAD-RAG-RealEstate') return '/projects/miad-rag-real-estate/'
  return project(id).documentation || project(id).repository || '#'
}

function projectExternal(id: string) {
  return projectHref(id).startsWith('http')
}
</script>

<template>
  <div class="hr-portfolio-page hr-journey-page">
    <LandingHeader active="journey" />
    <main class="hr-shell-compact hr-portfolio-main hr-journey-main">
      <section class="hr-journey-intro" aria-labelledby="journey-title">
        <div class="hr-journey-intro-copy">
          <p class="hr-eyebrow">Builder Journey</p>
          <h1 id="journey-title">Seven stages. One progression.</h1>
          <p class="hr-journey-summary">
            A frozen journey across seven practice stages. Each stage is supported by primary projects and a focused set of supporting or related evidence.
          </p>
          <p class="hr-journey-freeze-note">
            Project placement follows the frozen Project Atlas Builder Journey evidence map.
          </p>
        </div>

        <aside class="hr-journey-legend" aria-label="How to read the Builder Journey">
          <p class="hr-eyebrow">How to read</p>
          <div><span class="hr-journey-legend-badge">B#</span><span>Practice stage</span></div>
          <div><PortfolioIcon name="work" :size="18" /><span>Primary evidence</span></div>
          <div><PortfolioIcon name="layers" :size="18" /><span>Supporting / bridge evidence</span></div>
        </aside>
      </section>

      <ol class="hr-journey-board">
        <li v-for="(stage, index) in journeyStages" :id="stage.id" :key="stage.id" class="hr-journey-band">
          <div class="hr-journey-rail" aria-hidden="true">
            <span class="hr-journey-band-badge">{{ stagePresentation[index].badge }}</span>
          </div>

          <header class="hr-journey-band-intro">
            <PortfolioIcon :name="stagePresentation[index].icon" :size="24" />
            <div>
              <p class="hr-eyebrow">Stage {{ stagePresentation[index].badge }}</p>
              <h2>{{ stage.name }}</h2>
              <p>{{ stagePresentation[index].brief }}</p>
            </div>
          </header>

          <section class="hr-journey-evidence-group is-primary" aria-label="Primary evidence">
            <h3>Primary evidence</h3>
            <div class="hr-journey-project-grid">
              <a
                v-for="id in stage.primary"
                :key="id"
                class="hr-journey-project-card"
                :href="projectHref(id)"
                :target="projectExternal(id) ? '_blank' : undefined"
                :rel="projectExternal(id) ? 'noopener noreferrer' : undefined"
              >
                <PortfolioIcon :name="projectIcon(id)" :size="20" />
                <span>{{ project(id).name }}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          <section class="hr-journey-evidence-group is-supporting" aria-label="Supporting and bridge evidence">
            <h3>{{ stage.bridge.length ? 'Supporting / bridge evidence' : 'Supporting evidence' }}</h3>
            <div class="hr-journey-project-grid">
              <a
                v-for="id in stage.supporting"
                :key="id"
                class="hr-journey-project-card is-supporting"
                :href="projectHref(id)"
                :target="projectExternal(id) ? '_blank' : undefined"
                :rel="projectExternal(id) ? 'noopener noreferrer' : undefined"
              >
                <PortfolioIcon :name="projectIcon(id)" :size="20" />
                <span>{{ project(id).name }}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div v-if="stage.bridge.length" class="hr-journey-bridge-row">
              <span>Bridge</span>
              <a
                v-for="id in stage.bridge"
                :key="id"
                class="hr-journey-project-card is-bridge"
                :href="projectHref(id)"
                :target="projectExternal(id) ? '_blank' : undefined"
                :rel="projectExternal(id) ? 'noopener noreferrer' : undefined"
              >
                <PortfolioIcon :name="projectIcon(id)" :size="20" />
                <span>{{ project(id).name }}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          <p class="hr-journey-boundary"><strong>Scope boundary</strong><span>{{ stage.boundary }}</span></p>
        </li>
      </ol>

    </main>
    <LandingFooter />
    <MobilePortfolioNav active="journey" />
  </div>
</template>
