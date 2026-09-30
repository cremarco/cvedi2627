<script setup lang="ts">
import { nextTick, onBeforeUnmount, reactive, watch } from 'vue'
import { useIsSlideActive, useNav } from '@slidev/client'
import projectData from '../data/projects.json'
import { publicAsset } from '../utils/public-asset'

const projects = projectData.map(project => ({ ...project, image: publicAsset(project.image) }))

const { isPrintMode } = useNav()
const isActive = useIsSlideActive()
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const tileOrder = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7]
const tiles = reactive(Array.from({ length: 12 }, (_, index) => ({
  current: index,
  incoming: null as number | null,
  revealing: false,
})))
let projectCursor = tiles.length
let positionCursor = 0
let playback: ReturnType<typeof setInterval> | undefined
let generation = 0
const finishers = new Set<ReturnType<typeof setTimeout>>()

function stop() {
  generation++
  if (playback) clearInterval(playback)
  playback = undefined
  for (const timeout of finishers) clearTimeout(timeout)
  finishers.clear()
  for (const tile of tiles) {
    tile.incoming = null
    tile.revealing = false
  }
}

async function changeOneTile() {
  const currentGeneration = generation
  const position = tileOrder[positionCursor++ % tileOrder.length]
  const projectIndex = projectCursor++ % projects.length
  const preload = new Image()
  preload.src = projects[projectIndex].image
  try {
    await preload.decode()
  } catch {
    return
  }
  if (!playback || currentGeneration !== generation) return

  const tile = tiles[position]
  tile.incoming = projectIndex
  await nextTick()
  requestAnimationFrame(() => {
    if (currentGeneration === generation) tile.revealing = true
  })
  const timeout = setTimeout(() => {
    finishers.delete(timeout)
    if (currentGeneration !== generation) return
    tile.current = projectIndex
    tile.incoming = null
    tile.revealing = false
  }, 900)
  finishers.add(timeout)
}

function syncPlayback() {
  const shouldPlay = isActive.value && !isPrintMode.value && !reducedMotion.matches && !document.hidden
  if (shouldPlay) {
    if (!playback) playback = setInterval(changeOneTile, 1400)
  } else {
    stop()
  }
}

watch([isActive, isPrintMode], syncPlayback, { immediate: true })
reducedMotion.addEventListener('change', syncPlayback)
document.addEventListener('visibilitychange', syncPlayback)
onBeforeUnmount(() => {
  stop()
  reducedMotion.removeEventListener('change', syncPlayback)
  document.removeEventListener('visibilitychange', syncPlayback)
})
</script>

<template>
  <div class="project-gallery" role="img" :aria-label="`Anteprime a rotazione di ${projects.length} progetti degli anni precedenti`">
    <div
      v-for="(tile, index) in tiles"
      :key="index"
      class="gallery-tile"
      :class="{ 'is-revealing': tile.revealing }"
    >
      <img :src="projects[tile.current].image" alt="" aria-hidden="true" loading="eager" decoding="async" />
      <img
        v-if="tile.incoming !== null"
        class="gallery-tile-next"
        :src="projects[tile.incoming].image"
        alt=""
        aria-hidden="true"
        decoding="async"
      />
    </div>
  </div>
</template>
