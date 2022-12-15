<template>
  <div class="board-wrap">
    <div class="board-list">
      <table class="table vertical">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
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
            <td>
              <a href="javascript:;" @click="getBoardDetail(board.id)">
                {{ board.title }}
              </a>
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
    const currentBoardType = route.params.boardType
    const boardList = ref<ResBoardListInterface[]>([])
    const targetBoardType = {
      boardType: typeof currentBoardType === 'string' ? currentBoardType : currentBoardType[0]
    }

    // api
    async function getBoardList () {
      boardList.value = await boardStore.actionHttpGetBoardList(targetBoardType)
    }

    // route
    function getBoardDetail (targetId: number) {
      const id = targetId
      router.push({
        path: `/board/${currentBoardType}/${id}`
      })
    }
    async function boardDelete (targetId: number) {
      const targetBoard = {
        id: targetId
      }
      await boardStore.actionHttpBoardDelete(targetBoard)
      getBoardList()
    }
    function boardCreate () {
      router.push({
        path: '/board/register'
      })
    }
    function boardUpdate (targetId: number) {
      const id = targetId
      router.push({
        path: `/board/${currentBoardType}/update/${id}`
      })
    }

    onMounted(() => {
      getBoardList()
    })

    watch(
      () => route.params.boardType,
      newBoardType => {
        targetBoardType.boardType = String(newBoardType)
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
      boardDelete
    }
  }
})
</script>
