<template>
  <div class="project">
    <span class="title">{{ data.title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  components: {
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    onMounted(() => {
      // console.log('item', props.data)
    })
    return {
    }
  }
})
</script>
