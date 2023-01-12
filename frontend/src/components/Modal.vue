<template>
  <teleport to="body">
    <transition :name="animationName">
      <div
        v-show="state"
        :id="id"
        class="modal-wrap"
        role="dialog"
        :aria-modal="state"
        :aria-hidden="state"
      >
        <div class="modal">
          <div
            v-if="Object.keys($slots).includes('modal-header')"
            class="modal-header"
          >
            <slot name="modal-header" />
          </div>
          <div class="modal-content">
            <slot name="modal-content" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-close-modal" @click="closeModal('close')">
              <font-awesome-icon icon="fa-solid fa-xmark" aria-label="닫기" />
            </button>
          </div>
        </div>
        <span class="bg" @click="closeModal('close')" />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue'

export default defineComponent({
  components: {
  },
  props: {
    state: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  setup (props, { emit }) {
    const body = document.body
    const animationName = ref('')

    onMounted(() => {
      animationName.value = 'modal-bounce'
    })
    onUpdated(() => {
      if (props.state) {
        body.classList.add('hidden')
      } else {
        body.classList.remove('hidden')
      }
    })

    function closeModal (target: string) {
      if (target === 'close') {
        emit('close')
      }
    }
    return {
      animationName,
      closeModal
    }
  }
})
</script>
