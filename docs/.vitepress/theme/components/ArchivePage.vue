<script setup lang="ts">
import LandingHeader from './LandingHeader.vue'
import LandingFooter from './LandingFooter.vue'
import MobilePortfolioNav from './MobilePortfolioNav.vue'
import PortfolioIcon from './PortfolioIcon.vue'
import { archiveRecords } from '../content/portfolio.content'

const archivePresentation: Record<string, { label: string; summary: string }> = {
  FoulJob: {
    label: 'Provenance boundary',
    summary: 'Historical prototype retained with unresolved third-party game / media asset provenance.'
  },
  LuaHMF: {
    label: 'Provenance boundary',
    summary: 'Minor Lua math utility retained with an unresolved initial-work provenance and licensing boundary.'
  },
  ProceduralCave: {
    label: 'Provenance boundary',
    summary: 'Procedural-generation experiment retained with unresolved upstream adapted-code and asset provenance.'
  },
  RepData_PeerAssessment1: {
    label: 'Preserved context',
    summary: 'Archived coursework retained for reproducible-report context and historical continuity.'
  },
  tiny_etl_mock_data: {
    label: 'Preserved context',
    summary: 'Mock / synthetic file-based data-preparation utility retained as supporting historical context.'
  }
}

function presentationFor(projectId: string) {
  return archivePresentation[projectId] ?? {
    label: 'Preserved context',
    summary: 'Archived Project Atlas record retained for context and historical continuity.'
  }
}
</script>

<template>
  <div class="hr-portfolio-page hr-archive-page">
    <LandingHeader />

    <main class="hr-shell-compact hr-portfolio-main hr-archive-main">
      <section class="hr-archive-intro" aria-labelledby="archive-title">
        <div class="hr-archive-intro-copy">
          <p class="hr-eyebrow">Archive / Preserved Context</p>
          <h1 id="archive-title">Archive</h1>
          <span class="hr-archive-title-rule" aria-hidden="true"></span>
          <p class="hr-archive-summary">
            A quiet record of past projects and research artifacts. These works remain here for transparency,
            attribution, provenance, and historical context—not current promotion.
          </p>

          <nav class="hr-archive-intro-actions" aria-label="Archive navigation">
            <a class="hr-archive-action is-primary" href="/projects/">
              <PortfolioIcon name="work" :size="18" />
              <span>Return to Project Atlas</span>
              <span aria-hidden="true">→</span>
            </a>
            <a class="hr-archive-action" href="/journey/">
              <PortfolioIcon name="journey" :size="18" />
              <span>Explore Builder Journey</span>
              <span aria-hidden="true">→</span>
            </a>
          </nav>
        </div>

        <aside class="hr-archive-about" aria-labelledby="archive-about-title">
          <div class="hr-archive-about-heading">
            <PortfolioIcon name="archive" :size="20" />
            <h2 id="archive-about-title">About this archive</h2>
          </div>
          <p>
            Archive placement means preserved context rather than active portfolio promotion. Items may carry
            provenance, scope, licensing, or distinctiveness boundaries that keep them outside the current Atlas.
          </p>
          <p class="hr-archive-about-caution">Use repository material with its documented boundaries in mind.</p>
        </aside>
      </section>

      <section class="hr-archive-ledger" aria-labelledby="archive-records-title">
        <header class="hr-archive-ledger-heading">
          <p class="hr-eyebrow">Frozen Atlas Archive</p>
          <span class="hr-archive-heading-mark" aria-hidden="true">⌟</span>
          <h2 id="archive-records-title" class="hr-visually-hidden">Frozen Atlas Archive records</h2>
        </header>

        <div class="hr-archive-table" role="table" aria-label="Frozen Atlas Archive">
          <div class="hr-archive-table-head" role="row">
            <span role="columnheader">Project</span>
            <span role="columnheader">Preserved context</span>
            <span role="columnheader">Repository action</span>
          </div>

          <article
            v-for="(record, index) in archiveRecords"
            :key="record.project_id"
            class="hr-archive-record"
            role="row"
          >
            <div class="hr-archive-project-cell" role="cell">
              <span class="hr-archive-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <h3>{{ record.canonical_name }}</h3>
                <span class="hr-archive-gate">{{ record.gate_class }} · archive</span>
              </div>
            </div>

            <div class="hr-archive-context-cell" role="cell">
              <div class="hr-archive-context-label">
                <span class="hr-archive-context-dot" aria-hidden="true"></span>
                {{ presentationFor(record.project_id).label }}
              </div>
              <p>{{ presentationFor(record.project_id).summary }}</p>
            </div>

            <div class="hr-archive-action-cell" role="cell">
              <a
                :href="record.repository"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`View ${record.canonical_name} repository`"
                title="View repository"
              >
                <PortfolioIcon name="github" :size="19" />
                <span>View repository</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>

        <p class="hr-archive-ledger-note">
          <PortfolioIcon name="archive" :size="17" />
          <span>Archive placement preserves context while keeping current strategic evidence separate.</span>
        </p>
      </section>

      <section class="hr-site-history-gateway" aria-labelledby="site-history-title">
        <header>
          <p class="hr-eyebrow">Site History</p>
          <span class="hr-archive-heading-mark" aria-hidden="true">⌟</span>
        </header>
        <a class="hr-site-history-row" href="/archive/under-construction/">
          <PortfolioIcon name="clock" :size="22" />
          <span class="hr-site-history-copy">
            <strong id="site-history-title">A record of site evolution, milestones, and structural changes over time.</strong>
            <small>The original under-construction stage remains preserved through its canonical history page.</small>
          </span>
          <span class="hr-site-history-action">
            <strong>View site history</strong>
            <small>/archive/under-construction/</small>
          </span>
          <span aria-hidden="true">→</span>
        </a>
      </section>
    </main>

    <LandingFooter />
    <MobilePortfolioNav active="work" />
  </div>
</template>
