<template>
  <div class="radio-wrap">
    <input
      type="radio"
      :id="`rdo${randomString}`"
      class="form-radio-input"
      :value="value"
      :name="name"
      :checked="checked"
      :disabled="disabled"
      @change="onChange"
    >
    <label
      :for="`rdo${randomString}`"
      :class="{
        'sr-only': labelHide
      }"
    >
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
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
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelHide: {
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

    function onChange (event : Event) {
      const currentCheck = (event.target as HTMLInputElement).value
      emit('update:modelValue', currentCheck)
      emit('change', currentCheck)
    }
    return {
      randomString,
      isChecked,
      onChange
    }
  }
})
</script>
