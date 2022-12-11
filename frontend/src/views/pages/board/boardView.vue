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
import { useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { ResBoardDetailInaterface } from '@/service/board/interface/getBoardDetail.interface'

export default defineComponent({
  name: 'boardView',
  components: {
  },
  setup () {
    const route = useRoute()
    const boardStore = useBoardStore()
    const detail = ref<ResBoardDetailInaterface>({
      id: 0,
      boardType: '',
      title: ''
    })

    async function getBoardDetail () {
      const targetBoard = {
        id: Number(route.params.id),
        boardType: String(route.params.boardType)
      }
      const result = await boardStore.actionHttpGetBoard(targetBoard)
      detail.value = result[0]
    }
    function back () {
      window.history.back()
    }

    onMounted(() => {
      getBoardDetail()
    })

    return {
      detail,
      back
    }
  }
})
</script>
