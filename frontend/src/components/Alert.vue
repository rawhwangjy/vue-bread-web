<template>
  <teleport to="body">
    <div
      v-if="state"
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
          @content
        </div>
        <div
          class="btn-area"
          :class="contentAlign"
        >
          <button type="button" class="btn-close" @click="closeAlert">닫기</button>
        </div>
      </div>
      <span v-show="bg" class="bg"></span>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  components: {
  },
  props: {
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
    onMounted(() => {
      // console.log('board2', props.board.images)
    })
    function closeAlert () {
      emit('close')
    }
    return {
      closeAlert
    }
  }
})
</script>
