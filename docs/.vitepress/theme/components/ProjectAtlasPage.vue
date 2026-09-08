<script setup lang="ts">
import LandingHeader from './LandingHeader.vue'
import LandingFooter from './LandingFooter.vue'
import PageMasthead from './PageMasthead.vue'
import LocalSectionIndex from './LocalSectionIndex.vue'
import AtlasMobileIndex from './AtlasMobileIndex.vue'
import MobilePortfolioNav from './MobilePortfolioNav.vue'
import FeaturedShowcase from './FeaturedShowcase.vue'
import PortfolioIcon from './PortfolioIcon.vue'
import { atlasSections, journeyStages, portfolioProjects, portfolioRoles } from '../content/portfolio.content'

const project = (id: string) => portfolioProjects[id]

const primaryIcons = {
  'AI-CLI-Cloud': 'terminal',
  AppMarkowitz: 'sigma',
  LegacyBigDataLab: 'database',
  relationalstats: 'vector'
} as const

const supportingIcons = {
  GenderMovieClassification: 'ai',
  HackDayIAMindsInsuranceCarrier: 'cloud'
} as const

const historicalIcons = {
  AzureCLI: 'cloud',
  RenameFiles: 'release',
  TemplateDockerDjango: 'work'
} as const

const journeyShortNames: Record<string, string> = {
  GenderMovieClassification: 'Movie Genre Classification',
  HackDayIAMindsInsuranceCarrier: 'HackDay AI Minds',
  'MIAD-DSA-2515-M35-MLflow': 'MLflow Lab',
  PentahoPostgreSQLETLLab: 'Pentaho ETL Lab',
  PostgreSQLPgAdmin: 'PostgreSQL + pgAdmin',
  VehiclePricePrediction: 'Vehicle Price Prediction',
  'liasoft-site': 'Liasoft'
}

const primaryIcon = (id: string) => primaryIcons[id as keyof typeof primaryIcons]
const supportingIcon = (id: string) => supportingIcons[id as keyof typeof supportingIcons]
const historicalIcon = (id: string) => historicalIcons[id as keyof typeof historicalIcons]
const projectLabel = (id: string) => journeyShortNames[id] || project(id).name
const projectHref = (id: string) => project(id).documentation || project(id).repository || '#'

// Presentation-only evidence anchors mirror the approved Atlas mockup. The
// canonical journey metadata remains unchanged; this only controls the compact
// set shown in the Work evidence map.
const journeyEvidenceAnchors: Record<string, string[]> = {
  'stage-01': ['liasoft-site', 'LuaSF'],
  'stage-02': ['AppMarkowitz', 'relationalstats'],
  'stage-03': ['MIAD-ANS-ENV', 'AI-CLI-Cloud'],
  'stage-04': ['LegacyBigDataLab', 'SparkWork'],
  'stage-05': ['MIAD-RAG-RealEstate', 'HackDayIAMindsInsuranceCarrier'],
  'stage-06': ['VersoVector', 'GenderMovieClassification'],
  'stage-07': ['RetainAI', 'HackDayIAMindsInsuranceCarrier']
}
const stageProjects = (stage: (typeof journeyStages)[number]) => journeyEvidenceAnchors[stage.id] || []

const journeyStageIcons = ['gamepad', 'sigma', 'terminal', 'database', 'cloud', 'ai', 'rocket'] as const
</script>

<template>
  <div class="hr-portfolio-page hr-atlas-page">
    <LandingHeader active="work" />
    <main class="hr-shell-wide hr-portfolio-main">
      <div class="hr-atlas-intro-grid">
        <PageMasthead
          family="Work / Project Atlas"
          title="Evidence-led projects across data and AI systems."
          summary="A frozen hierarchy of work organized by evidence, with each project shown at the level of detail needed for context and traceability."
          scope="Frozen evidence model · curated by evidence, not promotion."
        />
        <aside class="hr-atlas-role-note" aria-label="Professional positioning">
          <p class="hr-eyebrow">Role</p>
          <p>I design and build data and AI systems that turn complexity into clarity and action.</p>
        </aside>
        <LocalSectionIndex :sections="atlasSections" />
        <AtlasMobileIndex />
      </div>

      <section id="featured" class="hr-atlas-section hr-atlas-featured" aria-labelledby="atlas-featured-title">
        <div class="hr-atlas-band-heading">
          <span class="hr-atlas-band-number">01</span>
          <span class="hr-atlas-band-icon" aria-hidden="true"><PortfolioIcon name="release" :size="21" /></span>
          <div><h2 id="atlas-featured-title">Featured</h2><p>Three evidence anchors · three proof patterns.</p></div>
        </div>
        <FeaturedShowcase />
      </section>

      <section id="primary-evidence" class="hr-atlas-section hr-atlas-primary" aria-labelledby="primary-title">
        <div class="hr-atlas-band-heading">
          <span class="hr-atlas-band-number">02</span>
          <span class="hr-atlas-band-icon" aria-hidden="true"><PortfolioIcon name="layers" :size="21" /></span>
          <div><h2 id="primary-title">Primary Evidence</h2><p>Four core projects · one-line technical signal.</p></div>
        </div>
        <div class="hr-atlas-primary-strip">
          <article v-for="id in portfolioRoles.primary" :key="id" class="hr-atlas-primary-card">
            <span class="hr-atlas-project-symbol" aria-hidden="true">
              <PortfolioIcon :name="primaryIcon(id)" :size="22" />
            </span>
            <div>
              <h3 :title="project(id).name">{{ project(id).name }}</h3>
              <p :title="project(id).tagline">{{ project(id).tagline }}</p>
            </div>
            <a :href="projectHref(id)" :target="project(id).documentation ? undefined : '_blank'" :rel="project(id).documentation ? undefined : 'noopener noreferrer'" aria-label="Open project depth">→</a>
          </article>
        </div>
      </section>

      <section id="supporting-evidence" class="hr-atlas-section hr-atlas-supporting" aria-labelledby="supporting-title">
        <div class="hr-atlas-band-heading">
          <span class="hr-atlas-band-number">03</span>
          <span class="hr-atlas-band-icon" aria-hidden="true"><PortfolioIcon name="work" :size="21" /></span>
          <div><h2 id="supporting-title">Supporting Evidence</h2><p>Focused breadth · supporting proof.</p></div>
        </div>
        <div class="hr-atlas-supporting-strip">
          <article v-for="id in portfolioRoles.supporting" :key="id" class="hr-atlas-supporting-card">
            <span class="hr-atlas-project-symbol" aria-hidden="true">
              <PortfolioIcon :name="supportingIcon(id)" :size="22" />
            </span>
            <div>
              <h3 :title="project(id).name">{{ project(id).name }}</h3>
              <p :title="project(id).tagline">{{ project(id).tagline }}</p>
            </div>
            <span class="hr-atlas-supporting-evidence">Evidence · Code / Docs</span>
            <a :href="project(id).repository || '#'" target="_blank" rel="noopener noreferrer" aria-label="Open repository">→</a>
          </article>
        </div>
      </section>

      <section id="journey-evidence" class="hr-atlas-section hr-atlas-journey-map" aria-labelledby="journey-evidence-title">
        <div class="hr-atlas-band-heading">
          <span class="hr-atlas-band-number">04</span>
          <span class="hr-atlas-band-icon" aria-hidden="true"><PortfolioIcon name="journey" :size="21" /></span>
          <div><h2 id="journey-evidence-title">Journey Evidence</h2><p>Seven stages · selected project anchors.</p></div>
        </div>
        <div class="hr-atlas-stage-line" aria-label="Seven-stage evidence map">
          <article v-for="(stage, index) in journeyStages" :key="stage.id">
            <header>
              <span class="hr-atlas-stage-number">B{{ index + 1 }}</span>
              <span class="hr-atlas-stage-icon" aria-hidden="true"><PortfolioIcon :name="journeyStageIcons[index]" :size="18" /></span>
              <h3>{{ stage.name }}</h3>
            </header>
            <ul>
              <li v-for="id in stageProjects(stage)" :key="id">
                <a :href="projectHref(id)" :target="project(id).documentation ? undefined : '_blank'" :rel="project(id).documentation ? undefined : 'noopener noreferrer'">{{ projectLabel(id) }}</a>
              </li>
            </ul>
          </article>
        </div>
        <a class="hr-inline-link" href="/journey/">See the Builder Journey →</a>
      </section>

      <div class="hr-atlas-dual-band">
        <section id="community" class="hr-atlas-section hr-atlas-compact-band hr-community-band" aria-labelledby="community-title">
          <div class="hr-atlas-band-heading">
            <span class="hr-atlas-band-number">05</span>
            <span class="hr-atlas-band-icon" aria-hidden="true"><PortfolioIcon name="users" :size="21" /></span>
            <div><h2 id="community-title">Community</h2><p>Knowledge shared in public.</p></div>
          </div>
          <div class="hr-atlas-mini-list">
            <article v-for="id in portfolioRoles.community" :key="id">
              <span aria-hidden="true"><PortfolioIcon name="users" :size="21" /></span>
              <div><h3 :title="project(id).name">{{ project(id).name }}</h3><p :title="project(id).tagline">{{ project(id).tagline }}</p></div>
              <a :href="project(id).repository || '#'" target="_blank" rel="noopener noreferrer">→</a>
            </article>
          </div>
        </section>

        <section id="creative-roots" class="hr-atlas-section hr-atlas-compact-band hr-creative-collection" aria-labelledby="creative-roots-title">
          <div class="hr-atlas-band-heading">
            <span class="hr-atlas-band-number">06</span>
            <span class="hr-atlas-band-icon" aria-hidden="true"><PortfolioIcon name="creative" :size="21" /></span>
            <div><h2 id="creative-roots-title">Creative Roots</h2><p>Liasoft anchors the collection.</p></div>
          </div>
          <div class="hr-atlas-mini-list hr-atlas-creative-list">
            <article v-for="id in ['liasoft-site', 'GradientMesh', 'GiderosScalesTest', 'Clock_Ellipse']" :key="id">
              <span aria-hidden="true"><PortfolioIcon :name="id === 'liasoft-site' ? 'creative' : 'gamepad'" :size="21" /></span>
              <div><h3 :title="project(id).name">{{ projectLabel(id) }}</h3><p :title="project(id).tagline">{{ project(id).tagline }}</p></div>
              <a :href="projectHref(id)" :target="project(id).documentation ? undefined : '_blank'" :rel="project(id).documentation ? undefined : 'noopener noreferrer'">→</a>
            </article>
          </div>
          <p class="hr-bridge-note"><strong>Bridge:</strong> <a href="/technical-docs/luasf/">LuaSF</a></p>
        </section>
      </div>

      <section id="historical-foundations" class="hr-atlas-section hr-atlas-historical" aria-labelledby="historical-title">
        <div class="hr-atlas-band-heading">
          <span class="hr-atlas-band-number">07</span>
          <span class="hr-atlas-band-icon" aria-hidden="true"><PortfolioIcon name="clock" :size="21" /></span>
          <div><h2 id="historical-title">Historical Foundations</h2><p>Quiet context for how the craft formed.</p></div>
        </div>
        <div class="hr-atlas-historical-strip">
          <article v-for="id in portfolioRoles.historical" :key="id">
            <span aria-hidden="true"><PortfolioIcon :name="historicalIcon(id)" :size="22" /></span>
            <div><h3 :title="project(id).name">{{ project(id).name }}</h3><p :title="project(id).tagline">{{ project(id).tagline }}</p></div>
            <a :href="project(id).repository || '#'" target="_blank" rel="noopener noreferrer">→</a>
          </article>
        </div>
      </section>

      <section id="archive-gateway" class="hr-atlas-section hr-atlas-archive-compact" aria-labelledby="archive-gateway-title">
        <span class="hr-atlas-band-number">08</span>
        <span class="hr-atlas-project-symbol" aria-hidden="true"><PortfolioIcon name="archive" :size="22" /></span>
        <div>
          <p class="hr-eyebrow">Archive Gateway</p>
          <h2 id="archive-gateway-title">Earlier experiments and retired work.</h2>
          <p>Frozen context · separate from current strategic evidence.</p>
        </div>
        <nav aria-label="Archive destinations">
          <a href="/archive/"><PortfolioIcon name="archive" :size="15" />Visit Archive →</a>
          <a href="/archive/under-construction/"><PortfolioIcon name="clock" :size="15" />Site History</a>
        </nav>
      </section>
    </main>
    <LandingFooter />
    <MobilePortfolioNav active="work" />
  </div>
</template>
