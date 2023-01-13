<template>
  <header>
    <nav>
      <div class="global-nav-wrap">
        <nav>
          <ul role="menu">
            <li
              class="global-nav-item"
              role="menuitem"
            >
              <router-link to="/guide">
                guide
              </router-link>
            </li>
            <li
              class="global-nav-item"
              role="menuitem"
            >
              <button
                type="button"
                @click="onSateSub"
                :aria-expanded="stateSub"
              >Boards</button>
              <div
                v-show="stateSub"
                class="local-nav-wrap"
              >
                <router-link
                  to="/board/category"
                  class="local-nav-item"
                >
                  Board 관리
                </router-link>
                <ul
                  class="local-nav-item"
                  role="menu"
                >
                  <li
                    v-for="(item, index) in categoryStore.categoryList"
                    :key="`select${index}`"
                    role="menuitem"
                  >
                    <router-link :to="`/board/${item.category}`" class="global-nav-item">{{ item.category }}</router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryDetailInterface } from '@/service/category/interface/categoryDetail.interface'

export default defineComponent({
  name: 'Header',
  components: {
  },
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
    function onSateSub () {
      if (stateSub.value) {
        stateSub.value = false
      } else {
        stateSub.value = true
      }
    }

    onMounted(() => {
      if (categoryStore.categoryList.length === 0) {
        getCategoryList()
      } else {
        categoryList.value = categoryStore.categoryList
      }
    })

    return {
      categoryStore,
      stateSub,
      onSateSub
    }
  }
})
</script>
