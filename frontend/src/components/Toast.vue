<template>
  <transition :name="animationName">
    <div
      v-show="state"
      class="toast-wrap"
      :class="contentAlign"
    >
      <div class="toast">
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
  },
  props: {
    message: {
      type: String,
      default: null
    },
    contentAlign: {
      type: String,
      default: ''
    }
  },
  emits: ['update'],
  setup () {
    const animationName = ref('')
    const state = ref(false)

    function showToast () {
      animationName.value = 'toast-up'
      state.value = !state.value
      setTimeout(() => {
        animationName.value = 'toast-down'
        state.value = !state.value
      }, 2000)
    }
    return {
      animationName,
      state,
      showToast
    }
  }
})
</script>
