<script setup lang="ts">
import LandingHeader from './LandingHeader.vue'
import LandingFooter from './LandingFooter.vue'
import PageMasthead from './PageMasthead.vue'
import MobilePortfolioNav from './MobilePortfolioNav.vue'
import { portfolioProjects } from '../content/portfolio.content'
const project = portfolioProjects['MIAD-RAG-RealEstate']
</script>

<template>
  <div class="hr-portfolio-page hr-project-profile">
    <LandingHeader active="work" />
    <main class="hr-shell-reading hr-portfolio-main">
      <PageMasthead
        family="Project Atlas / Featured Profile"
        :title="project.name"
        :summary="project.tagline"
        scope="Frozen Atlas profile. No current live application or final RAGAS metric is claimed."
      />

      <section class="hr-profile-section" aria-labelledby="profile-boundary-title">
        <p class="hr-eyebrow">Contribution boundary</p>
        <h2 id="profile-boundary-title">Team outcome and individual modernization stay separate.</h2>
        <p>{{ project.contributionBoundary }}</p>
      </section>

      <section class="hr-profile-section" aria-labelledby="profile-evidence-title">
        <p class="hr-eyebrow">Verified evidence</p>
        <h2 id="profile-evidence-title">What the frozen record supports.</h2>
        <p>{{ project.summary }}</p>
        <ul class="hr-profile-evidence"><li v-for="evidence in project.evidence" :key="evidence">{{ evidence }}</li></ul>
      </section>

      <section class="hr-profile-section" aria-labelledby="profile-scope-title">
        <p class="hr-eyebrow">Scope boundary</p>
        <h2 id="profile-scope-title">What this page does not claim.</h2>
        <ul><li v-for="claim in project.notSupported" :key="claim">{{ claim }}</li></ul>
        <p class="hr-scope-note">{{ project.statusNote }}</p>
      </section>

      <div class="hr-link-row hr-profile-actions">
        <a :href="project.repository || '#'" target="_blank" rel="noopener noreferrer">Repository</a>
        <a href="/projects/">Back to Project Atlas</a>
      </div>
    </main>
    <LandingFooter />
    <MobilePortfolioNav active="work" />
  </div>
</template>
