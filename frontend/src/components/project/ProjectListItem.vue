<template>
    <div class="board-list-item">
        <div class="device" :class="item?.images?.pc && item?.images?.mo ? 'both' : ''">
            <span class="pc" v-if="item?.images?.pc"><img :src="item.images.pc[0].url" alt=""></span>
            <span class="mobile" v-if="item?.images?.mo"><img :src="item.images.mo[0].url" alt=""></span>
        </div>
        <div class="summary">
          <h2 class="title">{{ item.name }}</h2>
          <div class="introduce">
            {{ item.introduce }}
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  components: {

  },
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  setup () {
    onMounted(() => {
      // console.log('pc url')
    })
    return {
    }
  }
})
</script>
