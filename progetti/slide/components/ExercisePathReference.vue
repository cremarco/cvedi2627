<script setup lang="ts">
export interface PathReference { title: string; example: string; description: string }
defineProps<{ items: PathReference[] }>()
</script>

<template>
  <dl class="exercise-path-reference exercise-copy">
    <div v-for="item in items" :key="item.title" class="exercise-path-case">
      <dt><span>{{ item.title }}</span><code class="exercise-inline-code">{{ item.example }}</code></dt>
      <dd>{{ item.description }}</dd>
    </div>
  </dl>
</template>
