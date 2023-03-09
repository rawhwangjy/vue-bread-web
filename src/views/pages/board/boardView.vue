<template>
  <div class="board-wrap">
    <div class="board-title">
      <h3>{{ boardDetail.title }}</h3>
    </div>
    <div class="board-content">
      <div class="board-form">
        <div class="form-row">
          {{ boardDetail.content }}
        </div>
        <div class="form-row">
          <div class="preview-wrap">
            <div
              v-if="boardDetail.fileList"
              class="img-wrap"
            >
              <span
                v-for="(item, index) in boardDetail.fileList"
                :key="`uploadImg${index}`"
                class="img-area"
              >
                <img :src="`${item}`" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="board-btns side">
      <button class="btn lg light" @click="back">목록</button>
      <!-- <button class="btn lg dark" @click="boardUpdate">수정</button> -->
    </div>
    <!-- <div class="btn-wrap">
      <button type="button" @click="goToUpdate(board.id)">수정</button>
      <button type="button" @click="requestApiHttpDelBoard(board)">삭제</button>
    </div> -->
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
          const targetUrl = `http://127.0.0.1:8001/upload/${target[i]}`
          boardDetail.value.fileList.push(targetUrl)
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
