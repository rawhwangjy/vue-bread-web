<template>
  <div class="wrapper">
    <div class="loading-wrap" ref="loadingWrap">
      <div class="loading">
        <Vue3Lottie
          :animationData="loading"
          :width="200"
          :height="200"
        />
      </div>
    </div>
    <Header />
    <!-- view -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Header from '@/components/layout/Header.vue'
import { Vue3Lottie } from 'vue3-lottie'
import loadingData from '@/utils/lottie/loading.json'

export default defineComponent({
  name: 'MainContainer',
  components: {
    Header,
    Vue3Lottie
  },
  setup () {
    const loading = loadingData
    const loadingWrap = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      // console.log('container')
      window.addEventListener('load', () => {
        loadingWrap.value?.remove()
        document.body.classList.remove('before-load')
      })
    })
    document.querySelector('.loading-wrap')?.addEventListener('transitionend', (e) => {
      // document.body.removeChild(e.currentTarget)
      // console.log(e, 'e')
    })
    return {
      loading,
      loadingWrap
    }
  }
})
</script>
