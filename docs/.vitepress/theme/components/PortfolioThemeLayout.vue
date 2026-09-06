<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import technicalDocsRegistry from '../../../../technical_docs_source_registry.json'
import DepthContextStrip from './DepthContextStrip.vue'
import DocsFooter from './DocsFooter.vue'
import MobilePortfolioNav from './MobilePortfolioNav.vue'

const route = useRoute()

const docsContexts = technicalDocsRegistry.sources
  .filter((source) => source.enabled && source.publication_status === 'published')
  .map((source) => ({
    prefix: source.current_public_route,
    project: source.display_name,
    stages: source.builder_journey_stages,
    scope: source.evidence_scope,
    sourceRepository: source.source_repository
  }))

const context = computed(() => docsContexts.find((item) => route.path.startsWith(item.prefix)) || null)
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <DepthContextStrip
        v-if="context"
        :project="context.project"
        :stages="context.stages"
        :scope="context.scope"
      />
    </template>
    <template #doc-after>
      <DocsFooter v-if="context" :source-repository="context.sourceRepository" />
    </template>
  </DefaultTheme.Layout>
  <MobilePortfolioNav v-if="context" active="docs" />
</template>
