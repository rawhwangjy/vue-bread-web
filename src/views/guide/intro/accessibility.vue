<template>
  <Header />
  <div class="guide-body">
    <GuideNav />
    <div class="guide-content accessibility">
      <h2 class="guide-title">{{ pageTitle }}</h2>
      <div class="box">
        <h3 class="sub-title">
          Chrome 확장 프로그램 OpenWAX 사용
          <a href="https://chrome.google.com/webstore/detail/openwax/bfahpbmaknaeohgdklfbobogpdngngoe?hl=ko" class="link" tite="크롬 웹스토어 이동">다운로드</a>
        </h3>
        <span class="img-wrap">
          <img
            src="~@/assets/images/visual/openwax.png"
          >
        </span>
      </div><!-- // box -->
    </div><!-- // guide-content -->
  </div>
</template>

<script lang="ts">
// import Prism from 'prismjs'
// import 'prismjs/themes/prism.css'
import { defineComponent, onMounted } from 'vue'
import Header from '@/views/layout/Header.vue'
import GuideNav from '@/views/layout/GuideNav.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Accessibility',
  components: {
    Header,
    GuideNav
  },
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
