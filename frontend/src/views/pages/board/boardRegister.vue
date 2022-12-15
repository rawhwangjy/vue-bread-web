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
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { ResBoardTypeInterface } from '@/service/board/interface/boardType.interface'
import { ResBoardRegisterInterface } from '@/service/board/interface/boardRegister.interface'
import Checkbox from '@/components/Checkbox.vue'

export default defineComponent({
  name: 'boardRegister',
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
    const boardTypeList = ref<ResBoardTypeInterface[]>([])
    const selectedBoardType = ref<string>('default') // v-model
    const boardDetail = ref<ResBoardRegisterInterface>({
      boardType: String(selectedBoardType),
      title: '',
      content: '',
      agree: false
    })

    // api
    async function getBoardType () {
      boardTypeList.value = await boardStore.actionHttpBoardType()
    }
    async function boardRegister () {
      await boardStore.actionHttpBoardRegister(boardDetail.value)
      alert('글 등록이 완료되었습니다.')
      router.push({
        path: `/board/${currentBoardType}`
      })
    }

    function back () {
      window.history.back()
    }

    onMounted(() => {
      getBoardType()
    })

    return {
      route,
      boardTypeList,
      selectedBoardType,
      boardDetail,
      boardRegister,
      back
    }
  }
})
</script>
