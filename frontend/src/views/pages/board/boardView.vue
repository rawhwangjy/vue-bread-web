<template>
  <div class="board-wrap">
    <h3>list</h3>
    <div class="board-list">
      {{ detail }}
      {{ detail.id }}
      {{ detail.title }}
    </div>
    <!-- <router-link to="/board/register" class="btn lg dark">글쓰기</router-link> -->
    <!-- <div class="btn-wrap">
      <button type="button" @click="goToUpdate(board.id)">수정</button>
      <button type="button" @click="requestApiHttpDelBoard(board)">삭제</button>
    </div> -->
    <button @click="back" class="btn-home">메인으로</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { GetBoardListInterface } from '@/service/board/interface/getBoardList.interface'

export default defineComponent({
  name: 'boardView',
  components: {
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()
    const detail = ref<GetBoardListInterface>({
      id: 0,
      boardType: '',
      title: ''
    })

    async function getBoardDetail () {
      // id 값 받아서 조회하는 로직
      const fdata: GetBoardListInterface = {
        id: Number(route.params.id),
        boardType: String(route.params.boardType),
        title: ''
      }
      const result = await boardStore.actionHttpGetBoard(fdata) // detail 내용 요청
      detail.value = result[0]
    }
    function back () {
      window.history.back()
    }

    onMounted(async () => {
      getBoardDetail()
      console.log('route.path', route.params)
    })

    return {
      detail,
      back
    }
  }
})
</script>
