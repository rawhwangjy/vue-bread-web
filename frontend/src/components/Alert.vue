<template>
  <teleport to="body">
    <div
      v-show="state"
      :id="id"
      class="alert-wrap"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div
        class="alert"
        :class="{
          'no-bg': !bg
        }"
      >
        <div
          class="content"
          :class="contentAlign"
        >
          <slot />
        </div>
        <div
          class="btn-area"
          :class="contentAlign"
        >
          <button type="button" class="btn xs light" @click="closeAlert('close')">닫기</button>
        </div>
      </div>
      <span v-show="bg" class="bg" @click="closeAlert('close')"></span>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    state: {
      type: Boolean,
      default: false
    },
    contentAlign: {
      type: String,
      default: ''
    },
    btnAlign: {
      type: String,
      default: ''
    },
    bg: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup (_props, { emit }) {
    function closeAlert (target: string) {
      if (target === 'close') {
        emit('close')
      }
    }
    return {
      closeAlert
    }
  }
})
</script>
