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
              <div class="editable-area">
                <span
                  v-show="categoryDetail.id !== category.id"
                  @click="changeUI(category)"
                >
                  <span>{{ category.category }}</span>
                  <font-awesome-icon icon="fa-solid fa-pencil" aria-label="수정" />
                </span>
                <!-- v-if="categoryDetail.id !== 0" -->
                <span v-if="categoryDetail.id === category.id">
                  <input type="text" name="" id="" v-model="categoryDetail.category" >
                  <button type="button" @click="categoryUpdate(categoryDetail)">완료</button>
                </span>
              </div>
              <button type="button" @click="categoryDelete(category.id)">
                <font-awesome-icon icon="fa-solid fa-trash" aria-label="삭제" />
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
import { useRouter } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'
import { ResCategoryDetailInterface } from '@/service/category/interface/categoryDetail.interface'
import { ResCategoryUpdateInterface } from '@/service/category/interface/categoryUpdate.interface'

export default defineComponent({
  name: 'boardList',
  components: {
  },
  setup () {
    // router & store
    const router = useRouter()
    const boardStore = useBoardStore()
    const categoryStore = useCategoryStore()

    // init data
    const categoryList = ref<ResCategoryListInterface[]>([])
    const categoryDetail = ref<ResCategoryDetailInterface>({
      id: 0,
      category: ''
    })

    // api
    async function getCategoryList () {
      const result = await categoryStore.actionHttpGetCategoryList()
      categoryList.value = result
    }
    async function categoryUpdate (target: ResCategoryUpdateInterface) {
      await categoryStore.actionHttpCategoryUpdate(target)
      getCategoryList()
      categoryDetail.value.id = 0
    }
    async function categoryDelete (targetId: number) {
      const targetBoard = {
        id: targetId
      }
      if (confirm('정말 삭제하시겠습니까?')) {
        alert('삭제되었습니다.')
        console.log('targetBoard', targetBoard)
        await categoryStore.actionHttpCategoryDelete(targetBoard)
        getCategoryList()
        await boardStore.actionHttpBoardListDelete(targetBoard)
      } else {
        alert('취소되었습니다.')
      }
    }

    // route
    function categoryCreate () {
      router.push({
        path: '/board/category/register'
      })
    }
    function changeUI (target: ResCategoryUpdateInterface) {
      categoryDetail.value.id = target.id
      categoryDetail.value.category = target.category
    }

    onMounted(() => {
      getCategoryList()
    })

    return {
      categoryStore,
      getCategoryList,
      categoryList,
      categoryCreate,
      changeUI,
      categoryUpdate,
      categoryDetail,
      categoryDelete
    }
  }
})
</script>
