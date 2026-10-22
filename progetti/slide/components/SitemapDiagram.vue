<script setup lang="ts">
import { computed } from 'vue'
import CvediCard from './CvediCard.vue'

interface SitemapNode { title: string; detail: string }
interface SitemapBranch extends SitemapNode { children?: SitemapNode[] }
interface NodeBox { left: number; top: number; width: number }

const props = defineProps<{ rootNode: SitemapNode; branches: SitemapBranch[] }>()

const canvasWidth = 1144
const nodeHeight = 80
const gap = 16
const rootBox: NodeBox = { left: (canvasWidth - 360) / 2, top: 0, width: 360 }

function rowBox(index: number, count: number, top: number): NodeBox {
  const width = (canvasWidth - gap * (count - 1)) / count
  return { left: index * (width + gap), top, width }
}

const nodes = computed(() => {
  const childCount = props.branches.reduce((count, branch) => count + (branch.children?.length ?? 0), 0)
  let childIndex = 0
  return props.branches.map((branch, index) => ({
    ...branch,
    box: rowBox(index, props.branches.length, 120),
    children: (branch.children ?? []).map(child => ({ ...child, box: rowBox(childIndex++, childCount, 240) })),
  }))
})

function cardStyle(box: NodeBox) {
  return { left: `${box.left / canvasWidth * 100}%`, top: `${box.top}px`, width: `${box.width / canvasWidth * 100}%` }
}

function connect(parent: NodeBox, children: NodeBox[]) {
  if (!children.length) return ''
  const parentX = parent.left + parent.width / 2
  const childXs = children.map(child => child.left + child.width / 2)
  const parentBottom = parent.top + nodeHeight
  const junctionY = (parentBottom + children[0].top) / 2
  const left = Math.min(parentX, ...childXs)
  const right = Math.max(parentX, ...childXs)
  return [
    `M${parentX} ${parentBottom}V${junctionY}`,
    `M${left} ${junctionY}H${right}`,
    ...children.map((child, index) => `M${childXs[index]} ${junctionY}V${child.top}`),
  ].join(' ')
}

const connections = computed(() => [
  connect(rootBox, nodes.value.map(node => node.box)),
  ...nodes.value.map(node => connect(node.box, node.children.map(child => child.box))),
].filter(Boolean))
</script>

<template>
  <div class="sitemap-diagram">
    <svg class="sitemap-connections" viewBox="0 0 1144 320" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path v-for="(connection, index) in connections" :key="index" :d="connection" />
    </svg>
    <ul class="sitemap-tree" role="list" aria-label="Mappa gerarchica del sito">
      <li class="sitemap-root-item">
        <CvediCard :title="rootNode.title" class="sitemap-card" :style="cardStyle(rootBox)">
          <p class="sitemap-detail">{{ rootNode.detail }}</p>
        </CvediCard>
        <ul role="list" aria-label="Pagine principali">
          <li v-for="(branch, branchIndex) in nodes" :key="branchIndex">
            <CvediCard :title="branch.title" class="sitemap-card" :style="cardStyle(branch.box)">
              <p class="sitemap-detail">{{ branch.detail }}</p>
            </CvediCard>
            <ul v-if="branch.children.length" role="list" :aria-label="`Pagine di ${branch.title}`">
              <li v-for="(child, childIndex) in branch.children" :key="childIndex">
                <CvediCard :title="child.title" class="sitemap-card sitemap-child-card" :style="cardStyle(child.box)">
                  <p class="sitemap-detail">{{ child.detail }}</p>
                </CvediCard>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sitemap-diagram { position: relative; width: 100%; max-width: 1144px; height: 320px; flex: 0 0 auto; align-self: center; }
.sitemap-connections { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.sitemap-connections path { fill: none; stroke: color-mix(in srgb, var(--slide-accent) 55%, transparent); stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.sitemap-tree, .sitemap-tree ul { margin: 0; padding: 0; list-style: none; }
.sitemap-tree li { margin: 0; padding: 0; list-style: none; }
.sitemap-root-item { position: relative; height: 320px; }
.sitemap-card { position: absolute; height: 80px; min-height: 0; }
.sitemap-card :deep(.card-body) { justify-content: center; min-height: 0; padding: 12px 16px; gap: 0; }
.sitemap-card :deep(.card-heading) { margin: 0 0 4px; }
.sitemap-card :deep(.card-title) { margin: 0; font-size: 20px; line-height: 1.2; }
.sitemap-child-card :deep(.card-title) { font-size: 19px; }
.sitemap-detail { margin: 0; font: 400 17px/1.2 var(--cvedi-font-display); overflow-wrap: anywhere; }
</style>
