<script setup lang="ts">
defineProps<{
  project: string
  stages: { label: string; href: string }[]
  scope?: string
}>()
</script>

<template>
  <aside class="hr-depth-context" aria-label="Technical documentation context">
    <div class="hr-depth-context-main">
      <span class="hr-context-label">TECHNICAL DOCS</span>
      <strong>{{ project }}</strong>
    </div>
    <nav aria-label="Portfolio context">
      <a href="/technical-docs/">Back to Technical Docs</a>
      <a href="/projects/">Back to Project Atlas</a>
      <a v-for="stage in stages.slice(0, 2)" :key="stage.href" :href="stage.href">{{ stage.label }}</a>
    </nav>
    <p v-if="scope">{{ scope }}</p>
  </aside>
</template>
