<script setup lang="ts">
defineProps<{
  sourceRepository?: string
}>()
</script>

<template>
  <footer class="hr-docs-footer">
    <span>Technical documentation</span>
    <nav aria-label="Technical documentation footer">
      <a href="/technical-docs/">Technical Docs</a>
      <a href="/projects/">Project Atlas</a>
      <a href="/journey/">Builder Journey</a>
      <a v-if="sourceRepository" :href="sourceRepository" target="_blank" rel="noopener noreferrer">Source repository</a>
    </nav>
  </footer>
</template>
