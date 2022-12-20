<template>
  <div class="board-wrap">
    <div class="board-list">
      <table class="table vertical">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody v-if="categoryList.length > 0">
          <tr
            v-for="(category, index) in categoryList"
            :key="`category${index}`"
          >
            <td>
              <h4 class="board-title">{{ category.id }}</h4>
            </td>
            <td>
              <button type="button">
                {{ category.category }}
                <font-awesome-icon icon="fa-solid fa-pencil" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="2">Data 없음</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="categoryCreate" class="btn lg dark">글쓰기</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useCategoryStore } from '@/store/category/category.module'
import { useRouter } from 'vue-router'
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'

export default defineComponent({
  name: 'boardList',
  components: {
  },
  setup () {
    // router & store
    const router = useRouter()
    const categoryStore = useCategoryStore()

    // init data
    const categoryList = ref<ResCategoryListInterface[]>([])

    // api
    async function getCategoryList () {
      const result = await categoryStore.actionHttpGetCategoryList()
      categoryList.value = result
    }

    // route
    function categoryCreate () {
      router.push({
        path: '/board/category/register'
      })
    }

    onMounted(() => {
      getCategoryList()
    })

    return {
      categoryStore,
      getCategoryList,
      categoryList,
      categoryCreate
    }
  }
})
</script>
