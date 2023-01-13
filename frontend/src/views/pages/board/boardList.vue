<template>
  <div class="board-wrap">
    <div class="board-list">
      <table class="table vertical">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category</th>
            <th scope="col">Title</th>
            <th scope="col">btns</th>
          </tr>
        </thead>
        <tbody v-if="boardList.length > 0">
          <tr
            v-for="(board, index) in boardList"
            :key="`board${index}`"
          >
            <td>
              <h4 class="board-title">{{ board.id }}</h4>
            </td>
            <td>{{ board.category }}</td>
            <td>
              <a href="javascript:;" @click="getBoardDetail(board.id)">
                {{ board.title }}
              </a>
            </td>
            <td>
              <button type="button" @click="boardUpdate(board.id)">수정</button>
              <button type="button" @click="boardDelete(board.id)">삭제</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3">Data 없음</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="boardCreate" class="btn lg dark">글쓰기</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { ResBoardListInterface } from '@/service/board/interface/boardList.interface'

export default defineComponent({
  name: 'boardList',
  components: {
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()

    // init data
    const currentCategory = route.params.category
    const boardList = ref<ResBoardListInterface[]>([])
    const targetCategory = {
      category: typeof currentCategory === 'string' ? currentCategory : currentCategory[0]
    }

    // api
    async function getBoardList () {
      boardList.value = await boardStore.actionHttpGetBoardList(targetCategory)
    }

    // route
    function getBoardDetail (targetId: number) {
      const id = targetId
      router.push({
        path: `/board/${currentCategory}/${id}`
      })
    }
    async function boardDelete (targetId: number) {
      const targetBoard = {
        id: targetId
      }
      if (confirm('정말 삭제하시겠습니까?')) {
        alert('삭제되었습니다.')
        await boardStore.actionHttpBoardDelete(targetBoard)
        getBoardList()
      } else {
        alert('취소되었습니다.')
      }
    }
    function boardCreate () {
      router.push({
        path: `/board/${currentCategory}/register`
      })
    }
    function boardUpdate (targetId: number) {
      const id = targetId
      router.push({
        path: `/board/${currentCategory}/update/${id}`
      })
    }

    onMounted(() => {
      getBoardList()
    })
    function formatDate (data: number) {
      return data + 1
    }

    watch(
      () => route.params.category,
      newCategory => {
        targetCategory.category = String(newCategory)
        getBoardList()
      }
    )

    return {
      boardStore,
      getBoardList,
      getBoardDetail,
      boardList,
      boardCreate,
      boardUpdate,
      boardDelete,
      formatDate
    }
  }
})
</script>
