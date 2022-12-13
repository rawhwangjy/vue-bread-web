<template>
  <div class="board-wrap">
    <div class="board-list">
      <table class="table vertical">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
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
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3">Data 없음</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="boardRegister" class="btn lg dark">글쓰기</button>
    <!-- <div class="btn-wrap">
      <button type="button" @click="goToUpdate(board.id)">수정</button>
      <button type="button" @click="requestApiHttpDelBoard(board)">삭제</button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { ResBoardListInterface } from '@/service/board/interface/getBoardList.interface'

export default defineComponent({
  name: 'boardList',
  components: {
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()
    const boardList = ref<ResBoardListInterface[]>([])
    const targetBoardList = {
      boardType: String(route.params.boardType)
    }

    async function getBoardList () {
      boardList.value = await boardStore.actionHttpGetBoardList(targetBoardList)
    }

    function getBoardDetail (targetId: number) {
      const id = targetId
      const boardType = route.params.boardType
      router.push({
        path: `/board/${boardType}/${id}`
      })
    }
    function boardRegister () {
      const boardType = route.params.boardType
      router.push({
        path: `/board/${boardType}/register`
      })
    }

    onMounted(() => {
      getBoardList()
      console.log('onMounted', route.params.boardType)
    })
    watch(
      () => route.params.boardType,
      newBoardType => {
        console.log('route.params.boardType', route.params.boardType)
        console.log('newBoardType', newBoardType)
        targetBoardList.boardType = String(newBoardType)
        getBoardList()
      }
    )

    return {
      boardStore,
      getBoardList,
      getBoardDetail,
      boardRegister,
      boardList
    }
  }
})
</script>
