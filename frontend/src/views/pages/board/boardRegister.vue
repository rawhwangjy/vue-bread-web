<template>
  <div class="board-wrap">
    <h3>{{ route.params.boardType }} register</h3>
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
            <input type="text" name="" id="" v-model="boardModel.title">
          </dd>
        </div>
        <div>
          <dt>내용</dt>
          <dd>
            <textarea name="" id="" cols="30" rows="10" v-model="boardModel.content"></textarea>
          </dd>
        </div>
        <div>
          <dt>동의</dt>
          <dd>
            <Checkbox
              v-model="boardModel.agree"
              label="동의합니다."
              value="html5"
              name="skills"
            />
          </dd>
        </div>
      </dl>
    </div>
    <button @click="boardRegister" class="btn lg dark">글쓰기</button>
    <button @click="back" class="btn-home">메인으로</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, onUpdated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import Checkbox from '@/components/Checkbox.vue'
import { ReqBoardTypeInterface } from '@/service/board/interface/boardType.interface'
import { ResBoardRegisterInterface } from '@/service/board/interface/boardRegister.interface'

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
    const selectedBoardType = ref<string>('default') // v-model

    const boardType = String(route.params.boardType)
    const boardModel = reactive<ResBoardRegisterInterface>({
      boardType: selectedBoardType,
      title: '',
      content: '',
      agree: false
    })

    async function getBoardType () {
      boardTypeList.value = await boardStore.actionHttpBoardType()
    }
    async function boardRegister () {
      boardModel.agree === true ? boardModel.agree = 1 : boardModel.agree = 0 // 쓰는 페이지에서
      console.log('boardModel', boardModel.boardType)
      await boardStore.actionHttpBoardRegister(boardModel)
      alert('글 등록이 완료되었습니다.')
      router.push({
        path: `/board/${boardType}`
      })
    }
    function back () {
      window.history.back()
    }

    onMounted(() => {
      getBoardType()
    })
    onUpdated(() => {
      console.log('onUpdated', selectedBoardType)
      console.log('onUpdated value', selectedBoardType.value)
    })

    return {
      route,
      selectedBoardType,
      boardModel,
      boardTypeList,
      boardRegister,
      back
    }
  }
})
</script>
