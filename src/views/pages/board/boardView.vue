<template>
  <Header />
  <div class="content-body board" id="content-body">
    <div class="title-area">
      <h3 class="main-title">{{ boardDetail.title }}</h3>
    </div>
    <div class="content-area">
      <table class="table-view">
        <colgroup>
          <col style="width: 20%">
          <col style="width: 80%">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">제목</th>
            <td>{{ boardDetail.title }}</td>
          </tr>
          <tr>
            <th scope="row">내용</th>
            <td>{{ boardDetail.content }}</td>
          </tr>
          <tr>
            <th scope="row">첨부파일</th>
            <td>
              <Preview :file-list="boardDetail.fileList"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer-area side">
      <button type="button" class="btn lg light" @click="back">목록</button>
      <!-- <button class="btn lg dark" @click="boardUpdate">수정</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Header from '@/views/layout/Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { ReqBoardDetailInterface, ResBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import Preview from '@/components/Preview.vue'
import { API_URL } from '@/utils/common.constants'

export default defineComponent({
  name: 'boardView',
  components: {
    Header,
    Preview
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
      showHide: false,
      fileList: []
    })

    // api
    async function getBoardDetail () {
      const targetBoard: ReqBoardDetailInterface = {
        id: Number(route.params.id)
      }
      const result = await boardStore.actionHttpBoardDetail(targetBoard)
      result[0].showHide === 1 ? result[0].showHide = true : result[0].showHide = false
      boardDetail.value = result[0]
      // console.log('board', boardDetail.value)

      // fileList 가공 후 재할당
      if (result[0].fileList !== '') {
        const target = result[0].fileList.split(',')
        boardDetail.value.fileList = []
        for (let i = 0; i < target.length; i++) {
          const targetUrl = `${API_URL}/views/upload/${target[i]}`
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
