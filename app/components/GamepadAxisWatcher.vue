<template>
  <div class="axis-watcher">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <!-- Outer circle -->
      <circle cx="50" cy="50" r="45" fill="#f5f5f5" stroke="#bbb" stroke-width="2" />
      <!-- Joystick position -->
      <circle :cx="stickX" :cy="stickY" r="10" fill="#4caf50" />
      <!-- Center point -->
      <circle cx="50" cy="50" r="2" fill="#333" />
    </svg>
    <div class="axis-labels">
      <span>{{ axisName }}: ({{ x.toFixed(2) }}, {{ y.toFixed(2) }})</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  axisName: { type: String, required: true },
  size: { type: Number, default: 100 }
})

// Map [-1, 1] range to [10, 90] for SVG
const stickX = computed(() => 50 + props.x * 40)
const stickY = computed(() => 50 + props.y * 40)
</script>

<style scoped>
.axis-watcher {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
}
.axis-labels {
  margin-top: 4px;
  font-size: 0.95em;
  color: #333;
}
</style>
