<script setup lang="ts">
import PortfolioIcon from './PortfolioIcon.vue'

withDefaults(defineProps<{
  active?: 'home' | 'work' | 'journey' | 'docs' | null
}>(), {
  active: null
})

const items = [
  { id: 'home', label: 'Home', href: '/', icon: 'home', external: false },
  { id: 'work', label: 'Work', href: '/projects/', icon: 'work', external: false },
  { id: 'journey', label: 'Journey', href: '/journey/', icon: 'journey', external: false },
  { id: 'docs', label: 'Docs', href: '/technical-docs/', icon: 'book', external: false }
] as const
</script>

<template>
  <nav class="hr-mobile-portfolio-nav" aria-label="Mobile portfolio navigation">
    <a
      v-for="item in items"
      :key="item.id"
      :href="item.href"
      :aria-current="active === item.id ? 'page' : undefined"
      :target="item.external ? '_blank' : undefined"
      :rel="item.external ? 'noopener noreferrer' : undefined"
    >
      <PortfolioIcon :name="item.icon" :size="21" />
      <span>{{ item.label }}</span>
    </a>
  </nav>
</template>
