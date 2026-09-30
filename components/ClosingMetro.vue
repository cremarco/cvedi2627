<script setup lang="ts">
import { useId } from 'vue'
import mapSvg from '../assets/metro-map/manuale-metro-traced.svg?raw'

const maskId = `closing-map-${useId()}`
const families = ['indigo', 'violet', 'teal', 'red', 'orange', 'yellow', 'pink']

// The same editable vector was uploaded to Figma (node 285:2031). Reveal each
// color group independently so crossings never expose a different line early.
// Route coordinates follow the original 1741 × 903 map.
const routes = [
  { name: 'indigo-spine', d: 'M285 -40 V943', width: 42, duration: '4.8s', delay: '0s' },
  { name: 'teal-spine', d: 'M857 943 V-40', width: 42, duration: '5.4s', delay: '.7s' },
  { name: 'red-spine', d: 'M195 -40 V478 Q195 501 212 519 L411 718 Q433 740 433 767 V943', width: 62, duration: '5.2s', delay: '1.1s' },
  { name: 'red-loop', d: 'M581 -40 V262 Q581 288 555 288 H255 Q225 288 225 318 V473 Q225 493 240 508 L431 699 Q433 701 433 747 V943', width: 44, duration: '6.4s', delay: '1.5s' },
  { name: 'orange-spine', d: 'M325 -40 V604 Q325 633 354 633 H598 Q620 633 620 655 V943', width: 44, duration: '5.7s', delay: '.35s' },
  { name: 'indigo-branch', d: 'M313 943 V680 Q313 662 331 662 H1370 Q1394 662 1411 646 L1623 434 Q1641 423 1657 423 H1781', width: 24, duration: '5.6s', delay: '2.4s' },
  { name: 'orange-upper', d: 'M649 943 V508 Q649 483 674 483 H1528 Q1553 483 1571 465 L1623 413 Q1644 404 1656 404 H1781', width: 24, duration: '6s', delay: '2s' },
  { name: 'orange-lower', d: 'M1781 385 H1529 Q1506 385 1506 408 V517 Q1506 531 1496 541 L1412 625 Q1395 643 1376 643 H690 Q668 643 668 665 V943', width: 24, duration: '5.9s', delay: '2.8s' },
  { name: 'yellow-bundle', d: 'M650 963 L518 824 Q500 804 500 777 V577 Q500 542 536 542 H1384 Q1418 542 1418 507 V153', width: 82, duration: '6.2s', delay: '1.9s' },
  { name: 'yellow-branch', d: 'M995 400 V446 Q995 464 977 464 H570 Q531 464 531 503 V782 Q531 803 547 819 L670 943', width: 24, duration: '4.8s', delay: '3.4s' },
  { name: 'yellow-east', d: 'M1781 365 H1526 Q1488 365 1488 403 V507 Q1488 523 1472 523 H514', width: 24, duration: '4.6s', delay: '4.1s' },
  { name: 'teal-branch', d: 'M886 943 V66 Q886 22 930 22 H1372 Q1400 22 1405 -22', width: 24, duration: '6s', delay: '3.1s' },
  { name: 'pink-west', d: 'M126 943 V810 Q126 781 156 781 H1278 Q1309 781 1309 750 V626 Q1309 593 1340 593 H1635 Q1652 593 1669 578 L1781 471', width: 44, duration: '6.3s', delay: '3.7s' },
  { name: 'violet-stop', d: 'M1230 943 V725 Q1230 703 1252 703 H1296', width: 28, duration: '2.7s', delay: '5s' },
  { name: 'yellow-dotted', d: 'M211 233 V170 Q211 151 231 136 L241 129 Q250 124 260 124 H1194 Q1210 124 1210 140 V205 Q1210 222 1226 222 H1781', width: 12, duration: '5.5s', delay: '4.8s' },
]

function completionDelay(family: string) {
  const finishingTimes = routes.filter(route => route.name.startsWith(family))
    .map(route => parseFloat(route.delay) + parseFloat(route.duration))
  return `${Math.max(...finishingTimes)}s`
}

// Trusted local artwork only. Keep its geometry in the asset, with animation
// added here; the SVG contains paths and groups, no raster images or filters.
const mapContents = mapSvg
  .replace(/<\?xml[^>]*\?>\s*/, '')
  .replace(/<svg\b[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<g id="metro-([^"]+)">/g, (_, family: string) => families.includes(family)
    ? `<g mask="url(#${maskId}-${family})">`
    : '<g class="closing-metro-details">')
</script>

<template>
  <svg class="closing-metro-map" viewBox="0 0 1741 903" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <mask v-for="family in families" :id="`${maskId}-${family}`" :key="family" maskUnits="userSpaceOnUse" x="0" y="0" width="1741" height="903" style="mask-type: luminance">
        <path
          v-for="route in routes.filter(route => route.name.startsWith(family))" :key="route.name"
          class="closing-metro-reveal" :d="route.d" :stroke-width="route.width"
          :style="{ '--route-duration': route.duration, '--route-delay': route.delay }"
          pathLength="1" fill="none" stroke="white" stroke-linejoin="round" />
        <rect class="closing-metro-complete" width="1741" height="903" fill="white" :style="{ '--complete-delay': completionDelay(family) }" />
      </mask>
    </defs>
    <g v-html="mapContents" />
  </svg>
</template>
