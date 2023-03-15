<template>
  <div class="guide-body">
    <h2 class="guide-title">{{ pageTitle }}</h2>
  </div>
</template>

<script lang="ts">
// import Prism from 'prismjs'
// import 'prismjs/themes/prism.css'
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Accessibility',
  components: {},
  setup () {
    const route = useRoute()
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      // Prism.highlightAll()
    })

    return {
      pageTitle
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
