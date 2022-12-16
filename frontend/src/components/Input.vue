<template>
  <div class="input-wrap">
    <input type="text">
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { getRandomId } from '@/utils/common.function'

export default defineComponent({
  components: {

  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const randomString = getRandomId()
    const isChecked = computed(() => {
      return props.modelValue === props.value
    })

    function updatedInput (event : Event) {
      const currentCheck = (event.target as HTMLInputElement).value
      emit('update:modelValue', currentCheck)
      emit('change', currentCheck)
    }
    onMounted(() => {
      // console.log('props.modelValue', typeof props.modelValue)
    })
    return {
      randomString,
      isChecked,
      updatedInput
    }
  }
})
</script>
