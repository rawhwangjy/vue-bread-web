<template>
  <div class="board-wrap">
    <h3>{{ route.params.category }} view</h3>
    <div class="board-list">
      <div>id 는 {{ boardDetail.id }}</div>
      <div>{{ boardDetail.title }}</div>
      <div>{{ boardDetail.agree }}</div>
      <div v-if="boardDetail.fileList">
        <span
          v-for="(item, index) in boardDetail.fileList"
          :key="`file${index}`"
          class="board-img"
        >
          {{ item }}
          <img :src="`http://127.0.0.1:3000/upload/${item}`" alt="">
        </span>
      </div>
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
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { ReqBoardDetailInterface, ResBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'

export default defineComponent({
  name: 'boardView',
  components: {
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()

    // init data
    const currentCategory = route.params.category
    const boardDetail = ref<ResBoardDetailInterface>({
      id: 0,
      category: '',
      title: '',
      content: '',
      agree: false,
      fileList: []
    })

    // api
    async function getBoardDetail () {
      const targetBoard: ReqBoardDetailInterface = {
        id: Number(route.params.id)
      }
      const result = await boardStore.actionHttpGetBoard(targetBoard)
      result[0].agree === 1 ? result[0].agree = true : result[0].agree = false
      boardDetail.value = result[0]

      // fileList 가공 후 재할당
      if (result[0].fileList !== '') {
        const target = result[0].fileList.split(',')
        boardDetail.value.fileList = []
        for (let i = 0; i < target.length; i++) {
          boardDetail.value.fileList.push(target[i])
        }
      }
    }

    function back () {
      router.push({
        path: `/board/${currentCategory}`
      })
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
