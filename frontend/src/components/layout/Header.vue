<template>
  <header>
    <nav>
      <div class="global-nav-links">
        <nav>
          <ul>
            <li>
              <router-link
                to="/board/category"
                class="global-nav-item"
                @click="onSateSub"
              >
                Board
              </router-link>
              <ul
                v-show="stateSub"
                class="local-nav-link"
              >
                <li
                  v-for="(item, index) in categoryList"
                  :key="`select${index}`"
                >
                  <router-link :to="`/board/${item.category}`" class="global-nav-item">{{ item.category }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useBoardStore } from '@/store/board/board.module'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'

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
    const boardStore = useBoardStore()
    const categoryStore = useCategoryStore()

    // init
    const categoryList = ref<ResCategoryListInterface[]>([])
    const stateSub = ref(false)
    // const computedState = computed(() => {
    //   return !stateSub.value
    // })

    // api
    async function getCategoryList () {
      categoryList.value = await categoryStore.actionHttpGetCategoryList()
    }

    function onSateSub () {
      console.log('stateSub', stateSub.value)
      if (stateSub.value) {
        stateSub.value = false
      } else {
        stateSub.value = true
      }
    }

    onMounted(() => {
      getCategoryList()
    })

    return {
      categoryList,
      stateSub,
      onSateSub
    }
  }
})
</script>
