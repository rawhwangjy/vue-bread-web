<template>
  <div class="input-wrap">
    <label
      :for="`ipt${randomString}`"
      :class="{
        'sr-only': labelHide
      }"
    >
      <span>{{ label }}</span>
    </label>
    <div class="input">
      <input
        type="text"
        :id="`ipt${randomString}`"
        :value="modelValue"
        :name="name"
        :disabled="disabled"
        @input="onChange"
        @blur="onBlur"
        @focus="onFocus"
      >
      <button
        type="button"
        v-show="isShowDelete"
        ref="btnDeleteInput"
        class="btn-delete-input"
        aria-label="내용 삭제"
        @click="onClear"
      >
        <font-awesome-icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getRandomId } from '@/utils/common.function'

export default defineComponent({
  name: 'Input',
  components: { },
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
    },
    labelHide: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const randomString = getRandomId()
    const isShowDelete = ref(false)
    const btnDeleteInput = ref<HTMLElement | null>(null)

    function onChange (event : Event) {
      const currentValue = (event.target as HTMLInputElement).value
      if (currentValue.length === 0) {
        isShowDelete.value = false
      } else if (currentValue.length > 0) {
        isShowDelete.value = true
      }
      emit('update:modelValue', currentValue)
      emit('change', currentValue)
    }
    function onBlur (event : Event) {
      const _event = event as FocusEvent
      const target = _event.relatedTarget as EventTarget
      if (target === btnDeleteInput.value) {
        isShowDelete.value = true
        return false
      }
      isShowDelete.value = false
    }
    function onFocus () {
      if (props.modelValue) {
        isShowDelete.value = true
      }
    }
    function onClear () {
      console.log('onClear')
      emit('update:modelValue', '')
      isShowDelete.value = false
    }
    return {
      randomString,
      btnDeleteInput,
      isShowDelete,
      onChange,
      onBlur,
      onFocus,
      onClear
    }
  }
})
</script>
