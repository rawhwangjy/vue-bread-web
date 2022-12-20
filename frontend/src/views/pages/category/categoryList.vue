<template>
  <div class="board-wrap">
    <div class="board-list">
      {{categoryList}}
      <table class="table vertical">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <!-- <tbody v-if="boardList.length > 0">
          <tr
            v-for="(board, index) in boardList"
            :key="`board${index}`"
          >
            <td>
              <h4 class="board-title">{{ board.id }}</h4>
            </td>
            <td>
              {{ board.title }}
            </td>
            <td>date</td>
            <td>
              <button type="button" @click="boardUpdate(board.id)">수정</button>
              <button type="button" @click="boardDelete(board.id)">삭제</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="2">Data 없음</td>
          </tr>
        </tbody> -->
      </table>
    </div>
    <!-- <button @click="boardCreate" class="btn lg dark">글쓰기</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'

export default defineComponent({
  name: 'boardList',
  components: {
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const categoryStore = useCategoryStore()

    // init data
    const currentCategory = route.params.category
    const categoryList = ref<ResCategoryListInterface[]>([])
    // const targetCategory = {
    //   category: typeof currentCategory === 'string' ? currentCategory : currentCategory[0]
    // }

    // api
    async function getCategoryList () {
      const result = await categoryStore.actionHttpGetCategoryList()
      categoryList.value = result
      console.log(result)
    }

    onMounted(() => {
      getCategoryList()
      // getBoardList()
    })

    return {
      categoryStore,
      getCategoryList,
      categoryList
    }
  }
})
</script>
