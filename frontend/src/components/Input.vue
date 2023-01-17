<template>
  <div
    class="input-wrap"
    :class="{
      'files': files
    }"
  >
    <div class="input-area">
      <label
        :for="`ipt${randomString}`"
        :class="{
          'sr-only': labelHide
        }"
      >
        <span>{{ label }}</span>
      </label>
      <div class="input">
        <slot v-if="!files">
          <input
            type="text"
            :id="`ipt${randomString}`"
            :value="modelValue"
            :name="name"
            :disabled="disabled"
            :multiple="files"
            @change="onChange"
            @input="onChange"
            @blur="onBlur"
            @focus="onFocus"
          >
        </slot>
        <slot v-if="files">
          <span class="file-name">{{ selectFiles }}</span>
          <input
            type="file"
            :id="`ipt${randomString}`"
            :name="name"
            :disabled="disabled"
            multiple
            @change="onUpload"
            @input="onChange"
            @blur="onBlur"
            @focus="onFocus"
          >
        </slot>
        <button
          type="button"
          v-if="!files"
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
    <div
      v-if="preview"
      class="preview-area"
    >
      <div
        v-for="(item, index) in previews"
        :key="`uploadImg${index}`"
        class="upload-img"
      >
        <span class="img-title">{{ item.title }}</span>
        <span class="img-wrap">
          <img :src="`${item.url}`" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getRandomId } from '@/utils/common.function'

interface uploadImg {
  title: string,
  url: string
}

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
    },
    files: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const randomString = getRandomId()
    const isShowDelete = ref(false)
    const btnDeleteInput = ref<HTMLElement | null>(null)
    const selectFiles = ref('')
    const previews = ref<uploadImg[]>([])

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
      emit('update:modelValue', '')
      isShowDelete.value = false
    }
    function onUpload (event: Event) {
      const { files } = event?.target as HTMLInputElement
      console.log('value', files)
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const reader: FileReader = new FileReader()
          console.log('previews.value[i]', previews.value)
          const obj: uploadImg = {
            title: '',
            url: ''
          }
          reader.addEventListener('load', () => {
            obj.title = files[i].name
            obj.url = String(reader.result)
            previews.value.push(obj)
            return false
          })
          reader.readAsDataURL(files[i])
        }
        console.log('previews', previews.value)
      }
    }
    return {
      randomString,
      btnDeleteInput,
      isShowDelete,
      onChange,
      onBlur,
      onFocus,
      onClear,
      selectFiles,
      onUpload,
      previews
    }
  }
})
</script>
