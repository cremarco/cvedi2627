<script setup lang="ts">
import { computed, useId } from 'vue'
import { useSlideSet } from '../composables/use-slide-set'
import { cardArtwork } from '../utils/card-artwork'
import { publicAsset } from '../utils/public-asset'

const props = defineProps<{ title: string }>()
const titleId = useId()
const { set } = useSlideSet()
const background = computed(() => cardArtwork(set.value.id, props.title))
</script>

<template>
  <article class="card cvedi-card" :class="{ 'has-card-artwork': background }" :aria-labelledby="titleId">
    <img v-if="background" class="card-background" :src="publicAsset(background)" alt="" aria-hidden="true" decoding="async" />
    <div class="card-body">
      <div class="card-heading">
        <h2 :id="titleId" class="card-title">{{ title }}</h2>
      </div>
      <div class="card-copy"><slot /></div>
    </div>
  </article>
</template>
