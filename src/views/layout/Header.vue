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
          <font-awesome-icon icon="fa-solid fa-bars" aria-label="메뉴 열기" />
        </button>
        <div
          v-show="windowWidth < 768 ? isMoShow : true"
          class="global-nav-wrap"
          >
          <nav>
            <ul
              role="menu"
              v-click-outside="onClickOutside"
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
                    {{ item.navTitle }}
                  </router-link>
                </li>
                <li
                  v-if="item.subItems"
                  class="global-nav-item"
                  role="menuitem"
                >
                  <button
                    type="button"
                    @click="onShowSub"
                    :aria-expanded="stateSub"
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
            <font-awesome-icon icon="fa-solid fa-xmark" aria-label="메뉴 닫기" />
          </button>
        </div>
        <!-- 로그인 숨김 -->
        <!-- 상태 : {{ memberStore.signinState }} -->
        <div class="login-btn-wrap">
          <router-link
            v-if="memberStore.signinState?.userId === ''"
            :to="loginData.navUrl"
            :title="loginData.navDesc"
          >
            {{ loginData.navTitle }}
          </router-link>
          <a v-else
            :href="logoutData.navUrl"
            :title="logoutData.navDesc"
          >
            {{ logoutData.navTitle }}
          </a>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, nextTick } from 'vue'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryDetailInterface } from '@/service/category/interface/categoryDetail.interface'
import { useMemberStore } from '@/store/member/member.module'
import { LocalKey } from '@/utils/common.constants'
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
      stateSub.value = false
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
        navTitle: '사이트 가이드',
        navUrl: '/guide',
        navDesc: '화면 이동'
      },
      {
        navTitle: '프로젝트',
        navUrl: '/project',
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
    onMounted(() => {
      getCategoryList()
      checkSize()

      // const result = memberStore.signinState

      // if (categoryStore.categoryList.length === 0) {
      //   getCategoryList()
      // }
      // 같은 페이지 => watch
      // 페이지 이동 => 다시 그리니까, watch 사용 x
    })
    watch(
      () => categoryStore.categoryList,
      newValue => {
        categoryList.value = newValue
      }
    )

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
      onHideMo
    }
  }
})
</script>
