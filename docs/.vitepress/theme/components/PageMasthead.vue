<script setup lang="ts">
defineProps<{
  family: string
  title: string
  summary: string
  scope?: string
}>()
</script>

<template>
  <header class="hr-page-masthead">
    <p class="hr-eyebrow">{{ family }}</p>
    <h1>{{ title }}</h1>
    <p class="hr-masthead-summary">{{ summary }}</p>
    <p v-if="scope" class="hr-scope-note">{{ scope }}</p>
  </header>
</template>
