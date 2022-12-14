<template>
  <div class="board-wrap">
    <h3>{{ route.params.boardType }} update</h3>
    <div class="board-list">
      <dl>
        <div>
          <dt>타입</dt>
          <dd>
          <select v-model="selectedBoardType">
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
            <input type="text" name="" id="" v-model="detail.title">
          </dd>
        </div>
        <div>
          <dt>내용</dt>
          <dd>
            <textarea name="" id="" cols="30" rows="10" v-model="detail.content"></textarea>
          </dd>
        </div>
        <div>
          <dt>동의</dt>
          <dd>
            <Checkbox
              v-model="detail.agree"
              label="동의합니다."
              value="html5"
              name="skills"
              :checked="detail.agree"
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
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import Checkbox from '@/components/Checkbox.vue'
import { ReqBoardTypeInterface } from '@/service/board/interface/boardType.interface'
import { ResBoardUpdateDetailInterface, ResBoardUpdateRegisterInterface } from '@/service/board/interface/boardUpdate.interface'

export default defineComponent({
  name: 'boardView',
  components: {
    Checkbox
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()
    const boardTypeList = ref<ReqBoardTypeInterface[]>([])
    const selectedBoardType = ref() // v-model

    const detail = ref<ResBoardUpdateDetailInterface>({
      id: 0,
      boardType: '',
      title: '',
      content: '',
      agree: false
    })

    let boardModel = reactive<ResBoardUpdateRegisterInterface>({
      id: 0,
      boardType: selectedBoardType,
      title: '',
      content: '',
      agree: false
    })

    async function getBoardType () {
      boardTypeList.value = await boardStore.actionHttpBoardType()
    }
    async function getBoardDetail () {
      const targetBoard = {
        id: Number(route.params.id),
        boardType: String(route.params.boardType)
      }
      const result = await boardStore.actionHttpBoardUpdateDetail(targetBoard)
      detail.value = result[0]
      // detail.value.agree === 1 ? detail.value.agree = true : detail.value.agree = false
      selectedBoardType.value = detail.value.boardType
    }
    async function boardUpdate () {
      boardModel = detail.value
      console.log('boardModel', boardModel)
      await boardStore.actionHttpBoardUpdateRegister(boardModel)
      alert('글 수정이 완료되었습니다.')
      router.push({
        path: `/board/${boardModel.boardType}`
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
      selectedBoardType,
      boardTypeList,
      detail,
      boardUpdate,
      back
    }
  }
})
</script>
