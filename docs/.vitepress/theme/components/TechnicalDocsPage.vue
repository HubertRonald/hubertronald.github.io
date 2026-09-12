<script setup lang="ts">
import technicalDocsRegistry from '../../../../technical_docs_source_registry.json'
import LandingHeader from './LandingHeader.vue'
import LandingFooter from './LandingFooter.vue'
import PageMasthead from './PageMasthead.vue'
import MobilePortfolioNav from './MobilePortfolioNav.vue'
import PortfolioIcon from './PortfolioIcon.vue'

const sources = technicalDocsRegistry.sources.filter(
  (source) => source.enabled && source.publication_status === 'published'
)

function documentationTypeLabel(type: string) {
  if (type === 'library_reference') return 'Library reference'
  if (type === 'project_documentation') return 'Project documentation'
  if (type === 'field_guide') return 'Field guide'
  return 'Technical documentation'
}

function sourceModeLabel(mode: string, sourceRef: string | null) {
  if (mode === 'snapshot_sync') return `Pinned snapshot · ${sourceRef}`
  if (mode === 'moving_ref_sync') return `Synchronized source · ${sourceRef}`
  if (mode === 'local_curated_remote_assets') return 'Locally curated · remote assets'
  if (mode === 'local_curated') return 'Locally curated'
  return 'Published documentation'
}
</script>

<template>
  <div class="hr-portfolio-page hr-editorial-page hr-technical-docs-page">
    <LandingHeader active="docs" />

    <main class="hr-shell-compact hr-portfolio-main">
      <PageMasthead
        family="Technical Docs"
        title="Technical Docs"
        summary="Implementation-level documentation for selected systems, libraries, and technical projects in this portfolio."
        scope="Project Atlas maps evidence; Builder Journey maps practice evolution. This area explains implementation depth where real documentation exists."
      />

      <section class="hr-technical-docs-ledger" aria-labelledby="published-docs-title">
        <header class="hr-technical-docs-section-heading">
          <p class="hr-eyebrow">Published documentation</p>
          <h2 id="published-docs-title">Documentation with a real source boundary.</h2>
          <p>Each entry below opens an existing documentation set. Source links remain secondary to the reading path.</p>
        </header>

        <div class="hr-technical-docs-rows">
          <article v-for="source in sources" :key="source.project_id" class="hr-technical-docs-row">
            <div class="hr-technical-docs-identity">
              <span class="hr-technical-docs-icon" aria-hidden="true">
                <PortfolioIcon name="book" :size="20" />
              </span>
              <div>
                <p class="hr-technical-docs-type">{{ documentationTypeLabel(source.documentation_type) }}</p>
                <h3>{{ source.display_name }}</h3>
              </div>
            </div>

            <div class="hr-technical-docs-copy">
              <p class="hr-technical-docs-scope">{{ source.documentation_scope }}</p>
              <p class="hr-technical-docs-domains">{{ source.technical_domain.join(' · ') }}</p>
              <p class="hr-technical-docs-boundary"><strong>Scope.</strong> {{ source.evidence_scope }}</p>
            </div>

            <div class="hr-technical-docs-meta">
              <span>{{ sourceModeLabel(source.source_mode, source.source_ref) }}</span>
              <nav :aria-label="`${source.display_name} documentation actions`">
                <a class="hr-technical-docs-action is-primary" :href="source.current_public_route">
                  <PortfolioIcon name="book" :size="17" />
                  <span>Open docs</span>
                  <span class="hr-technical-docs-action-arrow" aria-hidden="true">→</span>
                </a>
                <a
                  class="hr-technical-docs-action"
                  :href="source.source_repository"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PortfolioIcon name="github" :size="17" />
                  <span>Source repository</span>
                  <span class="hr-technical-docs-action-arrow" aria-hidden="true">↗</span>
                </a>
              </nav>
            </div>
          </article>
        </div>
      </section>

      <section class="hr-technical-docs-context" aria-labelledby="docs-context-title">
        <p class="hr-eyebrow">Portfolio context</p>
        <h2 id="docs-context-title">Depth without changing the evidence map.</h2>
        <p>Technical documentation can explain how a system works without changing its Project Atlas classification or its place in the Builder Journey.</p>
        <nav aria-label="Technical Docs related areas">
          <a href="/projects/"><PortfolioIcon name="work" :size="17" />Project Atlas</a>
          <a href="/journey/"><PortfolioIcon name="journey" :size="17" />Builder Journey</a>
        </nav>
      </section>
    </main>

    <LandingFooter />
    <MobilePortfolioNav active="docs" />
  </div>
</template>
