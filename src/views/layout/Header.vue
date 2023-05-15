<template>
  <div
    class="header-wrap"
    :class="{
      'active': windowWidth < 768 && isMoShow
    }"
  >
    <header
      id="header"
      :class="{
        'mobile': windowWidth < 768
      }"
    >
      <h1>
        <router-link
          to="/"
          title="메인 이동"
        >
          <img src="~@/assets/images/visual/logo.png">
        </router-link>
      </h1>
      <!-- v-show="windowWidth < 768 ? isMoShow : true" -->
      <div class="nav-wrap">
        <button
          v-if="windowWidth < 768"
          class="btn-mo-nav"
          @click="onShowMo"
        >
          <font-awesome-icon
            icon="fa-solid fa-bars"
            aria-label="메뉴 열기"
          />
        </button>
        <div
          v-show="windowWidth < 768 ? isMoShow : true"
          class="global-nav-wrap"
        >
          <nav>
            <ul
              v-click-outside="onClickOutside"
              role="menu"
            >
              <template
                v-for="(item, index) in navItems"
                :key="`nav${index}`"
              >
                <li
                  v-if="!item.subItems"
                  class="global-nav-item"
                  role="menuitem"
                >
                  <router-link
                    :to="item.navUrl"
                    :title="item.navDesc"
                    @click="onHideSub"
                  >
                    <span>{{ item.navTitle }}</span>
                  </router-link>
                </li>
                <li
                  v-if="item.subItems"
                  class="global-nav-item subs"
                  role="menuitem"
                >
                  <button
                    type="button"
                    :aria-expanded="stateSub"
                    @click="onShowSub"
                  >
                    <span>{{ item.navTitle }}</span>
                  </button>
                  <div
                    v-show="windowWidth < 768 ? true : stateSub"
                    class="local-nav-wrap"
                  >
                    <ul
                      class="local-nav-item"
                      role="menu"
                    >
                      <li
                        v-for="(item2, index) in item.subItems"
                        :key="`subNav${index}`"
                        role="menuitem"
                      >
                        <router-link
                          :to="`/board/${item2.category}`"
                          class="local-nav-sub-item"
                          @click="stateSub = false"
                        >
                          {{ item2.category }}
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </li>
              </template>
            </ul>
          </nav>
          <button
            v-if="windowWidth < 768"
            class="btn-mo-close"
            @click="onHideMo"
          >
            <font-awesome-icon
              icon="fa-solid fa-xmark"
              aria-label="메뉴 닫기"
            />
          </button>
        </div>
        <!-- 로그인 숨김 -->
        <!-- 상태 : {{ memberStore.signinState }} -->
        <div class="login-btn-wrap">
          <router-link
            v-if="!isLogin"
            :to="loginData.navUrl"
            :title="loginData.navDesc"
            class="btn-login"
          >
            <span>{{ loginData.navTitle }}</span>
          </router-link>
          <a
            v-else
            :href="logoutData.navUrl"
            :title="logoutData.navDesc"
            class="btn-login"
            @click="onLogout"
          >
            <span>{{ logoutData.navTitle }}</span>
            <span class="timer">{{ display }}</span>
          </a>
          <div class="tooltip-wrap">
            <button
              type="button"
              class="btn-tooltip"
              @click="onShowTooltip"
            >
              <font-awesome-icon
                icon="fa-solid fa-exclamation-circle"
                aria-label="툴팁"
              />
            </button>
            <div
              v-show="isShowTooltip"
              v-click-outside="onClickOutside"
              class="tooltip"
              role="tooltip"
            >
              <ul class="dot-list">
                <li>JWT 토큰을 이용한 로그인</li>
                <li>Access Token : Expired Day 10m</li>
                <li>Refresh Token : Expired Day 14d</li>
                <li>Test 계정 : admin / admin123!</li>
              </ul>
              <button
                type="button"
                class="btn-close"
                @click="onShowTooltip"
              >
                <font-awesome-icon
                  icon="fa-solid fa-xmark"
                  aria-label="툴팁 닫기"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed, onBeforeMount, onUnmounted, onBeforeUnmount } from 'vue'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryDetailInterface } from '@/service/category/interface/categoryDetail.interface'
import { useMemberStore } from '@/store/member/member.module'
import { LocalKey } from '@/utils/common.constants'
import { decodedToken } from '@/utils/token/tokenDecoder'

// {
//   navTitle: 'Guide',
//   navUrl: '/guide',
//   navDesc: '가이드 화면 이동',
//   subItems: [
//     { subNavTitle: 'testing', subNavUrl: '/guide/intro/testing', desc: 'testing' }
//   ]
// }
export default defineComponent({
  name: 'Header',
  components: { },
  props: {
    scrollTop: {
      type: Boolean,
      default: false
    },
    scrollBottom: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    // router & store
    const categoryStore = useCategoryStore()
    const memberStore = useMemberStore()

    // init
    const stateSub = ref(false)
    const categoryList = ref<ResCategoryDetailInterface[]>([])

    // api
    async function getCategoryList () {
      categoryList.value = await categoryStore.actionHttpGetCategoryList()
    }
    function onShowSub () {
      console.log('stateSub', stateSub.value)
      if (stateSub.value) {
        stateSub.value = false
      } else {
        stateSub.value = true
      }
      localStorage.setItem(LocalKey.lastPageNum, String(1))
    }
    function onHideSub () {
      stateSub.value = false
      isMoShow.value = false
      localStorage.setItem(LocalKey.lastPageNum, String(1))
    }
    function onClickOutside () {
      // if (stateSub.value) {
      //   stateSub.value = false
      // }
      // if (isShowTooltip.value) {
      //   isShowTooltip.value = false
      // }
      // stateSub.value = false
      // isShowTooltip.value = false
    }
    const loginData = ref({
      navTitle: '로그인',
      navUrl: '/signin',
      navDesc: '화면 이동'
    })
    const logoutData = ref({
      navTitle: '로그아웃',
      navUrl: '/',
      navDesc: '화면 이동'
    })
    // const isLogin = ref<string | null>(localStorage.getItem('jwt-token'))
    const navItems = ref([
      {
        navTitle: '소스 코드',
        navUrl: '/guide',
        navDesc: '화면 이동'
      },
      {
        navTitle: '프로젝트',
        navUrl: '/project',
        navDesc: '화면 이동'
      },
      {
        navTitle: '게임',
        navUrl: '/games',
        navDesc: '화면 이동'
      },
      {
        navTitle: '게시판 관리',
        navUrl: '/board/category',
        navDesc: '화면 이동'
      },
      {
        navTitle: '게시판',
        subItems: categoryList
      }
    ])
    // 모바일 네비
    const isMoShow = ref(false)
    function onShowMo () {
      if (isMoShow.value) {
        isMoShow.value = false
      } else {
        isMoShow.value = true
      }
    }
    function onHideMo () {
      isMoShow.value = false
    }
    // 화면 사이즈 체크
    const windowWidth = ref(window.innerWidth)
    function checkSize () {
      // console.log('사이즈', windowWidth)
      window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
      })
    }
    watch(
      () => categoryStore.categoryList,
      newValue => {
        categoryList.value = newValue
      }
    )
    const countInterval = ref()
    onUnmounted(() => {
      clearInterval(countInterval.value)
    })
    onMounted(() => {
      getCategoryList()
      checkSize()
      if (isLogin.value) {
        countInterval.value = setInterval(loginTimer, 1000)
      }
    })
    // timer
    const display = ref('10:00')
    let remains = 60 * 10
    function loginTimer () {
      const minutes = ref(0)
      const seconds = ref(0)
      minutes.value = Math.floor(remains / 60)
      seconds.value = Math.floor(remains % 60)

      display.value = `${minutes.value < 10 ? `0${minutes.value}` : `${minutes.value}`}:${seconds.value < 10 ? `0${seconds.value}` : seconds.value}`
      remains = remains - 1
      if (remains < 0) {
        clearInterval(countInterval.value)
      }
      console.log(display.value)
    }
    const isLogin = computed(() => {
      const token: string | null = localStorage.getItem('accessToken') !== null ? localStorage.getItem('accessToken') : null
      const state = ref(false)
      if (token !== null) {
        const tokenVerify = decodedToken(token)
        if (tokenVerify) {
          // console.log('토큰 유효')
          state.value = true
        } else {
          // console.log('토큰 XX')
          clearInterval(countInterval.value)
          state.value = false
        }
      }
      if (display.value === '00:00' && !state.value) {
        alert('10분간 움직임이 없어 로그아웃 되었습니다.')
        clearInterval(countInterval.value)
      }
      return state.value
    })
    function onLogout () {
      // token 삭제
      localStorage.removeItem('accessToken')
    }

    const isShowTooltip = ref(false)
    function onShowTooltip () {
      if (isShowTooltip.value) {
        isShowTooltip.value = false
      } else {
        isShowTooltip.value = true
      }
    }

    return {
      categoryStore,
      memberStore,
      loginData,
      logoutData,
      navItems,
      stateSub,
      onShowSub,
      onHideSub,
      onClickOutside,
      windowWidth,
      isMoShow,
      onShowMo,
      onHideMo,
      isLogin,
      onLogout,
      display,
      onShowTooltip,
      isShowTooltip
    }
  }
})
</script>
