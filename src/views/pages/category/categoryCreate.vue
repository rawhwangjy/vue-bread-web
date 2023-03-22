<template>
  <Header />
  <div class="content" id="content">
    <div class="board-wrap">
      <div class="board-title">
        <h3>카테고리 생성</h3>
      </div>
      <div class="board-content">
        <div class="form-row">
          <Input
            v-model="category.category"
            label="카테고리 추가"
            name="currentCategory"
          />
        </div>
      </div>
      <div class="board-btns side">
        <button type="button" class="btn lg light" @click="back">목록</button>
        <button type="button" class="btn lg dark" @click="categoryCreate">추가</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Header from '@/views/layout/Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { useCategoryStore } from '@/store/category/category.module'
import { ReqCategoryCreateInterface } from '@/service/category/interface/categoryCreate.interface'
import Input from '@/components/Input.vue'

export default defineComponent({
  name: 'boardCreate',
  components: {
    Header,
    Input
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const categoryStore = useCategoryStore()

    // init data
    const currentCategory = route.params.category
    const category = ref<ReqCategoryCreateInterface>({
      category: ''
    })

    // api
    async function categoryCreate () {
      if (category.value.category === '') {
        alert('카테고리를 입력해 주세요.')
        return false
      }
      await categoryStore.actionHttpCategoryCreate(category.value)
      alert('카테고리 등록이 완료되었습니다.')
      router.push({
        path: '/board/category'
      })
    }

    function back () {
      router.push({
        path: '/board/category'
      })
    }

    onMounted(() => {
      // getCategoryList()
      console.log(currentCategory)
    })

    return {
      route,
      categoryCreate,
      category,
      back
    }
  }
})
</script>
