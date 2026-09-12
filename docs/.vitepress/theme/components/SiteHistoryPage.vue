<script setup lang="ts">
import LandingHeader from './LandingHeader.vue'
import LandingFooter from './LandingFooter.vue'
import PageMasthead from './PageMasthead.vue'
import MobilePortfolioNav from './MobilePortfolioNav.vue'
import PortfolioIcon from './PortfolioIcon.vue'
</script>

<template>
  <div class="hr-portfolio-page hr-site-history-page">
    <LandingHeader />
    <main class="hr-shell-reading hr-portfolio-main">
      <PageMasthead
        family="Archive / Site History"
        title="Before the Landing"
        summary="The original under-construction stage is preserved as a historical artifact in the story of hubertronald.dev."
        scope="This canonical page contains the historical context; the old legacy path is not part of the final public information architecture."
      />

      <section class="hr-history-artifact" aria-labelledby="artifact-title">
        <div class="hr-artifact-label">HISTORICAL ARTIFACT / ROOT PLACEHOLDER</div>
        <div class="hr-artifact-frame">
          <p class="hr-artifact-kicker">hubertronald.dev · early public stage</p>
          <h2 id="artifact-title">Mientras cargan los datos...</h2>
          <p>The first public root was intentionally minimal: a temporary under-construction page before the portfolio and documentation system took shape.</p>
          <div class="hr-artifact-stamp">PRESERVED CONTEXT · NOT CURRENT HOME</div>
        </div>
      </section>

      <section class="hr-editorial-block hr-site-history-change" aria-labelledby="history-change-title">
        <p class="hr-eyebrow">What changed</p>
        <h2 id="history-change-title">A placeholder became an evidence system.</h2>
        <p>The current site separates Home, Project Atlas, Builder Journey, technical documentation and Archive so visitors can understand where they are, why the page exists and where to go next.</p>
        <nav class="hr-link-row hr-site-history-actions" aria-label="Site history destinations">
          <a href="/">
            <PortfolioIcon name="home" :size="17" />
            <span>Home</span>
          </a>
          <a href="/projects/">
            <PortfolioIcon name="work" :size="17" />
            <span>Project Atlas</span>
          </a>
          <a href="/archive/">
            <PortfolioIcon name="archive" :size="17" />
            <span>Atlas Archive</span>
          </a>
        </nav>
      </section>
    </main>
    <LandingFooter />
    <MobilePortfolioNav active="work" />
  </div>
</template>
