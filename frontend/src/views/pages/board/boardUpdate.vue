<template>
  <div class="board-wrap">
    <h3>{{ route.params.category }} update</h3>
    <div class="board-list">
      <dl>
        <div>
          <dt>타입</dt>
          <dd>
            <select v-model="boardDetail.categoryId">
              <option value="0">카테고리를 선택해주세요.</option>
              <option
                v-for="(item, index) in categoryList"
                :key="`select${index}`"
                :value="item.id"
              >
                {{ item.category }}
              </option>
            </select>

          </dd>
        </div>
        <div>
          <dt>제목</dt>
          <dd>
            <input type="text" name="" id="" v-model="boardDetail.title">
          </dd>
        </div>
        <div>
          <dt>내용</dt>
          <dd>
            <textarea name="" id="" cols="30" rows="10" v-model="boardDetail.content"></textarea>
          </dd>
        </div>
        <div>
          <dt>동의</dt>
          <dd>
            <Checkbox
              v-model="boardDetail.agree"
              label="동의합니다."
              value="html5"
              name="skills"
              :checked="boardDetail.agree"
            />
          </dd>
        </div>
      </dl>
    </div>
    <button @click="boardUpdate" class="btn lg dark">수정</button>
    <button @click="back" class="btn-home">메인으로</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'
import { ReqBoardUpdateInterface, ResBoardUpdateInterface } from '@/service/board/interface/boardUpdate.interface'
import Checkbox from '@/components/Checkbox.vue'

export default defineComponent({
  name: 'boardUpdate',
  components: {
    Checkbox
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()
    const categoryStore = useCategoryStore()

    // init data
    const currentCategory = ref('')
    const categoryList = ref<ResCategoryListInterface[]>([])
    const boardDetail = ref<ResBoardUpdateInterface>({
      id: 0,
      categoryId: 0,
      title: '',
      content: '',
      agree: false
    })

    // api
    async function getCategoryList () {
      categoryList.value = await categoryStore.actionHttpGetCategoryList()
    }
    async function getBoardDetail () {
      const targetBoard: ReqBoardUpdateInterface = {
        id: Number(route.params.id)
      }
      const result = await boardStore.actionHttpGetBoard(targetBoard)
      result[0].agree === 1 ? result[0].agree = true : result[0].agree = false
      boardDetail.value = result[0]
    }
    async function boardUpdate () {
      if (boardDetail.value.categoryId === 0) {
        alert('카테고리를 선택해 주세요.')
        return false
      }
      if (boardDetail.value.title === '') {
        alert('제목을 입력해 주세요.')
        return false
      }
      if (boardDetail.value.content === '') {
        alert('내용을 입력해 주세요.')
        return false
      }
      await boardStore.actionHttpBoardUpdate(boardDetail.value)
      categoryList.value.filter((item) => {
        if (item.id === boardDetail.value.categoryId) {
          currentCategory.value = item.category
        }
        return false
      })
      alert('글 수정이 완료되었습니다.')
      router.push({
        path: `/board/${currentCategory.value}`
      })
    }

    function back () {
      window.history.back()
    }

    onMounted(() => {
      getCategoryList()
      getBoardDetail()
    })

    return {
      route,
      categoryList,
      boardDetail,
      boardUpdate,
      back
    }
  }
})
</script>
