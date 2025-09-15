<template>
  <div class="gamepad-button-watcher">
    <slot :pressed="buttonState.pressed"></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    button: {
      type: Object,
      required: true,
      validator: (value: any) => {
        return value && 'pressed' in value;
      }
    },
    buttonIndex: {
      type: Number,
      default: null
    },
    buttonName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      buttonState: {
        pressed: false
      }
    };
  },
  watch: {
    'button.pressed': {
      async handler(newValue: boolean, oldValue: boolean) {
        if (newValue !== oldValue) {
          const buttonInfo = this.buttonIndex !== null ? `Button ${this.buttonIndex}` : 'Button';
          console.log(`${buttonInfo} pressed state changed: ${newValue}`);
          this.buttonState.pressed = newValue;
          if (newValue === true) {
            await this.keyEvents.append(this.buttonName);
          }

        }
      },
      immediate: true
    }
  },
  created() {
    // Initialize button state
    if (this.button) {
      this.buttonState.pressed = this.button.pressed;
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