<template>
  <div
    class="input-wrap"
    :class="{
      'type-btn': btn,
      'files': files,
      'add-list': addList
    }"
  >
    <div class="input-area">
      <label
        v-if="!addList"
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
        <slot v-if="btn">
          <button
            type="button"
            class="btn-input"
            @click="onCheckId"
          >
            <span>{{ btnText }}</span>
          </button>
        </slot>
      </div>
      <slot v-if="addList">
        <button
          type="button"
          class="btn-input"
          @click="onAddItem"
        >
          <span>{{ addList }}</span>
        </button>
      </slot>
    </div>
    <div
      v-if="preview"
      class="preview-wrap"
    >
      <div
        v-for="(item, index) in previews"
        :key="`uploadImg${index}`"
        class="img-wrap"
      >
        <span
          class="img-area"
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
        <span class="img-title">
          <span class="title">{{ item.title }}</span>
          <span>{{ item.format }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref, watch, PropType } from 'vue'
import { getRandomId } from '@/utils/common.function'
import { API_URL } from '@/utils/common.constants'

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
    btn: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: ''
    },
    files: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    addList: {
      type: String,
      default: ''
    },
    initData: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'change', 'click'],
  setup (props, { emit }) {
    const randomString = getRandomId()
    const isShowDelete = ref(false)
    const btnDeleteInput = ref<HTMLElement | null>(null)
    const previews = ref<uploadImg[]>([])
    const imgRef = ref<HTMLImageElement | null>(null)

    watch(
      () => props.initData,
      bindData => {
        for (let i = 0; i < bindData.length; i++) {
          const obj: uploadImg = {
            title: '',
            url: '',
            format: '',
            width: 0,
            height: 0
          }
          const target = `${API_URL}/upload/${bindData[i]}`
          obj.title = String(bindData[0].replace(/^.*\/|\.[^.]*$/g, ''))
          obj.format = String(bindData[0].match(/^.*\/|\.[^.]*$/g))
          obj.url = String(target)
          previews.value.push(obj)
        }
      }
    )

    function onAddItem () {
      const currentValue = props.modelValue
      emit('update:modelValue', currentValue)
      emit('click', currentValue)
      onClear()
    }

    function onCheckId () {
      const currentValue = props.modelValue
      emit('update:modelValue', currentValue)
      emit('click', currentValue)
    }
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
      imgRef,
      onCheckId,
      onAddItem
    }
  }
})
</script>
