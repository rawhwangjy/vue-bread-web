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
              'active': failState >= 1
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
              'active': failState >= 2
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
              'active': failState >= 3
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
              'active': failState >= 4
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
              'active': failState >= 5
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
              'active': failState >= 6
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
        <!-- <div
          v-show="maxChance === failState"
          class="result"
        >
          <span
            v-if="successState"
            class="fail"
          >Fail</span>
          <span
            v-else
            class="success"
          >Success</span>
        </div> -->
      </div><!-- // game-wrap -->
      <div class="answer-wrap">
        <div class="quiz">
          <div
            v-for="item, index in answer"
            :key="`char${index}`"
            class="character"
          >
            <span class="char">{{ currentIndex.includes(index) ? answer[index] : randomEmoji() }}</span>
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
    // console.log('e', keyboards)
    // keyboards.forEach(item => {
    //   console.log(item)
    //   item.addEventListener('click', (e: Event) => {
    //     const e_ = e as KeyboardEvent
    //     console.log('e', e_)
    //     // switch () {

    //   // }
    //   })
    // })
    const state = ref<boolean>(false)
    onMounted(() => {
      state.value = true
      console.log('keyboards', keyboards)
      for (const item of Object.values(keyboards)) {
        item?.addEventListener('click', (e: Event) => {
          console.log('target', e)
          const target = e.target as HTMLElement
          if (target.localName === 'button') {
            charCheck(target.children[0].innerHTML)
          } else {
            charCheck(target.innerHTML)
          }
        })
      }
    })
    const answerLength = ref<number>(answer.value.length)
    const currentIndex = ref<number[]>([])
    const failState = ref(0)
    function charCheck (value: string) {
      const str = answer.value
      const searchvalue = value
      let pos = 0
      if (str.indexOf(searchvalue) === -1) {
        failState.value = failState.value + 1
        return
      }
      while (true) {
        const foundPos = str.indexOf(searchvalue, pos)
        if (foundPos === -1) break
        console.log('foundPos', foundPos)
        currentIndex.value.push(foundPos)
        pos = foundPos + 1
      }
    }
    const emoji = ref<string[]>(['&#x1F92B;', '&#x1F603;', '&#x1F606;', '&#x1F923;', '&#x1F60A;', '&#x1F607;', '&#x1F970;', '&#x1F60D;', '&#x1F929;', '&#x1F60B;', '&#x1F61D;', '&#x1F914;', '&#x1F60F;', '&#x1F60C;', '&#x1F634;', '&#x1F973;', '&#x1F60E;', '&#x1F97A;', '&#x1F978;', '&#x1F92D;'])
    function randomEmoji () {
      const randomNumber = Math.floor(Math.random() * (emoji.value.length - 1)) + 1
      const textArea = document.createElement('textarea')
      textArea.innerHTML = emoji.value[randomNumber]
      console.log('textArea.innerHTML', randomNumber)
      return textArea.value
    }
    return {
      answer,
      keyboard,
      charCheck,
      currentIndex,
      failState,
      randomEmoji,
      state
    }
  }
})
</script>
