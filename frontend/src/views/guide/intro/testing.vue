<template>
  <div class="guide-body">
    <h2 class="guide-title">{{ pageTitle }}</h2>
    <div class="guide-content">
      <div class="box">
        <Test ref="modal" />
        <button @click="openModal">Open from parent</button>
      </div>
    </div><!-- // guide-content -->
  </div>
</template>

<script lang="ts">
import Prism from 'prismjs'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Test from '@/components/Test.vue'

export default defineComponent({
  name: 'libsTest',
  components: {
    Test
  },
  setup () {
    const route = useRoute()
    const pageTitle = route.path.replace(/^.*\//, '')

    const modal = ref<InstanceType<typeof Test>>()
    const openModal = () => {
      modal.value?.open()
    }

    onMounted(() => {
      Prism.highlightAll()
    })
    return {
      pageTitle,
      modal,
      openModal
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
