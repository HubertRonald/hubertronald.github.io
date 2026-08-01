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
    <span aria-hidden="true">{{ isDark ? '☾' : '☼' }}</span>
  </button>
</template>
