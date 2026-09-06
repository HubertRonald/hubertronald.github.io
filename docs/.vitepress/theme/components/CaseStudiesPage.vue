<script setup lang="ts">
import LandingHeader from './LandingHeader.vue'
import LandingFooter from './LandingFooter.vue'
import PageMasthead from './PageMasthead.vue'
import MobilePortfolioNav from './MobilePortfolioNav.vue'
import PortfolioIcon from './PortfolioIcon.vue'
</script>

<template>
  <div class="hr-portfolio-page hr-editorial-page hr-case-studies-page">
    <LandingHeader active="work" />
    <main class="hr-shell-reading hr-portfolio-main">
      <PageMasthead
        family="Editorial Index"
        title="Case Studies"
        summary="A supporting index for deeper technical writeups. It does not manufacture case studies that have not been published."
        scope="No new deep dive is promoted here without a real supported destination."
      />

      <section class="hr-editorial-block" aria-labelledby="available-depth-title">
        <p class="hr-eyebrow">Available depth</p>
        <h2 id="available-depth-title">Use the documentation that already exists.</h2>
        <div class="hr-case-study-rows">
          <article>
            <div><h3>VersoVector</h3><p>Technical documentation for the frozen ML/NLP/MLOps evidence chain.</p></div>
            <a class="hr-case-study-action" href="/technical-docs/versovector/">
              <PortfolioIcon name="book" :size="17" />
              <span>Technical Docs</span>
              <span class="hr-case-study-action-arrow" aria-hidden="true">→</span>
            </a>
          </article>
          <article>
            <div><h3>RetainAI</h3><p>Technical documentation is broader than the Atlas release boundary; portfolio evidence remains frozen to v0.4.0-alpha.1.</p></div>
            <a class="hr-case-study-action" href="/retainai/">
              <PortfolioIcon name="book" :size="17" />
              <span>Technical Docs</span>
              <span class="hr-case-study-action-arrow" aria-hidden="true">→</span>
            </a>
          </article>
          <article>
            <div><h3>relationalstats</h3><p>Statistical-network package documentation with explicit equivalence and approximation boundaries.</p></div>
            <a class="hr-case-study-action" href="/relationalstats/">
              <PortfolioIcon name="book" :size="17" />
              <span>Technical Docs</span>
              <span class="hr-case-study-action-arrow" aria-hidden="true">→</span>
            </a>
          </article>
        </div>
      </section>

      <section class="hr-editorial-empty" aria-labelledby="case-study-state-title">
        <p class="hr-eyebrow">Publication state</p>
        <h2 id="case-study-state-title">No additional long-form case study is claimed here yet.</h2>
        <p>Project Atlas provides the evidence map; Builder Journey provides progression; technical documentation provides current depth where available.</p>
        <div class="hr-link-row hr-case-study-state-actions">
          <a href="/projects/">
            <PortfolioIcon name="work" :size="17" />
            <span>Project Atlas</span>
          </a>
          <a href="/journey/">
            <PortfolioIcon name="journey" :size="17" />
            <span>Builder Journey</span>
          </a>
        </div>
      </section>
    </main>
    <LandingFooter />
    <MobilePortfolioNav active="work" />
  </div>
</template>
