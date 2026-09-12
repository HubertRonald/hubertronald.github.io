<script setup lang="ts">
import PortfolioIcon from './PortfolioIcon.vue'

type AtlasIndexItem = {
  id: string
  label: string
  summary: string
  icon: 'release' | 'layers' | 'work' | 'journey' | 'users' | 'creative' | 'clock' | 'archive'
}

const items: AtlasIndexItem[] = [
  { id: 'featured', label: 'Featured', summary: '3 curated anchors', icon: 'release' },
  { id: 'primary-evidence', label: 'Primary Evidence', summary: 'Core project evidence', icon: 'layers' },
  { id: 'supporting-evidence', label: 'Supporting Evidence', summary: 'Focused supporting proof', icon: 'work' },
  { id: 'journey-evidence', label: 'Journey Evidence', summary: '7-stage evidence map', icon: 'journey' },
  { id: 'community', label: 'Community', summary: 'Public knowledge', icon: 'users' },
  { id: 'creative-roots', label: 'Creative Roots', summary: 'Creative software roots', icon: 'creative' },
  { id: 'historical-foundations', label: 'Historical Foundations', summary: 'Historical context', icon: 'clock' },
  { id: 'archive-gateway', label: 'Archive Gateway', summary: 'Archive and site history', icon: 'archive' }
]
</script>

<template>
  <nav class="hr-atlas-mobile-index" aria-label="Project Atlas sections">
    <a v-for="item in items" :key="item.id" :href="`#${item.id}`">
      <span class="hr-atlas-mobile-index-icon" aria-hidden="true">
        <PortfolioIcon :name="item.icon" :size="22" />
      </span>
      <span class="hr-atlas-mobile-index-copy">
        <strong>{{ item.label }}</strong>
        <small>{{ item.summary }}</small>
      </span>
      <span class="hr-atlas-mobile-index-arrow" aria-hidden="true">→</span>
    </a>
  </nav>
</template>
