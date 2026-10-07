<script setup lang="ts">
withDefaults(defineProps<{
  kind?: 'question' | 'request' | 'explore' | 'curiosity'
  title?: string
}>(), { kind: 'question' })

const labels = {
  question: 'Domanda',
  request: 'Richiesta',
  explore: 'Approfondimento',
  curiosity: 'Curiosità',
}
</script>

<template>
  <aside class="alert alert-soft cvedi-notice" role="note" :aria-label="title || labels[kind]" :data-kind="kind">
    <div class="cvedi-notice-copy">
      <h2 v-if="title">{{ title }}</h2>
      <slot />
    </div>
    <svg class="cvedi-notice-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <g v-if="kind === 'question'">
        <path d="M6 5h20a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H13l-7 5v-5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
        <path d="M12 11a4 4 0 0 1 8 0c0 3-4 3-4 6M16 20h.01" />
      </g>
      <g v-else-if="kind === 'request'">
        <path d="M19 6H7a3 3 0 0 0-3 3v17a3 3 0 0 0 3 3h17a3 3 0 0 0 3-3V14M10 13h5M10 19h2" />
        <path d="m15 21 1-6L26 5a3 3 0 0 1 4 4L20 19l-5 2ZM23 8l4 4" />
      </g>
      <g v-else-if="kind === 'explore'">
        <path d="M16 8C12 4 7 4 3 5v21c5-1 9 0 13 3 4-3 8-4 13-3V5c-4-1-9-1-13 3ZM16 8v21M7 11c2 0 4 1 5 2M7 17c2 0 4 1 5 2M20 13c1-1 3-2 5-2M20 19c1-1 3-2 5-2" />
      </g>
      <g v-else>
        <path d="M10 21c0-3-4-4-4-10a10 10 0 0 1 20 0c0 6-4 7-4 10ZM11 25h10M13 29h6M13 21v-7l-3-3M19 21v-7l3-3M13 14h6" />
      </g>
    </svg>
  </aside>
</template>
