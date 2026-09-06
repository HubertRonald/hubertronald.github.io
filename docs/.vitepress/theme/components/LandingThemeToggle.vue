<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const label = computed(() =>
  isDark.value ? 'Switch to light mode' : 'Switch to dark mode'
)

function toggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <button
    class="hr-theme-toggle"
    type="button"
    :aria-label="label"
    :title="label"
    @click="toggleTheme"
  >
    <svg v-if="isDark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />
    </svg>
    <svg v-else viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  </button>
</template>
