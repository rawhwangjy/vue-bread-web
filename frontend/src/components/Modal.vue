<template>
  <teleport to="body">
    <div :id="id" class="modal-dialog" role="dialog" aria-modal="true" style="display: none;">
      <div class="modal">
        <div class="modal-content">
          @content
        </div>
        <button type="button" @click="closeModal" class="btn-close">
          <span class="sr-only">닫기</span>
          <font-awesome-icon icon="fa-regular fa-circle-xmark" />
        </button>
      </div>
      <!-- <span v-if="winWidth > 1024" class="bg" @click="closeModal"></span> -->
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  components: {
  },
  props: {
    board: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  setup (props, { emit }) {
    onMounted(() => {
      // console.log('board2', props.board.images)
    })
    function closeModal () {
      emit('close')
    }
    return {
      closeModal
    }
  }
})
</script>
