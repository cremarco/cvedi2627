<script setup lang="ts">
import { computed, useId } from 'vue'
import { useSlideContext } from '@slidev/client'
import { cardArtwork } from '../utils/card-artwork'
import { publicAsset } from '../utils/public-asset'

const props = defineProps<{ title: string; illustration?: string; illustrationVariant?: 'roomy' | 'compact' }>()
const titleId = useId()
const { $page, $nav } = useSlideContext()
const background = computed(() => {
  const slide = $nav.value.slides.find(slide => slide.no === $page.value)
  return cardArtwork(String(slide?.meta.slide.frontmatter.lesson ?? 'presentazione-corso'), props.title)
})
</script>

<template>
  <article class="card cvedi-card" :aria-labelledby="titleId">
    <img v-if="background" class="card-background" :src="publicAsset(background)" alt="" aria-hidden="true" decoding="async" />
    <div class="card-body">
      <div class="card-heading">
        <h2 :id="titleId" class="card-title">{{ title }}</h2>
      </div>
      <slot />
    </div>
  </article>
</template>
