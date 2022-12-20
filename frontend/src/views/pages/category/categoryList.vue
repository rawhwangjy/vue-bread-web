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
              <div @click="changeUI(category)">
                <span v-show="categoryDetail.id !== category.id">
                  {{ category.category }}
                  <font-awesome-icon icon="fa-solid fa-pencil" />
                </span>
                <!-- v-if="categoryDetail.id !== 0" -->
                <span v-if="categoryDetail.id === category.id">
                  <input type="text" name="" id="" v-model="categoryDetail.category" >
                  <button type="button" @click="categoryUpdate(categoryDetail)">완료</button>
                </span>
              </div>
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
import { ResCategoryListInterface, ResCategoryUpdateDetailInterface } from '@/service/category/interface/categoryList.interface'

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
    const categoryDetail = ref<ResCategoryUpdateDetailInterface>({
      id: 0,
      category: ''
    })

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
    async function categoryUpdate (target: ResCategoryUpdateDetailInterface) {
      console.log('categoryList.value ', categoryList.value)
      console.log('target ', target)
      // categoryList.value.filter((item) => {
      //   if (item.id === target.id) {
      //     item.category = target.category
      //   }
      //   return false
      // })
      console.log('categoryList.value ', categoryList.value)
      await categoryStore.actionHttpCategoryUpdate(target)
      getCategoryList()
      categoryDetail.value.id = 0
    }
    function changeUI (target: ResCategoryUpdateDetailInterface) {
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
      categoryDetail
    }
  }
})
</script>
