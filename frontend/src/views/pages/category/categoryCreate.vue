<template>
  <div class="board-wrap">
    <h3>카테고리 추가</h3>
    <div class="board-list">
      <dl>
        <div>
          <dt>카테고리</dt>
          <dd>
            <input type="text" name="" id="" v-model="categoryDetail.category">
          </dd>
        </div>
      </dl>
    </div>
    <button @click="categoryCreate" class="btn lg dark">글쓰기</button>
    <button @click="back" class="btn-home">메인으로</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryCreateInterface } from '@/service/category/interface/categoryCreate.interface'

export default defineComponent({
  name: 'boardCreate',
  components: {
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const categoryStore = useCategoryStore()

    // init data
    const categoryDetail = ref<ResCategoryCreateInterface>({
      category: ''
    })

    // api
    async function categoryCreate () {
      await categoryStore.actionHttpCategoryCreate(categoryDetail.value)
      alert('카테고리 등록이 완료되었습니다.')
      router.push({
        path: '/board/category'
      })
    }

    function back () {
      window.history.back()
    }

    onMounted(() => {
      // getCategoryList()
    })

    return {
      route,
      categoryCreate,
      categoryDetail,
      back
    }
  }
})
</script>
