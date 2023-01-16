<template>
  <div
    class="select-wrap"
    :class="{
      'active': isShowSelect
    }"
  >
    <button
      type="button"
      :id="`slct${randomString}`"
      class="selected"
      ref="commonItem"
      @click="onShowSelectBox"
      aria-haspopup="true"
    >
      {{ selected }}
      <font-awesome-icon
        v-show="!isShowSelect"
        icon="fa-solid fa-caret-down"
        aria-label="열기"
        :aria-hidden="isShowSelect"
      />
      <font-awesome-icon
        v-show="isShowSelect"
        icon="fa-solid fa-caret-up"
        aria-label="닫기"
        :aria-hidden="!isShowSelect"
      />
    </button>
    <ul
      v-show="isShowSelect"
      class="select"
      :style="`max-height: ${height}px`"
      role="listbox"
      :aria-controls="`slct${randomString}`"
      :aria-expanded="isShowSelect"
    >
      <li
        v-for="(item, index) in selectData"
        :key="`opt${index}${randomString}`"
        class="option"
        role="option"
      >
        <button
          type="button"
          @click="onSelect"
        >{{ item }}</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { getRandomId } from '@/utils/common.function'

export default defineComponent({
  name: 'Select',
  components: { },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    selectData: {
      type: Array,
      default: () => []
    },
    initTitle: {
      type: String,
      default: ''
    },
    initSelected: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const randomString = getRandomId()
    const isShowSelect = ref(false)
    const selected = ref('')
    const height = ref(0)
    const commonItem = ref<HTMLElement | null>(null)
    const optionItemHeight = ref(0)

    onMounted(() => {
      if (!props.initSelected) {
        props.initTitle ? selected.value = props.initTitle : selected.value = '선택해 주세요.'
      }
      if (commonItem.value) {
        optionItemHeight.value = commonItem.value?.offsetHeight
      }
    })
    watch(
      () => props.initSelected,
      bindSeleted => {
        if (props.initSelected) {
          selected.value = bindSeleted
        }
      }
    )

    function onShowSelectBox () {
      isShowSelect.value = true
      height.value = optionItemHeight.value * props.selectData.length
    }
    function onSelect (event: Event) {
      const currentSelect = (event.target as HTMLSelectElement).innerText
      selected.value = currentSelect
      emit('update:modelValue', currentSelect)
      emit('change', currentSelect)
      height.value = 0
      isShowSelect.value = false
    }
    return {
      randomString,
      selected,
      isShowSelect,
      commonItem,
      height,
      onShowSelectBox,
      onSelect
    }
  }
})
</script>
