<template>
  <div>
    <NuxtRouteAnnouncer />
    <p>
      <span>
        {{ gamepad?.id }}
      </span>
    </p>    
    <!-- Using the GamepadButtonWatcher component -->
    <div v-if="gamepad">
      <GamepadButtonWatcher
        v-for="(button, name) in controller?.value?.buttons"
        :key="name"
        :button="button"
        :button-name="name"
      >
        <template #default="{ pressed }">
          <div class="button-status">
            Button {{ name }}: {{ pressed ? 'Pressed' : 'Released' }}
          </div>
        </template>
      </GamepadButtonWatcher>
      <br/>
      <GamepadButtonWatcher
        v-for="(dpad, dpadname) in controller?.value?.dpad"
        :key="dpadname"
        :button="dpad"
        :button-name="dpadname"
      >
        <template #default="{ pressed }">
          <div class="button-status">
            {{ dpadname }}: {{ pressed ? 'Pressed' : 'Released' }}
          </div>
        </template>
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
import { useGamepad } from '@vueuse/core'
import { computed } from 'vue'
import { mapGamepadToXbox360Controller} from '@vueuse/core'

const { isSupported, gamepads } = useGamepad()
const gamepad = computed(() => gamepads.value.find(g => g.mapping === 'standard'))
const controller = computed(() => gamepad.value ? mapGamepadToXbox360Controller(gamepad) : null)
const keyEvents = useKeyEvents();
</script>

