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

      let cIndex = -1
      const parentsMenu = document.getElementsByClassName('target-a11y')
      for (const parent of Object.values(parentsMenu)) {
        parent.addEventListener('keydown', (e: Event) => {
          const e_ = e as KeyboardEvent
          const pTarget = e.target as HTMLElement
          // const submenus = value.nextSibling?.childrenMenu // NodeList
          const childrenMenu = pTarget.nextElementSibling?.children // HTMLCollection
          const pKeycode = e_.key || e_.keyCode

          if (childrenMenu !== undefined && childrenMenu !== null) {
            // 포커스 초기화
            for (let i = 0; i < childrenMenu.length; i++) {
              const focusTarget = childrenMenu[i].children[0] as HTMLElement
              focusTarget.blur()
            }
            if (pKeycode === 'ArrowRight' || pKeycode === 39) {
              // right
              if (cIndex === -1) {
                cIndex = cIndex + 1
                const focusTarget = childrenMenu[cIndex].children[0] as HTMLElement
                focusTarget.focus()
              }
            } else if (pKeycode === 'ArrowLeft' || pKeycode === 37) {
              // left
              cIndex = -1
              pTarget.focus()
              return false
            } else if (pKeycode === 'Tab' || pKeycode === 9) {
              cIndex = -1
            } else if ((e_.shiftKey && pKeycode === 'Tab') || (e_.shiftKey && pKeycode === 9)) {
              cIndex = -1
            }
            console.log('parent', cIndex)
          }
        })
        const childrenMenu = parent.nextElementSibling?.children // HTMLCollection
        if (childrenMenu !== undefined && childrenMenu !== null) {
          for (const child of Object.values(childrenMenu)) {
            const childeNodesLiengh = childrenMenu?.length
            child.addEventListener('keydown', (e: Event) => {
              const e_ = e as KeyboardEvent
              const cKeycode = e_.key || e_.keyCode
              if (cKeycode === 'ArrowRight' || cKeycode === 39) {
                // right
                if (cIndex < childeNodesLiengh - 1) {
                  cIndex = cIndex + 1
                  const focusTarget = childrenMenu[cIndex].children[0] as HTMLElement
                  focusTarget.focus()
                }
              } else if (cKeycode === 'ArrowLeft' || cKeycode === 37) {
                // left
                if (cIndex <= 0) {
                  cIndex = -1
                  const focusTarget = child.parentElement?.previousSibling as HTMLElement
                  focusTarget.focus()
                  return false
                }
                if (cIndex > 0) {
                  cIndex = cIndex - 1
                  const focusTarget = childrenMenu[cIndex].children[0] as HTMLElement
                  focusTarget.focus()
                }
              } else if (cKeycode === 'Tab' || cKeycode === 9) {
                cIndex = -1
              } else if ((e_.shiftKey && cKeycode === 'Tab') || (e_.shiftKey && cKeycode === 9)) {
                cIndex = -1
              }
            })
          }
        }
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
      // console.log('sub / state.navIndex', state.navIndex)
      // console.log('sub / state.subNavIndex', state.subNavIndex)
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
