<template>
  <div class="tab-wrap">
    <div class="tabs" ref="tabs">
      <div
        v-for="(item, index) in tabData"
        class="tab"
        :key="`t${index}${randomString}`"

      >
        <button type="button" @click="showPanel(index)">{{ item }}</button>
      </div>
    </div>
    <div
      class="tab-panels"
      ref="panels"
      :style="`transform: translate3d(-${transform}%, 0, 0)`"
    >
      <div
        class="tab-panel"
        v-for="(slot, index) of Object.keys($slots)"
        :key="`tp${index}${randomString}`"
      >
        <slot :name="slot" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getRandomId } from '@/utils/common.function'

export default defineComponent({
  name: 'Tab',
  components: { },
  props: {
    tabData: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update'],
  setup (props, { emit }) {
    const randomString = getRandomId()
    const transform = ref(0)
    const tabs = ref<HTMLDivElement | null>(null)
    const panels = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      tabs.value?.children[0].classList.add('active')
      panels.value?.children[0].classList.add('active')
    })
    function showPanel (target: number) {
      for (let i = 0; i < props.tabData.length; i++) {
        tabs.value?.children[i].classList.remove('active')
        panels.value?.children[i].classList.remove('active')
        panels.value?.children[i].setAttribute('aria-hidden', 'false')
      }
      tabs.value?.children[target].classList.add('active')
      panels.value?.children[target].classList.add('active')
      panels.value?.children[target].setAttribute('aria-hidden', 'true')
      transform.value = 100 * target
      emit('update', target)
    }

    return {
      randomString,
      tabs,
      panels,
      showPanel,
      transform
    }
  }
})
</script>
