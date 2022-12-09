<template>
  <div class="checkbox-wrap">
    <input
      type="checkbox"
      :id="`chk${randomString}`"
      class="form-checkbox-input"
      :value="value"
      :name="name"
      :checked="isChecked"
      :disabled="disabled"
      @change="updatedInput"
    >
    <label :for="`chk${randomString}`">
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { getRandomId } from '@/utils/common.function'

export default defineComponent({
  components: {

  },
  props: {
    modelValue: {
      type: [Boolean, Array],
      default: false
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
    const trueValue = ref(true)
    const falseValue = ref(false)

    const isChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value)
      }
      return props.modelValue === trueValue.value
    })

    function updatedInput (event : Event) {
      const currentCheck = (event.target as HTMLInputElement).checked
      if (props.modelValue instanceof Array) {
        const newValue = [...props.modelValue]
        if (currentCheck) {
          newValue.push(props.value)
        } else {
          newValue.splice(newValue.indexOf(props.value), 1)
        }
        emit('update:modelValue', newValue, isChecked)
        emit('change', newValue, isChecked)
      } else {
        emit('update:modelValue', currentCheck ? trueValue.value : falseValue.value)
        emit('change', currentCheck ? trueValue.value : falseValue.value)
      }
    }
    // function changeType (target: number): boolean {
    //   let result = false
    //   if (target === 0) {
    //     result = false
    //   } else {
    //     result = true
    //   }
    //   return result
    // }
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
