<template>
  <div class="board-wrap">
    <h3>{{ route.params.boardType }} register</h3>
    <div class="board-list">
      <dl>
        <div>
          <dt>타입</dt>
          <dd>
          <select v-model="selectInit">
            <option
              v-for="(item, index) in selectList"
              :key="`select${index}`"
              :value="item.value"
            >
              {{ item.text }}
            </option>
          </select>

          </dd>
        </div>
        <div>
          <dt>제목</dt>
          <dd>
            <input type="text" name="" id="" v-model="board.title">
          </dd>
        </div>
        <div>
          <dt>내용</dt>
          <dd>
            <textarea name="" id="" cols="30" rows="10" v-model="board.content"></textarea>
          </dd>
        </div>
        <div>
          <dt>동의</dt>
          <dd>
            <Checkbox
              v-model="board.agree"
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
import { defineComponent, onMounted, reactive, ref, computed, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import Checkbox from '@/components/Checkbox.vue'
import { ReqBoardRegisterInterface } from '@/service/board/interface/boardRegister.interface'

export default defineComponent({
  name: 'boardView',
  components: {
    Checkbox
  },
  setup () {
    const route = useRoute()
    const boardStore = useBoardStore()
    const selectList = ref([
      {
        text: 'board',
        value: 0
      },
      {
        text: 'notice',
        value: 1
      }
    ])
    const selectInit = ref(0)
    const selectValue = computed(() => {
      if (selectInit.value === 0) {
        return 'board'
      } else if (selectInit.value === 1) {
        return 'notice'
      }
      return false
    })
    const board = reactive({
      boardType: String(selectValue.value),
      title: '',
      content: '',
      agree: false
    })

    async function boardRegister () {
      const result = await boardStore.actionHttpBoardRegister(board)
      console.log('result', result)
    }
    function back () {
      window.history.back()
    }

    onMounted(() => {
      console.log()
    })
    onUpdated(() => {
      // console.log('selectInit.value', selectInit.value)
      // console.log('selectValue', String(selectValue.value))
      // console.log('board.agree', board.agree)
    })

    return {
      route,
      board,
      selectList,
      boardRegister,
      selectInit,
      back
    }
  }
})
</script>
