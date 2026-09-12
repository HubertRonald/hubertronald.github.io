<script setup lang="ts">
defineProps<{ sections: readonly (readonly [string, string])[] }>()
</script>

<template>
  <nav class="hr-local-index" aria-label="Atlas index">
    <span>Atlas index</span>
    <ol>
      <li v-for="([id, label], index) in sections" :key="id">
        <a :href="`#${id}`"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ label }}</a>
      </li>
    </ol>
  </nav>
</template>
