<template>
  <div class="project">
    <div class="title"></div>
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
