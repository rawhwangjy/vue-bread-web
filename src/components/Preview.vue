<template>
  <div class="preview-wrap view">
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
      <!-- <span class="img-title">
        <span class="title">{{ item.title }}</span>
        <hr>
        <span>{{ item.format }}</span>
        <hr>
      </span> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, PropType, ref, watch } from 'vue'

interface uploadImg {
  title: string,
  url: string,
  format: string,
  width: number,
  height: number
}

export default defineComponent({
  name: 'Toast',
  components: { },
  props: {
    fileList: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup (props) {
    const previews = ref<uploadImg[]>([])
    const imgRef = ref<HTMLImageElement | null>(null)

    watch(
      () => props.fileList,
      bindData => {
        for (let i = 0; i < bindData.length; i++) {
          const obj: uploadImg = {
            title: '',
            url: '',
            format: '',
            width: 0,
            height: 0
          }
          const target = bindData[i]
          obj.title = String(bindData[0].replace(/^.*\/|\.[^.]*$/g, ''))
          obj.format = String(bindData[0].match(/^.*\/|\.[^.]*$/g))
          obj.url = String(target)
          previews.value.push(obj)
        }
      }
    )

    onUpdated(() => {
      if (imgRef.value) {
        for (const [key, value] of Object.entries(imgRef.value)) {
          value.addEventListener('load', () => {
            previews.value[Number(key)].width = value.naturalWidth
            previews.value[Number(key)].height = value.naturalHeight
            return false
          })
        }
      }
    })

    return {
      imgRef,
      previews
    }
  }
})
</script>
