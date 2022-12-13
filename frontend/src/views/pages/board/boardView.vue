<template>
  <div class="board-wrap">
    <h3>{{ route.params.boardType }} view</h3>
    <div class="board-list">
      {{ detail }}
      {{ detail.id }}
      {{ detail.title }}
    </div>
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
import { ResBoardDetailInterface } from '@/service/board/interface/getBoardDetail.interface'

export default defineComponent({
  name: 'boardView',
  components: {
  },
  setup () {
    const route = useRoute()
    const boardStore = useBoardStore()
    const detail = ref<ResBoardDetailInterface>({
      id: 0,
      boardType: '',
      title: '',
      content: '',
      agree: false
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
      route,
      detail,
      back
    }
  }
})
</script>
