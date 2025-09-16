<template>
  <div>
    <NuxtRouteAnnouncer />
    <p>
      <span>
        {{ gamepad?.id }}
      </span>
    </p>
    <div v-show="controller && gamepad">
      <!-- 摇杆状态展示 -->
      <div style="display: flex; gap: 32px; margin-bottom: 16px;">
        <GamepadAxisWatcher
          :x="controller?.value?.stick.left.horizontal ?? 0"
          :y="controller?.value?.stick.left.vertical ?? 0"
          axis-name="Left Stick"
        />
        <GamepadAxisWatcher
          :x="controller?.value?.stick.right.horizontal ?? 0"
          :y="controller?.value?.stick.right.vertical ?? 0"
          axis-name="Right Stick"
        />
      </div>
      <!-- 按钮状态展示 -->
      <GamepadModifierWatcher
        v-for="(mod, name) in {
          'LT': controller?.value?.triggers.left,
          'RT': controller?.value?.triggers.right,
        }"
        :key="name"
        :button-name="name"
        :pressed="mod?.pressed ?? false"
      >
      </GamepadModifierWatcher>
      <GamepadButtonWatcher
        v-for="(button, name) in controller?.value?.buttons"
        :key="name"
        :button-name="name",
        :button-pressed="button?.pressed ?? false"
      >
      </GamepadButtonWatcher>
      <br/>
      <GamepadButtonWatcher
        v-for="(dpad, dpadname) in controller?.value?.dpad"
        :key="dpadname"
        :button-pressed="dpad?.pressed ?? false"
        :button-name="dpadname"
      >
      </GamepadButtonWatcher>
      <br/>
      <div>
        <!-- Display the key event sequence -->
        <h3>Key Event Sequence:</h3>
        <ul>
          <li v-for="(event, index) in keyEvents.keyEventDisplaySequence" :key="index">{{ event }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      events: [] as string[],
      deadzone: 0.3
    }
  },
}
</script>

<script setup lang="ts">
import { useGamepad, mapGamepadToXbox360Controller } from '@vueuse/core'
import { computed } from 'vue'

const { isSupported, gamepads } = useGamepad()
const gamepad = computed(() => gamepads.value.find(g => g.connected === true))
const controller = computed(() => gamepad.value ? mapGamepadToXbox360Controller(gamepad) : null)
const keyEvents = useKeyEvents();
</script>

