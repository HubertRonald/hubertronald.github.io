<script setup lang="ts">
withDefaults(defineProps<{
  name: 'home' | 'work' | 'journey' | 'creative' | 'gamepad' | 'gift' | 'sigma' | 'terminal' | 'database' | 'cloud' | 'ai' | 'rocket' | 'vector' | 'layers' | 'release' | 'users' | 'clock' | 'archive' | 'book' | 'github' | 'kaggle' | 'stackoverflow' | 'site'
  size?: number
}>(), {
  size: 22
})
</script>

<template>
  <svg
    class="hr-portfolio-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="name === 'home'">
      <path d="m3.5 10.5 8.5-7 8.5 7" />
      <path d="M5.5 9.2V20h13V9.2M9.5 20v-6h5v6" />
    </template>

    <template v-else-if="name === 'work'">
      <path d="M9 6V4.75A1.75 1.75 0 0 1 10.75 3h2.5A1.75 1.75 0 0 1 15 4.75V6" />
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 11.25h18M10 11.25v2.5h4v-2.5" />
    </template>

    <template v-else-if="name === 'journey'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.8 8.2-2.1 5.5-5.5 2.1 2.1-5.5 5.5-2.1Z" />
    </template>

    <template v-else-if="name === 'creative'">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
      <circle cx="12" cy="12" r="3" />
    </template>

    <template v-else-if="name === 'gamepad'">
      <path d="M8.3 8.2h7.4c2.1 0 3.7 1.2 4.2 3.1l.8 3.2c.5 2-.2 3.5-1.8 3.5-1.2 0-2.1-.8-3-2l-1-1.3H9.1l-1 1.3c-.9 1.2-1.8 2-3 2-1.6 0-2.3-1.5-1.8-3.5l.8-3.2c.5-1.9 2.1-3.1 4.2-3.1Z" />
      <path d="M7.2 11v4M5.2 13h4M16.5 11.7h.01M18.4 14.1h.01" />
    </template>

    <template v-else-if="name === 'gift'">
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3 9h18v4H3zM12 9v11" />
      <path d="M12 9H8.6A2.6 2.6 0 1 1 11 5.5L12 9ZM12 9h3.4A2.6 2.6 0 1 0 13 5.5L12 9Z" />
    </template>

    <template v-else-if="name === 'sigma'">
      <path d="M18.5 5H6.2l5.2 7-5.2 7h12.3" />
    </template>

    <template v-else-if="name === 'terminal'">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </template>

    <template v-else-if="name === 'database'">
      <ellipse cx="12" cy="5.5" rx="6.5" ry="2.5" />
      <path d="M5.5 5.5v6c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-6M5.5 11.5v6c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-6" />
    </template>

    <template v-else-if="name === 'cloud'">
      <path d="M7.1 18H17a4 4 0 0 0 .6-8 6 6 0 0 0-11.4 1.4A3.4 3.4 0 0 0 7.1 18Z" />
    </template>

    <template v-else-if="name === 'ai'">
      <circle cx="7" cy="7" r="2" />
      <circle cx="17" cy="7" r="2" />
      <circle cx="12" cy="17" r="2" />
      <path d="m8.8 8.1 2.1 6.8M15.2 8.1l-2.1 6.8M9 7h6" />
    </template>

    <template v-else-if="name === 'rocket'">
      <path d="M14.5 4.3c2-1.2 4.2-1.3 5.2-1.2.1 1-.1 3.2-1.3 5.2l-5.6 9.2-6.3-6.3 8-6.9Z" />
      <path d="M9.1 9.9 5.6 9 3 11.6l4 1.5M14.1 14.9l.9 3.5-2.6 2.6-1.5-4" />
      <circle cx="15.5" cy="7.5" r="1.5" />
    </template>

    <template v-else-if="name === 'vector'">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="m6.5 10.7 4-3.4M13.5 7.3l4 3.4M17.5 13.3l-4 3.4M10.5 16.7l-4-3.4" />
    </template>

    <template v-else-if="name === 'layers'">
      <path d="m12 3 8 4-8 4-8-4 8-4Z" />
      <path d="m4 11 8 4 8-4M4 15l8 4 8-4" />
    </template>

    <template v-else-if="name === 'release'">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 9h8M8 13h5M8 17h3" />
      <circle cx="16.5" cy="16.5" r="1.5" />
    </template>

    <template v-else-if="name === 'users'">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M3.5 20c.5-4 2.5-6 5.5-6s5 2 5.5 6M14.2 14.7c2.9-.5 5.2 1.2 6.3 4.3" />
    </template>

    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </template>

    <template v-else-if="name === 'archive'">
      <path d="M4 7h16v13H4zM3 4h18v4H3z" />
      <path d="M9 12h6" />
    </template>

    <template v-else-if="name === 'book'">
      <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23.5v-18ZM20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5a3.5 3.5 0 0 1 3.5 3.5v-18Z" />
    </template>

    <template v-else-if="name === 'kaggle'">
      <path d="M7 4v16M7 13l7-7M8.5 11.5 16 20" />
    </template>

    <template v-else-if="name === 'stackoverflow'">
      <path d="M7 18h10v2H7zM8 15h8M9 12.2l7 .8M10.2 9.4l6.6 2.4M12.1 6.8l5.7 4" />
    </template>

    <template v-else-if="name === 'site'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4M12 3.5c2.1 2.2 3.2 5 3.2 8.5S14.1 18.3 12 20.5C9.9 18.3 8.8 15.5 8.8 12S9.9 5.7 12 3.5Z" />
    </template>

    <template v-else>
      <path d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 6v-3.9c0-1.1.1-1.6-.5-2.3 2.8-.3 5.7-1.4 5.7-6A4.7 4.7 0 0 0 19 6.5 4.4 4.4 0 0 0 18.9 3S17.8 2.7 15 4.5a12 12 0 0 0-6 0C6.2 2.7 5.1 3 5.1 3A4.4 4.4 0 0 0 5 6.5 4.7 4.7 0 0 0 3.8 9.8c0 4.6 2.9 5.7 5.7 6-.6.7-.6 1.4-.5 2.3V22" />
    </template>
  </svg>
</template>
