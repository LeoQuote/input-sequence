<script setup lang="ts">
import { watch } from 'vue'
import { useKeyEvents } from '@/stores/events'
import { defineProps } from 'vue'

const props = defineProps<{
  buttonName: string
  pressed: boolean
}>()

const keyEvents = useKeyEvents()

watch(
  () => props.pressed,
  (newVal) => {
    let mod = keyEvents.modifierStatus.find(m => m.name === props.buttonName)
    if (mod) {
      mod.active = newVal
    } else {
      keyEvents.modifierStatus.push({ name: props.buttonName, active: newVal })
    }
  },
  { immediate: true }
)
</script>

<template>
    <div class="modifier-watcher">
        <span>{{ buttonName }}: {{ pressed ? 'Pressed' : 'Released' }}</span>
    </div>
</template>