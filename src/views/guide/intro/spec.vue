<template>
  <Header />
  <div class="guide-body">
    <GuideNav />
    <div class="guide-content spec">
      <h2 class="guide-title">{{ pageTitle }}</h2>
      <div class="box">
        <div class="static-list">
          <ul>
            <li>
              <h3 class="sub-title">타겟 디바이스</h3>
              <span>Mobile, Tablet, PC</span>
            </li>
            <li>
              <h3 class="sub-title">최적화 해상도</h3>
              <ul class="dot-list">
                <li>
                  <em>Mobile</em>
                  <span>min-width: 360px</span>
                </li>
                <li>
                  <em>Tablet</em>
                  <span>min-width: 768px</span>
                </li>
                <li>
                  <em>PC</em>
                  <span>min-width: 1280px</span>
                </li>
              </ul>
            </li>
            <li>
              <h3 class="sub-title">분기 처리 정보</h3>
              <ul class="dot-list">
                <li>
                    <strong>미디어쿼리를 이용하여 분기 처리</strong>
                </li>
                <li>
                  <strong><a href="https://www.koreahtml5.kr/front/stats/browser/browserUseStats.do" target="_blank" title="새창열림">차세대 웹 기술 지원센터(KISA 산하)</a> 해상도 데이터 기반 분기점 지정</strong>
                </li>
                <li>
                  <em>Mobile : </em>
                  <span>360px ~ 767px</span>
                </li>
                <li>
                  <em>Tablet : </em>
                  <span>768px ~ 1279px</span>
                </li>
                <li>
                  <em>PC : </em>
                  <span>1280px ~ 2560px</span>
                </li>
              </ul>
            </li>
            <li>
              <h3 class="sub-title">환경 및 사용 기술</h3>
              <ul class="dot-list">
                <li>
                  <em>개발 환경</em>
                  <span>Node, NPM</span>
                </li>
                <li>
                  <em>백엔드</em>
                  <span>[DB] Sequel Pro, <br>[RDBMS] MYSQL, <br>[SERVER] Expressjs</span>
                </li>
                <li>
                  <em>프론트엔드</em>
                  <span>Vue3, Typescript, SCSS</span>
                </li>
                <li>
                  <em>형상관리</em>
                  <span>Github</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
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
  name: 'Specificaion',
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
