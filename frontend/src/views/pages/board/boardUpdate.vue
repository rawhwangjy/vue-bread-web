<template>
  <div class="board-wrap">
    <h3>{{ route.params.boardType }} update</h3>
    <div class="board-list">
      <dl>
        <div>
          <dt>타입</dt>
          <dd>
          <select v-model="boardDetail.boardType">
            <option
              v-for="(item, index) in boardTypeList"
              :key="`select${index}`"
              :value="item.boardType"
            >
              {{ item.boardType }}
            </option>
          </select>

          </dd>
        </div>
        <div>
          <dt>제목</dt>
          <dd>
            <input type="text" name="" id="" v-model="boardDetail.title">
          </dd>
        </div>
        <div>
          <dt>내용</dt>
          <dd>
            <textarea name="" id="" cols="30" rows="10" v-model="boardDetail.content"></textarea>
          </dd>
        </div>
        <div>
          <dt>동의</dt>
          <dd>
            <Checkbox
              v-model="boardDetail.agree"
              label="동의합니다."
              value="html5"
              name="skills"
              :checked="boardDetail.agree"
            />
          </dd>
        </div>
      </dl>
    </div>
    <button @click="boardUpdate" class="btn lg dark">수정</button>
    <button @click="back" class="btn-home">메인으로</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { ReqBoardTypeInterface } from '@/service/board/interface/boardType.interface'
import { ResBoardUpdateDetailInterface } from '@/service/board/interface/boardUpdate.interface'
import Checkbox from '@/components/Checkbox.vue'

export default defineComponent({
  name: 'boardUpdate',
  components: {
    Checkbox
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()

    // init data
    const currentBoardType = route.params.boardType
    const boardTypeList = ref<ReqBoardTypeInterface[]>([])
    const boardDetail = ref<ResBoardUpdateDetailInterface>({
      id: 0,
      boardType: typeof currentBoardType === 'string' ? currentBoardType : currentBoardType[0],
      title: '',
      content: '',
      agree: false
    })

    // api
    async function getBoardType () {
      boardTypeList.value = await boardStore.actionHttpBoardType()
    }
    async function getBoardDetail () {
      const targetBoard = {
        id: Number(route.params.id)
      }
      const result = await boardStore.actionHttpBoardUpdateDetail(targetBoard)
      result.agree === 1 ? result.agree = true : result.agree = false
      boardDetail.value = result[0]
    }
    async function boardUpdate () {
      await boardStore.actionHttpBoardUpdateRegister(boardDetail.value)
      alert('글 수정이 완료되었습니다.')
      router.push({
        path: `/board/${boardDetail.value.boardType}`
      })
    }

    function back () {
      window.history.back()
    }

    onMounted(() => {
      getBoardType()
      getBoardDetail()
    })

    return {
      route,
      boardTypeList,
      boardDetail,
      boardUpdate,
      back
    }
  }
})
</script>
