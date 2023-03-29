<template>
  <Header />
  <div class="guide-body">
    <GuideNav />
    <div class="guide-content accessibility">
      <h2 class="guide-title">{{ pageTitle }}</h2>
      <div class="box">
        <h3 class="sub-title">
          Chrome 확장 프로그램 OpenWAX 사용
          <a
            v-if="windowWidth >= 768"
            href="https://chrome.google.com/webstore/detail/openwax/bfahpbmaknaeohgdklfbobogpdngngoe?hl=ko"
          class="link" tite="크롬 웹스토어 이동">다운로드</a>
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
import { defineComponent, onMounted, ref } from 'vue'
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

    // 화면 사이즈 체크
    const windowWidth = ref(window.innerWidth)
    function checkSize () {
      // console.log('사이즈', windowWidth)
      window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
      })
    }
    onMounted(() => {
      checkSize()
      // Prism.highlightAll()
    })

    return {
      pageTitle,
      windowWidth
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
