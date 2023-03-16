<template>
  <header>
    <nav>
      <div class="global-nav-wrap">
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
                  v-show="stateSub"
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
      </div>
      <div class="login-wrap">
        <router-link
          :to="loginData.navUrl"
          :title="loginData.navDesc"
        >
          {{ loginData.navTitle }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryDetailInterface } from '@/service/category/interface/categoryDetail.interface'
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
    }
    function onHideSub () {
      stateSub.value = false
    }
    function onClickOutside () {
      stateSub.value = false
    }
    const loginData = ref({
      navTitle: '로그인',
      navUrl: '/signin',
      navDesc: '화면 이동'
    })
    const navItems = ref([
      {
        navTitle: '가이드',
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
    onMounted(() => {
      if (categoryStore.categoryList.length === 0) {
        getCategoryList()
      }
    })
    watch(
      () => categoryStore.categoryList,
      newValue => {
        categoryList.value = newValue
      }
    )

    return {
      categoryStore,
      loginData,
      navItems,
      stateSub,
      onShowSub,
      onHideSub,
      onClickOutside
    }
  }
})
</script>
