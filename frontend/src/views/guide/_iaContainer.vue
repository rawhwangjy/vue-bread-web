<template>
  <div class="guide-container">
    <nav class="guide-nav">
      <ul>
        <li
          v-for="(item, index) in guideItems"
          :key="index"
          :class="{
            'active': navIndex === index
          }"
        >
          <a href="javascript:;" @enter="navItemClick(index)" @click="navItemClick(index)" :title="item.navDesc" role="region" tabindex="0" class="target-a11y">
            {{ item.navTitle }}
          </a>
          <ul>
            <li
              v-for="(subitem, subindex) in item.subItems"
              :key="subindex"
              :class="{
                'active': navIndex === index && subNavIndex === subindex
              }"
            >
              <a href="javascript:;" @enter="subNavItemClick(index, subindex)" @click="subNavItemClick(index, subindex)" :title="subitem.desc" tabindex="-1">
                {{ subitem.subNavTitle }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const guideItems = [
  {
    navTitle: 'Introduce',
    navUrl: '/guide/intro',
    navDesc: '포트폴리오 사이트 정의',
    subItems: [
      { subNavTitle: 'spec', subNavUrl: '/guide/intro/spec', desc: '포트폴리오 타겟 화면 안내' },
      { subNavTitle: 'convention', subNavUrl: '/guide/intro/convention', desc: '코딩 컨벤션 안내' },
      { subNavTitle: 'accessibility', subNavUrl: '/guide/intro/accessibility', desc: '접근성 안내' }
    ]
  },
  {
    navTitle: 'Components',
    navUrl: '/guide/components',
    navDesc: '컴포넌트 라이브러리',
    subItems: [
      { subNavTitle: 'Alert', subNavUrl: '/guide/components/alert', desc: '경고창 컴포넌트 라이브러리 사용 방법' },
      { subNavTitle: 'Checkbox', subNavUrl: '/guide/components/checkbox', desc: '체크박스 컴포넌트 라이브러리 사용 방법' },
      { subNavTitle: 'Radio', subNavUrl: '/guide/components/radio', desc: '라디오 컴포넌트 라이브러리 사용 방법' },
      { subNavTitle: 'Tab', subNavUrl: '/guide/components/tab', desc: '탭 컴포넌트 라이브러리 사용 방법' },
      { subNavTitle: 'Swiper', subNavUrl: '/guide/components/swiper', desc: '스와이퍼 컴포넌트 라이브러리 사용 방법' },
      { subNavTitle: 'Modal', subNavUrl: '/guide/components/modal', desc: '모달 컴포넌트 라이브러리 사용 방법' }
    ]
  },
  {
    navTitle: 'Modules',
    navUrl: '/guide/modules',
    navDesc: 'CSS 모듈 라이브러리',
    subItems: [
      { subNavTitle: 'Button', subNavUrl: '/guide/modules/button', desc: '버튼 CSS 모듈 라이브러리 사용 방법' }
    ]
  },
  {
    navTitle: 'Test',
    navUrl: '/guide/test',
    navDesc: 'test 페이지',
    subItems: [
      { subNavTitle: 'testing', subNavUrl: '/guide/intro/testing', desc: 'testing' }
    ]
  }
]
export default defineComponent({
  name: '',
  components: {
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    onMounted(() => {
      state.navIndex = guideItems.findIndex((item) =>
        route.path.includes(item.navUrl)
      )

      state.subNavIndex = guideItems[state.navIndex].subItems.findIndex((item) =>
        route.path.includes(item.subNavUrl)
      )

      let index = -1
      const menus = document.getElementsByClassName('target-a11y')
      // console.log(menus)
      for (const [key, value] of Object.entries(menus)) {
        value.addEventListener('keydown', (e: Event) => {
          const e_ = e as KeyboardEvent
          const target = e.target as HTMLElement
          const childNodes = target.nextElementSibling?.children
          // console.log('value', value) // a
          // console.log('target', target) // a
          // console.log('childNodes', childNodes) // li 배열 [li, li, li]

          const keyTarget = e_.key || e_.keyCode

          if (childNodes !== undefined && childNodes !== null) {
            // 포커스 초기화
            for (let i = 0; i < childNodes.length; i++) {
              const focusTarget = childNodes[i].children[0] as HTMLElement
              focusTarget.blur()
            }
            // index -1일 경우 진행 X
            if (index < -1) {
              return false
            }
            if (keyTarget === 'ArrowLeft' || keyTarget === 37) {
              // 방향키 왼쪽
              if (index === 0) {
                const focusTarget = childNodes[index].children[0] as HTMLElement
                focusTarget.focus()
                return false
              }
              --index
              const focusTarget = childNodes[index].children[0] as HTMLElement
              focusTarget.focus()
            } else if (keyTarget === 'ArrowRight' || keyTarget === 39) {
              // 방향키 오른쪽
              // if (index === childNodes.length - 1) {
              //   // childNodes[index].children[0].classList.add('focus')
              //   const focusTarget = childNodes[index].children[0] as HTMLElement
              //   console.log(focusTarget)
              //   focusTarget.focus()
              //   return false
              // }
              ++index
              const focusTarget = childNodes[index].childNodes[0] as HTMLElement
              focusTarget.focus()
              console.log('childNodes[index]', focusTarget)
            } else if (keyTarget === 'Tab' || keyTarget === 9) {
              index = -1
              return false
            } else if (keyTarget === 'Enter' || keyTarget === 13) {
              // 엔터치면
              if (target.classList.contains('target-a11y')) {
                navItemClick(Number(key))
                console.log('enter parent')
              } else {
                subNavItemClick(Number(key), index)
                console.log('enter child')
              }
              // console.log('', Number(key), index)
            } else {
              return false
            }
          }
        })
      }
    })
    const state = reactive({
      guideItems,
      navIndex: 0,
      subNavIndex: 0
    })

    function navItemClick (index: number) {
      state.navIndex = index
      state.subNavIndex = 0
      router.push({ path: state.guideItems[state.navIndex].subItems[state.subNavIndex].subNavUrl })
    }
    function subNavItemClick (parentIndex: number, currentIndex: number) {
      state.navIndex = parentIndex
      state.subNavIndex = currentIndex
      console.log('sub / state.navIndex', state.navIndex)
      console.log('sub / state.subNavIndex', state.subNavIndex)
      router.push({ path: state.guideItems[state.navIndex].subItems[state.subNavIndex].subNavUrl })
    }
    return {
      navItemClick,
      subNavItemClick,
      ...toRefs(state)
    }
  }
})
</script>
