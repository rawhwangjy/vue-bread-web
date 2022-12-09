<template>
  <div
    class="slider-controller-wrap"
    :class="{
      'pc': type === 'pc',
      'mo': type === 'mo'
    }"
  >
    <div class="slider-wrap">
      <ul class="slider" ref="slider">
        <li
          v-for="(item, index) in images"
          :key="`boardImage${index}`"
        >
          <span class="img-wrap">
            <img :src="item.url" :alt="item.alt">
            <!-- <img :src="require(`@/assets/images${item.url}`)" alt=""> -->
            <!-- <img src="@/assets/images/m-naver.png" alt=""> -->
            <!-- /img/m-naver.034f4b24.png -->
          </span>
        </li>
      </ul>
    </div>
    <div class="controller-wrap">
      <ul class="indicator" ref="indicator">
        <li
          v-for="(index) in images.length"
          :key="`boardDot${index}`"
          :class="{
            'active': index - 1 === curPositon
          }"
        >
          <button type="button" class="dot" @click="moveTo(index - 1)"></button>
        </li>
      </ul>
      <div class="arrows">
        <button type="button" class="prev" ref="btnPrev" aria-label="이전">
          <font-awesome-icon icon="fa-regular fa-circle-left" />
        </button>
        <button type="button" class="next" ref="btnNext" aria-label="다음">
          <font-awesome-icon icon="fa-regular fa-circle-right" />
        </button>
      </div>
    </div>
  </div>
</template>
<!-- https://bestofvue.com/repo/FortAwesome-vue-fontawesome-vuejs-icons -->
<script lang="ts">
import { defineComponent, onMounted, ref, computed, reactive } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleLeft, faCircleRight } from '@fortawesome/free-regular-svg-icons'

library.add(faCircleLeft, faCircleRight)
export default defineComponent({
  components: {
  },
  props: {
    images: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const slideWidth = ref<number>(0)
    const initWidth = ref<number>(0)
    onMounted(() => {
      if (window.innerWidth > 1024) {
        if (props.type === 'pc') {
          initWidth.value = 450
        } else {
          initWidth.value = 200
        }
      } else {
        if (props.type === 'pc') {
          initWidth.value = 300
        } else {
          initWidth.value = 160
        }
      }
      slideWidth.value = props.images.length * initWidth.value
      if (slider.value !== null) {
        slider.value.style.width = `${slideWidth.value}px`

        slider.value.addEventListener('touchstart', swipeStart)
        slider.value.addEventListener('touchend', swipeEnd)
      }
      init()
    })

    // touch
    const swipe = reactive({
      touchStart: {
        x: 0,
        y: 0
      },
      touchEnd: {
        x: 0,
        y: 0
      },
      touchoffset: {
        x: 0,
        y: 0
      }
    })

    function swipeStart (event: Event) {
      const event_ = event as TouchEvent
      const touch = event_.touches[0]
      swipe.touchStart.x = touch.clientX
      swipe.touchStart.y = touch.clientY
    }
    function swipeEnd (event: Event) {
      const event_ = event as TouchEvent
      if (event_.touches.length === 0) {
        const touch = event_.changedTouches[event_.changedTouches.length - 1]
        swipe.touchEnd.x = touch.clientX
        swipe.touchEnd.y = touch.clientY

        swipe.touchoffset.x = swipe.touchEnd.x - swipe.touchStart.x
        swipe.touchoffset.y = swipe.touchEnd.y - swipe.touchStart.y

        if (Math.abs(swipe.touchoffset.x) >= 80 && Math.abs(swipe.touchoffset.y) <= 10) {
          if (swipe.touchoffset.x < 0) {
            prev()
          } else {
            next()
          }
        }
      }
    }

    // slider
    const sliderPos = reactive({
      curPos: 0,
      position: 0
    })

    const btnPrev = ref<HTMLButtonElement | null>(null)
    const btnNext = ref<HTMLButtonElement | null>(null)
    const slider = ref<HTMLElement | null>(null)

    const curPositon = computed(() => {
      return sliderPos.curPos
    })
    function moveTo (clickedPos: number) {
      console.log('curpos', clickedPos)
      if (clickedPos === 0) {
        btnPrev.value?.classList.add('disabled')
      } else {
        btnPrev.value?.classList.remove('disabled')
      }
      if (clickedPos === props.images.length - 1) {
        btnNext.value?.classList.add('disabled')
      } else {
        btnNext.value?.classList.remove('disabled')
      }
      sliderPos.position = clickedPos * initWidth.value
      if (slider.value !== null) {
        slider.value.style.cssText = `width: ${slideWidth.value}px; transform: translate3d(-${sliderPos.position}px, 0, 0)`
      }
      sliderPos.curPos = clickedPos
    }
    function prev () {
      if (sliderPos.curPos > 0) {
        btnNext.value?.classList.remove('disabled')
        sliderPos.position += initWidth.value
        if (slider.value !== null) {
          slider.value.style.cssText = `width: ${slideWidth.value}px; transform: translate3d(${sliderPos.position}px, 0, 0)`
        }
        sliderPos.curPos -= 1
      }
      if (sliderPos.curPos === 0) {
        btnPrev.value?.classList.add('disabled')
      }
    }
    function next () {
      if (sliderPos.curPos < props.images.length - 1) {
        btnPrev.value?.classList.remove('disabled')
        sliderPos.position -= initWidth.value
        if (slider.value !== null) {
          slider.value.style.cssText = `width: ${slideWidth.value}px; transform: translate3d(${sliderPos.position}px, 0, 0)`
        }
        sliderPos.curPos += 1
      }
      if (sliderPos.curPos === props.images.length - 1) {
        btnNext.value?.classList.add('disabled')
      }
    }
    function init () {
      btnPrev.value?.classList.add('disabled')
      btnPrev.value?.addEventListener('click', prev)
      btnNext.value?.addEventListener('click', next)
    }
    return {
      slider,
      btnPrev,
      btnNext,
      prev,
      next,
      moveTo,
      curPositon,
      swipeStart,
      swipeEnd
    }
  }
})
</script>
