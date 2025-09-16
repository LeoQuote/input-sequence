<template>
  <div class="gamepad-button-watcher">
    Button {{ buttonIndex !== null ? buttonIndex : buttonName }}: {{ buttonPressed ? 'Pressed' : 'Released' }}
  </div>
</template>
<script lang="ts">
export default {
  props: {
    buttonIndex: {
      type: Number,
      default: null
    },
    buttonName: {
      type: String,
      default: ''
    },
    buttonPressed: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    buttonPressed: {
      async handler(newValue: boolean, oldValue: boolean) {
        if (newValue !== oldValue) {
          const buttonInfo = this.buttonIndex !== null ? `Button ${this.buttonIndex}` : 'Button';
          console.log(`${buttonInfo} pressed state changed: ${newValue}`);
          if (newValue === true) {
            await this.keyEvents.append(this.buttonName);
          }

        }
      },
      immediate: true
    }
  },
  computed: {
    keyEvents: () => {return useKeyEvents();}
  }
}
</script>



<style scoped>
.gamepad-button-watcher {
  display: inline-block;
}
</style>