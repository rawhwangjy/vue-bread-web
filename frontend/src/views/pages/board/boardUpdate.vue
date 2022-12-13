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
    <!-- <button @click="boardUpdate" class="btn lg dark">수정</button> -->
    <button @click="back" class="btn-home">메인으로</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import Checkbox from '@/components/Checkbox.vue'
import { ReqBoardTypeInterface } from '@/service/board/interface/getBoardType.interfac'

export default defineComponent({
  name: 'boardView',
  components: {
    Checkbox
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()
    function back () {
      window.history.back()
    }

    onMounted(() => {
    })

    return {
      route,
      back
    }
  }
})
</script>
