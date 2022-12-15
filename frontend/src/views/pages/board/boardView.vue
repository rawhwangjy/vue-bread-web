<template>
  <div class="board-wrap">
    <h3>{{ route.params.boardType }} view</h3>
    <div class="board-list">
      <div>dd{{ boardDetail.id }}</div>
      <div>{{ boardDetail.title }}</div>
      <div>{{ boardDetail.agree }}</div>
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
import { ResBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'

export default defineComponent({
  name: 'boardView',
  components: {
  },
  setup () {
    // router & store
    const route = useRoute()
    const boardStore = useBoardStore()

    // init data
    const boardDetail = ref<ResBoardDetailInterface>({
      id: 0,
      boardType: '',
      title: '',
      content: '',
      agree: false
    })

    // api
    async function getBoardDetail () {
      const targetBoard = {
        id: Number(route.params.id)
      }
      const result = await boardStore.actionHttpGetBoard(targetBoard)
      result[0].agree === 1 ? result[0].agree = true : result[0].agree = false
      boardDetail.value = result[0]
    }

    function back () {
      window.history.back()
    }

    onMounted(() => {
      getBoardDetail()
    })

    return {
      route,
      boardDetail,
      back
    }
  }
})
</script>
