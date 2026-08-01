<script setup lang="ts">
defineProps<{
  src?: string
  label?: string
}>()
</script>

<template>
  <span
    v-if="src"
    class="hr-landing-icon"
    :style="{ '--hr-icon-url': `url(${src})` }"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  />
</template>
