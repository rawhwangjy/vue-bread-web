<template>
  <Header />
  <div
    id="content-body"
    class="content-body game"
  >
    <div class="title-area">
      <h3 class="main-title">
        Hangman
      </h3>
    </div>
    <div class="content-area">
      <div class="game-wrap">
        <div class="hangman">
          <svg
            class="head"
            :class="{
              'active': totalFailCnt >= 1
            }"
          >
            <circle
              cx="50"
              cy="50"
              r="49"
            />
          </svg>
          <svg
            class="body"
            :class="{
              'active': totalFailCnt >= 2
            }"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="150"
            />
          </svg>
          <svg
            class="left-arm"
            :class="{
              'active': totalFailCnt >= 3
            }"
          >
            <line
              x1="70"
              y1="0"
              x2="0"
              y2="70"
            />
          </svg>
          <svg
            class="right-arm"
            :class="{
              'active': totalFailCnt >= 4
            }"
          >
            <line
              x1="0"
              y1="0"
              x2="70"
              y2="70"
            />
          </svg>
          <svg
            class="left-leg"
            :class="{
              'active': totalFailCnt >= 5
            }"
          >
            <line
              x1="70"
              y1="0"
              x2="0"
              y2="100"
            />
          </svg>
          <svg
            class="right-leg"
            :class="{
              'active': totalFailCnt >= 6
            }"
          >
            <line
              x1="0"
              y1="0"
              x2="70"
              y2="100"
            />
          </svg>
        </div>
        <div
          v-show="totalFailCnt >= 0 && MAXCHANCE <= 0"
          class="result"
        >
          <span
            v-if="MAXCHANCE === 0"
            class="success"
          >Success</span>
          <span
            v-else
            class="fail"
          >Fail</span>
        </div>
      </div><!-- // game-wrap -->
      <div class="answer-wrap">
        <div class="quiz">
          <div
            v-for="item, index in answer"
            :key="`char${index}`"
            class="character"
          >
            <span class="char">{{ indexPosition.includes(index) ? answer[index] : randomEmoji() }}</span>
            <span class="blank" />
          </div>
        </div>
        <div class="keyboard-wrap">
          <button
            v-for="(item, index) in keyboard"
            :key="`key${index}`"
            type="button"
            class="key"
          >
            <span>{{ item }}</span>
          </button>
        </div>
      </div><!-- // answer-wrap -->
    </div>
  </div>
  <Alert
    :state="state"
    content-align="center"
    btn-align="center"
    bg
    @close="state = false"
  >
    아직 작업 중인 화면입니다.
  </Alert>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Header from '@/views/layout/Header.vue'
import Alert from '@/components/Alert.vue'

export default defineComponent({
  name: '',
  components: {
    Header,
    Alert
  },
  setup () {
    const answer = ref('GOOD')
    const keyboards = document.getElementsByClassName('keyboard-wrap')
    const keyboard = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const state = ref<boolean>(false)
    onMounted(() => {
      // state.value = true
      console.log('keyboards', keyboards)
      for (const item of Object.values(keyboards)) {
        item?.addEventListener('click', (e: Event) => {
          const target = e.target as HTMLElement
          if (target.localName === 'button') {
            charCheck(target.children[0].innerHTML)
          } else {
            charCheck(target.innerHTML)
          }
        })
      }
    })
    const MAXCHANCE = ref<number>(answer.value.length)
    const restChance = ref<number>(answer.value.length) // 맞춘 횟수 // 전체 넘버에서 맞추면, 맞춘 갯수 뺌 // 4 => 0

    const indexPosition = ref<number[]>([]) // 스트링에서 c 위치
    const totalFailCnt = ref(0) // 실패 횟수 // 인간 만들 때 카운트 됨 0 => 4

    const failState = ref(false) // 성공 여부
    function charCheck (value: string) {
      const str = answer.value
      const searchvalue = value
      let pos = 0
      if (str.indexOf(searchvalue) === -1) {
        totalFailCnt.value = totalFailCnt.value + 1
        return
      }
      // if (MAXCHANCE.value <= 0) {
      //   failState.value = true
      // } else {
      //   failState.value = false
      // }
      /*
        [성공 화면]
        restChance 0 이면 성공 화면

        [실패 화면]
        실패 횟수가
      */
      while (true) {
        const foundPos = str.indexOf(searchvalue, pos)
        if (foundPos === -1) break
        indexPosition.value.push(foundPos)
        restChance.value = restChance.value - 1
        pos = foundPos + 1
      }
    }
    const emoji = ref<string[]>(['&#x1F92B;', '&#x1F603;', '&#x1F606;', '&#x1F923;', '&#x1F60A;', '&#x1F607;', '&#x1F970;', '&#x1F60D;', '&#x1F929;', '&#x1F60B;', '&#x1F61D;', '&#x1F914;', '&#x1F60F;', '&#x1F60C;', '&#x1F634;', '&#x1F973;', '&#x1F60E;', '&#x1F97A;', '&#x1F978;', '&#x1F92D;'])
    function randomEmoji () {
      const randomNumber = Math.floor(Math.random() * (emoji.value.length - 1)) + 1
      const textArea = document.createElement('textarea')
      textArea.innerHTML = emoji.value[randomNumber]
      return textArea.value
    }
    return {
      answer,
      keyboard,
      charCheck,
      indexPosition,
      MAXCHANCE,
      totalFailCnt,
      randomEmoji,
      state,
      failState
    }
  }
})
</script>
