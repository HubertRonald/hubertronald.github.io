<script setup lang="ts">
import { computed } from 'vue'
import { getLandingContent } from './content/landing.content'
import type { LandingLocale, LandingLink } from './content/landing.types'

const props = defineProps<{
  locale: LandingLocale
}>()

const content = computed(() => getLandingContent(props.locale))

function linkTarget(link: LandingLink): string | undefined {
  return link.external ? '_blank' : undefined
}

function linkRel(link: LandingLink): string | undefined {
  return link.external ? 'noopener noreferrer' : undefined
}
</script>

<template>
  <div class="hr-landing" :lang="content.lang">
    <header class="hr-landing-header" aria-label="Landing navigation">
      <a class="hr-landing-brand" href="/" aria-label="Hubert Ronald home">
        {{ content.siteName }}
      </a>

      <nav class="hr-landing-nav" aria-label="Primary">
        <a :href="content.nav.work.href">
          {{ content.nav.work.label }}
        </a>
        <a :href="content.nav.journey.href">
          {{ content.nav.journey.label }}
        </a>
        <a
          :href="content.nav.github.href"
          :target="linkTarget(content.nav.github)"
          :rel="linkRel(content.nav.github)"
        >
          {{ content.nav.github.label }}
        </a>
      </nav>

      <a class="hr-locale-switch" :href="content.alternateHref">
        {{ content.locale === 'en' ? 'ES' : 'EN' }}
      </a>
    </header>

    <main class="hr-landing-main">
      <section class="hr-landing-section hr-hero" aria-labelledby="landing-title">
        <p class="hr-eyebrow">
          {{ content.hero.eyebrow }}
        </p>

        <h1 id="landing-title">
          {{ content.hero.title }}
        </h1>

        <ul class="hr-role-list" aria-label="Professional roles">
          <li v-for="role in content.hero.roles" :key="role">
            {{ role }}
          </li>
        </ul>

        <p class="hr-hero-summary">
          {{ content.hero.summary }}
        </p>

        <p class="hr-signature">
          {{ content.hero.signature }}
        </p>

        <div class="hr-actions" aria-label="Primary actions">
          <a :href="content.hero.primaryAction.href">
            {{ content.hero.primaryAction.label }}
          </a>
          <a
            :href="content.hero.secondaryAction.href"
            :target="linkTarget(content.hero.secondaryAction)"
            :rel="linkRel(content.hero.secondaryAction)"
          >
            {{ content.hero.secondaryAction.label }}
          </a>
        </div>
      </section>

      <section class="hr-landing-section" aria-labelledby="selected-work-title">
        <p class="hr-eyebrow">
          {{ content.selectedWork.eyebrow }}
        </p>

        <h2 id="selected-work-title">
          {{ content.selectedWork.title }}
        </h2>

        <p>
          {{ content.selectedWork.description }}
        </p>

        <div class="hr-simple-grid">
          <article v-for="item in content.selectedWork.items" :key="item.name">
            <p class="hr-item-category">
              {{ item.category }}
            </p>
            <h3>
              <a
                :href="item.href"
                :target="linkTarget(item)"
                :rel="linkRel(item)"
              >
                {{ item.name }}
              </a>
            </h3>
            <p>
              {{ item.description }}
            </p>
          </article>
        </div>
      </section>

      <section class="hr-landing-section" aria-labelledby="capabilities-title">
        <p class="hr-eyebrow">
          {{ content.capabilities.eyebrow }}
        </p>

        <h2 id="capabilities-title">
          {{ content.capabilities.title }}
        </h2>

        <div class="hr-simple-grid">
          <article v-for="item in content.capabilities.items" :key="item.title">
            <h3>
              {{ item.title }}
            </h3>
            <p>
              {{ item.description }}
            </p>
          </article>
        </div>
      </section>

      <section class="hr-landing-section" aria-labelledby="journey-title">
        <p class="hr-eyebrow">
          {{ content.journey.eyebrow }}
        </p>

        <h2 id="journey-title">
          {{ content.journey.title }}
        </h2>

        <ol class="hr-journey-list">
          <li v-for="step in content.journey.steps" :key="step">
            {{ step }}
          </li>
        </ol>

        <a :href="content.journey.action.href">
          {{ content.journey.action.label }}
        </a>
      </section>

      <section class="hr-landing-section" aria-labelledby="foundations-title">
        <p class="hr-eyebrow">
          {{ content.foundations.eyebrow }}
        </p>

        <h2 id="foundations-title">
          {{ content.foundations.title }}
        </h2>

        <p>
          {{ content.foundations.description }}
        </p>

        <div class="hr-simple-grid">
          <article v-for="item in content.foundations.items" :key="item.name">
            <h3>
              {{ item.name }}
            </h3>
            <p>
              {{ item.description }}
            </p>
          </article>
        </div>

        <a :href="content.foundations.action.href">
          {{ content.foundations.action.label }}
        </a>
      </section>

      <section class="hr-landing-section" aria-labelledby="creative-title">
        <p class="hr-eyebrow">
          {{ content.creativeOrigins.eyebrow }}
        </p>

        <h2 id="creative-title">
          {{ content.creativeOrigins.title }}
        </h2>

        <p v-for="paragraph in content.creativeOrigins.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>

        <a
          :href="content.creativeOrigins.action.href"
          :target="linkTarget(content.creativeOrigins.action)"
          :rel="linkRel(content.creativeOrigins.action)"
        >
          {{ content.creativeOrigins.action.label }}
        </a>
      </section>
    </main>

    <footer class="hr-landing-footer">
      <p>
        {{ content.footer.title }}
      </p>

      <nav aria-label="Footer">
        <a
          v-for="link in content.footer.links"
          :key="link.label"
          :href="link.href"
          :target="linkTarget(link)"
          :rel="linkRel(link)"
        >
          {{ link.label }}
        </a>
      </nav>

      <p>
        {{ content.footer.closing }}
      </p>
    </footer>
  </div>
</template>
