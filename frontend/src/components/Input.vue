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
          <span class="file-name">
            <span
              v-for="(item, index) in previews"
              :key="`uploadImg${index}`"
            >{{ item.title }}{{ item.format }}</span>
          </span>
          <input
            type="file"
            :id="`ipt${randomString}`"
            :name="name"
            :disabled="disabled"
            multiple
            @blur="onBlur"
            @focus="onFocus"
            @change="onUpload"
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
        <span class="img-title">
          <span class="title">{{ item.title }}</span>
          <span>{{ item.format }}</span>
        </span>
        <span
          class="img-wrap"
          :class="{
            'width-full': item.width >= item.height,
            'height-full': item.width < item.height
          }"
        >
          <img
            :src="`${item.url}`"
            ref="imgRef"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref } from 'vue'
import { getRandomId } from '@/utils/common.function'

interface uploadImg {
  title: string,
  url: string,
  format: string,
  width: number,
  height: number
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
    const previews = ref<uploadImg[]>([])
    const imgRef = ref<HTMLImageElement | null>(null)

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
      // console.log('files', files)
      previews.value = []
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const reader: FileReader = new FileReader()
          reader.addEventListener('load', () => {
            const obj: uploadImg = {
              title: '',
              url: '',
              format: '',
              width: 0,
              height: 0
            }
            obj.title = String(files[i].name.replace(/^.*\/|\.[^.]*$/g, ''))
            obj.format = String(files[i].name.match(/^.*\/|\.[^.]*$/g))
            obj.url = String(reader.result)
            previews.value.push(obj)
            return false
          })
          reader.readAsDataURL(files[i])
        }
      }
      emit('update:modelValue', files)
      emit('change', files)
    }
    onUpdated(() => {
      if (imgRef.value) {
        for (const [key, value] of Object.entries(imgRef.value)) {
          value.addEventListener('load', () => {
            // 시점의 문제
            // 조건이 구체적인 것이 좋아
            // 엘리먼트에 사용 가능한 이벤트를 찾자
            previews.value[Number(key)].width = value.naturalWidth
            previews.value[Number(key)].height = value.naturalHeight
            return false
          })
        }
      }
    })
    return {
      randomString,
      btnDeleteInput,
      isShowDelete,
      onChange,
      onBlur,
      onFocus,
      onClear,
      onUpload,
      previews,
      imgRef
    }
  }
})
</script>
